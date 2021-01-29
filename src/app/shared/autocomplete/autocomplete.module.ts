import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './autocomplete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ButtonsModule } from 'out/my-project2-win32-x64/resources/app/src/app/_Modules/buttons/buttons.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [AutocompleteComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [AutocompleteComponent],
})
export class AutocompleteModule {}
