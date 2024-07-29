import { User } from "src/users/entities/user.entity";
import {Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        unique: true
      })
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(()=> User, user => user.rol)
    user:User;
}
