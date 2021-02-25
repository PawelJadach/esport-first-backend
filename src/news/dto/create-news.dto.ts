import { User } from './../../user/user.entity';
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateNewsDto {
    @IsNotEmpty({
        message: 'Name should not be empty!',
    })
    @IsString()
    title: string;

    @IsString()
    @IsNotEmpty({
        message: 'Content should not be empty!',
    })
    content: string;

    @IsUrl()
    @IsNotEmpty({
        message: 'Photo should not be empty!',
    })
    photoUrl: string;
}
