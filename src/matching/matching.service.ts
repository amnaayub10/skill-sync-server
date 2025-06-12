import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MatchingService {
  constructor(private prisma: PrismaService) { }

  async getMatchToLearn(userId: number) {
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
        throw new NotFoundException('You have not listed any skills you wish to learn.');
      }

      const matchedOfferedSkills = await this.prisma.userSkill.findMany({
        where: {
          skillId: {
            in: wantedSkills.map(item => item.skillId)
          },
          type: 'OFFERED'
        }
      });
      if (matchedOfferedSkills.length === 0) {
        throw new NotFoundException('Currently, no users are offering to teach the skills you want to learn.');
      }

      const matchingUsers = await this.prisma.user.findMany({
        where: {
          id: {
            in: matchedOfferedSkills.map(userSkill => userSkill.userId)
          }
        },
        omit: {
          password: true,
        }

      });

      return matchingUsers;

    } catch (error) {
      throw error;
    }
  }
  async getMatchToTeach(userId: number) {
    try {
      // Find users where their "wanted skills" match this user (userId) "offered skills"
      // Calculate compatibility score
      // Display match results with user profiles

      //get current user offered skills
      //get other users whose wanted skills skillId is same as current user offered skills skillId

      const offeredSkills = await this.prisma.userSkill.findMany({
        where: {
          userId: userId,
          type: 'OFFERED'
        }
      });
      if (offeredSkills.length === 0) {
        throw new NotFoundException('You have not listed any skills to offer for teaching.');
      }

      const matchedWantedSkills = await this.prisma.userSkill.findMany({
        where: {
          skillId: {
            in: offeredSkills.map(item => item.skillId)
          },
          type: 'WANTED_TO_LEARN'
        }
      });
      if (matchedWantedSkills.length === 0) {
        throw new NotFoundException('Currently, no users have shown interest in learning the skills you wish to teach.');
      }

      const matchingUsers = await this.prisma.user.findMany({
        where: {
          id: {
            in: matchedWantedSkills.map(userSkill => userSkill.userId)
          }
        },
        omit: {
          password: true,
        }

      });

      return matchingUsers;

    } catch (error) {
      throw error;
    }
  }
}
