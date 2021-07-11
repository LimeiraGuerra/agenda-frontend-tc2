import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {
  faCalendarAlt,
  faUserCircle,
  faSignOutAlt,
  faCheckSquare,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import { User } from 'src/app/_models/User';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  faCalendarAlt = faCalendarAlt;
  faUserCircle = faUserCircle;
  faSignOutAlt = faSignOutAlt;
  faCheckSquare = faCheckSquare;
  faCalendarPlus = faCalendarPlus;
  faStar = faStar;
  isMenuMobileOn = false;
  tabSwitch = true;
  isModalActive = false;
  newEventModal = false;

  @Input() user: User;
  @Output() userLogout = new EventEmitter();

  constructor(private route: ActivatedRoute) {
    route.queryParams.subscribe(param => {
      this.tabSwitch = param.estado === 'finalizados';
    });
  }

  ngOnInit(): void {}

  toggleMobileMenu(): void {
    this.isMenuMobileOn = !this.isMenuMobileOn;
  }

  toggleModal(state: boolean): void {
    this.newEventModal = state;
    this.isModalActive = state;
  }

  updateList(e: boolean): void {
    if (e) {
      window.location.reload();
    }
    else {
      this.isModalActive = false;
    }
  }
}
