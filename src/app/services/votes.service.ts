import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Vote} from '../models/vote.model';

@Injectable({
  providedIn: 'root'
})
export class VotesService {

  constructor(private http: HttpClient) { }
  /**
 * 
 * @returns 
 */  
   list(): Observable<Vote[]>{
    return this.http.get<Vote[]>(`${environment.url_api_gateway}/vote`);
  }
  /**
   * 
   * @param id 
   * @returns 
   */
  getOne(id: string): Observable<Vote>{
    return this.http.get<Vote>(`${environment.url_api_gateway}/vote/${id}`);
  }
  /**
   * 
   * @param vote 
   * @returns 
   */
  create(vote: Vote){
    return this.http.post<Vote>(`${environment.url_api_gateway}vote/insert`, vote);
  }
  /**
   * 
   * @param id 
   * @param vote 
   * @returns 
   */
  edit(id: String, vote: Vote){
    return this.http.put<Vote>(`${environment.url_api_gateway}/vote/update/${id}`, vote);
  }
  /**
   * 
   * @param id 
   * @returns 
   */
  delete(id: String){
    return this.http.delete(`${environment.url_api_gateway}/vote/delete/${id}`);
  }

}
