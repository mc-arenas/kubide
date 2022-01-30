import { Sequelize } from 'sequelize-typescript';
import { User } from './user/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'database-1.cck8lznugfc2.eu-west-1.rds.amazonaws.com',
        port: 3306,
        username: 'admin',
        password: process.env.DATABASE_PASSWORD,
        database: 'admin',
      });
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
