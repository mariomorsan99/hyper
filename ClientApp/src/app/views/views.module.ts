import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LogonComponent } from './logon/logon.component';
import { HomeComponent } from './home/home.component';
import { OutlookViewComponent } from './outlookview/outlookview.component';
import { ErrorViewComponent } from './errorview/errorview.component';
import { LoadingComponent } from './loading/loading.component';
import { ProgrammingViewComponent } from './programmingview/programmingview.component';
import { SelectStoresComponent } from './selectstores/selectstores.component';
import { SummaryViewComponent } from './summaryview/summaryview.component';
import { WizardTemplateComponent } from './wizardtemplate/wizardtemplate.component';
import { SearchListComponent } from './searchlist/searchlist.component';
import { SearchDetailsComponent } from './searchdetails/searchdetails.component';
import { ProgressPipe } from '../pipes/progress.pipe';

@NgModule({
  declarations: [
    LogonComponent,
    HomeComponent,
    OutlookViewComponent,
    ErrorViewComponent,
    LoadingComponent,
    ProgrammingViewComponent,
    SelectStoresComponent,
    SummaryViewComponent,
    WizardTemplateComponent,
    SearchListComponent,
    SearchDetailsComponent,
    ProgressPipe
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    LogonComponent
  ]
})
export class ViewsModule { }
