import { BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User)
      private readonly userRepository:Repository<User>,
      @InjectRepository(Role)
      private readonly rolRepository: Repository<Role>){}

  async create(createUserDto: CreateUserDto) {

    try {
      
      
      createUserDto.rol =  await this.rolRepository.findOne({where: {description: "user"}}); 
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

      await this.userRepository.save(createUserDto)
      
      const respObj = {
        messege: `User ${createUserDto.name} created`,
        statusCode: 201
      }
      return respObj

    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findAll() {
    //eliminé la relacion con rol
    return await this.userRepository.find({withDeleted : true});
  }

  async findOne(id: string) {
    try {
      return  await this.userRepository.findOne({where:{id:id},relations:["rol", "reviews"]});
    } catch (error) {
      throw new NotFoundException()
    }
  }

  async update(id: string, newName: string) {
    try {
    
      await this.userRepository.createQueryBuilder('user')
        .update(User)
        .set({name : newName})
        .where('id = :id', { id })
        .execute();

      const respObj = {
        messege: `User ${id} updated`,
        statusCode: 201
      }
      return respObj
    } catch (error) {
      throw new BadRequestException()
    }
  }


  async remove(id: string) {
    try {
      await  this.userRepository.softDelete(id);
      const respObj = {
        messege: `User ${id} remoded`,
        statusCode: 201
      }
      return respObj
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async restore(id:string){

    try {
      await this.userRepository.restore(id);
      const respObj = {
        messege: `User ${id} restored`,
        statusCode: 201
      }
      return respObj

    } catch (error) {
      throw new BadRequestException()
    }
  }
}
