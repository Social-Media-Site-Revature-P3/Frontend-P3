import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  private isDark = false;

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) { }
  
  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  logout() {
    this.cookieService.delete('userId');
    this.authService.logout();
    this.router.navigate(['login']);
  }

  swapTheme() {
      document.body.classList.toggle("darkMode");
    }
  }
