import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { BlankLayoutComponent } from 'src/app/components/layouts/blank-layout.component';
import { HomeComponent } from './views/home/home.component';
import { BasicLayoutComponent } from './components/layouts/basic-layout.component';
import { WizardTemplateComponent } from '../app/views/wizardtemplate/wizardtemplate.component';
import { SearchListComponent } from './views/searchlist/searchlist.component';
import { SearchDetailsComponent } from './views/searchdetails/searchdetails.component';

// Modules
import { ViewsModule } from './views/views.module';
import { ComponentsModule } from './components/components.module';

//Services
import { ApiSearchService } from '../app/providers/apisearch.service';
import { ApiSetSearchService } from '../app/providers/apisetsearch.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ViewsModule,
    ComponentsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: '', component: BasicLayoutComponent,
        children: [
          { path: 'home', component: HomeComponent },
          { path: 'searches/add', component: WizardTemplateComponent },
          { path: 'searches', component: SearchListComponent },
          { path: 'searches/edit/:id', component: WizardTemplateComponent },
          { path: 'searches/:id', component: SearchDetailsComponent}
        ]
      },
      {
        path: '', component: BlankLayoutComponent,
        children: []
      },
      { path: '**', redirectTo: 'home' }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
