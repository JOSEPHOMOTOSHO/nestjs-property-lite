import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { status } from '../property-status.enum';

export class UpdateAdToSoldDto {
  @IsEnum(status)
  status: status;
}
