import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource,MatPaginator, MatSnackBar,MatSort} from '@angular/material';
import { LeadService } from '../services/lead.service';
import { NgForm } from '@angular/forms';





@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})

export class LeadComponent implements OnInit {
  
  // add table
  displayedColumns: string[] = ['name', 'email', 'mobile', 'locType','locString','action'];
  dataSource=new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog,
              public leadService:LeadService) { }

  ngOnInit() {
    this.getLeadList();
    
  }

  // ADD MAT DIALOG
  leadResponse:any;
  leadId:number;
  loader:boolean=false;

  openDialog(lData:any,lId?:number): void {
    const dialogRef = this.dialog.open(addleadDialog, {
      disableClose: true ,
      data: {'popupName':lData,'leadDetails':lId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result.leadRespData){
        this.loader=true;
        this.leadResponse=result.leadRespData;
        this.leadId=result.leadRespData.id;
        
        this.leadListArray.unshift(this.leadResponse);
        this.showTableList();
      }
      if(result.leadList==true){
        this.getLeadList();
      }
    });
    
  }

  // TO SHOW THE LIST IN THE TABLE
  showTableList(){
    this.loader=false;
    this.dataSource=new MatTableDataSource<any>(this.leadListArray);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  
  }

  // LEAD SEARCH FILTER
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // to get the list of all leads
  leadListArray:any;
  getLeadList(){
    this.loader=true;
    this.leadService.loadLeads().subscribe(
      response=>{
      this.leadListArray=response;
      this.showTableList();
      },
      
      error=>{
        console.log("http error");
      },
      ()=>{
        this.loader=false;
      }
    )
    
  }
 

}

// MAT DIALOG TO OPEN IN ANOTHER HTML ie addlead-dialog.html
@Component({
  templateUrl: '../addlead-dialog.html',
  styleUrls: ['./lead.component.css']
})
export class addleadDialog {
  
  popupName:any;
  leadId:number;
  first_name:any;
  last_name:any;
  email:any;
  mobile:any;
  location_type:any;
  location_string:any;
  communication:any;
  delLeadId:any;
  successMsg:any;

  constructor(
    public dialogRef: MatDialogRef<addleadDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private leadService:LeadService,
    public snackBar: MatSnackBar,){

      this.popupName=data.popupName;
      
      if(this.popupName=='edit-lead'){
        this.showEditData(data.leadDetails);
        this.leadId=data.leadDetails.id;
        
      }
      if(this.popupName=='deleteLead'){
        this.delLeadId=data.leadDetails;
      }
    }

    // SHOW DATA IN EDIT POPUP
    showEditData(data){
      this.first_name=data.first_name;
      this.last_name=data.last_name;
      this.email=data.email;
      this.mobile=data.mobile;
      this.location_type=data.location_type;
      this.location_string=data.location_string;
      this.communication=data.communication;
    }

    // REQUEST FOR ADD LEAD
    addLead(form:NgForm){

      if(this.popupName=='add-lead'){
        this.leadService.addLeads(form.value).subscribe(
          response=>{
            var respData=response;
            this.dialogRef.close({'leadRespData':respData});
            this.successMsg="Lead Details Added successfully";
            this.snackBar.open(this.successMsg, '', {
            duration: 3000,
            panelClass: ['succsess-bar']
              });
          },
          error=>{
            console.log("===HTTP ERROR===");
          }
        )
       
       }
       if(this.popupName=='edit-lead'){
        this.leadService.editLeads(form.value,this.leadId).subscribe(
          response=>{
            var respData=response;
            this.dialogRef.close({'leadList':true});
            this.successMsg="Details updated successfully";
            this.snackBar.open(this.successMsg, '', {
            duration: 3000,
            panelClass: ['succsess-bar']
              });
          }
        )
       }
   
      }



    // DELETE LEAD
    delLead(){
      this.leadService.deleteLead(this.delLeadId).subscribe(
        response=>{
          console.log(response);
          this.dialogRef.close({'leadList':true});
          this.successMsg="Details Deleted successfully";
          this.snackBar.open(this.successMsg, '', {
          duration: 3000,
          panelClass: ['succsess-bar']
            });
        }
      )
    }

    ngOnInit(){
     
    }
  onNoClick(): void {
    this.dialogRef.close();
  }

}