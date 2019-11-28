import { Component, OnInit, ViewEncapsulation, NgModule } from '@angular/core';
import {Router} from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import TourModel from '../../shared/tour.model';
import { Time } from '@angular/common';

@Component({
  selector: 'app-touract',
  templateUrl: './touract.component.html',
  styleUrls: ['./touract.component.scss'],
  encapsulation: ViewEncapsulation.Native
})

export class TouractComponent implements OnInit {
  currentTour: TourModel;
  curr_area:number = 0;
  curr_station:number = 0;
  curr_media:number = 0;

  vorh_areas:number = 0;
  vorh_stations:number = 0;
  vorh_media:number = 0;

  secondspassed:number = 0;

  constructor(private router: Router) {
    let stateData = this.router.getCurrentNavigation().extras.state.data;

    if (stateData !== undefined) {
      // die mitgegebene Tour
      this.currentTour = stateData.tour;
    } else {
      this.router.navigate(['']);
    }
  }

  ngOnInit() {
    // for the number of Areas, Stations and Media
    this.currentTour.areas.forEach(e => {
      e.stations.forEach(ee => {
        ee.media.forEach(eee => {
          this.vorh_media++;
        });
        this.vorh_stations++;
      });
      this.vorh_areas++;
    });

    // Timer
    setInterval(() => {
      this.secondspassed++;
    }, 1000);
  }

  Timer(): string {
    const minutes: number = Math.floor(this.secondspassed / 60);
    return minutes + ':' + (this.secondspassed - minutes * 60);
  }

  countup(data:any){
    data += 1;
  }

  

  // images = [200, 201, 300, 302, 305, 404, 402, 403, 417, 429, 510].map((n) => `https://http.cat/${n}`);
}