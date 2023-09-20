import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumService } from './album.service';
import { Album } from './album.entity';

describe('AlbumService', () => {
  let service: AlbumService;
  let repo: Repository<Album>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumService,
        { provide: getRepositoryToken(Album), useClass: Repository },
      ],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    repo = module.get<Repository<Album>>(getRepositoryToken(Album));
  });

  it('should create an album', async () => {
    const testAlbum = {title: 'Test Album', password: '1234', isActive: true, created: new Date(), modified: new Date()};
    jest.spyOn(repo, 'create').mockImplementation(() => testAlbum as Album);
    jest.spyOn(repo, 'save').mockImplementation(() => Promise.resolve(testAlbum as Album));

    expect(await service.create(testAlbum)).toEqual(testAlbum);
  });

  it('should return all albums', async () => {
    const testAlbums = [
      { id: 1, title: 'Test Album 1', password: '1234', isActive: true, created: new Date(), modified: new Date() },
      { id: 2, title: 'Test Album 2', password: '1234', isActive: true, created: new Date(), modified: new Date() }
    ];
    
    jest.spyOn(repo, 'find').mockResolvedValue(testAlbums);
    
    expect(await service.findAll()).toBe(testAlbums);
  });
});
