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
  public searchString = '';
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
      this.searchString = searchString;
      this.apiCallService.resetApiRecords();
      this.selectedItems.forEach((myApi) => {
        this.apiCallService.callApi(searchString, myApi);
      });
    }
  }

  public save(saveAll = false) {
    const stringifiedObject = this.getStringifiedObject(saveAll);
    this.saveDataToFile(stringifiedObject, this.searchString);
  }

  private getStringifiedObject(saveAll: boolean) {
    const selectedData: { [key in SourceId]?: ApiRecord[] } = {};
    (Object.values(SourceId) as SourceId[]).forEach((sourceId) => {
      const selectedRecords = (this as any)[
        `selected${sourceId}Records`
      ] as ApiRecord[];
      const allRecords = this.apiRecords()[sourceId];

      const dataToSave = saveAll ? allRecords : selectedRecords;

      if (dataToSave.length) {
        selectedData[sourceId] = dataToSave;
      }
    });

    return JSON.stringify(selectedData, null, 2);
  }

  private saveDataToFile(selectedData: string, fileName: string) {
    const blob = new Blob([selectedData], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName + '.json';
    a.click();

    window.URL.revokeObjectURL(url);
  }
}
