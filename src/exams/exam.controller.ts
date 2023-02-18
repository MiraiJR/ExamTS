import { Body, Controller, HttpException, HttpStatus, Post, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { CreateExamDTO } from "./dto/CreateExam.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { UserId } from "src/users/user.decorator";
import { ExamService } from "./exam.service";
import { diskStorage } from "multer";
import { extname } from "path";
import { FileService } from "src/utils/file.util";
const XLSX = require("xlsx");

@Controller('exam')
export class ExamController {
    constructor(
        private examService: ExamService,
        private fileService: FileService,
    ) {

    }

    @Post('create')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads'
            , filename: (req, file, cb) => {
                // Generating a 32 random chars long string
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                //Calling the callback passing the random name generated with the original extension name
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    async createNewExam(@UserId() userId: number, @Body(new ValidationPipe) exam: CreateExamDTO, @UploadedFile() file: Express.Multer.File) {
        try {
            const listEmail = this.fileService.readFileXlsx(file.path, 0);

            const newExamData = {
                ...exam,
                createdBy: userId,
                listEmail,
            };

            const res = await this.examService.create(newExamData);

            if (!res) {
                return {
                    success: false,
                    msg: 'Create new exam fail!'
                }
            }

            return {
                success: true,
                msg: 'Create new exam successfully!'
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'INTERNAL SERVER ERROR',
            }, HttpStatus.FORBIDDEN, {
                cause: error
            })
        }
    }
}