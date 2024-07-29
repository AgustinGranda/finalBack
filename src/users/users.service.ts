import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User)
      private readonly userRepository:Repository<User>){}

  async create(createUserDto: CreateUserDto) {

    try {
      
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
      await this.userRepository.save(createUserDto)
      return(`Usuario ${createUserDto.name} creado`)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findAll() {
    return await this.userRepository.find()
  }

  async findOne(id: string) {
    try {
      return  await this.userRepository.findOne({where:{id:id}});
    } catch (error) {
      throw new NotFoundException()
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.userRepository.update({id:id}, updateUserDto)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async remove(id: string) {
    try {
      await  this.userRepository.softDelete(id);
      return(`User ${id} deleted`)
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
