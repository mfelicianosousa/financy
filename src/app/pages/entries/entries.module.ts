import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';


import { EntriesRoutingModule } from './entries-routing.module';

import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';

import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';

@NgModule({
  declarations: [EntryListComponent, EntryFormComponent],
  imports: [
    SharedModule,
    CalendarModule,
    IMaskModule,
    EntriesRoutingModule,
  ]
})
export class EntriesModule { }
