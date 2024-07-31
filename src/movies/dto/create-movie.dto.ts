import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsUUID } from "class-validator";
import { Gender } from "src/genders/entities/gender.entity";

export class CreateMovieDto {

    @ApiProperty({
        example: 'Pirates-of-the-caribean',
        required: true
     })
    @IsString()
    title: string;

    @ApiProperty({
        example: 'A-movie-about-pirates',
        required: true
     })
    @IsString()
    description:string;
    
    @ApiProperty({
        example: 2023,
        required: true
     })
    @IsNumber()
    year:number;

    @ApiProperty({
        example: 'url-of-movie-picture',
        required: true
     })
    @IsString()
    image: string;

    @ApiProperty({
        example: 'id-of-the-movie-gender',
        required: true
     })
    @IsUUID()
    gender: Gender;

}
