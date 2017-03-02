import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Http, Response} from "@angular/http";
import {MasterURlService} from "../services/master-url.service";

@Component({
  selector: 'app-item',
  templateUrl: 'item.component.html',
  styleUrls: ['item.component.css']
})
export class ItemComponent implements OnInit {
  private _parametros: any;
  items=[];
  nuevoItem= {};
  constructor(private _ActivatedRoute: ActivatedRoute,
              private _http:Http,
              private _masterURL:MasterURlService) {
  }

  ngOnInit() {

    this._ActivatedRoute
      .params
      .subscribe(parametros => {
        this._parametros = parametros;
        this._http.get(this._masterURL.url+'Item?idBodega='+this._parametros.idBodega)
          .subscribe(
            (res:Response)=>{
              this.items = res.json();
            },
            (err)=>{
              console.log(err)
            }
          )

      });

  }
  crearItem(nombre:string){
    let item = {
      nombre:nombre,
      idBodega:this._parametros.idBodega
    };
    this._http.post(this._masterURL.url+'Item',item)
      .subscribe(
        (res:Response)=>{
          this.items.push(res.json());
          this.nuevoItem = {};
        },
        (err)=>{
          console.log(err)
        }
      )
  }

}
