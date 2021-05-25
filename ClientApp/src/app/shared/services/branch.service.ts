import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://localhost:44392/api/Branches';

  getBranches() {
    return this.http.get(this.baseUrl, { observe: "response" });
  }

  getBranch(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  putBranch(id, branch) {
    return this.http.put(`${this.baseUrl}/${id}`, branch);
  }

  postBranch(branch) {
    return this.http.post(this.baseUrl, branch);
  }

  deleteBranch(id) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
