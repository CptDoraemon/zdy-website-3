import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { ContributeToDatabaseModule } from './contribute-to-database/contribute-to-database.module';
import { TableDataModule } from './table-data/table-data.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {TableDataEntity} from "./table-data/table-data.entity";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import {UserEntity} from "./user/user.entity";
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*'],
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [
          TableDataEntity,
          UserEntity
        ],
        synchronize: false
      }),
      inject: [ConfigService],
    }),
    ContributeToDatabaseModule,
    TableDataModule,
    UserModule,
    AuthModule,
    AdminModule
  ],
  controllers: [AppController],
})
export class AppModule {}
