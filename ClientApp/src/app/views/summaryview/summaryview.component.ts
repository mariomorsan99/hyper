import { Component, OnInit, Input } from '@angular/core';
import { Search, SearchView } from '../../models/productcommerce.model';

@Component({
  selector: 'app-summaryview',
  templateUrl: './summaryview.component.html',
  styleUrls: ['./summaryview.component.scss']
})

export class SummaryViewComponent implements OnInit {

  @Input() SearchStep4 = Search;

  public Keyword: any;
  public Name: any;
  public DateSince: any;
  public DateUntil: any;
  public Frequency: any;
  public searchDetail: any;
  public searchView = new SearchView();
  tableSummary: any;

  constructor() { }

  ngOnInit() {
    var searchViewArray = new Array();
    this.searchView.CommerceToken = searchViewArray;
  }

  CargaDatatable(tabla: any) {
    this.tableSummary = tabla;
  }
}
