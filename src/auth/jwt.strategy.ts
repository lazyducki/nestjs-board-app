import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import * as config from 'config';

const jwtConfig = config.get('jwt');

/**
 * 요청이 왔을 경우 요청에 포함된 토큰고 함께 확인 하는 기능으로 추청된다.
 *
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      secretOrKey: process.env.JWT_SECRET || jwtConfig.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    }); //부모 컴포넌트 사용 위해
  }
  async validate(payload) {
    //토큰 안에 담긴 payload를 읽어 내어 정보를 가져온것임
    console.log('=====payload :', payload);
    const { username } = payload;
    const tempUser: User = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    //password 제외 해서 조회 하는 기능 필요
    const user = {
      id: tempUser.id,
      username: tempUser.username,
    };
    return user;
  }
}
