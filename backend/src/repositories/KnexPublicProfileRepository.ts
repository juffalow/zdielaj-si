import { Knex } from 'knex';
import logger from '../logger';
import { shouldFilterBy } from '../utils/functions';

class KnexPublicProfileRepository implements PublicProfileRepository {
  constructor(
    protected database: Knex
  ) {}

  public async get(id: ID): Promise<PublicProfile> {
    logger.debug(`${this.constructor.name}.get`, { id });

    return this.database.select()
      .from('public_profile')
      .where('id', id)
      .first();
  }

  public async create(params: PublicProfileRepository.CreateParameters): Promise<PublicProfile> {
    logger.debug(`${this.constructor.name}.create`, { params });

    return this.database.insert(params)
      .into('public_profile')
      .then((ids) => this.get(ids[0]));
  }

  public async find(params: PublicProfileRepository.FindParameters): Promise<PublicProfile[]> {
    logger.debug(`${this.constructor.name}.find`, params);

    const {
      user,
      name,
      slug,
      first,
      after,
    } = params;

    return this.database.select()
      .from('public_profile')
      .modify((queryBuilder) => {
        if (shouldFilterBy(user) && shouldFilterBy(user.id)) {
          queryBuilder.where('public_profile.userId', user.id);
        }

        if (shouldFilterBy(name)) {
          queryBuilder.whereLike('public_profile.name', `${name}%`);
        }

        if (shouldFilterBy(slug)) {
          queryBuilder.where('public_profile.slug', slug);
        }

        if (shouldFilterBy(first)) {
          queryBuilder.limit(first);
        }

        if (shouldFilterBy(after)) {
          queryBuilder.offset(after);
        }
      });
  }

  public async count(params: PublicProfileRepository.CountParameters): Promise<number> {
    logger.debug(`${this.constructor.name}.find`, params);

    const {
      user,
    } = params;

    return this.database.count()
      .from('public_profile')
      .modify((queryBuilder) => {
        if (shouldFilterBy(user) && shouldFilterBy(user.id)) {
          queryBuilder.where('album.userId', user.id);
        }
      })
      .first()
      .then((result: any) => result.count);
  }

  public async delete(id: ID): Promise<PublicProfile> {
    logger.debug(`${this.constructor.name}.delete`, { id });

    const publicProfile = await this.get(id);

    await this.database.table('public_profile').where('id', id).delete();
      
    return publicProfile;  
  }
}

export default KnexPublicProfileRepository;
