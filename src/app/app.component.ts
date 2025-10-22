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
  public selectedGitHubRecords: ApiRecord[] = [];

  public onSelectAllChange(event: any) {
    this.selectedItems = event.checked ? [...this.items] : [];
    this.selectAll = event.checked;
  }

  public checkIfAllSelected(event: any) {
    if (event.value) {
      this.selectAll = event.value.length === this.items.length;
    }
  }

  public search(searchString: string) {
    if (searchString) {
      this.apiCallService.resetApiRecords();
      this.selectedItems.forEach((myApi) => {
        this.apiCallService.callApi(searchString, myApi);
      });
    }
  }

  public save(saveAll = false) {
    const stringifiedObject = this.getStringifiedObjectToSave(saveAll);
    const blob = new Blob([stringifiedObject], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'records.json'; // file name
    a.click();

    window.URL.revokeObjectURL(url);
  }

  private getStringifiedObjectToSave(saveAll: boolean) {
    const object: { [key: string]: ApiRecord[] } = {};
    if (
      this.selectedOpenLibraryRecords.length ||
      (saveAll && this.apiRecords().OpenLibrary.length)
    ) {
      object['openLibrary'] = saveAll
        ? this.apiRecords().OpenLibrary
        : this.selectedOpenLibraryRecords;
    }

    if (
      this.selectedWikipediaRecords.length ||
      (saveAll && this.apiRecords().Wikipedia.length)
    ) {
      object['wikipedia'] = saveAll
        ? this.apiRecords().Wikipedia
        : this.selectedWikipediaRecords;
    }

    if (
      this.selectedHackerNewsRecords.length ||
      (saveAll && this.apiRecords().HackerNews.length)
    ) {
      object['hackerNews'] = saveAll
        ? this.apiRecords().HackerNews
        : this.selectedHackerNewsRecords;
    }

    if (
      this.selectedGitHubRecords.length ||
      (saveAll && this.apiRecords().GitHub.length)
    ) {
      object['gitHub'] = saveAll
        ? this.apiRecords().GitHub
        : this.selectedGitHubRecords;
    }

    return JSON.stringify(object, null, 2);
  }
}
