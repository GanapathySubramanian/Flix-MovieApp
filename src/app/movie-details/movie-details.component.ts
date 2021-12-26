import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';

var movie_id="",poster_path="";
const  base_url="https://api.themoviedb.org/3/movie/";
const  api_key="api_key=7636ad8cc0fec57396bc5c069605a982";
const  img_url="https://image.tmdb.org/t/p/w500";
const  youtube_url="https://www.youtube.com/embed/";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})

export class MovieDetailsComponent implements OnInit {


    
    data:any = []
    
    val:any=[]
    
    safeURL:any;
    budget:String="";
    revenue:String="";
    runtime:String="";
    original_title:string="";
    original_lan:string="";
    overview:String="";
    poster_path:any=poster_path;

    backdrop_paths:any=[];
    backdrop:any=[];
    
  
    logos:any="";
    
    release_date:String="";
    status:String="";
    rating:number=0;
    vote_count:String="";
    IMG_URL:String=img_url;
    production_cmy:any=[];
    prod_len:any;

    cast:any=[];
    crew:any=[];
    genre:any=[];
    genre_len:any;
    similar_movies:any=[];
    recommended_movies:any=[];
    videos_data:any=[];
    
    posters_data:any=[];
    review_data:any=[];
    reviews:any=[];
    
    noreview:any='data';
    novideos:any='data';
    nopost:any='data';
    nobackdrop:any='data';
    nobackdropback:any='data';
    nocastdata:any='data';
    nocrewdata:any='data'; 
    nosimmoviedata:any='data';
    norecmoviedata:any='data';
 

    background_image:any="";
    watchprovider:String="";
    watchproviderlist:any;
    constructor(private route: ActivatedRoute,private http: HttpClient,private _sanitizer:DomSanitizer) { 
      let id = this.route.snapshot.params.id;
      movie_id=id;
      this.getbackdrop(base_url+movie_id+"/images?"+api_key+"&include_image_language=en")

    }
  
    ngOnInit() {
    
    // To get the Movie Details
      var api_url=base_url+movie_id+'?'+api_key;
      this.getData(api_url)
    
    // To get the crew and cast details
      var credits=base_url+movie_id+'/credits?'+api_key;
      this.getCredits(credits)

    // To get the similar movies details
      var sim_movies=base_url+movie_id+'/similar?'+api_key;
      this.getSimMovies(sim_movies)
    
    // To get the Recommended movies details
      var rec_movies=base_url+movie_id+'/recommendations?'+api_key;
      this.getRecMovies(rec_movies)

      // To get the videos
      var video_url=base_url+movie_id+"/videos?"+api_key;
      this.getvideoData(video_url);

      //To get the Reviews
      var reviews_url=base_url+movie_id+'/reviews?'+api_key;
      this.getReviews(reviews_url)

     
  }
    float2int (value:any) {
      return value | 0;
    }
 
    
    getData(url:any){
      this.http.get(url).subscribe((res)=>{
        
          this.val= res

          //Movie details 
          this.data=this.val;

          console.log("Movies Details:");
          console.log(this.data);
          
          this.budget=this.data.budget;
          this.original_title=this.data.original_title;  
          this.original_lan=this.data.original_language;
          this.overview=this.data.overview;        
          this.release_date=this.data.release_date;
          this.status=this.data.status;
          this.revenue=this.data.revenue;
          this.runtime=this.data.runtime;
          this.rating=this.data.vote_average;
          this.vote_count=this.data.vote_count;
          this.production_cmy=this.data.production_companies;
          this.prod_len=this.production_cmy.length;
          this.genre=this.data.genres;
          this.genre_len=this.genre.length;
          this.poster_path=this.data.poster_path;

         
          if(this.data.homepage==""){
            var watch_provider="https://api.themoviedb.org/3/movie/"+movie_id+"/watch/providers?"+api_key;
            this.getWatchprovider(watch_provider)
          }else{
            this.watchprovider=this.data.homepage;
          }
  
      })
      
    }
    getbackdrop(url:any){
      this.http.get(url).subscribe((res)=>{
        this.backdrop=res;
        
        // console.log("Images : ");
        // console.log(this.backdrop);
        
        //Movie BackDrop Images
        if(this.backdrop.backdrops.length=='0'){
            this.nobackdrop=null;
            this.background_image=null;
            this.nobackdropback=null;
        }else{
          this.nobackdrop='images';
          this.nobackdropback='image';
          this.backdrop_paths=this.backdrop.backdrops;

          // console.log(this.backdrop.backdrops[0].file_path);

          this.background_image='https://image.tmdb.org/t/p/original/'+this.backdrop.backdrops[0].file_path;
          
        }
        

        //Movie Posters Images
        if(this.backdrop.posters.length==0){
          this.nopost=null;
         
        }else{
          this.posters_data=this.backdrop.posters;
         
          // console.log(this.backdrop.posters.length);
          this.nopost="data"
        }

     
        //Movie Logo Images
          if(this.backdrop.logos.length<0){
            this.logos.file_path=null;
          }else{
            this.logos=this.backdrop.logos[0];
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

      // Cast and crew Details
      this.data=this.val;

      console.log("cast & Crew : ");
      console.log(this.data);
      
      
      //Cast Details
      if(this.data.cast.length==0){
        this.nocastdata=null;
        // console.log("nodata ");
        // console.log(this.data.cast.length);
        
      }else{
        this.nocastdata='data';
        // console.log(this.data.cast.length);
        this.cast=this.data.cast;
      }

      
      //Crew Details
      if(this.data.crew.length==0){
        this.nocrewdata=null;
      }else{

        this.nocrewdata='data';
        
        this.crew=this.data.crew;
    
      
      // let jsonSamp=
      // [
      //   {
      //     name:'gana',
      //     job:'director'
      //   },
      //   {
      //     name:'venky',
      //     job:'music'
      //   },
      //   {
      //     name:'gana',
      //     job:'producer'
      //   }
      // ]
      
      // let d_crew=[
      //   {
      //     name:'',
      //     job:['']
      //   }
      // ];
      // let k=0,l=0;
      //   for(let i=0;i<jsonSamp.length;i++){
      //     for(let j=i+1;j<jsonSamp.length;j++){
      //       if(jsonSamp[i].name==jsonSamp[j].name){
      //           d_crew[k].name=jsonSamp[i].name;
      //           d_crew[k].job[l]=jsonSamp[i].job;
      //           d_crew[k].job[d_crew[k].job.length]=jsonSamp[j].job;
      //         }
      //     }
      //   }

      //   console.log(d_crew);
        

      }

    })
  }

  getSimMovies(url:any){
    this.http.get(url).subscribe((res)=>{
      this.val= res
      this.data=this.val;
    
      // console.log("Similar Movies : ");
      // console.log(this.data);
      
      
      //Similar Movies
      if(this.val.total_results==0){
       
        this.nosimmoviedata=null;
      }else{
        this.nosimmoviedata='data';
        this.similar_movies=this.data.results;
      }
    })
  }
  getRecMovies(url:any){
    this.http.get(url).subscribe((res)=>{
      this.val= res
      this.data=this.val;
      
      // console.log("Recommended Movies : ");
      // console.log(this.data);
      
      
      
      //Recommended Movies
      if(this.val.total_results==0){
        this.norecmoviedata=null;
      }else{
        this.norecmoviedata='data';
        this.recommended_movies=this.data.results;
      }
      
    })
  }


  getvideoData(url:any){
    this.http.get(url).subscribe((res)=>{
      this.val= res
      this.data=this.val;
   
      this.videos_data=this.data.results;
    
      // console.log("videos Data");
      // console.log(this.videos_data);
      
      
      //Videos Details
      if(this.videos_data.length==0){
        this.novideos=null;
      }else{
        this.novideos="data";
        for(let i=0;i<this.videos_data.length;i++){
          if(this.videos_data[i].key){
            this.videos_data[i].key=this._sanitizer.bypassSecurityTrustResourceUrl(youtube_url+this.videos_data[i].key);
          }
          else{
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

