import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Branch } from '../models/branch.model';


@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://localhost:44392/api/Branches';

  getBranches() {
    return this.http.get(this.baseUrl, { observe: "response" });
  }

  getBranch(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  putBranch(id: number, branch: Branch) {
    return this.http.post(`${this.baseUrl}/${id}`, branch);
  }

  postBranch(branch: Branch) {
    return this.http.post(this.baseUrl, branch);
  }

  deleteBranch(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
