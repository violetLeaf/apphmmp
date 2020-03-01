declare var downloader: any;
declare var cordova: any;

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import TourModel from '../shared/tour.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  tours: TourModel[] = [];

  constructor(private router: Router, private http: HttpClient) {  }
  
  todisplay:string;
  path:string = "";

  ngOnInit() {
    // clear all downloaded Tours
    // this.http.delete(environment.webserviceUrl + "deletetoursapp").subscribe(function(res) {
    //   console.log(res);
    // }.bind(this));

    // get all Tours
    this.http.get<TourModel[]>(environment.webserviceUrl + "toursapp").subscribe(function(res) {
      this.tours = res;
      console.log(res);

      // code für cordova, plugin in cordova
      // downloader.get("https://file-examples.com/wp-content/uploads/2017/02/zip_2MB.zip");
      this.tours.forEach(tour => {
        // create the zip-file
        // this.http.get(environment.webserviceUrl + "tourapp/" + tour.id);

        // create the path to the zip-file
        this.path += "media/tour_" + tour.id + ";";
      });

      // removes the last ;
      this.path = this.path.slice(0, -1);
      window.localStorage.setItem("path", this.path);
      console.log(this.path);

      document.addEventListener("DOWNLOADER_error", function(event){
        console.log("downloader_error: ");
        console.log(event);
        this.todisplay = "https://http.cat/418";
      });
      document.addEventListener("DOWNLOADER_downloadError", function(event){
        console.log("DOWNLOADER_downloadError: ");
        console.log(event);
        this.todisplay = "https://http.cat/502";
      });
      document.addEventListener("DOWNLOADER_downloadSuccess", function(event){
        console.log("DOWNLOADER_downloadSuccess: ");
        console.log(event);
        this.todisplay = "https://http.cat/200"

        // var path = "media/exampleTour1;media/exampleTour2;media/exampleTour3;media/exampleTour4";
        // localStorage wird gesetzt wo wir die einzelnen Dateien gesetzt haben
        
      });
      
      downloader.init({folder: "media", fileSystem: cordova.file.dataDirectory, unzip: true});

      let dl = [];
      this.tours.forEach(tour => {
        dl.push({url: environment.webserviceUrl + "download/tour_" + tour.id + ".zip"});
      });
      console.log(dl);
      downloader.getMultipleFiles(dl);
    }.bind(this));
  }
}
