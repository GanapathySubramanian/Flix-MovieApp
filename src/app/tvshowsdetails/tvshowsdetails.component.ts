import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';
import { textChangeRangeIsUnchanged } from 'typescript';

var tvshow_id="";
const base_url="https://api.themoviedb.org/3/tv/";
const api_key="api_key=7636ad8cc0fec57396bc5c069605a982";
const img_url="https://image.tmdb.org/t/p/w500";
const poster_path="";
const youtube_url="https://www.youtube.com/embed/";

@Component({
  selector: 'app-tvshowsdetails',
  templateUrl: './tvshowsdetails.component.html',
  styleUrls: ['./tvshowsdetails.component.css']
})
export class TvshowsdetailsComponent implements OnInit {

  data:any = []
  
  val:any=[];
  safeURL:any="";
  IMG_URL:String=img_url;
  poster_path:any=poster_path;
  original_name:any="";
  first_air_date:any="";
  status:any="";
  avg_run_time:any=[];
  genre:any=[];
  genre_len:any;
  last_air_date:any="";
  network:any=[];
  no_of_epi:any="";
  no_of_sesa:any="";
  original_lan:any="";
  overview:any="";
  production_cmy:any=[];
  prod_len:any;
  rating:any="";
  seasons:any=[];
  videos_data:any=[];
 

  similar_tvshows:any=[];
  recommended_tvshows:any=[];
  cast:any=[];
  crew:any=[];
  

  backdrop_paths:any=[];
  backdrop:any=[];
  posters_data:any=[];
  
  tvshowid:any;
  logos:any="";
  
  review_data:any=[];
  reviews:any=[];
  
  novideos:any='data';
  nopost:any='data';
  nobackdrop:any='data';
  nocastdata:any='data';
  nocrewdata:any='data'; 
  nosimmoviedata:any='data';
  norecmoviedata:any='data';
  noreview:any='data';
  background_image:any="";
  nobackdropback:any="";

  watchprovider:String="";
    watchproviderlist:any;

   constructor(private route: ActivatedRoute,private http: HttpClient,private _sanitizer:DomSanitizer,private router:Router) { 
    let id = this.route.snapshot.params.id;
    tvshow_id=id;
    console.log(tvshow_id);
    this.tvshowid=id;
    this.getbackdrop(base_url+tvshow_id+"/images?"+api_key+"&include_image_language=en")
  }

  ngOnInit() {

    this.router.navigateByUrl('/tvshowsdetails/'+tvshow_id);
    //To get the tvshow details
    var api_url=base_url+tvshow_id+'?'+api_key;
    this.getData(api_url);

    //To get the cast & crew details
    var credits=base_url+tvshow_id+'/credits?'+api_key;
    this.getCredits(credits)

    //To get the similar movies details
    var sim_tvshow=base_url+tvshow_id+'/similar?'+api_key;
    this.getSimTvshows(sim_tvshow)

    //To get the recommended movies details
    var rec_tvshow=base_url+tvshow_id+'/recommendations?'+api_key;
    this.getRecTvshows(rec_tvshow)

    //To get the videos
    var video_url=base_url+tvshow_id+"/videos?"+api_key;
    this.getvideoData(video_url);
    //To get the Reviews
    
    var reviews_url=base_url+tvshow_id+'/reviews?'+api_key;
    this.getReviews(reviews_url)
}

  getbackdrop(url:any){
    this.http.get(url).subscribe((res)=>{
      this.backdrop=res;

      console.log(this.backdrop);
      
      //Tvshow Backdrop Images
      if(this.backdrop.backdrops.length=='0'){
        this.nobackdrop=null;
        this.background_image=null;
        this.nobackdropback=null;
      }else{
        this.nobackdrop='data';
        this.backdrop_paths=this.backdrop.backdrops;
        this.background_image='https://image.tmdb.org/t/p/original/'+this.backdrop.backdrops[0].file_path;
      }
      
      //Tvshow Posters
        if(this.backdrop.posters.length==0){
          this.nopost=null;
        }else{
          this.posters_data=this.backdrop.posters;
          this.nopost="data";
        }
    
      //Tvshows logo
      if(this.backdrop.logos.length<0){
        this.logos.file_path=null;
      }else{
        this.logos=this.backdrop.logos[0];
      }
      // console.log(this.logos)
      // this.backdrop_paths=res.backdrops;
      
    })
  }
  float2int (value:any) {
    return value | 0;
  }
 


getReviews(url:any){
  this.http.get(url).subscribe((res)=>{
    this.review_data= res;
    

    if(this.review_data.total_results==0){
        this.noreview=null;
    }else{
      this.noreview='data';
      this.reviews=this.review_data.results;
    }
    // console.log(this.reviews);
    
    // console.log(this.review_data);
   
  })
}

  getCredits(url:any){
    this.http.get(url).subscribe((res)=>{
      this.val= res
      this.data=this.val;
      console.log("Cast & Crew : "+this.data);
      
      //Cast Details
      if(this.data.cast.length==0){
        this.nocastdata=null;
      }else{
        this.nocastdata='data';
        this.cast=this.data.cast;
      }

      //Crew Details
      if(this.data.crew.length==0){
        this.nocrewdata=null;
      }else{
        this.nocrewdata='data';
        this.crew=this.data.crew;
      }
    })
  }

  getData(url:any){
    this.http.get(url).subscribe((res)=>{
      this.val= res
      this.data=this.val;
      console.log("tvshows details : ");
      console.log(this.data);
      
      
      // To get tvshow details

      this.poster_path=this.data.poster_path;
      if(this.poster_path==null){
        this.poster_path='Empty';
      }
      this.original_name=this.data.original_name;
      this.first_air_date=this.data.first_air_date;
      this.status=this.data.status;
      for(let i=0;i<this.data.episode_run_time.length;i++){
        this.avg_run_time[i]=this.data.episode_run_time[i];
      }
      this.genre=this.data.genres;
      this.genre_len=this.data.genres.length;
      this.last_air_date=this.data.last_air_date;
      this.network=this.data.networks;
      this.no_of_epi=this.data.number_of_episodes;
      this.no_of_sesa=this.data.number_of_seasons;
      this.original_lan=this.data.original_language;
      this.overview=this.data.overview;
      this.production_cmy=this.data.production_companies;
      this.prod_len=this.production_cmy.length;
      this.rating=this.data.vote_average;
      console.log(this.data.seasons);

      if(this.prod_len.length==0){
        this.prod_len=null;
      }
      
      let j=0;
      for(let i=0;i<this.data.seasons.length;i++){
        if(this.data.seasons[i].season_number==0){
          continue;
        }else{
          console.log(this.data.seasons[i]);
          this.seasons[j]=this.data.seasons[i];
          j++;
        }
      }
      console.log(this.seasons);
     if(this.data.homepage==""){
            var watch_provider="https://api.themoviedb.org/3/tv/"+tvshow_id+"/watch/providers?"+api_key;
            this.getWatchprovider(watch_provider)
          }else{
            this.watchprovider=this.data.homepage;
          }
    })
    
  }

  getWatchprovider(url:any){
    this.http.get(url).subscribe((res)=>{
      this.watchproviderlist=res;
      console.log(url);
      
      console.log(this.watchproviderlist);
      this.watchprovider=this.watchproviderlist.results.IN.link;
    })
  }
  getSimTvshows(url:any){
    this.http.get(url).subscribe((res)=>{
      this.val= res
      this.data=this.val;

      console.log(this.data);
      
      //To get the similar tvshow details
      for(let i=0;i<this.data.results.length;i++){
        if(this.data.results[i].poster_path==null){
          this.data.results[i].poster_path="Empty";
        }
      }
      
      if(this.val.total_results==0){
        this.nosimmoviedata=null;
      }else{
        this.nosimmoviedata='data';
        this.similar_tvshows=this.data.results;
      }
    })
  }
  getRecTvshows(url:any){
    this.http.get(url).subscribe((res)=>{
      this.val= res
      this.data=this.val;
      
      console.log(this.data);
      
      // to get the recommended tvshows
      for(let i=0;i<this.data.results.length;i++){
        if(this.data.results[i].poster_path==null){
          this.data.results[i].poster_path="Empty";
        }
      }
      
      if(this.val.total_results==0){
        this.norecmoviedata=null;
      }else{
        this.norecmoviedata='data';
        this.recommended_tvshows=this.data.results;
      }
    })
  }


  getvideoData(url:any){
    this.http.get(url).subscribe((res)=>{
      this.val= res
      this.data=this.val;

      console.log(this.data);
      
      //To get all tvshows videos
      
      this.videos_data=this.data.results;
      console.log(this.videos_data);

      if(this.videos_data.length==0){
        this.novideos=null;
      }
      else{
        this.novideos="data";
          for(let i=0;i<this.videos_data.length;i++){
            if(this.videos_data[i].key){
              this.videos_data[i].key=this._sanitizer.bypassSecurityTrustResourceUrl(youtube_url+this.videos_data[i].key);
            }else{ 
              this.videos_data[i].key=null;
            }
        }
      }
    })
  }

  scrollToTop(el:any) {
    el.scrollTop = 0;
  }

  
}
