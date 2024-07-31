import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRoleDto {

    @ApiProperty({
        example: 'the-name-of-the-role',
        required: true
     })
    @IsString()
    description: string;
}
