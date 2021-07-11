import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt, faClock } from '@fortawesome/free-regular-svg-icons';
import { UserEvent } from 'src/app/_models/UserEvent';
import { EventsService } from 'src/app/_services/events.service';
import { first } from 'rxjs/operators';
import { toast } from 'bulma-toast';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css'],
})
export class FormModalComponent implements OnInit {
  formEvent!: FormGroup;
  isLoading = false;
  serverError = { id: '', hasError: false };
  startMinDate = new Date();
  endMinDate: Date;
  startMaxDate: Date;

  faCalendarAlt = faCalendarAlt;
  faClock = faClock;
  faExclamationCircle = faExclamationCircle;

  @Input() isModalActive: boolean;
  @Input() selectedEvent: UserEvent;
  @Output() modalControl = new EventEmitter<boolean>();
  @Output() hasChanges = new EventEmitter<boolean>();

  constructor(private eventsWeb: EventsService) {}

  ngOnInit(): void {
    this.initForm();
    this.endMinDate = this.startMinDate;
    if (this.selectedEvent) {
      this.setLimits();
    }
  }

  ngOnChanges() {
    this.initForm();
    if (this.selectedEvent) {
      this.setLimits();
    }
  }

  formatedDateTime(date: Date, pattern: string): string {
    if (!date) {
      return '';
    }
    return formatDate(date, pattern, 'pt-br');
  }

  private initForm(): void {
    this.formEvent = new FormGroup({
      description: new FormControl(this.selectedEvent?.description || '', [
        Validators.required,
        Validators.minLength(2),
      ]),
      startDate: new FormControl(
        this.formatedDateTime(this.selectedEvent?.startDate, 'YYYY-MM-dd'),
        [Validators.required]
      ),
      startTime: new FormControl(
        this.formatedDateTime(this.selectedEvent?.startDate, 'HH:mm'),
        [Validators.required]
      ),
      endDate: new FormControl(
        this.formatedDateTime(this.selectedEvent?.endDate, 'YYYY-MM-dd'),
        [Validators.required]
      ),
      endTime: new FormControl(
        this.formatedDateTime(this.selectedEvent?.endDate, 'HH:mm'),
        [Validators.required]
      ),
    });
  }

  setLimits(): void {
    this.endMinDate = this.formEvent.get('startDate')?.value || new Date();
    this.startMaxDate = this.formEvent.get('endDate')?.value || '';
  }

  trimInput(formCtrlName: string): void {
    const field = this.formEvent.get(formCtrlName);
    if (field) {
      field?.setValue(field?.value.trim());
    }
  }

  toggleModal(state: boolean) {
    this.modalControl.emit(state);
    this.initForm();
  }

  onSubmit(): void {
    if (this.formEvent.valid) {
      this.isLoading = true;
      const event: UserEvent = {
        description: this.formEvent.get('description').value,
        startDate:
          this.formEvent.get('startDate').value +
          ' ' +
          this.formEvent.get('startTime').value,
        endDate:
          this.formEvent.get('endDate').value +
          ' ' +
          this.formEvent.get('endTime').value,
      };
      if (this.selectedEvent) {
        event['_id'] = this.selectedEvent._id;
        this.edit(event);
      }
      else {
        this.register(event);
      }
    }
  }

  register(event: UserEvent): void {
    this.eventsWeb
      .registerEvent(event)
      .pipe(first())
      .subscribe(
        (data) => {
          toast({
            message: 'A criação do evento foi realizado com sucesso',
            type: 'is-success',
            dismissible: true,
            position: 'bottom-center'
          });
          this.hasChanges.emit(true);
          this.toggleModal(false);
          this.isLoading = false;
        },
        (error) => {
          this.serverError.id = error.id;
          this.serverError.hasError = true;
          this.isLoading = false;
        }
      );
  }

  edit(event: UserEvent): void {
    this.eventsWeb
      .updateEvent(event)
      .pipe(first())
      .subscribe(
        (data) => {
          toast({
            message: 'A edição do evento foi realizado com sucesso',
            type: 'is-success',
            dismissible: true,
            position: 'bottom-center'
          });
          this.hasChanges.emit(true);
          this.toggleModal(false);
          this.isLoading = false;
        },
        (error) => {
          this.serverError.id = error.id;
          this.serverError.hasError = true;
          this.isLoading = false;
        }
      );
  }
}
