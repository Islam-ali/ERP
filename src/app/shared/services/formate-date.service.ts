import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormateDateService {

  constructor() { }
  
  recivedFormateDate(date){
    let arrayDate = date.split('-');
    const objdate = {year:+arrayDate[0],month:+arrayDate[1],day:+arrayDate[2]}
    return objdate
  }// {year: 2023, month: 5, day: 13}
  sendFormateDate(date){
    console.log(date);
    var formatedate:any = {}
    if(date.month.toString().length == 1){
      formatedate = date.year+'-0'+date.month+'-'+date.day
    }else{
      formatedate = date.year+'-'+date.month+'-'+date.day
    }
    return formatedate
  }// 2000-01-01
}
