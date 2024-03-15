import { Resolver, Query, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { nullable: true })
  async user(@Args('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Query(() => [User])
  async users() {
    return this.usersService.findAllUsers();
  }
}
