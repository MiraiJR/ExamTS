export interface ExamInterface {
    subject: string;
    grade: number;
    form: string;
    createdBy: number;
    schoolName: string;
    startedAt: Date;
    finishedAt: Date;
    listEmail: object[];
}