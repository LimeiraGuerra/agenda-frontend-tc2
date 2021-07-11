import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserEvent } from 'src/app/_models/UserEvent';
import { EventsService } from 'src/app/_services/events.service';
import { toast } from 'bulma-toast';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
})
export class ConfirmModalComponent implements OnInit {
  faExclamationCircle = faExclamationCircle;
  @Input() isConfirmActive: boolean;
  @Output() confirmControl = new EventEmitter<boolean>();
  @Input() selectedEvent: UserEvent;
  isLoading = false;

  response(res: boolean): void {
    if (res) {
      this.isLoading = true;
      this.eventsWeb
        .deleteEvent(this.selectedEvent._id)
        .pipe(first())
        .subscribe(
          (data) => {
            toast({
              message: 'O produto foi deletado com sucesso',
              type: 'is-success',
              dismissible: true,
              position: 'bottom-center'
            });
            this.isLoading = false;
          },
          (error) => {
            toast({
              message: 'Algum erro aconteceu ao remover um evento',
              type: 'is-danger',
              dismissible: true,
              position: 'bottom-center'
            });
            this.isLoading = false;
          }
        );
    }
    this.confirmControl.emit(res);
  }

  constructor(private eventsWeb: EventsService) {}

  ngOnInit(): void {}
}
