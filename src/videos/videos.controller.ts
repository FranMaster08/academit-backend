import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.fieldname +
              '-' +
              uniqueSuffix +
              '.' +
              file.originalname.split('.').pop(),
          );
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(mp4|avi|wmv)$/)) {
          return cb(new Error('Only video files are allowed'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 100000000, // 100 MB
      },
    }),
  )
  async uploadVideo(@UploadedFile() file) {
    // procesar el archivo de video subido aquí
    console.log(file);
    return file;
  }

  @Get()
  getVideos() {
    return this.videosService.getListVideos();
  }
}
