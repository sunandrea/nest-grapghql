import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../enums/user-role.enum';

@Entity()
@ObjectType()
export class User {
	@PrimaryGeneratedColumn()
	@Field(() => Int)
	id: number;

	@Field()
	@Column({ unique: true })
	username: string;

	@Field(() => String)
	@Column({
		type: 'text',
		enum: UserRole,
		default: UserRole.FruitJohn,
	})
	role: string;
	@Field()
	@Column()
	passwordHash: string;
}
