import { Module } from '@nestjs/common';
import { FruitsService } from './fruits.service';
import { FruitsResolver } from './fruits.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fruit } from './entity/fruit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fruit])],
  providers: [FruitsService, FruitsResolver],
})
export class FruitsModule {}
