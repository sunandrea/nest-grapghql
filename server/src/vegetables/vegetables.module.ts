import { Module } from '@nestjs/common';
import { VegetablesService } from './vegetables.service';
import { VegetablesResolver } from './vegetables.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vegetable } from './entities/vegetable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vegetable])],
  providers: [VegetablesResolver, VegetablesService],
})
export class VegetablesModule {}
