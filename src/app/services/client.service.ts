import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client, CreateCard, PushData} from "../models/client.model";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) {}

  private readonly API_URL = 'https://api.teyca.ru/v1/{token}';

  getClient(limit = 5, offset = 0, search?: string): Observable<Client> {
    let url = `${this.API_URL}/passes?limit=${limit}&offset=${offset}`;
    if (search && search.trim()) {
      url += `&search=${encodeURIComponent(search.trim())}`;
    }
    return this.http.get<Client>(url);
  }

  sendPush(data: PushData): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<PushData>(`${this.API_URL}/message/push`, data, { headers });
  }

  addClient(data: CreateCard): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<CreateCard>(`${this.API_URL}/passes`, data, { headers });
  }




}
