import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/create-user.dto';
import { signInCredentialsDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() creatueUserDto: AuthCredentialsDto): Promise<void> {
    return this.authService.SignUp(creatueUserDto);
  }

  @Post('/signin')
  signIn(
    @Body() UserSignInDto: signInCredentialsDto,
  ): Promise<{ accessToken }> {
    return this.authService.signIn(UserSignInDto);
  }
}
