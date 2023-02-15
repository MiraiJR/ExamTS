export interface ExamInterface {
    id: string;
    code: string;
    subject: string;
    grade: number;
    form: string;
    schoolName: string;
    startedAt: Date;
    finishedAt: Date;
    listEmail: Array<string>;
}