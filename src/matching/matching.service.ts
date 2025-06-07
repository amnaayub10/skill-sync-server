import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MatchingService {
  constructor(private prisma: PrismaService) { }

  async getMatch(userId: number) {
    try {
      // Find users where their "offered skills" match this user (userId) "wanted skills"
      // Calculate compatibility score
      // Display match results with user profiles
    } catch (error) {
      throw error;
    }
  }
}
