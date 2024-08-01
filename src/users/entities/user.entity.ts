import { Comment } from "src/comments/entities/comment.entity";
import { Review } from "src/review/entities/review.entity";
import { Role } from "src/roles/entities/role.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text')
    name:string;

    @Column('text',{
        unique: true,
        select:false
      })
    email:string;

    @Column('text', {select: false})
    password:string;

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(()=> Role, rol => rol.user)
    rol:Role

    @OneToMany(() => Review, rev => rev.user)
    reviews: Review;

    @OneToMany(()=> Comment, comment=> comment.user)
    comment:Comment;
}
