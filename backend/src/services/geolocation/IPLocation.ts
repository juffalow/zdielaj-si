import logger from '../../logger';

class IPLocation implements Services.Geolocation {
  public async getLocation(ip: string): Promise<{ city: string, country: string }> {
    const data = new URLSearchParams();
    data.append('ip', ip);

    return fetch('https://iplocation.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: data.toString(),
    }).then(response => response.json()).then((response: any) => {
      return {
        city: response.city,
        country: response.country_name,
      };
    }).catch(err => {
      logger.error('Cannot retrieve IP location!', { error: err.message });
      return {
        city: '-',
        country: '-',
      };
    });
  }
}

export default IPLocation;
