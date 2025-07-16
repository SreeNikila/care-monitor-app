import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface ListItem {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private mockData: ListItem[] = [
    { id: 1, name: 'Product A', description: 'High-quality product with excellent features and performance' },
    { id: 2, name: 'Product B', description: 'Affordable solution for everyday needs and basic requirements' },
    { id: 3, name: 'Product C', description: 'Premium service offering advanced capabilities and support' },
    { id: 4, name: 'Product D', description: 'Innovative technology designed for modern business solutions' },
    { id: 5, name: 'Product E', description: 'Sustainable and eco-friendly option for environmentally conscious users' },
    { id: 6, name: 'Product F', description: 'Customizable platform with flexible configuration options' },
    { id: 7, name: 'Product G', description: 'Enterprise-grade solution with scalable architecture and security' },
    { id: 8, name: 'Product H', description: 'User-friendly interface with intuitive navigation and design' }
  ];

  constructor() { }

  getItems(): Observable<ListItem[]> {
    return of(this.mockData).pipe(delay(1000));
  }

  getItem(id: number): Observable<ListItem | undefined> {
    const item = this.mockData.find(item => item.id === id);
    return of(item).pipe(delay(500));
  }

  addItem(item: Omit<ListItem, 'id'>): Observable<ListItem> {
    const newItem: ListItem = {
      ...item,
      id: Math.max(...this.mockData.map(i => i.id)) + 1
    };
    this.mockData.push(newItem);
    return of(newItem).pipe(delay(500));
  }

  updateItem(id: number, item: Partial<ListItem>): Observable<ListItem | null> {
    const index = this.mockData.findIndex(i => i.id === id);
    if (index !== -1) {
      this.mockData[index] = { ...this.mockData[index], ...item };
      return of(this.mockData[index]).pipe(delay(500));
    }
    return of(null).pipe(delay(500));
  }

  deleteItem(id: number): Observable<boolean> {
    const index = this.mockData.findIndex(item => item.id === id);
    if (index !== -1) {
      this.mockData.splice(index, 1);
      return of(true).pipe(delay(500));
    }
    return of(false).pipe(delay(500));
  }
}
