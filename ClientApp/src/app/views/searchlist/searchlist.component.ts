import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SearchProductsService } from 'src/app/providers/searchproducts.service';

declare var $: any;
import * as moment from 'moment';

@Component({
  selector: 'app-searchlist',
  templateUrl: './searchlist.component.html',
  styleUrls: ['./searchlist.component.scss']
})

export class SearchListComponent implements OnInit {
  
  public dtOptions: any = {};
  dtTrigger: any = new Subject();
  constructor(private product_s: SearchProductsService, private router: Router) { }

  ngOnInit() {
    this.product_s.GetSearchList().subscribe(result => {
      this.LoadDatatable(result);
    });
  }

  LoadDatatable(table: any) {

    moment.locale('es');
    $.fn.dataTable.Buttons.defaults.dom.button.className = 'btn btn-default';
    $('#searchlist').DataTable({
      data: table,
      "language": {
        "url": "../../../assets/language.json"
      },
      order: [[1, 'desc']],
      dom: '<"html5buttons"B>lTfgitp',
      buttons: [
        { extend: 'copy', text: 'Copiar' },
        {
          extend: 'collection',
          text: 'Exportar',
          buttons: [
            {
              extend: 'pdf',
              title: 'ExampleFile',
              exportOptions: {
                columns: [1, 2, 3, 4]
              },
              autoWidth: true,
              customize: function (doc) {
                doc.styles.tableHeader.fontSize = 12;
                doc.defaultStyle.fontSize = 12;
                doc.content[1].table.widths =
                  Array(doc.content[1].table.body[0].length + 1).join('*').split('');
                doc.content[1].margin = [100, 0, 100, 0];
              },
              autoclose: true,
              fade: true
            },
            {
              extend: 'excel',
              exportOptions: {
                columns: [1, 2, 3, 4]
              },
              autoclose: true,
              fade: true
            },
            {
              extend: 'csv',
              exportOptions: {
                columns: [1, 2, 3, 4]
              },
              autoclose: true,
              fade: true
            },
          ]
        },
      ],
      columnDefs: [
        {
          targets: 4,
          data: 'Estatus',
          render: function (data, type, row, meta) {
            var icon;
            switch (data) {
              case 0: {
                icon = '<span class="label label-default">Inactivo</span>';
                break;
              }
              case 1: {
                icon = '<span class="label label-primary">Activo</span>';
                break;
              }
              case 2: {
                icon = '<span class="label label-warning">Pausada</span>';
                break;
              }
              case 4: {
                icon = '<span class="label label-default">Cadudo</span>';
                break;
              }
              case 3: {
                icon = '<span class="label label-danger">Cancelado</span>';
                break;
              }
              default: {
                icon = data;
                break;
              }
            }
            return icon;
          }
        },
        {
          targets: 3,
          data: 'schedule.concurrentSchedule',
          render: function (data, type, row, meta) {
            return data + ' ' + 'hrs.';
          }
        }
      ],
      columns: [
        { title: 'Nombre', data: 'name' },
        {
          title: 'Fecha inicial', data: 'schedule.dateSince', render: function (data, type, row, meta) {
            return moment(data).format('D MMMM YYYY');
          }
        },
        {
          title: 'Fecha final', data: 'schedule.dateUntil', render: function (data, type, row, meta) {
            return moment(data).format('D MMMM YYYY');
          }
        },
        { title: 'Frecuencia', data: 'schedule.concurrentSchedule' },
        { title: 'Estatus', data: 'status', className: 'text-center' },
        {
          title: 'Acción', data: 'concurrentSchedule', className: 'text-right', render: function (data, type, full, meta) {
            return '<button id="btnEditar" type="button" class="btn-white btn btn-xs">Editar</button> <button id="btnDetalle" type="button" class="btn-white btn btn-xs">Detalle</button>';
          }
        }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('button', row).unbind('click');
        $('#btnEditar', row).bind('click', () => {
          self.CallEditSearch(data);
        });
        $('#btnDetalle', row).bind('click', () => {
          self.CallSearchDetail(data);
        });
        return row;
      }
    });
  }

  CallEditSearch(info: any): void {
    this.router.navigate(["searches/edit/" + btoa(String(info.id))]);
  }

  CallSearchDetail(info: any): void {
    this.router.navigate(["searches/" + btoa(String(info.id))]);
  }
}
