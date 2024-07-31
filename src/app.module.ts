import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { RolesModule } from './roles/roles.module';
import { GendersModule } from './genders/genders.module';
import { ReviewModule } from './review/review.module';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORM } from './common/config.data';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORM()),UsersModule, MoviesModule, RolesModule, GendersModule, ReviewModule, CommentsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
