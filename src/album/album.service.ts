import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './album.entity';
import { CreateAlbumDto } from './dtos/create-album.dto';

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(Album)
        private albumRepository: Repository<Album>,
    ) {}

    create(createAlbumDto: CreateAlbumDto): Promise<Album> {
        const albumEntity = new Album();
        albumEntity.title = createAlbumDto.title;
        albumEntity.password = createAlbumDto.password;
        albumEntity.isActive = createAlbumDto.isActive;

        const album = this.albumRepository.create(albumEntity);
        return this.albumRepository.save(album);
    }

    findAll(): Promise<Album[]> {
        return this.albumRepository.find();
    }
}