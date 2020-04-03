import { Component, OnInit, Input, Output, Renderer2, ElementRef, DoCheck, ContentChild } from '@angular/core';
import { ApiSearchService } from '../../providers/apisearch.service';
import { FormGroup, FormControl, Validator, FormControlName, Validators, FormArray } from '@angular/forms';
import { CommerceItem, ResultModel } from '../../models/searchdetailsmodel';
import { ProgrammingViewComponent } from '../programmingview/programmingview.component';
import { Search, SearchDetail, Schedule, ScheduleToken, SelectedItem, ScraperConfig } from '../../models/productcommerce.model';
import { ApiSetSearchService } from '../../providers/apisetsearch.service';
import { ActiveProduct, Radio, ModelBrand, ItemsCommerce, ActiveComerce } from '../../models/outlookview.model';
import * as Ladda from 'ladda';
import { SearchInfo, Item } from 'src/app/models/recoverlist.model';

declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-outlookview',
  templateUrl: './outlookview.component.html',
  styleUrls: ['./outlookview.component.scss']
})

export class OutlookViewComponent implements OnInit {

  @ContentChild(OutlookViewComponent, { static: false }) public myComponent: OutlookViewComponent;
  @ContentChild(ProgrammingViewComponent, { static: false }) public myComponent3: ProgrammingViewComponent;
  @Input() public temporal: any[] = [];

  displayList: any[] = [];
  displayListDynamic: any[] = [];
  displayListPersistent: any[] = [];
  formsearch: FormGroup;
  public keyboardData: any;
  itemsCommerce: string[] = [];
  tokenCommerce: string[] = [];
  commerceName: any;
  public productSelected: any;
  public commerceSelected: any;
  commerceItem: CommerceItem;
  public commerceItemAllFull: any[] = [];
  commerceSelectedArray = new Array();
  public selectedCommerces: any[] = [];
  @Input() items: any[] = [];
  search = new Search();
  commerceProduct: any;
  public responseSearch: any;
  public searchdetail = new Array();
  scrapperArray = new Array();
  loading: string;
  commerSelected: any;
  responseArray = new Array();
  commerceActive = new Array();
  activateProduct: boolean;
  responseArrayAll = new Array();
  radio: Radio;
  activeProduct: ActiveProduct;
  activeProductArray: ActiveProduct[];
  activeProductItems = new Array();
  indexSearch: number;
  productExists: boolean;
  scraperItemArray = new Array();
  validKeyboard: boolean;
  ItemsDetailArray: ModelBrand[] = [];
  itemDetail: ModelBrand;
  businessItems: ItemsCommerce;
  itemsBussines: ItemsCommerce[];
  itemsBussinesArray = new Array();
  selectedItem = new SelectedItem();
  detailArrayStep2 = new Array();
  idTokenCommerce: any;
  loadingError: boolean;
  commerceActiveView: ActiveComerce[] = [];
  itemModelBrand: ModelBrand;
  itemsModelBrandArray = new Array();

  constructor(private apisetsearchService: ApiSetSearchService, private apisearchService: ApiSearchService, private el: ElementRef, private renderer: Renderer2) {
    this.formsearch = new FormGroup({
      'searchControl': new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9]{1,25}')]),
    });
    this.formsearch.controls['searchControl'].valueChanges.subscribe(data => {
      this.keyboardData = data;
    });
  }

  ngOnInit() {
    this.SetupScroll();
    this.loading = 'parar';
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

  SetupScroll() {
    $('.full-height-scroll').slimScroll({
      height: 'auto'
    });
  }

  RenderCommerce(commerceSelected: any[]) {
    this.displayListDynamic = commerceSelected;
    this.displayListPersistent = commerceSelected;
    this.commerceActiveView = [];
    for (let index = 0; index < this.displayListPersistent.length; index++) {
      const element = this.displayListPersistent[index];
      let comerceActive = new ActiveComerce();
      comerceActive.commerce = element;
      if (index === 0) {
        comerceActive.isActive = true;
      } else {
        comerceActive.isActive = false;
      }

      this.commerceActiveView.push(comerceActive);
    }
    commerceSelected = null;
  }

  ActiveItems(id: any, commerid: any, response: any) {
    this.itemsCommerce = [];
    response[0].forEach(element => {
      if (element.commerceToken.trim() === commerid.trim()) {
        element.items.forEach(elementChild => {
          this.itemsCommerce.push(elementChild.itemName);
        });
      }
    });
  }

  ProductSearchByCommerce(item: any, productExists: boolean) {
    this.commerceActiveView.forEach(x => x.isActive = false);
    item.isActive = true;

    this.loading = 'parar';
    this.itemsCommerce = null;
    this.itemsBussines = null;
    this.itemsBussinesArray = [];
    var indexidCheck = 0;
    this.activeProductArray.forEach(elementProduct => {
      elementProduct.Product.forEach(element => {
        if (element === null) {
          return;
        }
        if (element.commerceToken === item.commerce) {
          if (!productExists) {
            this.itemsCommerce = [];
            this.itemsBussines = [];
            element.items.forEach(itemsProduct => {
              this.businessItems = new ItemsCommerce();
              this.businessItems.commerce = itemsProduct.itemName;
              this.businessItems.prices = itemsProduct.price;
              this.businessItems.urlDetail = itemsProduct.detailUrl;
              this.businessItems.hidenspan = false;
              this.businessItems.check = false;
              this.itemsModelBrandArray.forEach(element => {
                if (itemsProduct.itemName === element.commerceName) {
                  this.businessItems.hidenspan = true;
                  this.businessItems.brand = element.brand != null ? element.brand : null;
                  this.businessItems.model = element.model != null ? element.model : null;
                }
              });
              this.businessItems.idcheck = itemsProduct.itemName + String(indexidCheck);
              this.selectedCommerces.forEach(elementProducts => {
                if (elementProducts.commercename === itemsProduct.itemName) {
                  this.businessItems.check = true;
                  this.businessItems.idcheck = elementProducts.commercename;
                }
                indexidCheck = indexidCheck + 1;
              });
              this.itemsBussines.push(this.businessItems);
            });
            return;
          } else {
            this.selectedCommerces.forEach(elementSelected => {
              element.items.forEach(itemsProduct => {
                if (elementSelected.commercename === itemsProduct.itemName) {
                  productExists = true;
                }
              });
            });

            if (productExists) {
              this.itemsBussines = [];
              element.items.forEach(itemsProduct => {
                this.businessItems = new ItemsCommerce();
                this.businessItems.commerce = itemsProduct.itemName;
                this.businessItems.check = false;
                this.selectedCommerces.forEach(elementProducts => {
                  if (elementProducts.commercename === itemsProduct.itemName) {
                    this.businessItems.check = true;
                    this.businessItems.idcheck = elementProducts.commercename;
                  }
                });
                this.itemsBussines.push(this.businessItems);
              });
            }
          }
        }
      });
    });
  }

  UnselectItem(commerceToken: any) {
    this.DeleteCommerce(this.selectedCommerces, commerceToken.trim());
    this.commerceActive = this.commerceActive.filter(x => x !== commerceToken);
    if (!this.displayListDynamic.includes(commerceToken)) {
      this.displayListDynamic.push(commerceToken);
    }
  }

  ActiveCommerce() {
    this.commerceActiveView = [];
    let commerceListPercistent = this.displayListPersistent;
    let isFirst = false;
    let comerceFisrt = this.GetFirstIndexCommerce(this.displayListDynamic);
    for (let indexPercistent = 0; indexPercistent < commerceListPercistent.length; indexPercistent++) {
      const elementPercistent = commerceListPercistent[indexPercistent];
      let comerceActive = new ActiveComerce();
      if (elementPercistent === comerceFisrt) {
        comerceActive.isActive = true;
      } else {
        comerceActive.isActive = false;
      }
      if (!isFirst) {
        comerceActive.commerce = elementPercistent;
      }
      this.commerceActiveView.push(comerceActive);
    }
  }

  GetFirstIndexCommerce(commerceList: any[]): string {
    for (let indexCommerce = 0; indexCommerce < commerceList.length; indexCommerce++) {
      const element = commerceList[indexCommerce];
      if (indexCommerce === 0) {
        return element;
      }
    }
  }

  ResultSearch(response: any, commerce: string, isEdit: boolean) {
    this.itemsCommerce = [];
    this.itemsBussines = [];
    this.itemsBussinesArray = [];
    var commerceItemAll = new Array();
    for (let index = 0; index < response.length; index++) {
      var commerceArray = new Array();
      var priceArray = new Array();
      var sourceArray = new Array();
      const element = response[index];
      if (element === null) {
        return;
      }
      var commerItems = new CommerceItem();
      commerItems.name = element.commerceToken;
      if (element.commerceToken.trim() === commerce.trim()) {
        for (let index2 = 0; index2 < element.items.length; index2++) {
          this.radio = new Radio();
          this.businessItems = new ItemsCommerce();
          this.tokenCommerce.push(element.commerceToken);
          const element2 = element.items[index2];
          commerceArray.push(element2.itemName);
          priceArray.push(element2.price);
          sourceArray.push(element2.source);
          this.businessItems.commerce = element2.itemName;
          this.businessItems.prices = element2.price;
          this.businessItems.urlDetail = element2.detailUrl;         
          if (isEdit === true) {
            this.businessItems.check = true;
          } else {
            this.businessItems.check = false;
          }
          this.businessItems.hidenspan = false;
          this.businessItems.idcheck = element2.itemName + index2;
          this.itemsBussinesArray.push(this.businessItems);
          this.itemsBussines.push(this.businessItems);
        }
        commerItems.commercename = commerceArray;
        commerItems.price = priceArray;
        commerItems.source = sourceArray;
        commerceItemAll.push(commerItems);
      }
    }
    this.commerceItemAllFull = commerceItemAll;
  }

  LoadSearchToEdit(search: any, edit: boolean) {
    this.loading = "parar";
    this.search.SearchDetail = [];
    this.responseArray = [];
    this.responseArrayAll = [];
    this.itemsBussines = [];
    this.itemsCommerce = [];
    this.itemsBussines = [];
    var searchInfoArray = [];
    for (let index = 0; index < search.length; index++) {
      var searchInfo = new SearchInfo();
      searchInfo.commerceId = search[index].commerceId;
      searchInfo.commerceToken = search[index].commerceToken;
      var item = new Item();
      item.itemName = search[index].selectedItem.itemName;
      item.itemCode = search[index].selectedItem.itemCode;
      item.keyword = search[index].selectedItem.keyword;
      item.source = search[index].scraperConfig.source;
      searchInfo.items.push(item);
      searchInfoArray[index] = searchInfo;
    }
    this.ValidateScrapper(searchInfoArray);
    this.SetItem(this.displayList, item.keyword, searchInfoArray, this.indexSearch, edit);
    this.responseSearch = this.responseArray;
    this.responseArrayAll.push(this.responseArray);
    this.ResultSearch(this.responseArrayAll[0], this.displayListDynamic[0], edit);
    for (let index = 0; index < searchInfoArray.length; index++) {
      this.ProductSelected(searchInfoArray[index].items[0].itemName);
    }
  }

  SearchCommerce() {
    var loadingButton = Ladda.create(document.querySelector('#btnsearch'));
    loadingButton.start();
    this.validKeyboard = this.keyboardData === '' || this.keyboardData === null || this.keyboardData === undefined ? true : false;
    if (this.validKeyboard) {
      toastr.error('¡Debe de ingresar una busqueda!', '');
      loadingButton.stop();
      return;
    }
    this.loading = 'parar';
    this.search.SearchDetail = [];
    this.responseArray = [];
    this.responseArrayAll = [];
    this.itemsBussines = [];
    this.itemsCommerce = [];
    this.itemsBussines = [];
    this.loading = 'cargando';
    let keyboard = this.keyboardData;
    this.FilterCommerce(this.displayList);
    if (this.activateProduct) {
      this.responseArray = new Array();
    }
    if (this.displayListDynamic.length === 0) {
      toastr.error('¡Todos los comercios ya tiene un producto seleccionado!', '');
      loadingButton.stop();
      this.loading = 'parar';
      return;
    }
    this.ActiveCommerce();
    this.apisearchService.ScraperSearch(keyboard, this.commerceName, this.displayListDynamic).subscribe(response => {
      this.ValidateScrapper(response);
      this.SetItem(this.displayList, keyboard, response, this.indexSearch, false);
      this.loading = 'parar';
      this.loadingError = false;
      this.responseSearch = this.responseArray;
      this.responseArrayAll.push(this.responseArray);
      this.ResultSearch(this.responseArrayAll[0], this.displayListDynamic[0], false);
      loadingButton.stop();
    }, error => {
      console.log(error);
      this.loading = 'parar';
      this.loadingError = true;
      loadingButton.stop();
    });
  }

  FilterCommerce(listcommerce: any[]) {
    if (this.activateProduct) {
      this.commerceActive.forEach(element => {
        if (this.displayListDynamic.length !== 0) {
          this.displayListDynamic = this.displayListDynamic.filter(item => item !== element);
        }
      });
    }
  }

  ValidateScrapper(resp: any) {
    resp.forEach(element => {
      if (element !== null) {
        this.responseArray.push(element);
      }
    });
  }

  SetItem(commerce: any, keyword: any, productArray: any, index: any, isEdit: boolean) {
    this.activeProduct = new ActiveProduct();
    isEdit ? this.activeProduct.keword = keyword : this.activeProduct.keword = this.keyboardData;;
    this.activeProduct.commerce = commerce;
    this.activeProduct.Product = productArray;
    this.activeProductItems.push(this.activeProduct);
    this.activeProductArray = this.activeProductItems;
  }

  CreateArray(response: any) {
    var totalResponse = new Array();
    response.forEach(element => {
      totalResponse.push(element.items);
    });
    return totalResponse;
  }

  AddComerce(comer: any, name: any) {
    var commerItems2 = new CommerceItem();
    for (let index = 0; index < comer.length; index++) {
      const element = comer[index];
      for (let index = 0; index < element.commercename.length; index++) {
        const item = element.commercename[index];
        if (item === name) {
          this.commerceSelected = element.name;
        }
      }
    }
    this.productSelected = name;
    this.commerceSelectedArray.push(this.productSelected);
    commerItems2.name = this.commerceSelected;
    commerItems2.commercename = this.productSelected;
    this.selectedCommerces.push(commerItems2);
  }

  DeleteCommerce(items: any, name: any) {
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      if (element.name.trim() === name.trim()) {
        items.splice(index, 1);
      }
    }
  }

  RecoverCheck() {
    var products = [];
    $('tr td').each(function () {
      products.push($(this).children('input'));
    });
    var radios = $("input[type='radio']");
    for (let index = 0; index < radios.length; index++) {
      const element = radios[index];
      for (let index = 0; index < this.selectedCommerces.length; index++) {
        const element2 = this.selectedCommerces[index];
        if (element2.commercename.indexOf(element.value) !== -1) {
          element.checked = true;
        }
      }
    }
  }

  GetSearchDetail(comer: any, commercio: any) {
    var searchId: any;
    var commerceToken: any;
    var callservice: boolean;
    for (let index = 0; index < this.activeProductArray.length; index++) {
      const element = this.activeProductArray[index];
      var scraperConfig = new ScraperConfig();
      element.Product.forEach(elementproduct => {
        if (elementproduct === null) {
          return;
        }
        searchId = elementproduct.searchId;
        commerceToken = elementproduct.commerceToken;
        elementproduct.items.forEach(elementitems => {
          for (let indexCommerce = 0; indexCommerce < commercio.length; indexCommerce++) {
            const elementCommer = commercio[indexCommerce];
            callservice = false;
            if (elementitems.itemName === null) {
              return;
            }
            if (comer.trim() === elementitems.itemName.trim() && elementproduct.commerceToken.trim() === commerceToken.trim()) {
              scraperConfig.SearchId = searchId !== null ? searchId : null;
              scraperConfig.Keyword = this.keyboardData !== null ? this.keyboardData : null;
              scraperConfig.CommerceToken = commerceToken;
              scraperConfig.Source = elementitems.source !== null ? elementitems.source : null;
              scraperConfig.CommerceId = elementproduct.commerceId !== null ? elementproduct.commerceId : null;
              callservice = true;
            }
            if (callservice) {
              this.apisearchService.ScraperSearchDetail(scraperConfig).subscribe(response => {
                this.scrapperArray.push(response);
                this.itemModelBrand = new ModelBrand();
                if (this.itemsBussines === null) {
                  return;
                }
                this.itemsBussines.forEach(element => {
                  if (response === null) {
                    return;
                  }
                  if (response.itemName === element.commerce) {
                    element.hidenspan = true;
                    element.brand = response.model !== null ? 'Modelo:' + ' ' + response.model : null;
                    element.model = response.brand !== null ? 'Marca:' + ' ' + response.brand : null;
                    this.itemModelBrand.commerceName = element.commerce;
                    this.itemModelBrand.model = element.model;
                    this.itemModelBrand.brand = element.brand;
                    this.itemsModelBrandArray.push(this.itemModelBrand);
                    this.ProductSelectedBrandModel(element.commerce);
                  }
                });
              });
            }
          }
        });
      });
    }
  }

  ValidateProduct(comer: any, name: any, indice: any) {
    comer[0].commercename.forEach(element => {
      if (element === name) {
      }
    });
  }

  GetModelBrand() {
    this.itemDetail = new ModelBrand();
    for (let index = 0; index < this.scrapperArray.length; index++) {
      const elementScrapper = this.scrapperArray[index];
      if (elementScrapper === null) {
      } else {
        this.itemsBussines.forEach(element => {
          if (elementScrapper.itemName === element.commerce) {
            element.hidenspan = true;
            element.brand = elementScrapper.model !== null ? 'Modelo:' + ' ' + elementScrapper.model : null;
            element.model = elementScrapper.brand !== null ? 'Marca:' + ' ' + elementScrapper.brand : null;
          }
        });
      }
    }
  }

  ValidCheck(nameproduct: any): boolean {
    var productExist;
    this.selectedCommerces.forEach(element => {
      if (element.commercename === nameproduct) {
        productExist = true;
        return productExist;
      }
    });
    return productExist;
  }

  ProductSelected(name: any) {
    var existProduct = this.ValidCheck(name);
    if (!existProduct) {
      this.productExists = false;
      this.activeProductArray.forEach(element => {
        if (element === null) {
          return;
        }
        for (let index = 0; index < element.Product.length; index++) {
          const elementProduct = element.Product[index];   
          if (elementProduct !== null) {
            this.productExists = false;
            elementProduct.items.forEach(elementItems => {
              if (elementItems.itemName === name) {
                this.productExists = true;
              }
            });
            if (this.productExists) {
              this.activateProduct = true;
              if (elementProduct != null) {
                this.commerceActive.push(elementProduct.commerceToken.trim());
                this.commerSelected = elementProduct.commerceToken;
                if (this.selectedCommerces !== null) {
                  this.DeleteCommerce(this.selectedCommerces, elementProduct.commerceToken.trim());
                }
              }
              this.commerceProduct = new CommerceItem();
              this.commerceSelected = elementProduct.commerceToken.trim();
              this.productSelected = name;
              this.commerceSelectedArray.push(this.productSelected);
              this.commerceProduct.name = this.commerceSelected;
              this.commerceProduct.commercename = this.productSelected;
              this.commerceProduct.keyword = this.activeProduct.keword;
              for(let indexPrice = 0; indexPrice < elementProduct.items.length; indexPrice++){
                if(this.itemsBussines[indexPrice].commerce == this.commerceProduct.commercename){
                  this.commerceProduct.price = elementProduct.items[indexPrice].price;                 
                }
              }  
              this.selectedCommerces.push(this.commerceProduct);
            }
          }
        }
      });
      if (this.selectedCommerces.length > 0) {
        this.GetSearchDetail(name, this.selectedCommerces);      
      }
    }
  }
  
  ProductSelectedBrandModel(name: any){
    if(this.itemModelBrand.model !== null){
      this.commerceProduct.brand = this.itemModelBrand.model.replace("Marca: ","");
    }
    if(this.itemModelBrand.brand !== null){
      this.commerceProduct.model = this.itemModelBrand.brand.replace("Modelo: ","");
    }
  }

  CreateDetailsScraperNull(searchDetail: SearchDetail, selectedItem: SelectedItem, elementSelect, scraperItem: ScraperConfig, element: any, commerceId: any, searchId: any, itemProducts: any, searchDetailArray: any[], stores: any[]): any {
    this.GetTokenCommerce(stores, elementSelect.name);
    searchDetail.CommerceId = this.idTokenCommerce;
    commerceId = this.idTokenCommerce;
    searchDetail.CommerceToken = element.commerceToken;
    searchId = element.searchId;
    selectedItem.ItemName = elementSelect.commercename;
    selectedItem.SearchId = element.searchId;
    selectedItem.Keyword = elementSelect.keyword;
    scraperItem.SearchId = searchId;
    scraperItem.CommerceId = this.idTokenCommerce;
    scraperItem.CommerceToken = elementSelect.commercename;
    scraperItem.Keyword = elementSelect.keyword;
    scraperItem.Source = itemProducts.source;
    searchDetail.SelectedItem = selectedItem;
    searchDetail.ScraperConfig = scraperItem;
    searchDetailArray.push(searchDetail);
    return searchDetailArray;
  }

  GetTokenCommerce(stores: any[], elementSelectName: any) {
    stores.forEach(element => {
      if (element.token === elementSelectName) {
        this.idTokenCommerce = element.id;
      }
    });
  }

  CreateDetailsScraperNotNull(searchDetail: SearchDetail, selectedItem: SelectedItem, elementSelect, elementScrapper: any, scraperItem: ScraperConfig, element: any, commerceId: any, searchId: any, itemProducts: any, searchDetailArray: any[], stores: any[]): any {
    this.GetTokenCommerce(stores, elementSelect.name);
    searchDetail.CommerceId = this.idTokenCommerce;
    commerceId = this.idTokenCommerce;
    searchDetail.CommerceToken = element.commerceToken;
    searchId = element.searchId;
    selectedItem.ItemCode = elementScrapper.itemCode;
    selectedItem.source = elementScrapper.source != null || elementScrapper.source !== undefined ? elementScrapper.source : null;
    selectedItem.Model = elementScrapper.model;
    selectedItem.Brand = elementScrapper.brand;
    selectedItem.ItemName = elementSelect.commercename;
    selectedItem.Keyword = elementSelect.keyword;
    selectedItem.SearchId = searchId;
    searchDetail.SelectedItem = selectedItem;
    scraperItem.SearchId = searchId;
    scraperItem.CommerceId = this.idTokenCommerce;
    scraperItem.CommerceToken = elementSelect.commercename;
    scraperItem.Keyword = this.keyboardData;
    scraperItem.Source = itemProducts.source !== null || itemProducts.source !== undefined ? itemProducts.source : null;
    searchDetail.ScraperConfig = scraperItem;
    searchDetailArray.push(searchDetail);
    return searchDetailArray;
  }

  CreateDetails(commerItems2: any[], step3: boolean, stores: any[]) {
    var searchDetailArray = new Array();
    for (let indice = 0; indice < commerItems2.length; indice++) {
      const elementSelect = commerItems2[indice];
      this.selectedItem = new SelectedItem();
      var selectedItemArray = new Array();
      var selectedItem = new SelectedItem();
      var searchDetail = new SearchDetail();
      var searchId: any;
      var commerceId: any;
      var scraperItem = new ScraperConfig();
      var scraperItemArray = new Array();
      var selectedItem = new SelectedItem();
      var scraperItem = new ScraperConfig();
      for (let index = 0; index < this.activeProductArray.length; index++) {
        const activeProductArray = this.activeProductArray[index];
        activeProductArray.Product.forEach(element => {
          if (element === null) {
            return;
          }
          element.items.forEach(itemProducts => {
            if (itemProducts.itemName === elementSelect.commercename) {
              for (let index = 0; index < this.scrapperArray.length; index++) {
                const elementScrapper = this.scrapperArray[index];
                var searchDetail = new SearchDetail();
                if (elementScrapper === null) {
                  this.CreateDetailsScraperNull(searchDetail, selectedItem, elementSelect, scraperItem, element, commerceId, searchId, itemProducts, searchDetailArray, stores);
                  return;
                }
                if (elementScrapper.model === null || elementScrapper.brand === null) {
                  this.CreateDetailsScraperNull(searchDetail, selectedItem, elementSelect, scraperItem, element, commerceId, searchId, itemProducts, searchDetailArray, stores);
                  return;
                }
                if (elementSelect.commercename === elementScrapper.itemName && elementSelect.name === element.commerceToken) {
                  this.CreateDetailsScraperNotNull(searchDetail, selectedItem, elementSelect, elementScrapper, scraperItem, element, commerceId, searchId, itemProducts, searchDetailArray, stores);
                  return;
                }
              }
            }
          });
        });
      }
    }
    this.search.SearchDetail = searchDetailArray;
    this.detailArrayStep2 = searchDetailArray;
  }
}
