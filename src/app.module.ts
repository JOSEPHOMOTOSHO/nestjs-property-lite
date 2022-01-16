import { Module } from '@nestjs/common';
import { PropertiesModule } from './properties/properties.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConnectionOptions, DatabaseType } from 'typeorm';

const dataBaseType: any = process.env.TYPE;

@Module({
  imports: [
    PropertiesModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: dataBaseType,
      host: process.env.HOST,
      port: +process.env.PORT,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CloudinaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
