import {
  Component,
  inject,
  ViewEncapsulation,
  WritableSignal,
} from '@angular/core';
import { Listbox } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { ApiRecord, APIS, MyApi, SourceId } from '../interfaces/interfaces';
import { Button } from 'primeng/button';
import { ApiCallService } from '../services/apiCall.service';
import { TableModule } from 'primeng/table';
import { AgeInMonthsPipe } from '../pipes/pipes/age-in-months.pipe';

@Component({
  selector: 'app-root',
  imports: [Listbox, FormsModule, Button, TableModule, AgeInMonthsPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  public items = APIS;
  public selectedItems: MyApi[] = [];
  public selectAll = false;
  private apiCallService = inject(ApiCallService);
  public apiRecords: WritableSignal<Record<SourceId, ApiRecord[]>> =
    this.apiCallService.apiRecords;
  public selectedWikipediaRecords: ApiRecord[] = [];
  public selectedOpenLibraryRecords: ApiRecord[] = [];
  public selectedHackerNewsRecords: ApiRecord[] = [];

  public onSelectAllChange(event: any) {
    this.selectedItems = event.checked ? [...this.items] : [];
    this.selectAll = event.checked;
    event.updateModel(this.selectedItems, event.originalEvent);
  }

  // ToDo ???
  public onChange(event: any) {
    const { originalEvent, value } = event;
    if (value) this.selectAll = value.length === this.items.length;
  }

  public search(searchString: string) {
    this.selectedItems.forEach((myApi) => {
      this.apiCallService.callApi(searchString, myApi);
    });
  }

  public save() {
    const libraryData = JSON.stringify(this.selectedOpenLibraryRecords, null, 2); // pretty-print with 2 spaces
    const blob = new Blob([libraryData], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'records.json'; // file name
    a.click();

    window.URL.revokeObjectURL(url);
  }
}
