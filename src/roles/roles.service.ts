import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {

  constructor(@InjectRepository(Role)
    private readonly roleRepository: Repository<Role>){}

  async create(createRoleDto: CreateRoleDto) {
    try {
      await this.roleRepository.save(createRoleDto);
      const respObj = {
        messege: `Role ${createRoleDto.description} created`,
        statusCode: 201
      }
      return respObj
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findAll() {
    return await this.roleRepository.find()
  }

  async findOne(id: string) {
    try {
      return await this.roleRepository.findOne({where: {id:id}})
    } catch (error) {
      throw new NotFoundException()
    }
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    try {
      await this.roleRepository.update({id:id} ,updateRoleDto)

      const respObj = {
        messege: `Role ${id} updated`,
        statusCode: 201
      }
      return respObj
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async remove(id: string) {
    try {
      await this.roleRepository.softDelete(id)
      const respObj = {
        messege: `Role ${id} removed`,
        statusCode: 201
      }
      return respObj
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
