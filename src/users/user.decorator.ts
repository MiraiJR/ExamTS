import { ExecutionContext, createParamDecorator } from "@nestjs/common";

// extract userId from request
export const UserId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.userId;
})