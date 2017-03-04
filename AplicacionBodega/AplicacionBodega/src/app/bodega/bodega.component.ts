import { Component, OnInit } from '@angular/core';
import {Http, Response} from "@angular/http";
import {MasterURlService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-bodega',
  templateUrl: 'bodega.component.html',
  styleUrls: ['bodega.component.css']
})
export class BodegaComponent implements OnInit {

  title: string = "Bienvenido al Módulo de Bodegas";
  nuevaBodega = {};
  bodegas= [];
  disabledButtons = {
    NuevaBodegaFormSubmitButton: false,
    Oculto : false
  };


  constructor(private _http: Http,
              private _masterURL: MasterURlService) {
  }

  ngOnInit() {
    this.disabledButtons.Oculto = true;
    this._http.get(this._masterURL.url + "Bodega")
      .subscribe(
        (res: Response) => {
          this.bodegas= res.json()
            .map((value) => {
              value.formularioCerrado = true;
              return value;
            });
        },
        (err) => {
          console.log(err);
        }
      )
  }

  crearBodega(formulario: NgForm) {
    console.log(formulario);
    this.disabledButtons.NuevaBodegaFormSubmitButton = true;


    this._http.post(this._masterURL.url + "Bodega", {
      nombre: formulario.value.nombre,
      direccion: formulario.value.direccion,
      capacidad: formulario.value.capacidad
    }).subscribe(
      (res) => {
        console.log("No hubo errores");
        console.log(res);

        this.bodegas.push(res.json());
        this.nuevaBodega = {};
        this.disabledButtons.NuevaBodegaFormSubmitButton = false;
        this.disabledButtons.Oculto = true;

      },
      (err) => {
        this.disabledButtons.NuevaBodegaFormSubmitButton = false;
        console.log("Ocurrió un error", err);
      },
      () => {
      }
    );

  }

  borrarBodega(id: number) {
    this._http.delete(this._masterURL.url + "Bodega/" + id)
      .subscribe(
        (res) => {
          let bodegaBorrada = res.json();
          this.bodegas = this.bodegas.filter(value => bodegaBorrada.id != value.id);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  actualizarBodega(bodega: any) {
    let parametos = {
      nombre: bodega.nombre,
      direccion: bodega.direccion,
      capacidad: bodega.capacidad
    };
    this._http.put(this._masterURL.url + "Bodega/" + bodega.id, parametos)
      .subscribe(
        (res: Response) => {
          bodega.formularioCerrado = !bodega.formularioCerrado;
          console.log("Respuesta:", res.json());
        },
        (err) => {
          console.log("Error:", err);
        }
      )
  }

}
