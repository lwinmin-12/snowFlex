import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';


@Injectable()
export class MinioService {
  private s3: S3Client;
  private bucketName = process.env.S3_BANNER_BUCKET; // You can change bucket name

  constructor() {
    const accessKeyId = process.env.S3_ACCESS_KEY ?? '';
    const secretAccessKey = process.env.S3_SECRET_KEY ?? '';
    const region = process.env.S3_REGION ?? '';
    const endpoint = process.env.S3_ENDPOINT ?? '';

    if (!accessKeyId || !secretAccessKey || !region || !endpoint) {
      throw new Error('Missing required S3 environment variables');
    }

    this.s3 = new S3Client({
      region,
      endpoint,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      forcePathStyle: true, // Required for MinIO
    });
  }

  async uploadFile(file: Express.Multer.File) {
    const key = `${Date.now()}-${file.originalname}`;
    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );
    return `${process.env.S3_ENDPOINT}/${this.bucketName}/${key}`;
  }
}
