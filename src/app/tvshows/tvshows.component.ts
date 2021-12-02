import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormArray,FormControl,FormGroup } from '@angular/forms';


var sort_by_id="popularity.desc",page=1,Search_value="",genre_id="";
var sorts_by='Tvshows Trending Now'
//APIKEY for TMDB
const api_key="api_key=7636ad8cc0fec57396bc5c069605a982";
//Base url fro TMDB

const base_url="https://api.themoviedb.org/3/discover/tv?";
//Popular tvshows list in TMDB - latest tvshows
var api_url=base_url+api_key+'&sort_by='+sort_by_id+'&page='+page;

//Base url for images - Posters
const img_url="https://image.tmdb.org/t/p/w500/";

const SEARCH_URL="https://api.themoviedb.org/3/search/tv?"+api_key;

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.css']
})
export class TvshowsComponent implements OnInit {

  

  IMG_URL:String=img_url;


  data:any = []
  
  val:any=[]
  sorts_by:any=sorts_by;
  genre:any="";
  page:any=page;

  searchForm:FormGroup;

 constructor(private http: HttpClient) {
   this.searchForm=new FormGroup({
     'movieName':new FormControl("")
   });
 }

 ngOnInit() {
  page=1;
  this.page=1;
  this.genre="";
  genre_id="";
    if(Search_value==""){
      sort_by_id="popularity.desc";
      this.sorts_by='Tvshows Trending Now';
      this.getData(api_url)
    }else{
      this.sorts_by=Search_value;
      this.getData(SEARCH_URL+'&query='+Search_value+'&page='+page);
    }
  
}

  postData(){
    page=1;
    this.page=page;
    this.genre="";

    console.log(this.searchForm.value.movieName);
    Search_value=this.searchForm.value.movieName;
    if(Search_value){
      this.sorts_by=Search_value;
      this.getData(SEARCH_URL+'&query='+Search_value);
  }else{
    
    this.sorts_by='Tvshows Trending Now';
    this.getData(api_url)
  }

}

float2int (value:any) {
  return value | 0;
}
  getData(url:any){
    
    this.http.get(url).subscribe((res)=>{
      this.val= res
      this.data=this.val.results;
      console.log("Tvshows Datas :");
      
      console.log(this.data);
      if(this.data.length==0){
        const Elemen= window.document.getElementById("no-record");
        Elemen?.classList.remove('d-none')
      }else{
        const Elemen= window.document.getElementById("no-record");
        Elemen?.classList.add('d-none');
      }
      if(this.data.length<20){
        const Element = window.document.getElementById("pagination");
      Element?.classList.add('d-none');
      }
      else{
        const Element = window.document.getElementById("pagination");
      Element?.classList.remove('d-none');
      }
    })
  }


  
  
  
  onSort(filter:any){
    
    sort_by_id=filter;
    console.log(filter)
    if(Search_value==""){
      switch(sort_by_id){
        case 'popularity.desc': 
            this.sorts_by='Tvshows Trending Now';
            break;
        case 'popularity.asc': 
            this.sorts_by='Old Trend Tvshows';
            break;
        case 'vote_average.desc': 
            this.sorts_by='Top Rated Tvshows';
            break;
        case 'vote_average.asc': 
            this.sorts_by='Low Rated Tvshows';
            break;
        case 'first_air_date.desc':
            this.sorts_by='Tvshows based on Release Date Descending';
            break;
        case 'first_air_date.asc':
            this.sorts_by='Tvshows based on Release Date Ascending';
            break;
        default:
          this.sorts_by='Tvshows Trending Now';
      }
      page=1;
      this.page=page;
      
     var sort_api_url=base_url+api_key+'&language=en-US&sort_by='+sort_by_id+'&page='+page+'&with_genres='+genre_id;
     this.getData(sort_api_url);
    }else{
      page=1;
      console.log(sort_by_id);
      this.page=page;
        var sort_api_url=SEARCH_URL+'&query'+Search_value+'&page='+page;
        this.getData(sort_api_url);
    }
     
 
 }

 
  handlePagination(val:any){
    if(Search_value==""){
      if(val==1){
        page=1;
        this.page=page;
      }else if(val==2){
        if(page==1){
          alert('Page Starts here');
        }else{
          page--;
          this.page=page;
        }
      }else{
        page++;
        this.page=page;
      }
      var page_api_url=base_url+api_key+'&language=en-US&sort_by='+sort_by_id+'&with_genres='+genre_id+'&page='+page;
      this.getData(page_api_url);
    }else{
      if(val==1){
        page=1;
        this.page=page;
      }else if(val==2){
        if(page==1){
          alert('Page Starts here');
        }else{
          page--;
          this.page=page;
        }
      }else{
        page++;
        this.page=page;
      }
      var page_api_url=SEARCH_URL+'&query='+Search_value+'&page='+page;
      this.getData(page_api_url);
    }
    }
   
    getGenre(id:any){
      genre_id=id;
      if(Search_value==""){
        console.log(genre_id);
        console.log(page);
        switch(genre_id){
          case '10759':
            this.genre='Action & Adventures Tvshows';
            break;
          case '16':
            this.genre='Animation Tvshows';
            break;
          case '35':
            this.genre='Comedy Tvshows';
            break;
          case '80':
            this.genre='Crime Tvshows';
            break;
          case '99':
            this.genre='Documentary Tvshows';
            break;
          case '18':
            this.genre='Drama Tvshows';
            break;
          case '10751':
            this.genre='Family Tvshows';
            break;
          case '10762':
            this.genre='Kids Tvshows';
            break;
          case '9648':
            this.genre='Mystery Tvshows';
            break;
          case '10763':
            this.genre='News Tvshows';
            break;
          case '10764':
            this.genre='Reality Tvshows';
            break;
          case '10765':
            this.genre='Science-Fiction & Fantacy Tvshows';
            break;
          case '10766':
            this.genre='Soap Tvshows';
            break;
          case '10767':
            this.genre='Talk Tvshows';
            break;
          case '10768':
            this.genre='War & Politics Tvshows';
            break;
          case '37':
            this.genre='Western Tvshows';
            break;
          default:
            this.genre="";
        }
        page=1;
        this.page=page;
        var genre_api_url=base_url+api_key+'&page='+page+'&with_genres='+genre_id+'&sort_by='+sort_by_id;
        this.getData(genre_api_url);
      }else{
        page=1;
        this.page=page;
        var genre_api_url=SEARCH_URL+'&query='+Search_value+'&page='+page;
        this.getData(genre_api_url);
      }
    }
    scrollToTop(el:any) {
      el.scrollTop = 0;
    }
  
    
    
}



