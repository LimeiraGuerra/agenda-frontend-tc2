import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { UserEvent } from '../_models/UserEvent';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<UserEvent[]> {
    return this.http.get<UserEvent[]>(environment.baseUrl + "/events");
  }

  registerEvent(event): Observable<any> {
    let body = new HttpParams();
    body = body.set("description", event.description);
    body = body.set("startDate", event.startDate);
    body = body.set("endDate", event.endDate);
    return this.http.post(environment.baseUrl + "/events", body, {observe: "response"});
  }

  updateEvent(event: UserEvent): Observable<any> {
    let body = new HttpParams();
    body = body.set("description", event.description);
    body = body.set("startDate", event.startDate);
    body = body.set("endDate", event.endDate);
    return this.http.put(environment.baseUrl + "/events/" + event._id, body, {observe: "response"});
  }

  deleteEvent(eventId: string): Observable<any> {
    return this.http.delete(environment.baseUrl + "/events/" + eventId, {observe: "response"});
  }
}
