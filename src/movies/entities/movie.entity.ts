import { Gender } from "src/genders/entities/gender.entity";
import { Review } from "src/review/entities/review.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movie {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text')
    title:string;

    @Column('text')
    description:string

    @Column('int')
    year:number;

    @Column('text')
    image: string;

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(()=> Review, review => review.movie)
    review:Review;

    @ManyToOne(() => Gender, gender => gender.movie)
    gender: Gender;

}
