import { ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtAuthGuard {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService,
    ) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        // extract token from request header
        const authHeader = request.header("Authorization");
        const token = authHeader && authHeader.split(" ")[1];

        // catch use case: expired token
        try {
            const decodeToken = await this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET_KEY
            });

            // checking information extracted from decodeToken is valid
            const isValid = await this.userService.findById(decodeToken.id);

            if(isValid) {
                // pass id of user to request
                request.userId = decodeToken.id;
            }

            return isValid ? true : false;
        } catch (error) {
            // resend refresh token
            console.log("expired token");
            return false;
        }
    }
}