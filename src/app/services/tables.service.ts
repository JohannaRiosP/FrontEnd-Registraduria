import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Table } from '../models/table.model';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  constructor(private http: HttpClient) { }
  /**
   * 
   * @returns 
   */  
  list(): Observable<Table[]>{
      return this.http.get<Table[]>(`${environment.url_api_gateway}/table`);
  }
  /**
   * 
   * @param id 
   * @returns 
   */
  getOne(id: string): Observable<Table>{
    return this.http.get<Table>(`${environment.url_api_gateway}/table/${id}`);
  }
  /**
   * 
   * @param table 
   * @returns 
   */
  create(table: Table){
    return this.http.post<Table>(`${environment.url_api_gateway}table/insert`, table);
  }
  /**
   * 
   * @param id 
   * @param table 
   * @returns 
   */
  edit(id: String, table: Table){
    return this.http.put<Table>(`${environment.url_api_gateway}/table/update/${id}`, table);
  }
  /**
   * 
   * @param id 
   * @returns 
   */
  delete(id: String){
    return this.http.delete(`${environment.url_api_gateway}/table/delete/${id}`);
  }

}
