declare var downloader: any;
declare var cordova: any;

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // code für cordova, plugin in cordova
    downloader.init({folder: "media", fileSystem: cordova.file.dataDirectory, unzip: true});
    downloader.get("https://file-examples.com/wp-content/uploads/2017/02/zip_2MB.zip");

    document.addEventListener("DOWNLOADER_error", function(event){
      console.log("downloader_error: ");
      console.log(event);
    });
    document.addEventListener("DOWNLOADER_downloadError", function(event){
      console.log("DOWNLOADER_downloadError: ");
      console.log(event);
    });
    document.addEventListener("DOWNLOADER_downloadSuccess", function(event){
      console.log("DOWNLOADER_downloadSuccess: ");
      console.log(event);

      // TODO: muss noch geändert werden, dass die eigentlichen Namen eingelesen werden
      var path = "media/exampleTour1;media/exampleTour2";
      // var path = "media/exampleTour1;media/exampleTour2;media/exampleTour3;media/exampleTour4";
      // localStorage wird gesetzt wo wir die einzelnen Dateien gesetzt haben
      window.localStorage.setItem("path", path);
      
    });
  }
}
