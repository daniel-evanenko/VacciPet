import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../../emitters/emitter';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  message = '';
  constructor(private http:HttpClient){

  }
  ngOnInit(): void {
    this.http.get("http://localhost:3000/api/user",{
      withCredentials:true
    }).subscribe((res:any)=>{
      this.message = `Hi ${res.name}`;
      Emitters.authEmitter.emit(true);
    },(err)=>{
      this.message = "You are not logged in";
      Emitters.authEmitter.emit(false );

    });
  }


  logout(){
    this.http.post("http://localhost:3000/api/logout",{},{withCredentials:true}).subscribe(()=>{
      Emitters.authEmitter.emit(false )
    })
  }
}
