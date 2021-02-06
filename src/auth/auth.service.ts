import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { hashPwd } from '../utils/hashPwd';
import { AuthLoginDto } from './dto/auth-login.dto';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from './jwt.strategy';
import { jwt } from '../config/keys.config';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  private createToken(
    currentTokenId: string
  ): { accessToken: string; expiresIn: number } {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = 60 * 60;
    const accessToken = sign(payload, jwt, { expiresIn });

    return { accessToken, expiresIn };
  }

  private async generateToken(user: User): Promise<string> {
    let token;
    let userWithThisToken;

    do {
      token = uuid();
      userWithThisToken = await User.findOne({ currentTokenId: token });
    } while (!!userWithThisToken);

    user.currentTokenId = token;
    await user.save();

    return token;
  }

  async login(req: AuthLoginDto, res: Response): Promise<any> {
    try {
      const user = await User.findOne({
        email: req.email,
        pwdHash: hashPwd(req.pwd),
      });

      if (!user) {
        return res.json({ error: 'Niepoprawne dane' });
      }
      const token = await this.createToken(await this.generateToken(user));

      return res
        .cookie('jwt', token.accessToken)
        .json(this.userService.filter(user));
    } catch (error) {
      return res.json({ error: error.message });
    }
  }

  async logout(user: User, res: Response<any>) {
    try {
      user.currentTokenId = null;
      await user.save();
      res.clearCookie('jwt');

      return res.json({ ok: true });
    } catch (error) {
      return res.json({ error: error.message });
    }
  }

  async verify(user: User, res: Response): Promise<any> {
    try {
      const token = await this.createToken(await this.generateToken(user));

      return res
        .cookie('jwt', token.accessToken)
        .json(this.userService.filter(user));
    } catch (error) {
      return res.json({ error: error.message });
    }
  }
}
