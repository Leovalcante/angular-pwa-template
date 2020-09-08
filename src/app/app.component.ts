import {Component, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import {BehaviorSubject} from 'rxjs';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {Router} from '@angular/router';
import {shareReplay, tap} from 'rxjs/operators';
import {EnvironmentService} from './services/environment.service';
import {NewVersionAvailableComponent} from './components/new-version-available/new-version-available.component';
import {InstallApplicationComponent} from './components/install-application/install-application.component';
import {MatSidenav} from '@angular/material/sidenav';

// export interface LieFiData {
//   id: number;
//   count: number;
//   data: number[];
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   * Manage sidenav
   */
  @ViewChild('sidenav') sidenav: MatSidenav;

  /**
   * Manage mobile view
   */
  public isMobileView: boolean;

  // /**
  //  * App update observer
  //  */
  // public readonly applicationUpdateOngoing$ = this.environmentService.applicationUpdateOngoing$;

  /**
   * App new version observer
   */
  public readonly newVersionAvailable$ = this.environmentService.newVersionAvailable$.pipe(
    tap((newVersionAvailable) => {
      if (newVersionAvailable) {
        return this.openNewVersionAvailableBottomSheet();
      }
    }),
    shareReplay(1),
  );

  // /**
  //  * App online observer
  //  */
  // public readonly applicationOnline$ = this.environmentService.applicationOnline$;

  /**
   * App installable observer
   */
  public readonly applicationInstallable$ = this.environmentService.applicationInstallable$.pipe(
    tap((applicationInstallable) => {
      if (applicationInstallable) {
        return this.openInstallApplicationBottomSheet();
      }
    }),
    shareReplay(1),
  );

  // todo: what are those stuffs?
  // public readonly lieFiData = new BehaviorSubject<LieFiData>(undefined);
  // public readonly lieFiData$ = this.lieFiData.asObservable();

  constructor(private readonly environmentService: EnvironmentService,
              private readonly httpClient: HttpClient,
              private readonly router: Router,
              private readonly matBottomSheet: MatBottomSheet) {
    // Enable/disable sidebar view
    this.isMobileView = window.innerWidth <= 800;
  }

  /**
   * Navigate to given route then close the sidebar
   * @param route route to navigate
   */
  public navigateTo(route: string): void {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate([route]);
    // noinspection JSIgnoredPromiseFromCall
    this.sidenav.close();
  }

  /**
   * Close the sidebar
   */
  public closeSidebar(): void {
    // noinspection JSIgnoredPromiseFromCall
    this.sidenav.close();
  }

  public openNewVersionAvailableBottomSheet(): void {
    this.matBottomSheet.open(NewVersionAvailableComponent, {
      hasBackdrop: false,
    });
  }

  public openInstallApplicationBottomSheet(): void {
    this.matBottomSheet.open(InstallApplicationComponent, {
      hasBackdrop: false,
    });
  }

  public install($event): void {
    $event.preventDefault();
    // noinspection JSIgnoredPromiseFromCall
    this.environmentService.promptInstall();
  }

  public loadNewVersion($event): void {
    $event.preventDefault();
    this.environmentService.update();
  }

  // public checkForUpdate($event: Event): void {
  //   $event.preventDefault();
  //   this.environmentService.checkForUpdate();
  // }
}
