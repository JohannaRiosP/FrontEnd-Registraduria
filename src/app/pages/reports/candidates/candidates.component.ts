import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../../models/candidate.model';
import { CandidatesService } from '../../../services/candidates.service';
import { ReportsService } from '../../../services/reports.service';

@Component({
  selector: 'ngx-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  dataCandidates: Object;
  dataCandidate: Object = {
    name: "",
    lastname: "",
    resolutionNumber: null,
  }
  candidates: Candidate[];
  candidateId: string = "";
  totalMode: boolean = true; // true=all false=one

  constructor(private reportsService: ReportsService,
              private candidatesService: CandidatesService) { }

  ngOnInit(): void {
    this.getCandidates();
    if(this.totalMode)
      this.getDataFull();
  }

  getCandidates(): void{
    this.candidatesService.list().subscribe(
      data => {
        this.candidates = data;
      },
      error => {
        console.log(error)
      }
    );
  }

  getDataFull(): void {
    this.totalMode = true
    this.reportsService.candidatesReport().subscribe(
      data => {
        this.dataCandidates = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  getDataOne(): void {
    this.totalMode = false
    this.reportsService.candidatesReport().subscribe(
      data => {
        this.dataCandidates = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  change(): void{
    if(this.candidateId!="")
      this.getDataOne();
    else
      this.getDataFull();
      this.ngOnInit();
    }
  }
