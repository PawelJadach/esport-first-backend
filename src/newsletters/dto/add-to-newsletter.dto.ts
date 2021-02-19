import { IsEmail, IsNotEmpty } from "class-validator";

export class AddToNewsletterDto {
  @IsNotEmpty({
    message: 'Name should not be empty!',
  })
  @IsEmail()
  email: string;
}
