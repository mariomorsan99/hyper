import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchProductsService } from 'src/app/providers/searchproducts.service';

declare var $: any;

@Component({
  selector: 'app-searchdetails',
  templateUrl: './searchdetails.component.html',
  styleUrls: ['./searchdetails.component.scss']
})

export class SearchDetailsComponent implements OnInit {

  detail: any;
  idSearch: number;
  public tableDetail: any = [];
  dateSince: Date;
  public details: any;
  public tableContent: any[];
  public headerContent: any;
  public idUrl: string;
  public intPercentage: any;

  constructor(private activateRouter: ActivatedRoute, private service_search: SearchProductsService) { }

  ngOnInit() {
    $('#detail').hide();
    this.activateRouter.params.subscribe(obj => {
      this.AssignDetails(atob(obj.id));
    });
  }

  SetPercentage(schedule: any) {
    let daysDiff;
    let daysDiffNow;
    if (schedule) {
      this.dateSince = new Date(schedule.dateSince);
      const dateLast = new Date(schedule.dateUntil);
      const daysDif = this.dateSince.getTime() - dateLast.getTime();
      const days = Math.round(daysDif / (1000 * 60 * 60 * 24));
      daysDiff = days.toString();
      const resDays = daysDiff.replace('-', '');
      const daysnum = parseInt(resDays);
      const daysDifNow = this.dateSince.getTime() - Date.now();
      const daysNow = Math.round(daysDifNow / (1000 * 60 * 60 * 24));
      daysDiffNow = daysNow.toString();
      const resDaysNow = daysDiffNow.replace('-', '');
      const daysnumNow = parseInt(resDaysNow);

      if (this.dateSince.getTime() > Date.now()) {
        $('#progress').append('<small >no hay porcentaje </small>');
      }
      if (this.dateSince.getTime() < Date.now()) {
        const percentage = (daysnumNow / daysnum) * 100;
        if (Math.round(percentage) > 100) {
          this.intPercentage = 100;
        } else {
          this.intPercentage = Math.round(percentage);
        }
      }
    }
  }

  AssignDetails(idDetalle: any) {
    this.idSearch = idDetalle;
    this.idUrl = '/searchdetails/' + btoa(String(idDetalle));
    this.service_search.GetSearchDetail(this.idSearch).subscribe(obj => {
      this.SetPercentage(obj.schedule);
      this.FormatContent(obj);
      this.tableDetail = obj;
      this.LoadDataTable(obj.searchDetail);
    });
  }

  FormatContent(tableContent: any) {
    this.details = tableContent;
    this.tableContent = tableContent.searchDetail;
    this.headerContent = tableContent.schedule;
  }

  LoadDataTable(table: any) {
    $(document).ready(function () {
      $('#searchdetail').DataTable({
        data: table,
        'dom': 'lrtip',
        "language": {
          "url": "../../../assets/language.json"
        },
        columns: [
          { title: 'Comercio', data: 'commerceToken' },
          { title: 'Producto', data: 'selectedItem.itemName' },
          { title: 'Marca', data: 'selectedItem.brand' },
          { title: 'Modelo', data: 'selectedItem.model' },
          { title: 'Palabra clave', data: 'selectedItem.keyword' }
        ]
      });
    });
  }
}
