import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListItem } from '../services/data.service';
import { ListingStore, ListingState } from './listing.store';

@Component({
  standalone: false,
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
  providers: [ListingStore]
})
export class ListingComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'actions'];
  vm$!: Observable<ListingState>;

  constructor(private store: ListingStore) {}

  ngOnInit() {
    this.vm$ = this.store.vm$;
    this.loadData();
  }

  loadData() {
    this.store.loadItems();
  }
 
  onDelete(item: ListItem) { 
    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
      this.store.deleteItem(item.id);
    }
  }
}
