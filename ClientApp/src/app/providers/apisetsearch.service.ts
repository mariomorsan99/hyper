import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SearchDetail, Search, ScraperConfig } from '../models/productcommerce.model';

@Injectable({
  providedIn: 'root'
})

export class ApiSetSearchService {
  private apiSearches = 'api/searches';
  searchDetail: SearchDetail;
  scraperConfig: ScraperConfig;

  constructor(private http: HttpClient) { }

  SetSearches(search: Search) {
    var searchJson = JSON.stringify(search);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.http.put<any>(this.apiSearches, searchJson, { headers: headers })
      .pipe(map(resp => resp));
  }
}
