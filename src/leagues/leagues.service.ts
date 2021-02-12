import { LeaguesModule } from './leagues.module';
import { CreateLeague } from './../interfaces/leagues';
import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { Leagues } from './leagues.entity';
import { CustomSuccessResponse } from 'src/interfaces/success';

@Injectable()
export class LeaguesService {
  async create(createLeagueDto: CreateLeagueDto): Promise<CreateLeague> {
    const { name, linkLogo, linkToPage } = createLeagueDto;
    const league = new Leagues();

    league.name = name;
    league.linkLogo = linkLogo;
    league.linkToPage = linkToPage;

    return await league.save();
  }

  async findAll(): Promise<Leagues[]> {
    return await Leagues.find();
  }

  async findOne(id: string): Promise<Leagues>  {
    const found = await Leagues.findOne(id);

    if(!found) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return found;
  }

  async update(id: string, updateLeagueDto: UpdateLeagueDto): Promise<Leagues> {
    const found = await this.findOne(id);

    Object.keys(updateLeagueDto).map(key => {
      found[key] = updateLeagueDto[key]
    })

    const updated = await found.save();

    return updated;
  }

  async remove(id: string): Promise<CustomSuccessResponse> {
    const found = await this.findOne(id);
    console.log(found);
    await found.remove();

    return { success: true };
  }
}
