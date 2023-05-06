import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Usergrid } from '../../contacts/usergrid/usergrid.model';

import { userGridData } from '../../contacts/usergrid/data';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  userGridData: Usergrid[];
  selected;
  serviceForm: FormGroup;
  submitted = false;
  items: FormArray;
  // Select2 Dropdown
  selectValue: string[];
     image:any;
  constructor(private modalService: NgbModal, private _formBuilder: FormBuilder) { }

  ngOnInit() {
       this.serviceForm = this._formBuilder.group({
        name_ar: [null, [Validators.required]],
        name_en: [null, [Validators.required]],
        image:[null , [Validators.required]]
      });
    /**
     * fetches data
     */
    this._fetchData();
  }

  get form() {
    return this.serviceForm.controls;
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalService.open(content);
  }

  /**
   * User grid data fetches
   */
  private _fetchData() {
    this.userGridData = userGridData;
  }

  uploadeImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      // var filesAmount = event.target.files.length;
      // for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        this.serviceForm.value.image = event.target.files.item(0);
        reader.onload = (event: any) => {
          this.image = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
      // }
    }
  }
  /**
   * Save user
   */
  saveUser() {
    if (this.serviceForm.valid) {
      const name = this.serviceForm.get('name').value;
      const email = this.serviceForm.get('email').value;
      const designation = this.serviceForm.get('designation').value;
      //  this.userGridData.push({
      //    id: this.userGridData.length + 1,
      //    name,
      //    email,
      //    designation,
      //    projects: this.selected,
      //    status:0
      //  })
       this.modalService.dismissAll()
    }
    this.submitted = true
  }

}
