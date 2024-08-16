'use strict';

const  allowedDimension = [ { w: 400,h: 400}, { w: 800, h: 800 } ];

export const handler = async (event) => {
    const request = event.Records[0].cf.request;

    const urlParams = new URLSearchParams(request.querystring);

    if (urlParams.has('d') === false) {
        return request;
    }

    const dimensionMatch = urlParams.get('d').split('x');

    const width = dimensionMatch[0];
    const height = dimensionMatch[1];

    if (allowedDimension.filter(d => d.w == width && d.h == height).length === 0) {
        return request;
    }

    const parts = request.uri.split('/');
    const filename = parts.pop();

    const url = parts;
    url.push(width + 'x' + height);
    url.push(filename);
    
    request.uri = url.join('/');
    
    return request;
};
