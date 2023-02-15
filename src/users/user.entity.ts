import { Exclude, Expose } from 'class-transformer';
import { Account } from 'src/auth/auth.entity';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryColumn()
    @OneToOne(() => Account, (account) => account.id)
    @Exclude()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    schoolName: string;

    @Column()
    address: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    gender: boolean;
    
    @Column({ type: "timestamp", default: () => "now()"})
    createdAt: Date;

    @Column({ type: "timestamp", default: () => "now()"})
    updatedAt: Date;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }

    @Expose()
    get fullName(): string {
        return `${this.lastName} ${this.firstName}`;
    }
}