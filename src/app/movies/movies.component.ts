import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormArray,FormControl,FormGroup } from '@angular/forms';

var sort_by_id="popularity.desc",page=1,Search_value="",genre_id="";
var sorts_by='Movies Trending Now';


//APIKEY for TMDB
const api_key="api_key=7636ad8cc0fec57396bc5c069605a982";

//Base url fro TMDB
const base_url="https://api.themoviedb.org/3";

//Popular movies list in TMDB - latest movies
const api_url=base_url+'/discover/movie?sort_by='+sort_by_id+'&'+api_key+'&page='+page;

//Base url for images - Posters
const img_url="https://image.tmdb.org/t/p/w500/";

//For searching 
const SEARCH_URL=base_url+"/search/movie?"+api_key;


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

 
  IMG_URL:String=img_url;

  data:any = []
  
  val:any=[]
  changeText:any;
  page:any=page;
  genre:any="";
  sorts_by:any=sorts_by;
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
  if(Search_value==" "|| Search_value==""){
    sort_by_id="popularity.desc";
   
    this.sorts_by='Movies Trending Now';
    this.getData(api_url)
  }else{

    this.sorts_by=Search_value;
    this.getData(SEARCH_URL+'&query='+Search_value+'&page='+page);
  }
 }

  float2int (value:any) {
    return value | 0;
  }
  postData(){
    page=1;
    this.page=page;
    this.genre="";
    Search_value=this.searchForm.value.movieName;
      if(Search_value){
        
        this.sorts_by=Search_value;
        
        this.getData(SEARCH_URL+'&query='+Search_value+'&page='+page);
      }
      else{
        sort_by_id="popularity.desc";
        this.sorts_by='Movies Trending Now';
        this.getData(api_url)  
      }
  }
  
  getData(url:any){
    
    this.http.get(url).subscribe((res)=>{
      this.val= res
      this.data=this.val.results;
      console.log("Movies : ");
      console.log(this.data);
      if(this.val.total_results==0){
        const Elemen= window.document.getElementById("no-record");
        Elemen?.classList.remove('d-none');
      }else{
        const Elemen= window.document.getElementById("no-record");
        Elemen?.classList.add('d-none');
      }
      
      if(this.data.length<20){
        const Element = window.document.getElementById("pagination");
      Element?.classList.add('d-none');
      }else{
        const Element = window.document.getElementById("pagination");
      Element?.classList.remove('d-none');
      }
    })
  }

  
  onSort(filter:any){
    sort_by_id=filter;
      if(Search_value==""){
        console.log(sort_by_id);
        switch(sort_by_id){
          case 'popularity.desc': 
              this.sorts_by='Movies Trending Now';
              break;
          case 'popularity.asc': 
              this.sorts_by='Old Trend Movies';
              break;
          case 'vote_average.desc': 
              this.sorts_by='Top Rated Movie';
              break;
          case 'vote_average.asc': 
              this.sorts_by='Low Rated Movies';
              break;
          case 'release_date.desc':
              this.sorts_by='Movies based on Release Date Descending';
              break;
          case 'release_date.asc':
              this.sorts_by='Movies based on Release Date Ascending';
              break;
          case 'original_title.desc': 
              this.sorts_by='Z To A Movies';
              break;
          case 'original_title.asc': 
              this.sorts_by='A To Z Movies';
              break;
          case 'revenue.desc': 
              this.sorts_by='Top Grossing Movies';
              break;
          case 'revenue.asc': 
              this.sorts_by='Low Grossing Movies';
              break;
          default:
            this.sorts_by='Movies Trending Now';
        }
        page=1;
        this.page=page;
        var sort_api_url=base_url+'/discover/movie?sort_by='+sort_by_id+'&'+api_key+'&page='+page+'&with_genres='+genre_id;
        this.getData(sort_api_url);
      }else{
        console.log(sort_by_id);
        page=1;
        this.page=page;
        var sort_api_url=SEARCH_URL+'&query='+Search_value+'&page'+page;
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
      var page_api_url=base_url+'/discover/movie?sort_by='+sort_by_id+'&'+api_key+'&page='+page+'&with_genres='+genre_id;
      this.getData(page_api_url);
    }
    else{
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
        page=1;
        this.page=page;
        switch(genre_id){
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
        var genre_api_url=base_url+'/discover/movie?'+api_key+'&page='+page+'&with_genres='+genre_id+'&sort_by='+sort_by_id;
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

