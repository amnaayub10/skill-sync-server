import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import {
  AddSkillDto,
  AddUserSkillDto,
  UpdateUserSkillDto,
} from './dto/addSkill.dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { AuthenticatedUser } from 'src/auth/interfaces';

@Controller('skills')
export class SkillsController {
  constructor(private skillsService: SkillsService) { }

  @Get()
  getSkills() {
    return this.skillsService.getSkills();
  }

  @UseGuards(JwtGuard)
  @Post()
  addSkills(@Body() dto: AddSkillDto) {
    return this.skillsService.addSkill(dto);
  }

  @UseGuards(JwtGuard)
  @Post('add-user-skill')
  addUserSkill(
    @GetUser('id') userId: AuthenticatedUser['id'],
    @Body() dto: AddUserSkillDto,
  ) {
    return this.skillsService.addUserSkill(dto, userId);
  }

  @UseGuards(JwtGuard)
  @Patch('update-user-skill')
  updateUserSkill(
    @GetUser('id') userId: AuthenticatedUser['id'],
    @Body() dto: UpdateUserSkillDto,
  ) {
    return this.skillsService.updateUserSkill(dto, userId);
  }

  @UseGuards(JwtGuard)
  @Delete('delete-user-skill/:userSkillId')
  deleteUserSkill(
    @GetUser('id') userId: AuthenticatedUser['id'],
    @Param('userSkillId') userSkillId: string,
  ) {
    return this.skillsService.deleteUserSkill(userSkillId, userId);
  }
}
