'use strict';

import Sharp from 'sharp';
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client();

export const handler = async (event) => {
  const response = event.Records[0].cf.response;

   if (response.status === '404') {

    const request = event.Records[0].cf.request;
    const urlParams = new URLSearchParams(request.querystring);

    if (urlParams.has('d') === false && request.uri.startsWith('/generated/') === false) {
      return response;
    }

    const s3Bucket = request.headers.host[0].value.split('.')[0];

    const path = request.uri;

    const parts = path.substring(1).split('/');

    const filename = parts.pop();
    const format = filename.split('.').pop();
    const prefix = parts.shift();
    const [ width, height ] = parts.shift().split('x');
    const originalKey = parts.filter(value => value.trim().length > 0).concat(filename).join('/');

    const getObjectCommand = new GetObjectCommand({
      Bucket: s3Bucket,
      Key: originalKey,
    });

    const s3Response = await s3.send(getObjectCommand);

    const body = await s3Response.Body.transformToByteArray();

    const buffer = await Sharp(body).rotate().resize(parseInt(width), parseInt(height), { fit: Sharp.fit.inside }).toBuffer();

    const putObjectCommand = new PutObjectCommand({
      Bucket: s3Bucket,
      Key: path.substring(1),
      Body: buffer,
      ContentType: 'image/' + (format === 'jpg' ? 'jpeg' : format),
      CacheControl: 'max-age=31536000',
      Tagging: (new URLSearchParams({ type: 'thumbnail', source: 'Lambda' })).toString(),
    });

    await s3.send(putObjectCommand);

    response.status = 200;
    response.body = buffer.toString('base64');
    response.bodyEncoding = 'base64';
    response.headers['content-type'] = [{ key: 'Content-Type', value: 'image/' + (format === 'jpg' ? 'jpeg' : format) }];
    response.ContentLength = buffer.length;

    return response;
  } else {
    return response;
  }
};
