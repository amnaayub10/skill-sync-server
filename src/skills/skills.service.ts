import { BadGatewayException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) { }

  async getSkills() {
    try {
      const skills = await this.prisma;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
