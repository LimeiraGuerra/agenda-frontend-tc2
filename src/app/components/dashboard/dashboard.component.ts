import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import {
  faCalendarAlt,
  faClock,
  faEdit,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons';

import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/_services/events.service';
import { UserEvent } from 'src/app/_models/UserEvent';
import { toast } from 'bulma-toast';

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
  isFinishedOnly = false;
  editEventModal = false;

  eventList: UserEvent[];
  isModalActive = false;
  isConfirmActive = false;
  selectedEvent: UserEvent;

  constructor(private route: ActivatedRoute, private eventsWeb: EventsService) {
    route.queryParams.subscribe((param) => {
      this.isFinishedOnly = param.estado === 'finalizados';
      this.loadAllEvents();
    });
    setInterval(() => {
      this.clock = new Date();
    }, 1000);
  }

  ngOnInit(): void {}

  loadAllEvents(): void {
    this.loading = true;
    this.eventsWeb
      .getAllEvents()
      .pipe(first())
      .subscribe(
        (events) => {
          events.forEach((e) => {
            e.startDate = new Date(e.startDate);
            e.endDate = new Date(e.endDate);
          });
          this.eventList = events;
          this.eventList.sort(
            (a, b) => a.startDate - b.startDate || a.endDate - b.endDate
          );
          this.loading = false;
        },
        (error) => {
          toast({
            message: error,
            type: 'is-danger',
            dismissible: true,
          });
          this.loading = false;
        }
      );
  }

  editEvent(event: UserEvent): void {
    this.selectedEvent = event;
    this.isModalActive = true;
    this.editEventModal = true;
  }

  toggleModal(state: boolean): void {
    this.isModalActive = state;
    this.editEventModal = state;
  }

  removeEvent(event: UserEvent): void {
    this.selectedEvent = event;
    this.isConfirmActive = true;
  }

  confirmResponse(res: boolean): void {
    this.updateList(res);
    this.isConfirmActive = false;
  }

  updateList(e: boolean) {
    if (e) {
      this.loadAllEvents();
    }
  }
}
