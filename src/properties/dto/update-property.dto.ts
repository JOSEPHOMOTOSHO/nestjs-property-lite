import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { status } from '../property-status.enum';

export class UpdatePropertyDto {
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

  @IsEnum(status)
  status: status;

  image_url: string;
}
