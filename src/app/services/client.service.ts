import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../models/client.model";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) {}

  private readonly API_URL = 'https://api.teyca.ru/v1/';

  getClient(limit = 5, offset = 0, search?: string): Observable<Client> {
    let url = `${this.API_URL}{token}/passes?limit=${limit}&offset=${offset}`;
    if (search && search.trim()) {
      url += `&search=${encodeURIComponent(search.trim())}`;
    }
    return this.http.get<Client>(url);
  }

  

}
