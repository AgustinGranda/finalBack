import { Review } from "src/review/entities/review.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text')
    text: string;

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(()=> Review, review => review.comments)
    review:Review;

    @ManyToOne(() => User, user=> user.comment)
    user:User;

}
