import { BadRequestException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {

  constructor(@InjectRepository(Comment)
      private readonly commentRepository : Repository <Comment>
){}

  async create(createCommentDto: CreateCommentDto) {
    try {
      return await this.commentRepository.save(createCommentDto);
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findAll() {
    return await this.commentRepository.find({relations:["user"]});
  }

  async findOne(id: string) {
    try {
       return await this.commentRepository.findOne({where: {id:id}})
    } catch (error) {
      throw new NotFoundException()
    }
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    try {
      await this.commentRepository.update({id:id}, updateCommentDto)
      return updateCommentDto;
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async remove(id: string) {
    try {
      await this.commentRepository.softDelete(id)
      return (`Comment ${id} deleted`)
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
