import { Component, OnInit } from '@angular/core';
import { faHome, faMugHot, faUserAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  faHome = faHome;
  faCube = faMugHot;
  user = faUserAlt;

  constructor() {}

  ngOnInit(): void {}
}
