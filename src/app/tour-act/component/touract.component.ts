import { Component, OnInit, ViewEncapsulation, NgModule } from '@angular/core';
import {Router} from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import TourModel from '../../shared/tour.model';

@Component({
  selector: 'app-touract',
  templateUrl: './touract.component.html',
  styleUrls: ['./touract.component.scss'],
  encapsulation: ViewEncapsulation.Native
})

export class TouractComponent implements OnInit {
  currentTour: TourModel;

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
    var vorh_areas:number = 0;
    var vorh_stations:number = 0;
    var vorh_media:number = 0;

    this.currentTour.areas.forEach(e => {
      console.log(e.name);
      e.stations.forEach(ee => {
        console.log(ee.name);
        ee.media.forEach(eee => {
          console.log(eee.type);
          vorh_media++;
        });
        vorh_stations++;
      });
      vorh_areas++;
    });
  }

  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}