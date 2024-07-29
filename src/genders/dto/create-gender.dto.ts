import { IsString, IsUUID } from "class-validator";
import { Movie } from "src/movies/entities/movie.entity";

export class CreateGenderDto {

        @IsString()
        description:string
}
