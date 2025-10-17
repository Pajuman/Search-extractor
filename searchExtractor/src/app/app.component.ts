import { Component } from '@angular/core';
import { Listbox } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [Listbox, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  items = Array.from({ length: 100000 }, (_, i) => ({
    label: `Item #${i}`,
    value: i,
  }));

  selectedItems!: any[];

  selectAll = false;

  onSelectAllChange(event: any) {
    this.selectedItems = event.checked ? [...this.items] : [];
    this.selectAll = event.checked;
    event.updateModel(this.selectedItems, event.originalEvent);
  }

  onChange(event: any) {
    const { originalEvent, value } = event;
    if (value) this.selectAll = value.length === this.items.length;
  }
}
