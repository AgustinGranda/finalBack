import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([Role]),
  JwtModule.register({
    secret:'moviesadviters'})],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
