import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsUUID, Max, Min } from "class-validator";
import { Movie } from "src/movies/entities/movie.entity";
import { User } from "src/users/entities/user.entity";

export class CreateReviewDto {

    @ApiProperty({
        example: 'Short-comment-about-the-movie',
        required: true
     })
    @IsString()
    description: string;

    @ApiProperty({
        example: 4,
        required: true
     })
    @IsNumber()
    @Max(5)
    @Min(0)
    calification: number;

    @ApiProperty({
        example: 'id-of-the-user',
        required: true
     })
    @IsUUID()
    user: User;

    @ApiProperty({
        example: 'id-of-the-movie',
        required: true
     })
    @IsUUID()
    movie: Movie;

}
