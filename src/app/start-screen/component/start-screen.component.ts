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
  basePath: string = 'file://android_asset/data/data/com.acme.app/files/';
  tours: TourModel[] = [];

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    // read json from files
    var pathwhole = window.localStorage.getItem("path");
    console.log(pathwhole);
    var paths = pathwhole.split(';');

    for(var i = 0; i < paths.length; i++){
      this.http.get<TourModel>(this.basePath + paths[i] + "/route.json").subscribe(function(basePath, res) {
        res.completePath = basePath + 'media/' + res.folderName + '/media/';

        this.tours.push(res);
      }.bind(this, this.basePath));
    }
  }

  onTourClick(tour: TourModel) {
    this.router.navigate(['/tour-act'], {state: {data: {tour}}});
  }

  public get sortedTours(): TourModel[]{
    return this.tours.sort((a, b)=> {return <any>new Date(a.date) - <any>new Date(b.date)});
  }
}

