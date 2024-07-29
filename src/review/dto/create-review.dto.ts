import { IsNumber, IsString, IsUUID } from "class-validator";
import { Movie } from "src/movies/entities/movie.entity";
import { User } from "src/users/entities/user.entity";

export class CreateReviewDto {

    @IsString()
    description: string;

    @IsNumber()
    calification: number;

    @IsUUID()
    user: User;

    @IsUUID()
    movie: Movie;

}
