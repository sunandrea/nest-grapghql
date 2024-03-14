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
	createVegetable(
		@Args('createVegetableInput') createVegetableInput: CreateVegetableInput,
	): Promise<Vegetable> {
		return this.vegetablesService.create(createVegetableInput);
	}

	@Query(() => [Vegetable])
	@Roles('VegetarianMary', 'Admin', 'FruitJohn')
	@UseGuards(JwtAuthGuard, RolesGuard)
	getVegetables() {
		return this.vegetablesService.findAll();
	}

	@Query(() => Vegetable)
	@Roles('VegetarianMary', 'Admin', 'FruitJohn')
	@UseGuards(JwtAuthGuard, RolesGuard)
	getVegetable(@Args('id', { type: () => Int }) id: number) {
		return this.vegetablesService.findOne(id);
	}

	@Mutation(() => Vegetable)
	@Roles('VegetarianMary', 'Admin')
	@UseGuards(JwtAuthGuard, RolesGuard)
	updateVegetable(
		@Args('id', { type: () => Int }) id: number,
		@Args('updateVegetableInput') updateVegetableInput: CreateVegetableInput,
	) {
		return this.vegetablesService.updateOne(id, updateVegetableInput);
	}

	@Mutation(() => Vegetable)
	@Roles('VegetarianMary', 'Admin')
	@UseGuards(JwtAuthGuard, RolesGuard)
	deleteVegetable(@Args('id', { type: () => Int }) id: number) {
		return this.vegetablesService.deleteOne(id);
	}
}
