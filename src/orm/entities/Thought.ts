import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('thoughts')
export class Thought {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'text', nullable: false})
    author: string

    @Column({type: 'text', nullable: false})
    message: string

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date
}
