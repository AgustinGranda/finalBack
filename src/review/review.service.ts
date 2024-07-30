import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {

  constructor(@InjectRepository(Review)
    private readonly reviewRepository : Repository <Review>){}

  async create(createReviewDto: CreateReviewDto) {
    try {
      return await this.reviewRepository.save(createReviewDto);
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findAll() {
    return await this.reviewRepository.find()
  }

  async findOne(id: string) {
   try {
    return await this.reviewRepository.findOne({where:{id:id}, relations:["user","comment" ]})
   } catch (error) {
    throw new BadRequestException()
   }
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    try {
      await this.reviewRepository.update({id:id}, updateReviewDto)
      return updateReviewDto;
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async remove(id: string) {
    try {
      await this.reviewRepository.softDelete(id)
      return (`Review ${id} deleted`)
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
