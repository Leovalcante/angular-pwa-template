import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EnvironmentService} from './services/environment.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './shared/material.module';
import {NewVersionAvailableComponent} from './components/new-version-available/new-version-available.component';
import {InstallApplicationComponent} from './components/install-application/install-application.component';
import {WINDOW_PROVIDERS} from './providers/window.provider';
import {NAVIGATOR_PROVIDERS} from './providers/navigator.provider';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

const initApp = (environmentService: EnvironmentService) => {
  return () => environmentService.isEnvironmentReady().catch(e => console.log('Could not initialize application', e));
};

@NgModule({
  declarations: [
    AppComponent,
    NewVersionAvailableComponent,
    InstallApplicationComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [
    ...WINDOW_PROVIDERS,
    ...NAVIGATOR_PROVIDERS,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [EnvironmentService],
      multi: true,
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  entryComponents: [
    NewVersionAvailableComponent,
    InstallApplicationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
