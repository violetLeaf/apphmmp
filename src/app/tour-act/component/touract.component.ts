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
  curr_area:number = 1;
  curr_station:number = 1;
  curr_media:number = 1;

  vorh_areas:number = 0;
  vorh_stations:number = 0;
  vorh_media:number = 0;

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
    return (minutes < 10 ? '0' : '') + minutes + ':' + (this.secondspassed < 10 ? '0' : '') + (this.secondspassed - minutes * 60);
  }
  
  stations:number = 1;
  media:number = 1;
  changeareacodes = [];
  changearea:number = 0;
  changestationcodes = [];
  changestation:number = 0;

  SlideClick(){
    

    for (var i = 1; i < this.vorh_areas; i++){
      // zählt Stationen innerhalb dieser Area aus
      this.currentTour.areas[i].stations.forEach(e => {  this.stations++;  });
      this.changeareacodes.push(this.stations);
      for (var ii = 1; ii < this.stations; ii++){
        // zählt Media innerhalb dieser Station aus
        this.currentTour.areas[i].stations[ii].media.forEach(e => {  this.media++;  });
        this.changestationcodes.push(this.media);
      }
    }

    // Stationen und Areas werden noch nicht richtig hochgezählt!! Nochmals ansehen!
    if (this.curr_media < this.vorh_media){
      if (this.curr_station < this.vorh_stations){
        if (this.changestationcodes[this.changestation] == this.curr_media){
          if (this.curr_area < this.vorh_areas){
            if (this.changeareacodes[this.changearea] == this.curr_station){
              this.curr_area++;
            }
          }
        }
        this.curr_station++;
      }
      this.curr_media++;
    }
  }
  

  

  // images = [200, 201, 300, 302, 305, 404, 402, 403, 417, 429, 510].map((n) => `https://http.cat/${n}`);
}