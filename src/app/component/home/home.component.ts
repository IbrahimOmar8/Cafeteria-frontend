import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  OutPutTestAPI :String = "";
  constructor(private userService: UserService,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {console.log(err)
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });




  }


  Testapi(){

  
  // this.authService.TestCallAPI().subscribe({
  //   next: data => {
  //     this.OutPutTestAPI  = JSON.stringify(data);
  //     //console.log(data);      
  //   }    
  // });
  }

}
