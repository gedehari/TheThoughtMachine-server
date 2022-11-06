import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('thoughts')
export class Thought {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column("text")
    author: string

    @Column("text")
    message: string

    @Column("date")
    createdAt: Date
}
