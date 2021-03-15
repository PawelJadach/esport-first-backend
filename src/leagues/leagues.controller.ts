import { MulterDiskUploadedFiles } from './../interfaces/files';
import { multerStorage, storageDir } from './../utils/storage';
import { UserRoleEnum } from './../user/user.entity';
import { UserRoleGuard } from './../guards/user-role.guard';
import { Leagues } from './leagues.entity';
import { LeagueInterface } from './../interfaces/leagues';
import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, UseInterceptors, UploadedFiles, Res } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { CustomSuccessResponse } from 'src/interfaces/success';
import { AuthGuard } from '@nestjs/passport';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
@Controller('leagues')
export class LeaguesController {
  constructor(private readonly leaguesService: LeaguesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'img', maxCount: 1 }], { storage : multerStorage(path.join(storageDir(), 'leagues')) })
  )
  create(
    @Body() createLeagueDto: CreateLeagueDto,
    @UploadedFiles() files: MulterDiskUploadedFiles,
  ): Promise<LeagueInterface> {
    return this.leaguesService.create(createLeagueDto, files);
  }

  @Get()
  findAll(): Promise<LeagueInterface[]> {
    return this.leaguesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<LeagueInterface> {
    return this.leaguesService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'img', maxCount: 1 }], { storage : multerStorage(path.join(storageDir(), 'leagues')) })
  )
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateLeagueDto: UpdateLeagueDto,
    @UploadedFiles() files: MulterDiskUploadedFiles,
  ): Promise<LeagueInterface> {
    return this.leaguesService.update(id, updateLeagueDto, files);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string): Promise<CustomSuccessResponse> {
    return this.leaguesService.remove(id);
  }

  @Get('/img/:id')
  async getPhoto(
    @Param('id') id: string,
    @Res() res: any,
  ): Promise<any> {
    return this.leaguesService.getPhoto(id, res);
  }
}
