import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MatchingService {
  constructor(private prisma: PrismaService) { }

  async getMatch(userId: number) {
    try {
      // Find users where their "offered skills" match this user (userId) "wanted skills"
      // Calculate compatibility score
      // Display match results with user profiles

      //get current user wanted skills
      //get other users whose offered skills skillId is same as current user wanted skills skillId

      const wantedSkills = await this.prisma.userSkill.findMany({
        where: {
          userId: userId,
          type: 'WANTED_TO_LEARN'
        }
      });
      if (wantedSkills.length === 0) {
        throw new NotFoundException('The user has not listed any desired skills to learn.');
      }

      const matchedOfferedSkills = await this.prisma.userSkill.findMany({
        where: {
          skillId: wantedSkills[0].skillId,
          type: 'OFFERED'
        }
      });
      if (matchedOfferedSkills.length === 0) {
        throw new NotFoundException('The skills which you have want to learn are not Offered by any user to Teach');
      }

      const matchingUsers = await this.prisma.user.findMany({
        where: {
          id: matchedOfferedSkills[0].userId
        },
        select: {
          id: true,
          name: true,
          email: true,
          bio: true
        }
      });

      return matchingUsers;

    } catch (error) {
      throw error;
    }
  }
}
