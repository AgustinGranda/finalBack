import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, IsUUID } from "class-validator";
import { Role } from "src/roles/entities/role.entity";

export class CreateUserDto {

    @ApiProperty({
        example: 'name-of-the-user',
        required: true
     })
    @IsString()
    name:string;


    @ApiProperty({
        example: 'user@gmail.com',
        required: true
     })
    @IsEmail()
    email:string;

    @ApiProperty({
        example: 'very-strong-password',
        required: true
     })
    @IsString()
    password:string;

    @IsUUID()
    @IsOptional()
    rol: Role;
}
