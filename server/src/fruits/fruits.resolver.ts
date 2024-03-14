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
	getFruit(@Args('id', { type: () => Int }) id: number): Promise<Fruit> {
		return this.fruitService.findOne(id);
	}

	@Query(() => [Fruit])
	@Roles('VegetarianMary', 'Admin', 'FruitJohn')
	@UseGuards(JwtAuthGuard, RolesGuard)
	getFruits(): Promise<Fruit[]> {
		return this.fruitService.findAll();
	}

	@Mutation(() => Fruit)
	@Roles('VegetarianMary', 'Admin', 'FruitJohn')
	@UseGuards(JwtAuthGuard, RolesGuard)
	createFruit(@Args('createFruitInput') dto: CreateFruitInput): Promise<Fruit> {
		return this.fruitService.createFruit(dto);
	}

	@Mutation(() => Fruit)
	@Roles('Admin', 'FruitJohn')
	@UseGuards(JwtAuthGuard, RolesGuard)
	deleteFruit(@Args('id', { type: () => Int }) id: number): Promise<Fruit> {
		return this.fruitService.deletOne(id);
	}

	@Mutation(() => Fruit)
	@Roles('Admin', 'FruitJohn')
	@UseGuards(JwtAuthGuard, RolesGuard)
	updateFruit(
		@Args('id', { type: () => Int }) id: number,
		@Args('createFruitInput') dto: CreateFruitInput,
	): Promise<Fruit> {
		return this.fruitService.updateOne(id, dto);
	}
}
