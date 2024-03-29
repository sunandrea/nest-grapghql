import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

@InputType()
export class CreateFruitInput {
  @IsAlpha()
  @Field()
  name: string;
}
