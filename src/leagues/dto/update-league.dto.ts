import { IsBoolean, IsString, IsUrl } from "class-validator";

export class UpdateLeagueDto {
  @IsString()
  name: string;

  @IsString()
  @IsUrl()
  linkToPage: string;
}
