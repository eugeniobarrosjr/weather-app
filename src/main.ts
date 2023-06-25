import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { makeServer } from './mirage-config';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

makeServer();
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
