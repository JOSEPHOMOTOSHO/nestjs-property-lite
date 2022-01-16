import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/users.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { propertyTypeDto } from './dto/propertyType.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { UpdateAdToSoldDto } from './dto/updateAdToSold.dto';
import { imageFileFilter } from './file-upload.utils';
import { Property } from './properties.entity';
import { PropertiesService } from './properties.service';

@UseGuards(AuthGuard())
@Controller('properties')
export class PropertiesController {
  constructor(private propertyService: PropertiesService) {}

  @Post('/property')
  @UseInterceptors(
    FileInterceptor('image_url', {
      storage: diskStorage({}),
      fileFilter: imageFileFilter,
    }),
  )
  createAd(
    @UploadedFile() file,
    @Body() createAdDto: CreatePropertyDto,
    @GetUser() user: User,
  ): Promise<Property> {
    return this.propertyService.createAd(createAdDto, user, file);
  }

  @Patch('/property/:id')
  @UseInterceptors(
    FileInterceptor('image_url', {
      storage: diskStorage({}),
      fileFilter: imageFileFilter,
    }),
  )
  updateAd(
    @Param('id') id: string,
    @Body() updateAdDto: Partial<UpdatePropertyDto>,
    @GetUser() user: User,
    @UploadedFile() file,
  ): Promise<Property> {
    return this.propertyService.updateAd(id, updateAdDto, user, file);
  }

  @Patch('/property/:id/sold')
  updateAdtoSold(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<Property> {
    return this.propertyService.updateAdtoSold(user, id);
  }

  @Delete('/property/:id')
  deleteAd(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.propertyService.deleteAd(id, user);
  }

  @Get('/property/:id')
  getSingleAd(@Param('id') id: string, @GetUser() user: User) {
    return this.propertyService.getSingleAd(id, user);
  }

  @Get()
  getAllAds(@Query() propertyDto: propertyTypeDto, @GetUser() user: User) {
    return this.propertyService.getAllAds(propertyDto, user);
  }
}
