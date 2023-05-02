import APIError from '../errors/APIError';
import logger from '../logger';

class SettingsController {
  constructor(
    protected userRepository: Repositories.UserRepository,
    protected settingRepository: Repositories.SettingRepository,
  ) {}

  public async getEmailSettings(email: string, user: User): Promise<any> {
    if (typeof user === 'undefined') {
      throw new APIError({ message: 'Unauthorized!', code: 401 });
    }
  
    if (user.email !== email/* && user.role !== 'server'*/) {
      throw new APIError({ message: 'Not authorized to read data!', code: 401 });
    }

    const settings = await this.settingRepository.find({
      user: {
        id: user.id,
      },
      type: 'email',
    });

    return {
      email: email,
      notifications: settings.map((setting) => {
        return {
          notification: setting.notification,
          isEnabled: Boolean(setting.isEnabled),
        }
      }),
    };
  }

  public async getSettings(user: User, type: string): Promise<Setting[]> {
    logger.debug(`${this.constructor.name}.getSettings`, { user, type });

    if (typeof user === 'undefined') {
      throw new APIError({ message: 'Unauthorized!', code: 401 });
    }

    const users = await this.userRepository.find({
      id: user.id,
      email: user.email,
    });

    if (users.length === 0) {
      throw new APIError({ message: 'User not found!', code: 404 });
    }

    const settings = await this.settingRepository.find({
      user: {
        id: user.id,
        email: user.email,
      },
      type,
    });

    return settings;
  }

  public async setEmailSettings(email: string, settings: any, user: User): Promise<any> {
    if (typeof user === 'undefined') {
      throw new APIError({ message: 'Unauthorized!', code: 401 });
    }
  
    if (user.email !== email/* && user.role !== 'server'*/) {
      throw new APIError({ message: 'Not authorized to read data!', code: 401 });
    }

    
  
    for (const setting of settings) {
      const emailSettings = await this.settingRepository.find({
        
        notification: setting.notification,
        type: 'email',
      });
  
      if (emailSettings.length === 0) {
        await this.settingRepository.create({
          userId: 0,
          type: 'email',
          notification: setting.notification,
          isEnabled: setting.isEnabled,
        });
      } else {
        await this.settingRepository.update({
          type: 'email',
          notification: setting.notification,
          isEnabled: setting.isEnabled,
        }, {
          user: {
            id: 0,
          },
        });
      }
    }
  
    return this.getEmailSettings(email, user);
  }

  public async setSettings(user: User, type: string, settings: any): Promise<any> {
    if (typeof user === 'undefined') {
      throw new APIError({ message: 'Unauthorized!', code: 401 });
    }

    const users = await this.userRepository.find({
      id: user.id,
      email: user.email,
    });

    if (users.length === 0) {
      throw new APIError({ message: 'User not found!', code: 404 });
    }
    
    const localUser = users.shift();
  
    for (const setting of settings) {
      const emailSettings = await this.settingRepository.find({
        user: {
          id: user.id,
          email: user.email,
        },
        notification: setting.notification,
        type,
      });
  
      if (emailSettings.length === 0) {
        await this.settingRepository.create({
          userId: 0,
          type,
          notification: setting.notification,
          isEnabled: setting.isEnabled,
        });
      } else {
        await this.settingRepository.update({
          type,
          notification: setting.notification,
          isEnabled: setting.isEnabled,
        }, {
          user: {
            id: 0,
          },
        });
      }
    }
  
    return this.getSettings(user, type);
  }
}

export default SettingsController;
