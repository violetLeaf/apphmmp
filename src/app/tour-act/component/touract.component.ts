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

  mom_stations = [];
  mom_medias = [];  

  secondspassed:number = 0;

  constructor(private router: Router, carousel: NgbCarouselConfig) {
    let stateData = this.router.getCurrentNavigation().extras.state.data;

    if (stateData !== undefined) {
      // die mitgegebene Tour
      this.currentTour = stateData.tour;
    } else {
      this.router.navigate(['']);
    }

    // Carousel Configuration:
    carousel.wrap = false;
    carousel.showNavigationIndicators = false;
    carousel.showNavigationArrows = true;
    carousel.interval = 0;
  }

  ngOnInit() {
    // for the number of Areas, Stations and Media
    this.currentTour.areas.forEach(e => {
      e.stations.forEach(ee => {
        ee.medias.forEach(eee => {
          this.vorh_media++;
        });
        this.vorh_stations++;
        // For station change
        this.mom_medias.push(ee.medias.length);
      });
      this.vorh_areas++;
      // for area change
      this.mom_stations.push(e.stations.length);
    });

    // Timer
    setInterval(() => {
      this.secondspassed++;
    }, 1000);
  }

  Timer(): string {
    const minutes: number = Math.floor(this.secondspassed / 60);
    return (minutes < 10 ? '0' : '') + minutes + ':' + (this.secondspassed < 10 ? '0' : '') + (this.secondspassed - minutes * 60);
  }

  SlideClick(){
    this.curr_media++;

    // funktioniert noch nicht
    if ( this.curr_media < this.vorh_media){
      if (this.curr_media = this.mom_medias[(this.curr_station)]){
        this.curr_station++;
      }
      if (this.curr_station = this.mom_stations[(this.curr_area)]){
        this.curr_area++;
      }
    }
  }
  

  

  // images = [200, 201, 300, 302, 305, 404, 402, 403, 417, 429, 510].map((n) => `https://http.cat/${n}`);
}