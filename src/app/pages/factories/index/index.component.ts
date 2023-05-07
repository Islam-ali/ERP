import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataFactories, Factories } from '../factories';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FactoriesServies } from '../factories.service';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  FactoriesForm: FormGroup;
  image: any;
  submit: boolean = false;
  allFactories: DataFactories[] = [];
  lableForm: number = 0;
  FactoryId: number = 0;
  loadingStatus: boolean = false;
  loadingFactories: boolean = false;
  loader:boolean = true;
  rangeValue:number=0;
  constructor(
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private _FactoriesServies: FactoriesServies

  ) { 
    this.FactoriesForm = this._formBuilder.group({
      name_ar: [null, [Validators.required]],
      name_en: [null, [Validators.required]],
      image: [null, [Validators.required]],
      tarfok_percentage: [0]
    });
  }

  ngOnInit(): void {

    this.getFactories();
  }
  getFactories(): void {
    this._FactoriesServies.getFactories().subscribe({
      next: (res: Factories) => {
        this.allFactories = res.data;
        this.loader = false;
      }
    })
  }
  uploadeImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      // var filesAmount = event.target.files.length;
      // for (let i = 0; i < filesAmount; i++) {
      var reader = new FileReader();
      this.FactoriesForm.patchValue({
        image: event.target.files.item(0)
      })
      // this.FactoriesForm.value.image = event.target.files.item(0);
      reader.onload = (event: any) => {
        this.image = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      // }
    }
  }
  // 0 : add
  // 1 : Edit
  openModal(content: any, num: number): void {
    this.lableForm = num;
    this.FactoriesForm.reset();
    this.image = null;
    this.rangeValue = 0;
    // num == 1 ? this.patchValueForm() : EMPTY
    this.modalService.open(content);
  }
  patchValueForm(content: any, Factory: any) {
    this.lableForm = 1;
    this.FactoriesForm.patchValue({
      name_ar: Factory.name,
      name_en: Factory.name,
      // image: Factory.image
    })
    this.rangeValue = Factory.tarfok_percentage;
    this.image = Factory.image
    this.modalService.open(content);
    console.log(this.FactoriesForm);

  }
  getUpdateFactory(FactoryId: number): number {
    this.FactoryId = FactoryId;
    return FactoryId
  }
  getFactoryById(): void {
    let value = this.FactoriesForm.value
    const formData = new FormData();
    formData.append('name_ar', value.name_ar);
    formData.append('name_en', value.name_en);
    value.image ? formData.append('image', value.image) : EMPTY;
    formData.append('tarfok_percentage', `${this.rangeValue}`);

    this._FactoriesServies.updateFactory(formData, this.FactoryId).subscribe({
      next: (res: Factories) => {
        this.getFactories();
        this.loadingFactories = false;
        this.modalService.dismissAll();
      }, error: (err: Error) => {
        this.loadingFactories = false;

      }
    })
  }
  getAddFactory(): void {
    let value = this.FactoriesForm.value
    const formData = new FormData();
    formData.append('name_ar', value.name_ar);
    formData.append('name_en', value.name_en);
    formData.append('image', value.image);
    formData.append('tarfok_percentage', `${this.rangeValue}`);

    this._FactoriesServies.addFactory(formData).subscribe({
      next: (res: Factories) => {
        this.getFactories();
        this.loadingFactories = false;
        this.modalService.dismissAll();
      }, error: (err: Error) => {
        this.loadingFactories = false;
      }
    })
  }
  changeActivate(event: boolean, FactoryId: number) {
    this.FactoryId = FactoryId
    console.log(event);
    event ? this.activate(FactoryId) : this.deActivate(FactoryId);
  }
  activate(FactoryId: number) {
    this.loadingStatus = true;
    this._FactoriesServies.activate(FactoryId).subscribe({
      next: (res: Factories) => {
        this.getFactories();
        this.loadingStatus = false;
      }, error: (err: Error) => {
        this.loadingStatus = false;
      }
    })
  }
  deActivate(FactoryId: number) {
    this.loadingStatus = true;
    this._FactoriesServies.deactivate(FactoryId).subscribe({
      next: (res: Factories) => {
        this.getFactories();
        this.loadingStatus = false;
      }, error: (err: Error) => {
        this.loadingStatus = false;
      }
    })
  }
  delete(FactoryId: number) {
    this._FactoriesServies.delete(FactoryId).subscribe({
      next: (res: Factories) => {
        this.getFactories();
      }, error: (err: Error) => {

      }
    })
  }
  onSubmit() {
    this.loadingFactories = true;
    if (this.lableForm === 0 && this.FactoriesForm.invalid) {
      return
    } else {
      this.submit = true;
      this.lableForm === 0 ? this.getAddFactory() : this.getFactoryById();
    }
  }
  get form() {
    return this.FactoriesForm.controls;
  }
}
