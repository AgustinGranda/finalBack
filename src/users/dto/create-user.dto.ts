import { IsEmail, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { Role } from "src/roles/entities/role.entity";

export class CreateUserDto {

    @IsString()
    name:string;

    @IsEmail()
    email:string;

    @IsString()
    password:string;

    @IsUUID()
    @IsOptional()
    rol: Role;
}
