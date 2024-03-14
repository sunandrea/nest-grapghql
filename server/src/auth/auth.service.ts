import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { User } from 'src/users/entities/user.entity';
import { LoginUserInput } from './dto/login-user.input';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async register(dto: CreateUserInput): Promise<User> {
		const user = await this.usersService.createUser(dto);
		return user;
	}

	async validateUser(dto: LoginUserInput): Promise<{ username: string; role: string }> {
		const user = await this.usersService.findByUsername(dto.username);
		if (!user) throw new UnauthorizedException('Invalid credentials');

		const isCorrectPassword = await compare(dto.password, user.passwordHash);
		if (!isCorrectPassword) throw new UnauthorizedException('Invalid credentials');

		console.log(`123`, { username: user.username, role: user.role });

		return { username: user.username, role: user.role };
	}

	async login(user: { username: string; role: string }): Promise<string> {
		const payload = { username: user.username, role: user.role };
		return this.jwtService.sign(payload);
	}
}
