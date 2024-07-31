import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class SignInDto {

    @ApiProperty({
        example: 'example@gmail.com',
        required: true
     })
    @IsEmail()
    email:string;

    @ApiProperty({
        example: 'very-strong-password',
        required: true
     })
    @IsString()
    password: string;
}
