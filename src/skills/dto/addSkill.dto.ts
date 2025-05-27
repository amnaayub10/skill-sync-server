import { IsEnum, IsOptional, IsString } from 'class-validator';

export class AddSkillDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

}