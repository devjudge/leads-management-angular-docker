import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConstantsService {
  protocol:any;
  apiUrl:any;
  version:any;
  constructor() { 
    this.protocol = environment.protocol;
    this.version = environment.version;
    this.apiUrl = environment.apiUrl;

  }

   //define list of urls here

    //init showAllLeads
    showAllLeads = 'leads/?location_string=India';

    // init addlead
    addLeadUrl='leads/';

     /**
   * return respective url based on paramenter
   * @param url resquesting api url
   */

  getUrl(url:string){
  
    //check url
    if(url == this.showAllLeads){
      return this.protocol+this.apiUrl+this.showAllLeads;
    }

    //check url
    if(url == this.addLeadUrl){
      return this.protocol+this.apiUrl+this.addLeadUrl;
    }
    if(url=='editlead'){
      return this.protocol+this.apiUrl+this.addLeadUrl;
    }
  }

}
