declare namespace Repositories {
  namespace UserNotificationSettingRepository {
    interface CreateParameters {
      userId: number;
      notification: string;
      type: string;
      isEnabled: boolean;
    }

    interface FindParameters {
      user?: {
        id?: number;
        email?: string;
      };
      type?: string;
      notification?: string;
      isEnabled?: boolean;
      createdAt? : {
        from?: string;
        to?: string;
      };
    }
  }

  interface UserNotificationSettingRepository {
    get(id: number): Promise<UserNotificationSetting>;
    
    create(params: UserNotificationSettingRepository.CreateParameters): Promise<UserNotificationSetting>;

    find(params: UserNotificationSettingRepository.FindParameters): Promise<UserNotificationSetting[]>;
  }

  namespace UserRepository {
    interface CreateParameters {
      email: string;
      isDeliverable?: boolean;
      meta?: unknown;
    }

    interface FindParameters {
      email: string;
    }

    interface UpdateParameters {
      isDeliverable: boolean;
      meta: unknown;
    }
  }

  interface UserRepository {
    get(id: number): Promise<User>;
  
    create(params: UserRepository.CreateParameters): Promise<User>;

    find(params: UserRepository.FindParameters): Promise<User[]>

    update(params: UserRepository.UpdateParameters, where: { id: number }): Promise<User>;
  }

  namespace NotificationRepository {
    interface CreateParameters {
      userId: number;
      type: string;
      subject: string;
      body: string;
      meta?: unknown;
      status: string;
    }
    
    interface FindParameters {
      user?: {
        id?: number;
        email?: string;
      };
      type?: string;
      subject?: string;
      status?: string;
      createdAt? : {
        from?: string;
        to?: string;
      };
    }
    
    interface CountParameters {
      user?: {
        id?: number;
        email?: string;
      };
      type?: string;
      subject?: string;
      status?: string;
      createdAt? : {
        from?: string;
        to?: string;
      };
    }
  }

  interface NotificationRepository {
    get(id: number): Promise<UserNotification>;
  
    create(params: NotificationRepository.CreateParameters): Promise<UserNotification>;
  
    find(params: NotificationRepository.FindParameters): Promise<UserNotification[]>;
  
    count(params: NotificationRepository.CountParameters): Promise<number>;
  }
}