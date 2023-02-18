import { Injectable } from "@nestjs/common";
import { ExamInterface } from "./interfaces/exam.interface";
import { RandomService } from "src/utils/random.util";
import { Exam } from "./exam.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ExamService {
    constructor(
        @InjectRepository(Exam)
        private examRepository: Repository<Exam>,
        private randomService: RandomService,
    ) { }
    async create(exam: ExamInterface): Promise<Boolean> {
        let code = "";
        let isPass = false;

        while (!isPass) {
            code = this.randomService.randomCodeExam(exam.subject); // random code to join take exam
            console.log(code);
            const isDuplicated = this.checkDuplicatedCode(code); // check code is duplicated

            isPass = isDuplicated ? true : false;
        }

        if(isPass) {
            try {
                await this.examRepository.save({
                    ...exam,
                    code
                });  
            } catch (error) {
                console.log(error)

                return false;
            }

            const newExam = await this.findExamByCode(code);

            return newExam ? true : false;
        }

        return false;
    }

    async checkDuplicatedCode(code: string): Promise<Boolean> {
        const checker = await this.findExamByCode(code);

        return checker ? true : false;
    }

    async findExamByCode(code: string): Promise<Exam> {
        return this.examRepository.findOne({
            where: {
                code
            }
        });
    }
}