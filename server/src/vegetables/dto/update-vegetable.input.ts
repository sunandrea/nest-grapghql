import { CreateVegetableInput } from './create-vegetable.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVegetableInput extends PartialType(CreateVegetableInput) {
  @Field(() => Int)
  id: number;
}
