import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateGenderDto {

        @ApiProperty({
                example: 'comedy',
                required: true
        })
        @IsString()
        description: string
}
