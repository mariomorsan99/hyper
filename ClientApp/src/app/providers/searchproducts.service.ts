import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SearchProductsService {

  private apiUrlSearches = "api/searches";
  public Headers: Headers;

  constructor(private http: HttpClient) {
    this.Headers = new Headers();
    this.Headers.append('Content-Type', 'application/json');
  }

  GetSearchList() {
    return this.http.get(this.apiUrlSearches)
      .pipe(map(resp => resp));
  }

  GetSearchDetail(idDetail: number): Observable<any> {
    return this.http.get(this.apiUrlSearches + '/' + String(idDetail))
      .pipe(map(resp => resp));
  }
}
