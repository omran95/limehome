import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HotelsController } from './presentation/controllers/Hotel';
import { HotelApplicationService } from './application/hotel/HotelApplicationService';
import { HttpModule } from '@nestjs/axios';
import { Here } from './infrastructure/maps/here';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './domain/Hotel';
import { Booking } from './domain/entities/Booking';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      entities: [Hotel, Booking],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Hotel]),
  ],
  controllers: [HotelsController],
  providers: [{ provide: 'IMaps', useClass: Here }, HotelApplicationService],
})
export class AppModule {}
