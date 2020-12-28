import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { CdkColumnDef } from '@angular/cdk/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatDialogModule
  ],
  exports: [
    MatSidenavModule,
    MatButtonModule,
    LayoutModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatDialogModule
  ]
})
export class MaterialModule { }
