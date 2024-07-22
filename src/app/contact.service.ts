import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Contact {
  id: number;
  firstname: string;
  lastname: string
  emailId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
 
  private apiUrl = 'https://localhost:7169/api/Employees';
  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }
  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
}
saveEmployee(contact: any): Observable<any> {
  return this.http.post<any>(this.apiUrl, contact);
}
updateContact(contact: Contact): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/${contact.id}`, contact);
}
deleteContact(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
}