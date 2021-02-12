import { IsString, IsUrl } from "class-validator";

export class UpdateLeagueDto {
  @IsString()
  name: string;

  @IsString()
  @IsUrl()
  linkToPage: string;

  @IsUrl()
  @IsString()
  linkLogo: string;
}
