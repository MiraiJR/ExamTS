import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserInterface } from './interfaces/user.interface';
import { RandomService } from 'src/utils/random.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
    private randomService: RandomService,
  ) { }

  findAll(): Promise<User[]> {
    this.randomService.randomIdExam();
    return this.usersRepository.find();
  }

  create(user: UserInterface) {
    return this.usersRepository.save({
      ...user,
    });
  }

  delete(id: number) {
    return this.usersRepository.delete(id);
  }

  findById(id: any): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id
      },
    });
  }

  async findUserByMail(email: string): Promise<User> {
    const result = await this.usersRepository.findOne({
      where: {
        email
      }
    });

    return result;
  }
}
