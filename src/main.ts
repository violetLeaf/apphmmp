declare var cordova: any;

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

let onDeviceReady = () => {
  platformBrowserDynamic().bootstrapModule(AppModule);
  if (environment.production) {
    screen.orientation.lock('landscape');

    let httpd = (cordova && cordova.plugins && cordova.plugins.CorHttpd ) ? cordova.plugins.CorHttpd : null;
    if ( httpd ) {
      httpd.getURL(function(url){
        if(url.length > 0) {
          document.getElementById('url').innerHTML = "server is up: <a href='" + url + "' target='_blank'>" + url + "</a>";
        } else {
          httpd.startServer({
            'port' : 8080,
            'localhost_only' : true
          }, function( url ){
            //document.getElementById('url').innerHTML = "server is started: <a href='" + url + "' target='_blank'>" + url + "</a>";
            console.log(url);
            //updateStatus();
          }, function( error ){
            console.log(error);
            document.getElementById('url').innerHTML = 'failed to start server: ' + error;
          });
        }
      },function(){});
    } else {
      alert('CorHttpd plugin not available/ready.');
    }
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
