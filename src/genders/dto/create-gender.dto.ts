import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";
import { Movie } from "src/movies/entities/movie.entity";

export class CreateGenderDto {

        @ApiProperty({
                example: 'comedy',
                required: true
             })
        @IsString()
        description:string
}
