import { Component, OnInit } from '@angular/core';
import { PendingService } from './pending.service';
import { DataPending, Pending } from './pending';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {
  allPending:DataPending[];
  loader:boolean = true;
  loadingStatus:boolean = false;
  PendingID:number;
  constructor(
    private _PendingService:PendingService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getPending();
  }
  getPending(): void {
    this._PendingService.getPending().subscribe({
      next: (res: Pending) => {
        this.allPending = res.data;
        this.loader = false;
      }
    })
  }
  changeActivate(event: boolean, PendingID: number) {
    this.PendingID = PendingID
    event ? this.activate(PendingID) : this.deActivate(PendingID);
  }
  activate(pendingID: number) {
    this.loadingStatus = true;
    this._PendingService.activate(pendingID).subscribe({
      next: (res: Pending) => {
        this.getPending();
        this.loadingStatus = false;
        this.toastrService.success(res.message);
      }, error: (err: Error) => {
        this.loadingStatus = false;
        this.toastrService.error(err.message);
      }
    })
  }
  deActivate(pendingID: number) {
    this.loadingStatus = true;
    this._PendingService.deactivate(pendingID).subscribe({
      next: (res: Pending) => {
        this.getPending();
        this.loadingStatus = false;
        this.toastrService.warning(res.message);
      }, error: (err: Error) => {
        this.loadingStatus = false;
        this.toastrService.error(err.message);
      }
    })
  }
}
