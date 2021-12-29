import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  username: string = "";
  password: string = "";

  ngOnInit(): void {
  }

  login() {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password).pipe(catchError(err => of(null))).subscribe(() => {});
    }
  }

  isValid(): boolean {
    return !(this.username && this.password);
  }

}
