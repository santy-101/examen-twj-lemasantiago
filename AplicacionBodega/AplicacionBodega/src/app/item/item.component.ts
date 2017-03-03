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
  title: string = "Bienvenido al Módulo Items";
  items=[];
  nuevoItem= {};
  disabledButtons = {
    NuevoItemFormSubmitButton: false
  };

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
            (res:Response)=> {
              this.items = res.json() .map((value) => {
                value.formularioCerrado = true;
                return value;
              })
            },
            (err)=>{
              console.log(err)
            }
          )

      });

  }
  crearItem(nombre:string, cantidad:number, peso: number){
    let item = {
      nombre:nombre,
      cantidad:cantidad,
      peso:peso,
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
  borrarItem(id: number) {
    this._http.delete(this._masterURL.url + "Item/" + id)
      .subscribe(
        (res) => {
          let itemBorrado = res.json();
          this.items= this.items.filter(value => itemBorrado.id != value.id);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  actualizarItem(item: any) {
    let parametos = {
      nombre: item.nombre,
      cantidad: item.cantidad,
      peso: item.peso
    };
    this._http.put(this._masterURL.url + "Item/" + item.id, parametos)
      .subscribe(
        (res: Response) => {
          item.formularioCerrado = !item.formularioCerrado;
          console.log("Respuesta:", res.json());
        },
        (err) => {
          console.log("Error:", err);
        }
      )
  }


}
