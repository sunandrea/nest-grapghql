import { Injectable, NotFoundException } from '@nestjs/common';
import { Fruit } from './entity/fruit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFruitInput } from './dto/create-fruit.input';

@Injectable()
export class FruitsService {
  constructor(
    @InjectRepository(Fruit) private fruitRepository: Repository<Fruit>,
  ) {}

  async createFruit(dto: CreateFruitInput): Promise<Fruit> {
    const newFruit = this.fruitRepository.create(dto);
    return await this.fruitRepository.save(newFruit);
  }
  async findAll(): Promise<Fruit[]> {
    return await this.fruitRepository.find();
  }

  async findOne(id: number): Promise<Fruit> {
    const fruit = await this.fruitRepository.findOne({ where: { id: id } });
    if (!fruit) throw new NotFoundException('Fruit not found');
    return fruit;
  }

  async deletOne(id: number): Promise<Fruit> {
    const fruit = await this.findOne(id);
    await this.fruitRepository.delete(id);
    return fruit;
  }

  async updateOne(id: number, dto: CreateFruitInput): Promise<Fruit> {
    await this.findOne(id);
    await this.fruitRepository.update(id, dto);
    return await this.findOne(id);
  }
}
