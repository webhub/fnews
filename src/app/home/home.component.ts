import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../services/news-api.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  h1Style: boolean = false;

  mArticles:Array<any>;
  mSources:Array<any>;

  constructor(private newsapi:NewsApiService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));

    console.log('app component constructor called'); 
  }

  ngOnInit() {
    //load articles
    this.newsapi.initArticles().subscribe(data => this.mArticles = data['articles']);
    //load news sources
    this.newsapi.initSources().subscribe(data=> this.mSources = data['sources']);  
  }

  searchArticles(source){
    console.log("selected source is: "+source);
    this.newsapi.getArticlesByID(source).subscribe(data => this.mArticles = data['articles']);
  }

  firstClick() {
    this.h1Style = !this.h1Style;
  }

}
