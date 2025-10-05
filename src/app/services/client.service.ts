import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) {}

  private readonly API_URL = 'https://api.teyca.ru/v1/';

  getClient(): Observable<any> {
    return this.http.get(this.API_URL + '${token}/passes').pipe(
      tap((res) => console.log(res)))
  }

}
