import { IsNumber, IsString, IsUUID, Max, Min } from "class-validator";
import { Movie } from "src/movies/entities/movie.entity";
import { User } from "src/users/entities/user.entity";

export class CreateReviewDto {

    @IsString()
    description: string;

    @IsNumber()
    @Max(5)
    @Min(0)
    calification: number;

    @IsUUID()
    user: User;

    @IsUUID()
    movie: Movie;

}
