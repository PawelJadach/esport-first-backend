import { AppModule } from './app.module';
import { BootstrapConsole } from 'nestjs-console';

const bootstrap = new BootstrapConsole({
  module: AppModule,
  useDecorators: true,
});

bootstrap.init().then(async (app) =>{
  try {
    await app.init();
    await bootstrap.boot();
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
})