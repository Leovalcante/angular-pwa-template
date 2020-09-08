import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetConfig, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';

const modules = [
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatBottomSheetModule,
  MatDialogModule,
  MatListModule,
  MatBadgeModule,
  MatRippleModule
];

const providers = [
  {
    provide: MatBottomSheetConfig,
    useValue: {},
  },
];

@NgModule({
  imports: [
    ...modules,
  ],
  providers: [
    ...providers,
  ],
  exports: [
    ...modules,
  ],
})
export class MaterialModule {}
