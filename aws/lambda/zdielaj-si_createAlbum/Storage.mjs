import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import config from './config.mjs';

const s3Client = new S3Client({
    region: 'eu-central-1',
});

export async function getPresignedUrl(params, tags) {
    const command = new PutObjectCommand({
        ACL: 'private',
        Bucket: config.S3_BUCKET,
        Key: params.Key,
        Tagging: (new URLSearchParams(tags)).toString(),
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    return url;
}
