import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faCalendarAlt, faClock } from '@fortawesome/free-regular-svg-icons';

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

  @Input() isModalActive: boolean;
  @Input() selectedEvent;
  @Output() modalControl = new EventEmitter<boolean>();
  @Output() hasChanges = new EventEmitter<boolean>();

  constructor() {}

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
      description: new FormControl(
        this.selectedEvent?.description || '',
        [Validators.required, Validators.minLength(2)]
      ),
      startDate: new FormControl(
        this.formatedDateTime(
          this.selectedEvent?.startDate,
          'YYYY-MM-dd'
        ),
        [Validators.required]
      ),
      startTime: new FormControl(
        this.formatedDateTime(
          this.selectedEvent?.startDate,
          'hh:mm'
        ),
        [Validators.required]
      ),
      endDate: new FormControl(
        this.formatedDateTime(
          this.selectedEvent?.endDate,
          'YYYY-MM-dd'
        ),
        [Validators.required]
      ),
      endTime: new FormControl(
        this.formatedDateTime(
          this.selectedEvent?.endDate,
          'hh:mm'
        ),
        [Validators.required]
      ),
    });
  }

  setLimits(): void {
    this.endMinDate = this.formEvent.get('startDate')?.value || new Date();
    this.startMaxDate = this.formEvent.get('endDate')?.value || '';
  }

  trimInput(formCtrlName: string): void {
    console.log((this.formEvent.get('startDate')?.dirty ||
    this.formEvent.get('startTime')?.dirty) &&
  (
    !this.formEvent.get('startDate')?.valid ||
    !this.formEvent.get('startTime')?.valid
  ))
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
    console.log(this.formEvent.valid);
  }
}
