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
  @IsUrl({ require_protocol: true }, { message: 'Link must be link and start with protocol! (http / https)' })
  linkToPage: string;
}
