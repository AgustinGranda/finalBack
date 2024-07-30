import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([User, Role]),
  JwtModule.register({
    secret:'moviesadviters'})],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
