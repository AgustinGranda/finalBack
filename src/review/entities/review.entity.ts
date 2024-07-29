import { Comment } from "src/comments/entities/comment.entity";
import { Movie } from "src/movies/entities/movie.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text')
    description:string;

    @Column('int')
    calification:number;

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(()=> User, user=> user.review)
    user:User;

    @ManyToOne(() => Movie, movie => movie.review)
    movie:Movie;

    @OneToMany(()=> Comment , comment=> comment.review )
    comment:Comment;
}
