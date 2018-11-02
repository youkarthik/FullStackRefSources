import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  searchText: string;
  isLoggedIn: boolean;
  constructor(private router: Router, private authService: AuthService) { }

  
  
  ngOnInit() {
    this.searchText = '';
     this.authService.isLoggedIn.subscribe((response) => {
      this.isLoggedIn = response;
    });
  }

  onSearch(): void {
    this.router.navigate(['/search-result'],
      { queryParams: { searchText: this.searchText }, skipLocationChange: false });
    this.searchText = '';
  }
}
