import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
 private apiUrl = 'http://localhost:8080/api/v1';
  constructor(private http: HttpClient) { }

  getAccounts(search: string): Observable<any> {
    // let emps: Account[] = [
    //   {id: 1, name: 'test1', account: 123233},
    //   {id: 2, name: 'test2', account: 123234},
    //   {id: 3, name: 'test3', account: 123235},
    // ]
    //return of(emps);
    return this.http.get(this.apiUrl+'/accounts?search='+search);
  }

  createAccounnt(firstName: string, lastName: string, address: string) {
    return this.http.post(this.apiUrl+'/accounts', {firstName, lastName, address});
  }
}
