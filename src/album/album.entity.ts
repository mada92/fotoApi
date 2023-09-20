import { Entity, Column, PrimaryGeneratedColumn  } from 'typeorm';

@Entity()
export class Album {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    password: string;

    @Column({default: true})
    isActive: boolean;

    @Column()
    created: Date = new Date();

    @Column()
    modified: Date = new Date();
}