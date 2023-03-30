import { ServeStaticModule } from '@nestjs/serve-static';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideosModule } from './videos/videos.module';
import { join } from 'path';

@Module({
  imports: [
    VideosModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/video-server',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
