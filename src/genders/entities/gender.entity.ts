import { Movie } from "src/movies/entities/movie.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Gender {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text',{unique:true})
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(()=> Movie, movie=> movie.gender)
    movies:Movie;

}
