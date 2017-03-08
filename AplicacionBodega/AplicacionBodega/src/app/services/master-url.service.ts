import { Injectable } from '@angular/core';

@Injectable()
export class MasterURlService {
  private _url:string;

  constructor() {
   // this._url = "http://localhost:1337/";
    this._url = "https://examen-twj-lemasantiago-santiagolema.c9users.io/";
  }

  get url():string{
    return this._url;
  }

  set url(nuevoUrl:string){
    this._url = nuevoUrl;
  }

}
