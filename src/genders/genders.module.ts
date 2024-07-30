import { Module } from '@nestjs/common';
import { GendersService } from './genders.service';
import { GendersController } from './genders.controller';
import { Gender } from './entities/gender.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([Gender]),
  JwtModule.register({
    secret:'moviesadviters'})],
  controllers: [GendersController],
  providers: [GendersService],
})
export class GendersModule {}
