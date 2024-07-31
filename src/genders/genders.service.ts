import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender } from './entities/gender.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GendersService {

  constructor(@InjectRepository(Gender)
    private readonly genderRepository : Repository<Gender>){}

  async create(createGenderDto: CreateGenderDto) {
    try {
      await this.genderRepository.save(createGenderDto)
      const respObj = {
        messege: `Gender ${createGenderDto.description} created`,
        statusCode: 201
      }
      return respObj
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findAll() {
    try {
      return await this.genderRepository.find()
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findOne(id: string) {
    try {
      return await this.genderRepository.findOne({where:{id:id}, relations:["movies"]})
    } catch (error) {
      throw new NotFoundException()
    }
  }

  async update(id: string, updateGenderDto: UpdateGenderDto) {
      try {
        await this.genderRepository.update({id:id}, updateGenderDto)
        const respObj = {
          messege: `Gender ${id} updated`,
          statusCode: 201
        }
        return respObj
      } catch (error) {
        throw new BadRequestException()
      }
  }

  async remove(id: string) {
    try {
      await this.genderRepository.softDelete(id)
      const respObj = {
        messege: `Gender ${id} deleted`,
        statusCode: 201
      }
      return respObj
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
