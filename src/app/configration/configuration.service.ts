import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { throwError } from 'rxjs/internal/observable/throwError';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() { }

   /**
  * Setting common header for http call's
  */
 public getHeaders() {
      
  const options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),  
  };
  //return httpOptions;
  return options;
}

/**
  * Handling External Error coming from network like 404, 500
  * @param error 
  */
 public handleError( error: HttpErrorResponse){
  let errorMsg:string;
  //console.log(error);
  if(error.status == 404){
      errorMsg = "Server error or bad request";
  }
  else  if(error.status == 500){
      errorMsg = "Server error";
  }else  if(error.status == 401){
      errorMsg = "Unauthorized request";
  }else  if(error.status == 403){
      errorMsg = "Invalid request";
      //localStorage.removeItem('TokenUser');
      //location.reload();
      //this.route.navigate(['/login'])
  }else{
      errorMsg = "Error occured in API server. Please try after sometime." ;
  }
  
  console.log(errorMsg);
  //console.log("error occured in the API : "+error.url);
  //return
  
  return throwError(errorMsg);
}
}
