import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/users.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { propertyTypeDto } from './dto/propertyType.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { UpdateAdToSoldDto } from './dto/updateAdToSold.dto';
import { Property } from './properties.entity';
import { PropertyRepository } from './properties.repository';
import { status } from './property-status.enum';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(PropertyRepository)
    private propertyRepository: PropertyRepository,
    private cloudinaryService: CloudinaryService,
  ) {}

  async createAd(
    createAdDto: CreatePropertyDto,
    user: User,
    file: Express.Multer.File,
  ): Promise<Property> {
    let img_url: string | null;
    if (!file) {
      img_url = null;
    } else {
      let uploadToCloudinaryResponse = await this.cloudinaryService.uploadImage(
        file.path,
      );
      img_url = uploadToCloudinaryResponse.secure_url;
    }
    return this.propertyRepository.createProperty(createAdDto, user, img_url);
  }

  async updateAd(
    id: string,
    propertyDto: Partial<UpdatePropertyDto>,
    user: User,
    file: Express.Multer.File,
  ): Promise<Property> {
    let img_url: string | null;

    if (!file) {
      img_url = null;
    } else {
      let uploadToCloudinaryResponse = await this.cloudinaryService.uploadImage(
        file.path,
      );
      img_url = uploadToCloudinaryResponse.secure_url;
    }
    return this.propertyRepository.updateProperty(
      id,
      user,
      img_url,
      propertyDto,
    );
  }

  async updateAdtoSold(user: User, id: string): Promise<Property> {
    const property = await this.getSingleAd(id, user);
    return this.propertyRepository.save({
      ...property,
      status: status.SOLD,
    });
  }

  async deleteAd(id: string, user: User): Promise<void> {
    let deleted = await this.propertyRepository.delete({
      id: parseInt(id),
      owner: user,
    });

    if (deleted.affected === 0) {
      throw new NotFoundException(`Property with ${id} not found`);
    }
  }

  async getSingleAd(id: string, user: User) {
    const property = await this.propertyRepository.findOne({
      id: parseInt(id),
      owner: user,
    });

    if (!property) {
      throw new NotFoundException(`Property with id ${id} not found`);
    }

    return property;
  }

  async getAllAds(propertyDto: propertyTypeDto, user: User) {
    return this.propertyRepository.getAllProperties(propertyDto, user);
  }
}
