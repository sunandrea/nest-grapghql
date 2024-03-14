import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
	imports: [
		ConfigModule,
		UsersModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				return {
					secret: configService.get('JWT_SECRET'),
				};
			},
		}),
		PassportModule,
	],
	providers: [AuthService, AuthResolver, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
