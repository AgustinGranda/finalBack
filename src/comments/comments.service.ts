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
      await this.commentRepository.save(createCommentDto);
      const respObj = {
        messege: `Comment created`,
        statusCode: 201
      }
      return respObj
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

  // async update(id: string, updateCommentDto: UpdateCommentDto) {
  //   try {
  //     await this.commentRepository.update({id:id}, updateCommentDto)
  //     const respObj = {
  //       messege: `Comment ${id} updated`,
  //       statusCode: 201
  //     }
  //     return respObj
  //   } catch (error) {
  //     throw new BadRequestException()
  //   }
  // }

  // async remove(id: string) {
  //   try {
  //     await this.commentRepository.softDelete(id)
  //     const respObj = {
  //       messege: `Comment ${id} deleted`,
  //       statusCode: 201
  //     }
  //     return respObj
  //   } catch (error) {
  //     throw new BadRequestException()
  //   }
  // }
}
