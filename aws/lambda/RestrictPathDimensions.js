'use strict';

const  allowedDimension = [ { w: 400,h: 400}, { w: 800, h: 800 } ];

function handler(event) {
  const request = event.request;

  if (request.uri.startsWith('/generated/')) {
    const parts = request.uri.substring(11).split('/');
    const dimensions = parts.shift().split('x');
    const pathWidth = dimensions[0];
    const pathHeight = dimensions[1];

    if (allowedDimension.filter(d => d.w == pathWidth && d.h == pathHeight).length === 0) {
      const originalKey = parts.filter(value => value.trim().length > 0).join('/');

      const response = {
        statusCode: 302,
        statusDescription: 'Found',
        headers: {
          location: {
            value: '/' + originalKey,
          },
        },
      };

      return response;
    }
  }

  return request;
}
