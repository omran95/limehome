import { Module } from '@nestjs/common';
import { HotelsController } from './presentation/controllers/Hotel';
import { HotelApplicationService } from './application/hotel/HotelApplicationService';
import { HttpModule } from '@nestjs/axios';
import { Here } from './infrastructure/maps/here';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './domain/Hotel';
import { Booking } from './domain/entities/Booking';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'limehome',
      entities: [Hotel, Booking],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Hotel]),
  ],
  controllers: [HotelsController],
  providers: [{ provide: 'IMaps', useClass: Here }, HotelApplicationService],
})
export class AppModule {}
