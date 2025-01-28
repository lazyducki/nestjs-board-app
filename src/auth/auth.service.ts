import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.craeteUser(authCredentialDto);
  }

  signIn(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.userRepository.signIn(authCredentialDto);
  }
}
