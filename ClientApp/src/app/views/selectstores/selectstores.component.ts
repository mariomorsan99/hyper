import { Component, OnInit, Input } from '@angular/core';
import { ApiSearchService } from '../../providers/apisearch.service';

declare var $: any;

@Component({
  selector: 'app-selectstores',
  templateUrl: './selectstores.component.html',
  styleUrls: ['./selectstores.component.scss']
})

export class SelectStoresComponent implements OnInit {

  constructor(private apiSearchService: ApiSearchService) { }
  stores: any;
  idToken: any;
  @Input() selectedStores = [];
  ngOnInit() { }

  SetupiCheck(stores: any) {
    this.stores = stores;
    $(document).ready(function () {
      $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
      });
    });
  }
}
