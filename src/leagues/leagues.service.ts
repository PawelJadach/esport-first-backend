import { storageDir } from './../utils/storage';
import { MulterDiskUploadedFiles } from './../interfaces/files';
import { LeaguesModule } from './leagues.module';
import { LeagueInterface } from './../interfaces/leagues';
import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { Leagues } from './leagues.entity';
import { CustomSuccessResponse } from 'src/interfaces/success';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LeaguesService {
  private filter = (league: Leagues): LeagueInterface => {
    const { id, name, linkToPage } = league;
    return { id, name, linkToPage };
  };

  async create(createLeagueDto: CreateLeagueDto, files: MulterDiskUploadedFiles): Promise<LeagueInterface> {
    const file = files?.img?.[0] ?? null;

    try {
      const { name, linkToPage } = createLeagueDto;
      const league = new Leagues();

      league.name = name;
      league.linkToPage = linkToPage;

      if(file) {
        league.imgFn = file.filename;
      }

      return this.filter(await league.save());
    } catch (error) {
      try {
        if(file) {
          fs.unlinkSync(path.join(storageDir(), 'leagues', file.filename));
        }
      } catch (error2) {}

      throw error;
    }
  }

  async findAll(): Promise<LeagueInterface[]> {
    return (await Leagues.find()).map(this.filter);
  }

  async findOne(id: string): Promise<LeagueInterface>  {
    const found = await Leagues.findOne(id);

    if(!found) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.filter(found);
  }

  async update(id: string, updateLeagueDto: UpdateLeagueDto, files: MulterDiskUploadedFiles): Promise<LeagueInterface> {
    const found = await Leagues.findOneOrFail(id);
    const file = files?.img?.[0] ?? null;

    try {
      Object.keys(updateLeagueDto).map(key => {
        found[key] = updateLeagueDto[key]
      })

      if(file) {
        if(found.imgFn) {
          fs.unlinkSync(path.join(storageDir(), 'leagues', found.imgFn));
        }

        found.imgFn = file.filename;
      }

      const updated = await found.save();

      return this.filter(updated);
    } catch (error) {
      try {
        if(file) {
          fs.unlinkSync(path.join(storageDir(), 'leagues', file.filename));
        }
      } catch (error2) {}

      throw error;
    }
  }

  async remove(id: string): Promise<CustomSuccessResponse> {
    const found = await Leagues.findOneOrFail(id);

    if(found.imgFn) {
      fs.unlinkSync(path.join(storageDir(), 'leagues', found.imgFn));
    }

    await found.remove();

    return { success: true };
  }

  async getPhoto(id: string, res: any): Promise<any> {
    try {
      const league = await Leagues.findOne(id);

      if(!league) {
        throw new Error("No league found");
      }

      if(!league.imgFn) {
        res.sendFile('placeholder.jpg', { root: path.join(storageDir(), 'global')})
      } else if (fs.existsSync(path.join(storageDir(), 'leagues', league.imgFn))) {
        res.sendFile(league.imgFn, { root: path.join(storageDir(), 'leagues')})
      } else {
        res.sendFile('placeholder.jpg', { root: path.join(storageDir(), 'global')})
      }

    } catch (error) {
      console.info(error);
    }
  }
}
