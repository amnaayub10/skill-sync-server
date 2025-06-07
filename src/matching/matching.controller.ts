import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { AuthenticatedUser } from 'src/auth/interfaces';
import { MatchingService } from './matching.service';

@UseGuards(JwtGuard)
@Controller('matching')
export class MatchingController {

  constructor(private matchingService: MatchingService) { }

  @Get()
  getMatch(
    @GetUser('id') userId: AuthenticatedUser['id']
  ) {
    return this.matchingService.getMatch(userId);
  }
}
