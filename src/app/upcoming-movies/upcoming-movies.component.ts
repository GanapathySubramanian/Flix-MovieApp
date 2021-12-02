import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

var page=1,genre="";



//APIKEY for TMDB
const api_key="api_key=7636ad8cc0fec57396bc5c069605a982";

//Base url fro TMDB
const base_url="https://api.themoviedb.org/3";

//Popular movies list in TMDB - latest movies
const api_url=base_url+'/movie/upcoming?'+api_key+'&page='+page;

//Base url for images - Posters
const img_url="https://image.tmdb.org/t/p/w500/";


@Component({
  selector: 'app-upcoming-movies',
  templateUrl: './upcoming-movies.component.html',
  styleUrls: ['./upcoming-movies.component.css']
})
export class UpcomingMoviesComponent implements OnInit {

  IMG_URL:String=img_url;

  data:any = []
  
  val:any=[]
  
  page:any=page;

  genre:any="";
  total_pages:any=0;
  
  constructor(private http: HttpClient) {
  }
  
 ngOnInit() {
  genre="";
  page=1;
  this.page=1;
  this.getData(api_url)
}
getData(url:any){
    
  this.http.get(url).subscribe((res)=>{
    this.val= res
    this.data=this.val.results;
   
    this.total_pages=this.val.total_pages;
    console.log(this.data);

    if(this.data.length<20){
      const Element = window.document.getElementById("pagination");
    Element?.classList.add('d-none');
    }else{
      const Element = window.document.getElementById("pagination");
    Element?.classList.remove('d-none');
    }

  })
}

float2int (value:any) {
  return value | 0;
}

handlePagination(val:any){
 
    if(val==1){
      page=1;
      this.page=page;
    }
    else if(val==2){
      if(page==1){
        alert('Page Starts Here');
      }else{
        page--;
        this.page=page;
      }
    }
    else{
      if(page!=this.total_pages){
        page++;
      this.page=page;
      }else{
        alert('page Ends Here');
      }
      
    }
    var page_api_url=base_url+'/movie/upcoming?'+api_key+'&page='+page+'&with_genres='+genre;
    this.getData(page_api_url);
  
  }

  getGenre(id:any){
    genre=id;

      page=1;
      this.page=page;
      switch(genre){
        case '28':
          this.genre='Action Movies';
          break;
        case '12':
          this.genre='Adventures Movies';
          break;
        case '16':
          this.genre='Animation Movies';
          break;
        case '35':
          this.genre='Comedy Movies';
          break;
        case '80':
          this.genre='Crime Movies';
          break;
        case '99':
          this.genre='Documentry';
          break;
        case '18':
          this.genre='Drama Movies';
          break;
        case '10751':
          this.genre='Family Movies';
          break;
        case '14':
          this.genre='Fantasy Movies';
          break;
        case '36':
          this.genre='History Movies';
          break;
        case '27':
          this.genre='Horror Movies';
          break;
        case '10402':
          this.genre='Music Movies';
          break;
        case '9648':
          this.genre='Mystery Movies';
          break;
        case '10749':
          this.genre='Romance Movies';
          break;
        case '878':
          this.genre='Science Fiction Movies Movies';
          break;
        case '10770':
          this.genre='Tv Movies';
          break;
        case '53':
          this.genre='Thriller Movies';
          break;
        case '10752':
          this.genre='War Movies';
          break;
        case '37':
          this.genre='Western Movies';
          break;
        default:
          this.genre="";
      }
      var genre_api_url=base_url+'/movie/upcoming?'+api_key+'&page='+page+'&with_genres='+genre;
      this.getData(genre_api_url);
    }
    
  
    scrollToTop(el:any) {
      el.scrollTop = 0;
    }
  
    
}
