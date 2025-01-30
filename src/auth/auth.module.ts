import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    //유저를 인증하기 위해 사용할 기본 strategy를 명시해 주기
    PassportModule.register({ defaultStrategy: 'jwt' }),
    //jwt 인증 부분을 담당, 그리고 주로 sign()을 위한 부분이다.
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  //JwtStrategy를 이 Auth 모듈에서 사용할 수 있게 등록
  providers: [AuthService, UserRepository, JwtStrategy],
  //JwtStrategy, PassportModule을 다른 모듈에서 사용할 수 있게 등록
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
