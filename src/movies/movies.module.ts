import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movie } from './entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([Movie]),
  JwtModule.register({
    secret:'moviesadviters'})],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
