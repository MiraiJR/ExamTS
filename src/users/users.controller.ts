import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) { }

  @Get()
  async findAll() {
    try {
      const result = await this.usersService.findAll();

      return {
        success: "true",
        msg: "get all user successfully!",
        data: result
      }
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'INTERNAL SERVER ERROR',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Delete()
  async deleteUser(@Body('id', ParseIntPipe) id: number) {
    try {
      this.usersService.delete(id);
      return {
        success: "true",
        msg: "Delete this"
      };
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'INTERNAL SERVER ERROR',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      })
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.usersService.findById(id);

      if (!result) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'CAN NOT FIND THIS USER'
        }, HttpStatus.FORBIDDEN);
      }

      return {
        success: "true",
        msg: "Get user successfully!",
        data: result,
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
