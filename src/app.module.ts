import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { SkillsModule } from './skills/skills.module';
import { MatchingModule } from './matching/matching.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PrismaModule,
    AuthModule,
    UsersModule,
    SkillsModule,
    MatchingModule,
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule { }
