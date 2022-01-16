import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtpayload } from './jwt-payload.interface';
import { User } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UsersRepository) {
    super({
      secretOrKey: 'MYTOPSECRETHA',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: jwtpayload): Promise<User> {
    const { email } = payload;
    const user = this.userRepository.findOne({ email });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
