import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {

  constructor(@InjectRepository(Movie)
    private readonly movieRepository : Repository<Movie>){}

  async create(createMovieDto: CreateMovieDto) {
    try { 
      await this.movieRepository.save(createMovieDto)
      const respObj = {
        messege: `Movie ${createMovieDto.title} creted`,
        statusCode: 201
      }
      return respObj
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll() {
    try {
      return await this.movieRepository.find({relations:["gender"]});
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findOne(id: string) {
    try {
      return await this.movieRepository.findOne({where:{id:id}, relations:["reviews", "gender"]});
    } catch (error) {
      throw new NotFoundException();
    }
  }
  
  async findByKey( key, value){
    if(key == "title"){
      try {
        return await this.movieRepository.find({where:{title: ILike(`%${value}%`)}});
      } catch (error) {
        throw new BadRequestException()
      }
    }
    else if(key == "year"){
    try {
      return await this.movieRepository.find({where:{year: parseInt(value)}});
    } catch (error) {
      throw new BadRequestException()
    }
    }
    else if(key == "gender"){
      try {
        return await this.movieRepository.find({
          relations: ["gender"],
          where: {
            gender: {
              description: value
            }
          }
        });
      } catch (error) {
        throw new BadRequestException()
      }
    }
    throw new BadRequestException()
  }



  async update(id: string, updateMovieDto: UpdateMovieDto) {
    try {
      await this.movieRepository.update({id:id}, updateMovieDto);
      const respObj = {
        messege: `Movie ${id} updated`,
        statusCode: 201
      }
      return respObj
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async remove(id: string) {
    try {
      await this.movieRepository.softDelete(id)
      const respObj = {
        messege: `Movie ${id} removed`,
        statusCode: 201
      }
      return respObj
    } catch (error) {
      throw new BadRequestException()
    }
  }
  
}
