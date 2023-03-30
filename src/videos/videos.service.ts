import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import * as fs from 'fs';
import { join } from 'path';
@Injectable()
export class VideosService {
  create(createVideoDto: CreateVideoDto) {
    return 'This action adds a new video';
  }

  findAll() {
    return `This action returns all videos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }

  getListVideos() {
    const videoFolder = join(__dirname, '../../uploads');
    const files = fs.readdirSync(videoFolder);
    const videos = files.filter((file) => file.endsWith('.mp4'));
    return { videos };
  }
}
