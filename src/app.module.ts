import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './common/helper/env.helper';
import { configService } from './common/config/config.service';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
