import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AddSkillDto,
  AddUserSkillDto,
  UpdateUserSkillDto,
} from './dto/addSkill.dto';

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) {}

  async getSkills() {
    const skills = await this.prisma.skill.findMany();

    if (Array.isArray(skills) && skills.length === 0) {
      throw new NotFoundException('No Skill found');
    }

    return skills;
  }

  async addSkill(dto: AddSkillDto) {
    const normalizedName = dto.name.trim().toLowerCase();
    try {
      const skillExists = await this.prisma.skill.findUnique({
        where: {
          name: normalizedName,
        },
      });

      if (skillExists) {
        throw new BadRequestException(
          'This skill is already added, add new one',
        );
      }

      const skill = await this.prisma.skill.create({
        data: {
          name: normalizedName,
          description: dto.description,
        },
      });

      return skill;
    } catch (error) {
      console.error('Error status:', error.status);
      console.error('Error:.response', error.response);
      if (error.status === 400) {
        throw new BadRequestException(
          'This skill is already added, add new one',
        );
      } else throw new InternalServerErrorException('Server Error happened');
    }
  }

  async addUserSkill(dto: AddUserSkillDto, userId: number) {
    try {
      const userSkill = await this.prisma.userSkill.create({
        data: {
          userId,
          skillId: dto.skillId,
          type: dto.type === 0 ? 'OFFERED' : 'WANTED_TO_LEARN',
          proficiency:
            dto.proficiency === 0
              ? 'BEGINNER'
              : dto.proficiency === 1
                ? 'INTERMEDIATE'
                : dto.proficiency === 2
                  ? 'ADVANCED'
                  : 'EXPERT',
          description: dto.description,
        },
      });

      return userSkill;
    } catch (error) {
      console.error('Error:', error);
      throw new InternalServerErrorException('Server Error happened');
    }
  }

  async updateUserSkill(dto: UpdateUserSkillDto, uderId: number) {}

  async deleteUserSkill(userSkillId: number, uderId: number) {}
}
