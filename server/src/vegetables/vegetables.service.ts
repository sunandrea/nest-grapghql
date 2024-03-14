import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVegetableInput } from './dto/create-vegetable.input';
// import { UpdateVegetableInput } from './dto/update-vegetable.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Vegetable } from './entities/vegetable.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VegetablesService {
	constructor(@InjectRepository(Vegetable) private vegetableRepository: Repository<Vegetable>) {}

	async findOne(id: number): Promise<Vegetable> {
		const vegetable = await this.vegetableRepository.findOne({ where: { id: id } });
		if (!vegetable) throw new NotFoundException('Vegetable not found');
		return vegetable;
	}

	async create(dto: CreateVegetableInput): Promise<Vegetable> {
		const newVegetable = this.vegetableRepository.create(dto);
		return this.vegetableRepository.save(newVegetable);
	}

	async findAll(): Promise<Vegetable[]> {
		return this.vegetableRepository.find();
	}

	async deleteOne(id: number): Promise<Vegetable> {
		const vegetable = await this.findOne(id);
		await this.vegetableRepository.delete(id);
		return vegetable;
	}

	async updateOne(id: number, dto: CreateVegetableInput): Promise<Vegetable> {
		await this.findOne(id);
		await this.vegetableRepository.update(id, dto);
		return this.findOne(id);
	}
}
