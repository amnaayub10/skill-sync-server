import { Body, Controller, Get, Post } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { AddSkillDto, AddUserSkillDto } from './dto/addSkill.dto';

@Controller('skills')
export class SkillsController {
  constructor(private skillsService: SkillsService) { }

  @Get()
  getSkills() {
    return this.skillsService.getSkills();
  }

  @Post()
  addSkills(@Body() dto: AddSkillDto) {
    return this.skillsService.addSkill(dto);
  }

  @Post()
  addUserSkills(@Body() dto: AddUserSkillDto) {
    return this.skillsService.addUserSkill(dto);
  }
}
