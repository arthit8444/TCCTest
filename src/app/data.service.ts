import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Item {
  id: number;
  name: string;
  surname: string;
  address: string;
  birthday: string;
  age: number;
  modifiedDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7278/api/Person';

  items = signal<Item[]>([]);

  async loadAll() {
    const data = await firstValueFrom(this.http.get<Item[]>(`${this.apiUrl}/All`));
    this.items.set(data);
  }

  async addItem(item: Partial<Item>) {
    await firstValueFrom(this.http.post(`${this.apiUrl}/Person`, item));
    await this.loadAll();
  }
}
