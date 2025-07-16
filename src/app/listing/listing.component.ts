import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListItem } from '../services/data.service';
import { ListingStore, ListingState } from './listing.store';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

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

  constructor(private store: ListingStore,
    private cookieService: CookieService,
    private router: Router) { }

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

  logout() {
    this.cookieService.delete('auth_token');
    this.cookieService.delete('user_email');

    this.router.navigate(['/login']);
  }

}
