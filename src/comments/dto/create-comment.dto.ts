import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";
import { Review } from "src/review/entities/review.entity";
import { User } from "src/users/entities/user.entity";

export class CreateCommentDto {

    @ApiProperty({
        example: 'respectful comment',
        required: true
     })
    @IsString()
    text:string;
     
    @ApiProperty({
        example: 'id-of-review',
        required: true
     })
    @IsUUID()
    review: Review;

    @ApiProperty({
        example: 'id-of-user',
        required: true
     })
    @IsUUID()
    user:User;
   
}
