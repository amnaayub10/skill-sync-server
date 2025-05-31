import { BadGatewayException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AddSkillDto,
  AddUserSkillDto,
  UpdateUserSkillDto,
} from './dto/addSkill.dto';

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) { }

  async getSkills() { }

  async addSkill(dto: AddSkillDto) { }

  async addUserSkill(dto: AddUserSkillDto, uderId: number) { }

  async updateUserSkill(dto: UpdateUserSkillDto, uderId: number) { }

  async deleteUserSkill(userSkillId: number, uderId: number) { }
}
