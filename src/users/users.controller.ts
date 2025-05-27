import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UpdateProfileDto } from './dto';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { AuthenticatedUser } from 'src/auth/interfaces';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Get('profile')
  getProfile(@GetUser() user: AuthenticatedUser) {
    return user;
  }

  @Patch('profile')
  updateProfile(
    @GetUser('id') userId: AuthenticatedUser['id'],
    @Body() dto: UpdateProfileDto,
  ) {
    return this.userService.updateProfile(userId, dto);
  }
}
