import {
  IsBoolean,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  first_name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  last_name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;

  @IsString()
  @MinLength(11)
  @MaxLength(14)
  phoneNumber: string;

  @IsString()
  @MinLength(7)
  @MaxLength(20)
  address: string;

  is_Admin: Boolean;
}
