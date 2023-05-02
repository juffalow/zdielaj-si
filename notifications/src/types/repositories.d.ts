declare namespace Repositories {
  namespace SettingRepository {
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

    interface UpdateParameters {
      type: string;
      notification: string;
      isEnabled: boolean;
    }
  }

  interface SettingRepository {
    get(id: number): Promise<Setting>;
    
    create(params: SettingRepository.CreateParameters): Promise<Setting>;

    find(params: SettingRepository.FindParameters): Promise<Setting[]>;

    update(params: SettingRepository.UpdateParameters, where: { user: { id: number } }): Promise<Setting>;
  }

  namespace UserChannelRepository {
    interface CreateParameters {
      userId: number;
      type: string;
      meta: unknown;
      isEnabled: boolean;
    }

    interface FindParameters {
      id?: number;
      user?: {
        id: number;
      };
      type?: string;
      meta?: {
        [x: string]: unknown;
      };
      isEnabled?: boolean;
    }

    interface UpdateParameters {
      meta?: unknown;
      isEnabled?: boolean;
    }
  }

  interface UserChannelRepository {
    get(id: number): Promise<UserChannel>;
  
    create(params: UserChannelRepository.CreateParameters): Promise<UserChannel>;

    find(params: UserChannelRepository.FindParameters): Promise<UserChannel[]>

    update(params: UserChannelRepository.UpdateParameters, where: { id: number } | { userId: number, type: string }): Promise<UserChannel>;
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