import { IsString, IsUUID } from "class-validator";
import { Review } from "src/review/entities/review.entity";
import { User } from "src/users/entities/user.entity";

export class CreateCommentDto {

    @IsString()
    text:string;
     
    @IsUUID()
    review: Review;

    @IsUUID()
    user:User;
   
}
