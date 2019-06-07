import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstantsService } from '../configration/api-constants.service';
import { ConfigurationService } from '../configration/configuration.service';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LeadService {

  constructor(private http: HttpClient,private api:ApiConstantsService,private httpConf:ConfigurationService) { }

  loadLeads(): Observable<any>{
  //get url
  
  let url = this.api.getUrl('leads/?location_string=India');
 
  //return
  return this.http.get(url,this.httpConf.getHeaders())
    .pipe(
      catchError(this.httpConf.handleError)
  );
  }

  // ADD LEAD
  addLeads(data:any)
  {
    //get url
    let url = this.api.getUrl('leads/');
  
    //return
    return this.http.post(url,data,this.httpConf.getHeaders())
    .pipe(
    catchError(this.httpConf.handleError)
    );
  }

  // EDIT LEAD
  editLeads(data:any,id)
  {
    //get url
    //let url ='http://18.233.115.218:8100/api/leads/'+id+'/';
    let url=this.api.getUrl('editlead');
    url=url+id+'/';
    //return
    return this.http.put(url,data,this.httpConf.getHeaders())
    .pipe(
    catchError(this.httpConf.handleError)
    );
  }

  deleteLead(id){
     //get url
     let url=this.api.getUrl('editlead');
    url=url+id+'/';
  
     //return
     return this.http.delete(url,this.httpConf.getHeaders())
     .pipe(
     catchError(this.httpConf.handleError)
     ); 
  }
}
