import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { User } from 'src/users/entities/user.entity';
import { LoginUserInput } from './dto/login-user.input';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  async register(@Args('createUserInput') dto: CreateUserInput): Promise<User> {
    const user = await this.authService.register(dto);

    return user;
  }

  @Mutation(() => String)
  async login(@Args('loginUserInput') dto: LoginUserInput) {
    const username = await this.authService.validateUser(dto);
    return this.authService.login(username);
  }
}
