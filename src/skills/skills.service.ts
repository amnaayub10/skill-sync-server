import { BadGatewayException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddSkillDto, AddUserSkillDto } from './dto/addSkill.dto';

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) { }

  getSkills() {
    try {
      // const skills = await this.prisma;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async addSkill(dto: AddSkillDto) { }

  async addUserSkill(dto: AddUserSkillDto) { }
}
