import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, Item } from './data.service';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  dataService = inject(DataService);
  items: any[] = [];
  selectedItem = signal<Partial<Item>>({ name: '' });
  isModalOpen = signal(false);
  isViewMode = signal(false);

  ngOnInit() {
    this.dataService.loadAll();
  }

  openAdd(){
    this.selectedItem.set({ name: '' });
    this.isViewMode.set(false);
    this.isModalOpen.set(true);
  }

  openView(item: Item) {
    this.selectedItem.set({ ...item });
    this.isViewMode.set(true);
    this.isModalOpen.set(true);
  }

  async save(){
    await this.dataService.addItem(this.selectedItem());
    this.isModalOpen.set(false);
  }
}
