import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BlankLayoutComponent } from './layouts/blank-layout.component';
import { BasicLayoutComponent } from './layouts/basic-layout.component';
import { TopNavigationLayoutComponent } from './layouts/top-navigation-layout.component';

import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TopNavigationNavBarComponent } from './top-navigation-nav-bar/top-navigation-nav-bar.component';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';

@NgModule({
  declarations: [
    BlankLayoutComponent,
    BasicLayoutComponent,
    TopNavigationLayoutComponent,
    FooterComponent,
    NavigationComponent,
    TopNavBarComponent,
    TopNavigationNavBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    BlankLayoutComponent
  ]
})
export class ComponentsModule { }
