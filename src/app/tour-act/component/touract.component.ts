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
    console.log(this.currentTour);
  }

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}