import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProfileDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async updateProfile(userId: number, dto: UpdateProfileDto) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: userId
        },
        data: {
          ...dto
        },
        select: {
          id: true,
          email: true,
          name: true,
          bio: true,
          createdAt: true,
          updatedAt: true,
        }
      });


      return {
        msg: 'Profile updated successfully',
        user,
      };

    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
