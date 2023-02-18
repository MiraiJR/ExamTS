import { User } from "src/users/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Exam {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    code: string;
    
    @Column()
    subject: string;
    
    @Column()
    grade: number;
    
    @Column()
    form: string;
    
    @Column()
    schoolName: string;
    
    @Column()
    startedAt: Date;
    
    @Column()
    finishedAt: Date;

    @Column("jsonb")
    listEmail: object[];

    @Column()
    @OneToOne(() => User, (user) => user.id)
    createdBy: number;

    @Column({ type: "timestamp", default: () => "now()"})
    createdAt: Date;
    
    @Column({ type: "timestamp", default: () => "now()"})
    updatedAt: Date;  
}