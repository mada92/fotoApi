import { IsString, IsBoolean, IsDate, IsNotEmpty } from 'class-validator';

export class CreateAlbumDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsBoolean()
    @IsNotEmpty()
    readonly isActive: boolean;
}