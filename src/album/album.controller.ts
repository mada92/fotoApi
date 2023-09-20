import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAlbumDto } from './dtos/create-album.dto';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController
{
    constructor(private albumService: AlbumService) {}

    @Post()
    async create(@Body() createAlbumDto: CreateAlbumDto) {
        return this.albumService.create(createAlbumDto);
    }

    @Get()
    findAll() {
        return this.albumService.findAll();
    }
}