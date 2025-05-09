import { getSignedUrl as getCloudFrontSignedUrl } from '@aws-sdk/cloudfront-signer';
import config from './config.mjs';

export function getURL(path) {
    return `${config.CLOUD_FRONT_URL}/${path}`;
}

export function getSignedURL(path) {
    return getCloudFrontSignedUrl({
        url: `${config.CLOUD_FRONT_URL}/${path}`,
        keyPairId: config.CLOUD_FRONT_KEY_PAIR_ID,
        privateKey: config.CLOUD_FRONT_PRIVATE_KEY.split(String.raw`\n`).join('\n'),
        dateLessThan: (new Date(new Date().getTime() + 24 * 60 * 60 * 1000)).toISOString().split('T').shift(),
    });
}
