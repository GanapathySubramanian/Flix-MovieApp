import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowsdetailsComponent } from './tvshowsdetails.component';

describe('TvshowsdetailsComponent', () => {
  let component: TvshowsdetailsComponent;
  let fixture: ComponentFixture<TvshowsdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvshowsdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvshowsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
