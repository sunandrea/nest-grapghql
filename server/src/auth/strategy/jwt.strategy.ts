import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
// 	constructor(private readonly configService: ConfigService) {
// 		super({
// 			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// 			ignoreExpiration: false,
// 			secretOrKey: configService.get('JWT_SECRET'),
// 		});
// 	}

// 	async validate({ username }: Pick<User, 'username'>) {
// 		return { username };
// 	}
// }

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_SECRET'),
		});
	}

	async validate({ username, role }: Pick<User, 'username' | 'role'>) {
		console.log('qwe', username, role);
		return { username, role };
	}
}
