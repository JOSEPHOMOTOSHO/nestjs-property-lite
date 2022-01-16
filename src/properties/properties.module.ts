import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PropertiesController } from './properties.controller';
import { PropertyRepository } from './properties.repository';
import { PropertiesService } from './properties.service';

@Module({
  imports: [
    AuthModule,
    MulterModule.register({
      dest: './files',
    }),
    TypeOrmModule.forFeature([PropertyRepository]),
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService, CloudinaryService],
})
export class PropertiesModule {}
