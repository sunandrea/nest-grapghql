import { InputType, Field } from '@nestjs/graphql';
// import { UserRole } from '../enums/user-role.enum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: string;
}
