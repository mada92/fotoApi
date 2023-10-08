import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { InjectS3, S3 } from 'nestjs-s3';
import type { Response } from 'express';

@Controller('s3')
export class S3Controller {
    constructor(
        @InjectS3() private readonly s3: S3,
    ) {}

    @Get('list/buckets')
    async listBuckets() {
        try {
            const list = await this.s3.listBuckets({});
            return list.Buckets;
        } catch (e) {
            console.log(e);
        }
    }

    @Get('list/buckets/:bucketId/files')
    async listFiles(@Param('bucketId') bucketId: string) {
        try {
            const files = await this.s3.listObjectsV2({Bucket: bucketId});

            return files.Contents;
        } catch (e) {
            console.log(e);
        }
    }

    @Get('list/buckets/:bucketId/files/:key')
    async downloadFile(
        @Param('bucketId') bucketId: string,
        @Param('key') key: string,
        @Res({ passthrough: true }) res: Response
    ) {
        const file = await this.s3.getObject({Bucket: 'demo-bucket', Key: key}),
            bodyStream = file.Body,
            bodyAsString = await bodyStream.transformToByteArray();

        res.set({
            'Content-Disposition': `attachment; filename="${key}"`,
        });

        return new StreamableFile(bodyAsString);
    }
}
