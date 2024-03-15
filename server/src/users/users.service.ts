import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    if (!user) return null;
    return user;
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(dto: CreateUserInput) {
    const existingUser = await this.findByUsername(dto.username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const user = new User();
    user.username = dto.username;
    user.role = dto.role;
    user.passwordHash = await bcrypt.hash(dto.password, 10);

    return this.userRepository.save(user);
  }
}
