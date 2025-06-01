// app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { SkillsController } from './skills/skills.controller';
import { SkillsModule } from './skills/skills.module';
import { SkillsService } from './skills/skills.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PrismaModule,
    AuthModule,
    UsersModule,
    SkillsModule,
  ],
  controllers: [AppController, UsersController, SkillsController],
  providers: [AppService, UsersService, SkillsService],
})
export class AppModule {}
