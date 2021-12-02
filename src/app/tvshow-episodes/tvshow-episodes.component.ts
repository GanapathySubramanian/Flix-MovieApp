import { Component, OnInit } from '@angular/core';

import {Router, ActivatedRoute, Params} from '@angular/router';
import { HttpClient } from "@angular/common/http";

var tvshow_id="",season_id="";
const base_url="https://api.themoviedb.org/3/tv/";
const api_key="api_key=7636ad8cc0fec57396bc5c069605a982";
const img_url="https://image.tmdb.org/t/p/w500";
const youtube_url="https://www.youtube.com/embed/";

@Component({
  selector: 'app-tvshow-episodes',
  templateUrl: './tvshow-episodes.component.html',
  styleUrls: ['./tvshow-episodes.component.css']
})
export class TvshowEpisodesComponent implements OnInit {


  val:any=[];
  data:any=[];
  episodes:any=[];
  tvshow_name:String='';
  season_no:String;
  IMG_URL:any=img_url;
  all_Images:any="";
  logos:any=[];

  noLogos:any="";
  constructor(private route: ActivatedRoute,private http: HttpClient) { 
    let id = this.route.snapshot.params.tvshowid;
    let sea_id = this.route.snapshot.params.season;
    let logo = this.route.snapshot.params.tvshow_name;
    tvshow_id=id;
    season_id=sea_id;
    this.season_no=sea_id;
    this.tvshow_name=logo;
    console.log(tvshow_id+" "+season_id+" "+this.tvshow_name);
  }

  ngOnInit() {
    var api_url=base_url+tvshow_id+'/season/'+season_id+'?'+api_key;
    this.getData(api_url);

  this.getLogo(base_url+tvshow_id+"/images?"+api_key+"&include_image_language=en")
}

float2int (value:any) {
  return value | 0;
}

getLogo(url:any){
  this.http.get(url).subscribe((res)=>{
    this.all_Images=res;
    console.log(this.all_Images);
    
    if(this.all_Images.logos.length<=0){
      this.noLogos=null;
    }else{
      this.noLogos="data";
      this.logos=this.all_Images.logos[0];
    }
  })
}
  getData(url:any){
    this.http.get(url).subscribe((res)=>{
      this.val= res
      this.data=this.val;
      console.log(this.data);
      this.episodes=this.data.episodes;
    })
  }

  scrollToTop(el:any) {
    el.scrollTop = 0;
  }

  
}
