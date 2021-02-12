import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { PersonsModule } from './persons/persons.module';
import { ConsoleModule } from 'nestjs-console';
import { LeaguesModule } from './leagues/leagues.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, AuthModule, PersonsModule, ConsoleModule, LeaguesModule],
})
export class AppModule {}
