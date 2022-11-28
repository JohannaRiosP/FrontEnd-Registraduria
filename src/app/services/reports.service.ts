import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }
 /**
 * 
 * @returns 
 */  
  tableReport(id: string){
    return this.http.get(`${environment.url_api_gateway}/reports/table_votes/<string:id_>`);
  }
  tablesReport(){
    return this.http.get(`${environment.url_api_gateway}/reports/table_votes/all`);
  }
  candidateReport(id: string){
    return this.http.get(`${environment.url_api_gateway}/reports/candidate_votes/<string:id_>`);
  }
  candidatesReport(){
    return this.http.get(`${environment.url_api_gateway}/reports/candidate_votes/all`);
  }
  politicalpartyReport(id: string){
    return this.http.get(`${environment.url_api_gateway}/reports/politic_party_votes<string:id_>`);
  }
  distributionPoliticalPartyReport(){
    return this.http.get(`${environment.url_api_gateway}/reports/votes_by_political_parties_distribution`);
  }
 
}

