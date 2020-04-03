import { Component, OnInit, ContentChild, ViewChild } from '@angular/core';
import { OutlookViewComponent } from '../outlookview/outlookview.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SelectStoresComponent } from '../selectstores/selectstores.component';
import { ProgrammingViewComponent } from '../programmingview/programmingview.component';
import { Search, SearchDetail, Schedule, SelectedItem } from '../../models/productcommerce.model';
import { SummaryViewComponent } from '../summaryview/summaryview.component';
import { ApiSetSearchService } from '../../providers/apisetsearch.service';
import { ActiveProduct } from '../../models/outlookview.model';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchProductsService } from 'src/app/providers/searchproducts.service';
import { Commerce } from 'src/app/models/commerce.model';
import { ApiSearchService } from 'src/app/providers/apisearch.service';

declare var $: any;
declare var toastr: any;
import * as moment from 'moment';
import * as Ladda from 'ladda';

@Component({
  selector: 'app-wizardtemplate',
  templateUrl: './wizardtemplate.component.html',
  styleUrls: ['./wizardtemplate.component.scss']
})

export class WizardTemplateComponent implements OnInit {

  @ContentChild(WizardTemplateComponent, { static: false }) public wizardComponent: WizardTemplateComponent;
  @ViewChild(SelectStoresComponent, { static: false }) public selectStoreComponent: SelectStoresComponent;
  @ViewChild(OutlookViewComponent, { static: false }) public searchItemComponent: OutlookViewComponent;
  @ViewChild(ProgrammingViewComponent, { static: false }) public scheduleComponent: ProgrammingViewComponent;
  @ViewChild(SummaryViewComponent, { static: false }) public summaryComponent: SummaryViewComponent;

  storeList: any[] = [];
  forma: FormGroup;
  keyboardData: any;
  nameNext: string;
  public search = new Search();
  public searchStep3 = new Search();
  searchDetail = new SearchDetail();
  selectedItem = new SelectedItem();
  detailArrayStep2 = new Array();
  activeProduct: ActiveProduct;
  currentIndex = 0;
  editSearch: boolean;
  loadingProgram: boolean;
  resultcommerce: any;
  recoveredSchedule: any;
  recoveredSearchName: any;
  recoveredSearchdetail: any;
  recoveredCommerces: any;
  localItemBusiness: any;
  recoveredId: any;

  constructor(private apiSearchService: ApiSearchService, private apisetsearchService: ApiSetSearchService, private router: Router, private activatedRoute: ActivatedRoute, private recoverSearch: SearchProductsService) {
    this.forma = new FormGroup({
      'busquedaControl': new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern('[A-Za-z0-9]{1,25}')]),
    });

    this.forma.controls['busquedaControl'].valueChanges.subscribe(data => {
      this.keyboardData = data;
    });
  }

  ngOnInit() {
    this.ValidateMode();
    this.DisableTabNavigation();
    this.nameNext = 'Siguiente';
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "progressBar": true,
      "preventDuplicates": true,
      "positionClass": "toast-top-right",
      "onclick": null,
      "showDuration": "400",
      "hideDuration": "500",
      "timeOut": "2000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
  }

  GetCommerce(id: any) {
    this.apiSearchService.GetStores().subscribe(result => {
      this.resultcommerce = result;
      if (this.editSearch) {
        this.AssignDetails(id);
      } else {
        this.recoveredSearchName = "Nueva búsqueda"
        this.selectStoreComponent.SetupiCheck(this.resultcommerce);
      }
    });
  }

  ValidateMode() {
    this.activatedRoute.params.subscribe(params => {
      if (params["id"] == undefined) {
        this.editSearch = false;
        this.GetCommerce("");
      } else {
        this.editSearch = true;
        this.GetCommerce(atob(params.id));
      }
    })
  }

  AssignDetails(idDetail: any) {
    this.recoverSearch.GetSearchDetail(idDetail).subscribe(details => {
      this.recoveredId = details.id;
      this.recoveredSchedule = details.schedule;
      this.recoveredSearchName = details.name;
      this.recoveredSearchdetail = details.searchDetail;
      this.recoveredCommerces = details.searchDetail.map(function (obj) {
        return obj.commerceToken;
      });
      let commerceModel = new Array();
      this.resultcommerce.forEach(commerce => {
        var checkCommerce = new Commerce();
        checkCommerce.id = commerce.id;
        checkCommerce.name = commerce.name;
        checkCommerce.token = commerce.token;
        details.searchDetail.map(function (obj) {
          return obj.commerceToken;
        }).includes(commerce.token) ?
          (checkCommerce.isChecked = true, checkCommerce.isDisabled = true) :
          (checkCommerce.isChecked = false, checkCommerce.isDisabled = false);
        commerceModel.push(checkCommerce);
      });
      this.selectStoreComponent.SetupiCheck(commerceModel);
    });
  }

  SetupScroll() {
    $('.full-height-scroll').slimScroll({
      height: 'auto'
    });
  }

  CreateObjectStep3(commerItems2: any[], isEdit: boolean) {
    this.searchItemComponent.CreateDetails(commerItems2, true, this.selectStoreComponent.stores);
    this.search.SearchDetail = this.searchItemComponent.search.SearchDetail;
    if (isEdit) {
      this.search.Id = this.recoveredId;
    }
    this.search.Keyword = this.searchItemComponent.keyboardData;
  }

  CreateObjectStep4() {
    if (this.editSearch == true) {
      this.searchStep3.Id = this.recoveredId;
    }
    this.searchStep3.Name = this.scheduleComponent.keyboardSearch;
    this.searchStep3.Status = 1;
    this.searchStep3.CurrentDate = new Date();
    this.summaryComponent.Name = this.scheduleComponent.keyboardSearch;
    var schedule = new Schedule();
    var scheduleArray = new Array();
    this.summaryComponent.DateSince = this.scheduleComponent.scheduleForm.get('dateSince').value;
    this.summaryComponent.DateUntil = this.scheduleComponent.scheduleForm.get('dateUntil').value;
    this.summaryComponent.Frequency = this.scheduleComponent.scheduleForm.get('frequencyControl').value;
    schedule.DateSince = this.scheduleComponent.startDate;
    schedule.DateUntil = this.scheduleComponent.endDate;

    const frecuecyN = 0;
    let frecuencyNum = 0;
    if (this.summaryComponent.Frequency.indexOf('hora')) {
      frecuencyNum = parseInt(this.summaryComponent.Frequency.replace('hora', ''), frecuecyN);
    } else {
      frecuencyNum = parseInt(this.summaryComponent.Frequency.replace('horas', ''), frecuecyN);
    }

    schedule.ConcurrentSchedule = frecuencyNum;
    var dateNow = new Date().toISOString();
    schedule.LastExecution = dateNow;
    scheduleArray.push(schedule);
    this.searchStep3.Schedule = schedule;
    this.searchStep3.SearchDetail = this.searchItemComponent.search.SearchDetail;
  }

  ChangeStep(index: any) {
    switch (index) {
      case 0:
        $('#tabstore').tab('show');
        break;

      case 1:
        $('#taboutlook').tab('show');
        break;

      case 2:
        this.loadingProgram = false;
        this.CreateObjectStep3(this.searchItemComponent.selectedCommerces, this.editSearch);
        this.nameNext = "Siguiente";
        $('#tabprogramming').tab('show');
        break;

      case 3:
        this.loadingProgram = false;
        if (this.ValidateStartDate(this.editSearch)) {
          this.CreateObjectStep4();
          this.summaryComponent.DateSince = this.scheduleComponent.startDate;
          this.summaryComponent.DateUntil = this.scheduleComponent.endDate;
          this.summaryComponent.CargaDatatable(this.searchItemComponent.selectedCommerces);
          this.nameNext = "Programar Búsqueda";
          $('#tabsummary').tab('show');
          this.loadingProgram = true;
        } else {
          toastr.error('¡La fecha inicial debe ser mayor a la fecha actual de la busqueda!', '');
          this.currentIndex -= 1;
        }
        break;

      case 4:
        if (this.loadingProgram) {
          var loadingButton = Ladda.create(document.querySelector('#btnprogram'));
          loadingButton.start();
          this.CallServiceSetProduct();
          return '';
        } else {
          index = 3;
          this.ChangeStep(index);
        }

    }
  }

  ValidateStartDate(isEdit: boolean) {
    var isValidDate = false;
    if (isEdit) {
      var dateNow = new Date(moment().format('YYYY-MM-D 00:00:00'));
      if (this.scheduleComponent.fetchDateSince.getTime() == this.scheduleComponent.updateStartDate.getTime() || this.scheduleComponent.updateStartDate.getTime() >= dateNow.getTime()) {
        isValidDate = true;
      }
    } else {
      isValidDate = true;
    }
    return isValidDate;
  }

  PreviousStep() {
    if (this.currentIndex >= 1) {
      this.currentIndex -= 1;
      if (this.currentIndex == 0) {
        this.DeleteObjetctStep2();
      }
      this.ChangeStep(this.currentIndex);
    }
  }

  NextStep() {
    if (this.currentIndex === 0) {
      this.ValidateFirstStep();
    }
    if (this.searchItemComponent.displayListPersistent === [] || this.searchItemComponent.displayListPersistent.length === 0) {
      toastr.error('Debe de seleccionar algun comercio para poder continuar', '');
      return;
    }
    if (this.currentIndex == 1) {
      if (this.searchItemComponent.selectedCommerces === [] || this.searchItemComponent.selectedCommerces.length === 0) {
        toastr.error('Debe seleccionar al menos un artículo de un comercio para poder continuar', '');
        return;
      }
    }
    if (this.currentIndex == 2) {
      this.scheduleComponent.GetRangedDates();
      if (!this.scheduleComponent.addDates) {
        return;
      }
      if (this.scheduleComponent.scheduleForm.invalid) {
        toastr.error('Debe escribir un nombre a la búsqueda', '');
        return;
      }
    }
    if (this.currentIndex < 4) {
      this.currentIndex += 1;
    }
    this.ChangeStep(this.currentIndex);
  }

  CallServiceSetProduct() {
    this.apisetsearchService.SetSearches(this.searchStep3).subscribe(() => {
      if (this.editSearch) {
        toastr.success('Su búsqueda se ha actualizado correctamente', 'Exito');
      } else {
        toastr.success('Su búsqueda se programó correctamente', 'Exito');
      }
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(["searches"]));
    }, error => {
      var loadingButton = Ladda.create(document.querySelector('#btnprogram'));
      loadingButton.stop();
      console.log(error);
      this.currentIndex -= 1;
      toastr.error('Servicio no disponible', 'Error');
    });
  }

  DeleteObjetctStep2() {
    this.searchItemComponent.search.SearchDetail = [];
    this.searchItemComponent.formsearch.reset({
      busquedaControl: ''
    });
    this.searchItemComponent.itemsCommerce = [];
    this.searchItemComponent.displayList = [];
  }

  ValidateFirstStep() {
    var searchItem = this.searchItemComponent;
    var favorite = [];
    $.each($("input[name='checkCommerce']:checked"), function () {
      favorite.push($(this).val());
    });
    searchItem.items = favorite;
    if (this.editSearch) {
      var joinStores = [...new Set([...this.recoveredCommerces, ...favorite])];
      searchItem.RenderCommerce(joinStores);
      searchItem.LoadSearchToEdit(this.recoveredSearchdetail, this.editSearch);
      this.scheduleComponent.RecoverSchedule(this.recoveredSearchName, this.recoveredSchedule);
      this.localItemBusiness = searchItem.itemsBussines;
    } else {
      searchItem.RenderCommerce(favorite);
    }
  }

  DisableTabNavigation() {
    $(".nav-item a[data-toggle=tab]").on("click", function (e) {
      e.preventDefault();
      return false;
    });
  }
}
