import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/auth/users.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { propertyTypeDto } from './dto/propertyType.dto';
import { Property } from './properties.entity';
import { status } from './property-status.enum';

@EntityRepository(Property)
export class PropertyRepository extends Repository<Property> {
  async getAllProperties(propertyDto: propertyTypeDto, user: User) {
    const { type } = propertyDto;
    const query = this.createQueryBuilder('property');
    query.where({ owner: user });

    if (type) {
      query.andWhere('property.type = :type', { type });
    }
    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (err: any) {
      throw new NotFoundException();
    }

    // try {

    // } catch (error: any) {
    //   this.logger.error(
    //     `The user ${
    //       user.username
    //     } is trying to get all tasks with ${JSON.stringify(filterDto)} `,
    //     error.stack,
    //   );
    //   throw new InternalServerErrorException();
    // }
  }

  async createProperty(
    createProperty: CreatePropertyDto,
    owner: User,
    img_url: string,
  ): Promise<Property> {
    const { price, state, city, address, type, image_url } = createProperty;
    const newProperty = await this.create({
      status: status.AVAILABLE,
      price,
      state,
      city,
      address,
      type,
      image_url: img_url,
      owner,
    });
    await this.save(newProperty);
    return newProperty;
  }

  async updateProperty(
    property_id: string,
    user: User,
    img_url: string,
    updateProperty: Partial<Property>,
  ) {
    let property = await this.findOne({
      id: parseInt(property_id),
      owner: user,
    });

    if (!property) {
      throw new NotFoundException("Property doesn't exist");
    }

    let { price, state, city, address, type, status } = updateProperty;

    let image_url = img_url;
    price = price || property.price;
    state = state || property.state;
    city = city || property.city;
    address = address || property.address;
    type = type || property.type;
    image_url = image_url || property.image_url;
    status = status || property.status;

    const PropertyUpdate = this.update(
      { id: property.id },
      {
        price,
        state,
        city,
        address,
        type,
        status,
        image_url,
      },
    ).then((response) => response.raw[0]);
    return PropertyUpdate;
  }
}
