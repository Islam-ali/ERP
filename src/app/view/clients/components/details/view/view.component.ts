import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'app/core/services/auth.service';
import { DatashowClient, showClient } from 'app/view/clients/modal/clients';
import { ClientService } from 'app/view/clients/services/client.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  clientDetails: DatashowClient;
  companyID: number = 0;
  clientID:number = 0;
  loadingShow: boolean = false;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ClientsService: ClientService,
    private toastrService: ToastrService,
    public _AuthenticationService: AuthenticationService,
  ) { 
    this._ActivatedRoute.paramMap.subscribe((param: any) => {
      this.companyID = +param.params['companyID'];
      this.clientID = +param.params['id'];
      this.showClients(this.clientID);
    })
  }

  ngOnInit(): void {
  }
  showClients(clientId: number) {
    this.loadingShow = true;
    this._ClientsService.getclientById(clientId).subscribe({
      next: (res: showClient) => {
        this.loadingShow = false;
        this.clientDetails = res.data;
      }, error: (err: Error) => {
        this.loadingShow = false;
      }
    })
  }

}
