import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

@InputType()
export class CreateVegetableInput {
  @IsAlpha()
  @Field()
  name: string;
}
