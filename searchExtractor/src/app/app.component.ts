import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Listbox } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import {
  ApiRecord,
  APIS,
  BOOKS_FIELDS_STRING,
  MyApi,
  SourceId,
} from '../interfaces/interfaces';
import { Button } from 'primeng/button';
import { ApiCallService } from '../services/apiCall.service';

@Component({
  selector: 'app-root',
  imports: [Listbox, FormsModule, Button],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public items = APIS;
  public selectedItems: MyApi[] = [];
  public selectAll = false;
  public apiRecords: WritableSignal<ApiRecord[]> = signal([]);
  private apiCallService = inject(ApiCallService);

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
      const url = this.getUrl(myApi, searchString);
      this.apiCallService.callApi(url).subscribe({
        next: (res) => {
          const newRecords = this.apiCallService.processApiData(
            myApi.sourceId,
            res,
          );
          this.concatRecords(newRecords);
          console.log(this.apiRecords());
        },
        error: (err) => console.error(err),
      });
    });
  }

  private concatRecords(newApiRecords: ApiRecord[]) {
    const concatenatedRecords = [...this.apiRecords(), ...newApiRecords];
    this.apiRecords.set(concatenatedRecords);
  }

  private getUrl(myApi: MyApi, searchString: string) {
    let url = myApi.url + searchString;
    switch (myApi.sourceId) {
      case SourceId.OpenLibrary:
        return url + BOOKS_FIELDS_STRING;
      default:
        return url;
    }
  }
}
