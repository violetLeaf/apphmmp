declare var downloader: any;
declare var cordova: any;

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import TourModel from '../shared/tour.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  tours: TourModel[] = [];

  constructor(private router: Router, private http: HttpClient) {
    // clear all downloaded Tours
    this.http.delete("http://localhost:3000/deletetoursapp").subscribe(function(res) {
     console.log(res);
    }.bind(this));

    // get all Tours
    this.http.get<TourModel[]>("http://localhost:3000/toursapp").subscribe(function(res) {
     this.tours = res;
     console.log(res);
     console.log(this.tours);
    }.bind(this));
  }
  
  todisplay:string;
  path:string = "";

  ngOnInit() {
    // code für cordova, plugin in cordova
    downloader.init({folder: "media", fileSystem: cordova.file.dataDirectory, unzip: true});
    // downloader.get("https://file-examples.com/wp-content/uploads/2017/02/zip_2MB.zip");
    this.tours.forEach(tour => {
      downloader.get("http://localhost:3000/download/" + tour.id);
      this.path += "media/tour_" + tour.id + ";";
    });

    // removes the last ;
    this.path = this.path.slice(0, -1);
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
      this.todisplay = "https://http.cat/200";

      // var path = "media/exampleTour1;media/exampleTour2;media/exampleTour3;media/exampleTour4";
      // localStorage wird gesetzt wo wir die einzelnen Dateien gesetzt haben
      window.localStorage.setItem("path", this.path);
      
    });
  }
}
