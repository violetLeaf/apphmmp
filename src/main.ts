import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

let onDeviceReady = () => {
  platformBrowserDynamic().bootstrapModule(AppModule);
  if (environment.production) {
    screen.orientation.lock('landscape');
  }
};

if (environment.production) {
  // using Cordova
  document.addEventListener('deviceready', onDeviceReady, false);
  enableProdMode();
} else {
  // without Cordova
  onDeviceReady();
}
