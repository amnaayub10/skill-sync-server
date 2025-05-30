import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export enum SkillType {
  OFFERED,
  WANTED_TO_LEARN,
}

export enum SkillProficiency {
  BEGINNER,
  INTERMEDIATE,
  ADVANCED,
  EXPERT,
}

export class AddSkillDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class AddUserSkillDto {
  @IsInt()
  skillId: number;

  @IsEnum(SkillType)
  type: SkillType;

  @IsEnum(SkillProficiency)
  proficiency: SkillProficiency;

  @IsOptional()
  @IsString()
  description?: string;
}
