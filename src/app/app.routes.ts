import { Routes} from "@angular/router";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";
import { MoviesComponent } from "./movies/movies.component";
import { PersonDetailsComponent } from "./person-details/person-details.component";
import { TvshowEpisodesComponent } from "./tvshow-episodes/tvshow-episodes.component";
import { TvshowsComponent } from "./tvshows/tvshows.component";
import { TvshowsdetailsComponent } from "./tvshowsdetails/tvshowsdetails.component";
import { UpcomingMoviesComponent } from "./upcoming-movies/upcoming-movies.component";


export const Approute:Routes =[
    {
        path:'',
        component:MoviesComponent
    },
    {
        path:'tvshows',
        component:TvshowsComponent
    },
    {
        path:'moviedetails/:id',
        component:MovieDetailsComponent
    },
    {
        path:'similarmoviesdetails/:id',
        component:MovieDetailsComponent
    },
    {
        path:'tvshowsdetails/:id',
        component:TvshowsdetailsComponent
    },
    {
        path:'similartvshowsdetails/:id',
        component:TvshowsdetailsComponent
    },
    {
        path:'upcoming',
        component:UpcomingMoviesComponent
    },
    {
        path:'persondetails/:id',
        component:PersonDetailsComponent
    },
    {
        path:'tvshow-episode/:tvshowid/:season/:tvshow_name',
        component:TvshowEpisodesComponent
    }
];