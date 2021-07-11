import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  Renderer2,
} from '@angular/core';
import { first } from 'rxjs/operators';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import {
  faCalendarAlt,
  faClock,
  faEdit,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons';

import { User } from '../../_models/User';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  loading = false;
  faAngleDoubleRight = faAngleDoubleRight;
  faCalendarAlt = faCalendarAlt;
  faClock = faClock;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  clock = new Date();

  eventList = [];
  isModalActive = false;
  selectedEvent;

  constructor() {
    setInterval(() => {
      this.clock = new Date();
    }, 1000);
  }

  ngOnInit(): void {
    this.loading = true;
    this.loadAllEvents();
  }

  loadAllEvents(): void {
    this.eventList = [
      {
        _id: '1',
        startDate: new Date('2021-08-20 10:59:00'),
        endDate: new Date('2021-09-21 10:59:00'),
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus neciaculis mauris.',
      },
      {
        _id: '2',
        startDate: new Date('2021-08-20 10:59:00'),
        endDate: new Date('2021-09-20 10:59:00'),
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus neciaculis mauris.',
      },
      {
        _id: '3',
        startDate: new Date('2021-08-15 10:59:00'),
        endDate: new Date('2021-09-18 10:59:00'),
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus neciaculis mauris.',
      },
      {
        _id: '4',
        startDate: new Date('2021-07-09 03:29:30'),
        endDate: new Date('2021-07-09 03:29:40'),
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus neciaculis mauris.',
      },
    ];
    this.eventList.sort(
      (a, b) => a.startDate - b.startDate || a.endDate - b.endDate
    );
    this.loading = false;
  }

  editEvent(event: object): void {
    this.selectedEvent = event;
    this.isModalActive = true;
  }

  toggleModal(state: boolean): void {
    this.isModalActive = state;
  }

  updateList(e) {}
}
