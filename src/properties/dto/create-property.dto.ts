import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePropertyDto {
  @IsNotEmpty()
  price: number;

  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsString()
  address: string;

  @IsString()
  type: string;

  image_url: string;
}
