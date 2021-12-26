import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { HttpClient } from "@angular/common/http";

var person_id="",profile_path="";
const  base_url="https://api.themoviedb.org/3/person/";
const  api_key="api_key=7636ad8cc0fec57396bc5c069605a982";
const  img_url="https://image.tmdb.org/t/p/original";


@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {

  data:any=[];
  val:any=[];
  IMG_URL:any=img_url;
  bio:any="";
  birth_date:any="";
  death_date:any;
  gender:any="";
  job:any="";
  name:any="";
  place_born:any="";
  profile_path:any="";

  credits_cast_movies:any=[];
  credits_cast_tv:any=[];
  credits_crew_movies:any=[];
  credits_crew_tv:any=[];
  external_id:any=[];
  facebook_id:any="";
  freebase_id:any="";
  freebase_mid:any="";
  imdb_id:any="";
  instagram_id:any="";
  tvrage_id:any="";
  twitter_id:any="";

  notyetdead:any=null;
  constructor(private route: ActivatedRoute,private http: HttpClient) { 
    let id = this.route.snapshot.params.id;
    person_id=id;
    // console.log(person_id);


  }
  float2int (value:any) {
    return value | 0;
  }
  getData(url:any){
    this.http.get(url).subscribe((res)=>{
        this.val= res
        this.data=this.val;
        console.log("Person Details : "+this.val); 

        this.bio=this.data.biography;
        this.birth_date=this.data.birthday;
        // this.death_date=this.data.deathday;

console.log(this.data);
        
        
        if(this.data.deathday==null){
          this.notyetdead=null;
          // console.log(this.notyetdead);
          
        }else{
          console.log('heloo');
          
          this.notyetdead='data';
          this.death_date=this.data.deathday;
        }
        if(this.data.gender==2){
          this.gender='Male'
        }else if(this.data.gender==1){
          this.gender='Female'
        }else{
          this.gender='Others'
        }
        this.job=this.data.known_for_department;
        this.name=this.data.name;
        this.place_born=this.data.place_of_birth;
        this.profile_path=this.data.profile_path;
    })
    
  }

  ngOnInit() {
    var api_url=base_url+person_id+'?'+api_key;
    this.getData(api_url)

    var movie_tvshows_credit=base_url+person_id+'/combined_credits?'+api_key;
    this.getCredits(movie_tvshows_credit)

    var external_ids=base_url+person_id+'/external_ids?'+api_key;
    this.getExternalid(external_ids)
  }

  getExternalid(url:any){
    this.http.get(url).subscribe((res)=>{
        this.external_id=res;
        console.log(this.external_id);

        if(this.external_id.facebook_id!=null && this.external_id.facebook_id){
          this.facebook_id=this.external_id.facebook_id;
        }else{
          this.facebook_id=null;
        }
        if(this.external_id.freebase_id!=null && this.external_id.freebase_id){
          this.freebase_id=this.external_id.freebase_id;
        }else{
          this.freebase_id=null;
        }
        if(this.external_id.freebase_mid!=null && this.external_id.freebase_mid){
          this.freebase_mid=this.external_id.freebase_mid;
        }else{
          this.freebase_mid=null;
        }
        if(this.external_id.imdb_id!=null && this.external_id.imdb_id){
          this.imdb_id=this.external_id.imdb_id;
        }else{
          this.imdb_id=null;
        }
        if(this.external_id.tvrage_id!=null && this.external_id.tvrage_id){
          this.tvrage_id=this.external_id.tvrage_id;
        }else{
          this.tvrage_id=null;
        }
        if(this.external_id.instagram_id!=null && this.external_id.instagram_id){
          this.instagram_id=this.external_id.instagram_id;
        }else{
          this.instagram_id=null;
        }

        if(this.external_id.twitter_id!=null && this.external_id.twitter_id){
          this.twitter_id=this.external_id.twitter_id;
        }else{
          this.twitter_id=null;
        }
    })
  }

  getCredits(url:any){
    this.http.get(url).subscribe((res)=>{
        this.val= res
        this.data=this.val;
        console.log("Cast & Crew :"+this.data);
        
        let j=0,k=0;
        for(let i=0;i<this.data.cast.length;i++){          
          if(this.data.cast[i].media_type=='movie'){
            this.credits_cast_movies[j]=this.data.cast[i];
            j++;
          }
          else if(this.data.cast[i].media_type=='tv'){
            this.credits_cast_tv[k]=this.data.cast[i];
            k++;
          }else{
            i++;
          }
        }
        

        let m=0,n=0;
        for(let i=0;i<this.data.crew.length;i++){          
          if(this.data.crew[i].media_type=='movie'){
            this.credits_crew_movies[m]=this.data.crew[i];
            m++;
          }
          else if(this.data.crew[i].media_type=='tv'){
            this.credits_crew_tv[n]=this.data.crew[i];
            n++;
          }else{
            i++;
          }
        }
    
        if(this.credits_cast_tv.length==0){
          const Elemen= window.document.getElementById("no-record_found_cast_tv");
          Elemen?.classList.remove('d-none');
        }else{
          const Elemen= window.document.getElementById("no-record_found_cast_tv");
          Elemen?.classList.add('d-none');
        }
        if(this.credits_crew_tv.length==0){
          const Elemen= window.document.getElementById("no-record_found_crew_tv");
          Elemen?.classList.remove('d-none');
        }else{
          const Elemen= window.document.getElementById("no-record_found_crew_tv");
          Elemen?.classList.add('d-none');
        }
        if(this.credits_crew_movies.length==0){
          const Elemen= window.document.getElementById("no-record_found_crew_movie");
          Elemen?.classList.remove('d-none');
        }else{
          const Elemen= window.document.getElementById("no-record_found_crew_movie");
          Elemen?.classList.add('d-none');
        }
        if(this.credits_cast_movies.length==0){
          const Elemen= window.document.getElementById("no-record_found_cast_movie");
          Elemen?.classList.remove('d-none');
        }else{
          const Elemen= window.document.getElementById("no-record_found_cast_movie");
          Elemen?.classList.add('d-none');
        }
        console.log(this.credits_crew_movies)
        console.log(this.credits_crew_tv)
    })
    
  }
  scrollToTop(el:any) {
    el.scrollTop = 0;
  }
  

}
