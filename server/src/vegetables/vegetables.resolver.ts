import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VegetablesService } from './vegetables.service';
import { Vegetable } from './entities/vegetable.entity';
import { CreateVegetableInput } from './dto/create-vegetable.input';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Resolver(() => Vegetable)
export class VegetablesResolver {
  constructor(private readonly vegetablesService: VegetablesService) {}

  @Mutation(() => Vegetable)
  @Roles('VegetarianMary', 'Admin', 'FruitJohn')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createVegetable(
    @Args('createVegetableInput') createVegetableInput: CreateVegetableInput,
  ): Promise<Vegetable> {
    return await this.vegetablesService.create(createVegetableInput);
  }

  @Query(() => [Vegetable])
  @Roles('VegetarianMary', 'Admin', 'FruitJohn')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getVegetables(): Promise<Vegetable[]> {
    return await this.vegetablesService.findAll();
  }

  @Query(() => Vegetable)
  @Roles('VegetarianMary', 'Admin', 'FruitJohn')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getVegetable(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Vegetable> {
    return await this.vegetablesService.findOne(id);
  }

  @Mutation(() => Vegetable)
  @Roles('VegetarianMary', 'Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateVegetable(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateVegetableInput') updateVegetableInput: CreateVegetableInput,
  ) {
    return await this.vegetablesService.updateOne(id, updateVegetableInput);
  }

  @Mutation(() => Vegetable)
  @Roles('VegetarianMary', 'Admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteVegetable(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Vegetable> {
    return await this.vegetablesService.deleteOne(id);
  }
}
