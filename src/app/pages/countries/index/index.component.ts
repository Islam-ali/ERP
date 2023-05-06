import { Component, OnInit } from '@angular/core';
import { Project } from 'app/pages/projects/project.model';
import { projectData } from '../../projects/projectdata';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Countries, DataCountries } from '../countries';
import { CountriesService } from '../countries.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  countriesForm:FormGroup;
   projectData: Project[];
   image:any;
   submit:boolean = false;
   allCountries:DataCountries[]=[];
  constructor(
    private _formBuilder:FormBuilder,
    private modalService: NgbModal,
    private _CountriesService:CountriesService

  ) { }

  ngOnInit(): void {
       this.projectData = projectData;
       this.countriesForm = this._formBuilder.group({
        name_ar: [null, [Validators.required]],
        name_en: [null, [Validators.required]],
        image:[null , [Validators.required]]
      });
      this.getCountries();
  }
  getCountries(): void{
    this._CountriesService.getCountries().subscribe({
      next:(res:Countries)=>{
        this.allCountries = res.data
      }
    })
  }
  uploadeImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      // var filesAmount = event.target.files.length;
      // for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        this.countriesForm.value.image = event.target.files.item(0);
        reader.onload = (event: any) => {
          this.image = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
      // }
    }
  }
  openModal(content: any): void {
    this.modalService.open(content);
  }
  onSubmit() {
    console.log(this.countriesForm);
    if(this.countriesForm.invalid){
      return
    }else{
      let value = this.countriesForm.value
      const formData = new FormData();
      for(const item of this.countriesForm.value){
        console.log(item);
        
      }
      formData.append('name',value.name);
      formData.append('name',value.name);
      formData.append('image',value.image);

    } 
    this.submit = true;
  }
  get form() {
    return this.countriesForm.controls;
  }
}
