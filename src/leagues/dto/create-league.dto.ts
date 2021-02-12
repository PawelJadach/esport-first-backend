import { IsNotEmpty, IsString, IsUrl, MaxLength } from "class-validator";

export class CreateLeagueDto {
  @IsNotEmpty({
    message: 'Name should not be empty!',
  })
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNotEmpty({ message: 'Link to page should not be empty!' })
  @IsString()
  @IsUrl()
  linkToPage: string;

  @IsNotEmpty({ message: 'Link to logo should not be empty!' })
  @IsUrl()
  @IsString()
  linkLogo: string;
}
