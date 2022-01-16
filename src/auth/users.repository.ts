import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/create-user.dto';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(createUserDto: AuthCredentialsDto): Promise<void> {
    const {
      email,
      first_name,
      last_name,
      password,
      phoneNumber,
      address,
      is_Admin,
    } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    let createdUser = await this.create({
      email,
      first_name,
      last_name,
      password: hashedPassword,
      phoneNumber,
      address,
      is_Admin,
    });
    try {
      await this.save(createdUser);
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException('Email already Exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
