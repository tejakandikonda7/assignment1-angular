import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders,HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable,of,Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private http: HttpClient) { }

  getData()
  {
    return this.http.get("https://jsonplaceholder.typicode.com/users")
  }
}
