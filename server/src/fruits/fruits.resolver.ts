import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FruitsService } from './fruits.service';
import { Fruit } from './entity/fruit.entity';
import { CreateFruitInput } from './dto/create-fruit.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Resolver(() => Fruit)
export class FruitsResolver {
  constructor(private fruitService: FruitsService) {}
  @Query(() => Fruit)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VegetarianMary', 'Admin', 'FruitJohn')
  async getFruit(@Args('id', { type: () => Int }) id: number): Promise<Fruit> {
    return await this.fruitService.findOne(id);
  }

  @Query(() => [Fruit])
  @Roles('VegetarianMary', 'Admin', 'FruitJohn')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getFruits(): Promise<Fruit[]> {
    return await this.fruitService.findAll();
  }

  @Mutation(() => Fruit)
  @Roles('VegetarianMary', 'Admin', 'FruitJohn')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createFruit(
    @Args('createFruitInput') dto: CreateFruitInput,
  ): Promise<Fruit> {
    return await this.fruitService.createFruit(dto);
  }

  @Mutation(() => Fruit)
  @Roles('Admin', 'FruitJohn')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteFruit(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Fruit> {
    return await this.fruitService.deletOne(id);
  }

  @Mutation(() => Fruit)
  @Roles('Admin', 'FruitJohn')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateFruit(
    @Args('id', { type: () => Int }) id: number,
    @Args('createFruitInput') dto: CreateFruitInput,
  ): Promise<Fruit> {
    return await this.fruitService.updateOne(id, dto);
  }
}
