'use strict';

const  allowedDimension = [ { w: 400,h: 400}, { w: 800, h: 800 } ];

function handler(event) {
  const request = event.request;

  if ('d' in request.querystring) {
    const dimensions = request.querystring.d.value.split('x');
    const queryWidth = dimensions[0];
    const queryHeight = dimensions[1];

    if (allowedDimension.filter(d => d.w == queryWidth && d.h == queryHeight).length === 0) {
      const response = {
        statusCode: 302,
        statusDescription: 'Found',
        headers: {
          location: {
            value: request.uri,
          },
        },
      };

      return response;
    }
    
    const path = '/generated/' + queryWidth + 'x' + queryHeight + request.uri;

    request.uri = path;
  }

  return request;
}
