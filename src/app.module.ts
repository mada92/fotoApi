import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Module } from 'nestjs-s3';
import { S3Controller } from './s3/s3.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      autoLoadEntities: true,
      synchronize: true
    }),
    S3Module.forRoot({
      config: {
        credentials: {
          accessKeyId: '',
          secretAccessKey: '',
        },
        region: 'eu-central-1',
        endpoint: '',
        forcePathStyle: true
      },
    }),
    AlbumModule
  ],
  controllers: [AppController, S3Controller],
  providers: [AppService],
})
export class AppModule {}
