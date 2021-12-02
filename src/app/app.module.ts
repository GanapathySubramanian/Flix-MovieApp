import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MoviesComponent } from './movies/movies.component';
import { TvshowsComponent } from './tvshows/tvshows.component';

import { Approute } from  './app.routes';

import { Router, RouterModule } from '@angular/router';

import {IvyCarouselModule} from 'angular-responsive-carousel';

import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { TvshowsdetailsComponent } from './tvshowsdetails/tvshowsdetails.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpcomingMoviesComponent } from './upcoming-movies/upcoming-movies.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { TvshowEpisodesComponent } from './tvshow-episodes/tvshow-episodes.component';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MoviesComponent,
    TvshowsComponent,
    MovieDetailsComponent,
    TvshowsdetailsComponent,
    UpcomingMoviesComponent,
    PersonDetailsComponent,
    TvshowEpisodesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(Approute, {scrollPositionRestoration: 'enabled'}),
    NgbModule,
    IvyCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
