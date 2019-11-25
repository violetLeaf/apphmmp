import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TouractComponent } from './touract.component';

describe('TouractComponent', () => {
  let component: TouractComponent;
  let fixture: ComponentFixture<TouractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TouractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TouractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
