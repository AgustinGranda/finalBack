import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Review } from './entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([Review]),
  JwtModule.register({
    secret:'moviesadviters'})],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
