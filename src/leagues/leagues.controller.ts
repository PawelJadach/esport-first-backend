import { UserRoleEnum } from './../user/user.entity';
import { UserRoleGuard } from './../guards/user-role.guard';
import { Leagues } from './leagues.entity';
import { CreateLeague } from './../interfaces/leagues';
import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { CustomSuccessResponse } from 'src/interfaces/success';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('leagues')
export class LeaguesController {
  constructor(private readonly leaguesService: LeaguesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createLeagueDto: CreateLeagueDto): Promise<CreateLeague> {
    return this.leaguesService.create(createLeagueDto);
  }

  @Get()
  findAll(): Promise<Leagues[]> {
    return this.leaguesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Leagues> {
    return this.leaguesService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateLeagueDto: UpdateLeagueDto): Promise<Leagues> {
    return this.leaguesService.update(id, updateLeagueDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string): Promise<CustomSuccessResponse> {
    return this.leaguesService.remove(id);
  }
}
