import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentiolDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentiolDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard()) //이 구문이 있어야 user 객체가 들어가게 된다.
  test(@Req() req, @GetUser() user: User) {
    console.log('=========test start===========');
    console.log(req.user);
    console.log(req.body);
     console.log(user);
    console.log('=========test end===========');
  }
}
