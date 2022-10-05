import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConnectableObservable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isDark = localStorage.getItem("isDark");

  userId:number =0;
  
  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) { }
  
  ngOnInit(): void {
    this.userId = +this.cookieService.get('userId');
    // this.userId = currentuserId;

    // checking if darkmode is enabled from the start
    if (sessionStorage.getItem("isDark") == "1") {
      document.body.classList.add("darkMode");
    } else {
      document.body.classList.remove("darkMode");
    }
  }

  ngOnDestroy() {
  }

  logout() {
    this.cookieService.delete('userId');
    this.authService.logout();
    this.router.navigate(['login']);
  }

  // swapTheme() {
  //   document.body.classList.toggle("darkMode");
  // }

  swapTheme() {
    if (sessionStorage.getItem("isDark") == "0") {
      document.body.classList.add("darkMode");
      sessionStorage.setItem("isDark", "1");
    } else {
      document.body.classList.remove("darkMode");
      sessionStorage.setItem("isDark", "0");
    }
    }

    reroute(id: number):void
    {
      this.router.navigate(['/profile/', this.userId], { replaceUrl: true })
    .then(
      ()=> 
      {
        window.location.reload();
      }
    )
    }
  }
