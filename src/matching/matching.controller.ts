import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { AuthenticatedUser } from 'src/auth/interfaces';
import { MatchingService } from './matching.service';

@UseGuards(JwtGuard)
@Controller('matching')
export class MatchingController {

  constructor(private matchingService: MatchingService) { }

  @Get('students')
  findStudentsForUser(
    @GetUser('id') seekerId: AuthenticatedUser['id']
  ) {
    return this.matchingService.findStudentsForUser(seekerId);
  }

  @Get('mentors')
  findMentorsForUser(
    @GetUser('id') seekerId: AuthenticatedUser['id']
  ) {
    return this.matchingService.findMentorsForUser(seekerId);
  }
}
