import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CommerceToken, SearchDetail, Search } from 'src/app/models/searchdetailsmodel';
import { ScraperConfig } from '../models/productcommerce.model';

@Injectable({
  providedIn: 'root'
})
export class ApiSearchService {

  SearchDetail: any[];
  keywordJson: any;
  commerceJson: any;
  commerceList: any = [];
  obj: any;
  commerce: any;
  tempCommerce: any = [];
  private apiUrlScraperSearch = "api/scraper/search";
  private apiUrlScraperSearchDetail = "api/scraper/searchdetail";
  private apiUrlStores = "api/commerces";
  commerceToken: CommerceToken;
  jsonTemp: any[];
  jsonResult: any;
  jsonResultAll: any;
  commersToken: any;
  commersTokenAll: any = [];
  constructor(private http: HttpClient) { }
  searchDetail: SearchDetail

  GetStores() {
    return this.http.get(this.apiUrlStores).pipe(map(resp => resp));
  }

  ScraperSearch(kerword: string, commerceToken: string, commerceList: any[]) {
    this.keywordJson = kerword;
    this.commerceJson = commerceToken;
    this.commerceList = commerceList;
    var search = new Search();
    search.Keyword = kerword;
    var commerceTokenArray = new Array();
    commerceList.forEach(element => {
      var ct = new CommerceToken();
      ct.CommerceToken = element;
      commerceTokenArray.push(ct);
    });
    search.SearchDetail = commerceTokenArray;
    var searchJson = JSON.stringify(search);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.http.post(this.apiUrlScraperSearch, searchJson, { headers: headers })
      .pipe(map(resp => resp));
  }

  ScraperSearchDetail(scrapperConfig: ScraperConfig): any {
    var scraperConfigJson = JSON.stringify(scrapperConfig);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.http.post(this.apiUrlScraperSearchDetail, scraperConfigJson, { headers: headers })
      .pipe(map(resp => resp));
  }
}
