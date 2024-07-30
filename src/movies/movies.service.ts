import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { ILike, Like, Repository } from 'typeorm';

@Injectable()
export class MoviesService {

  constructor(@InjectRepository(Movie)
    private readonly movieRepository : Repository<Movie>){}

  async create(createMovieDto: CreateMovieDto) {
    try { 
      return await this.movieRepository.save(createMovieDto)
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
      return await this.movieRepository.findOne({where:{id:id}, relations:["review", "gender"]});
    } catch (error) {
      throw new NotFoundException();
    }
  }
  
  async findByName(title: string){
  
    try {
      return await this.movieRepository.find({where:{title: ILike(`%${title}%`)}});
    } catch (error) {
      throw new BadRequestException()
    }
  }

  // async findByYear(year: number){
  //   try {
  //     return await this.movieRepository.find({where:{year:year}})
  //   } catch (error) {
  //     throw new BadRequestException()
  //   }
  // }


  async update(id: string, updateMovieDto: UpdateMovieDto) {
    try {
      await this.movieRepository.update({id:id}, updateMovieDto);
      return updateMovieDto;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async remove(id: string) {
    try {
      await this.movieRepository.softDelete(id)
      return (`Movie ${id} deleted`)
    } catch (error) {
      throw new BadRequestException()
    }
  }


  // para unificar los findby
  // params(key, value){

  // }
  
}
