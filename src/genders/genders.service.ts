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
      return await this.genderRepository.save(createGenderDto)
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
      return await this.genderRepository.findOne({where:{id:id}, relations:["movie"]})
    } catch (error) {
      throw new NotFoundException()
    }
  }

  async update(id: string, updateGenderDto: UpdateGenderDto) {
      try {
        await this.genderRepository.update({id:id}, updateGenderDto)
        return updateGenderDto;
      } catch (error) {
        throw new BadRequestException()
      }
  }

  async remove(id: string) {
    try {
      await this.genderRepository.softDelete(id)
      return (`Gender ${id} deleted`)
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
