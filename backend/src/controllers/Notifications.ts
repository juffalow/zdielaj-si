import { BadRequestError } from '../errors/APIError';
import logger from '../logger';

class NotificationsController {
  constructor(
    protected notificationsService: Services.Notifications,
  ) {}

  /**
   * 
   * @param email 
   * @param token 
   * @returns 
   */
  public async getSettings(email: string, token: string): Promise<unknown> {
    try {
      const response = await this.notificationsService.getSettings(email,token);
  
      return response;
    } catch (error) {
      logger.error('Cannot get email notification settings!', {error});

      throw new BadRequestError('Cannot get email notification settings!', 400);
    }
  }

  /**
   * 
   * @param user 
   * @returns 
   */
  public async updateSettings(settings: object, token: string): Promise<unknown> {  
    try {
      const response = await this.notificationsService.setSettings(settings as any, token);
  
      return response;
    } catch (error) {
      logger.error('Cannot set notification settings!', {error});

      throw new BadRequestError('Cannot set notifications settings!', 400);
    }
  }
}

export default NotificationsController;
