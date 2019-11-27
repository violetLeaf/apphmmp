declare var LocalFileSystem: any;
declare var window: any;
declare var cordova: any;

import {Component, OnInit, Injectable} from '@angular/core';
import TourModel from '../../shared/tour.model';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})

@Injectable()
export class StartScreenComponent implements OnInit {
  tours: TourModel[] = [];

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    // read json from files
    var pathwhole = window.localStorage.getItem("path");
    var paths = pathwhole.split(';');
    // console.log(paths);

    for(var i = 0; i < paths.length; i++){
      this.http.get<TourModel>(cordova.file.dataDirectory + paths[i] + "/route.json").subscribe(res => {
        this.tours.push(res);
      });
    }

    // statischer Pfad: 
    // this.http.get<TourModel>(cordova.file.dataDirectory + "media/exampleTour1/route.json").subscribe(res => {
    //   this.tours.push(res);
    // });

    // this.tours = this.tours.sort(function(a, b){return Number(b.date) - Number(a.date)});
  }

  onTourClick(tour: TourModel) {
    this.router.navigate(['/tour-act'], {state: {data: {tour}}});
  }

  public get sortedTours(): TourModel[]{
    return this.tours.sort((a, b)=> {return <any>new Date(a.date) - <any>new Date(b.date)});
  }
}

