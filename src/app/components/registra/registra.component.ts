import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

import { Global } from '../../services/global';
import { CombosService } from '../../services/combos.service';
import { CultivoService } from '../../services/cultivo.service';

//Modelos

import { CultivoUsuario } from '../../modelos/cultivoUsuario';
import { Compras } from '../../modelos/compra';
import { ObraLabor } from '../../modelos/obraLabor';
import { Combos } from '../../modelos/combos';
//import { templateJitUrl } from '@angular/compiler';



@Component({
  selector: 'app-registra',
  templateUrl: './registra.component.html',
  styleUrls: ['./registra.component.css'],
  providers: [CombosService, CultivoService]
})
export class RegistraComponent implements OnInit {
  public lstPredios: [];
  public lstCultivos: [];
  public lstOperaciones: [];
  public lstActividades: Combos[] = [];


  public idUsuCultivo: number;

  public lstCultivosUsu: CultivoUsuario[] = [];
  public cultivo: CultivoUsuario;

  public lstObraLabor: ObraLabor[] = [];
  public jornales: ObraLabor;



  verCompras: boolean;
  verJornales: boolean;

  lstMiCompra: Compras[] = [];
  producto: Compras;
  valfactura: number = 0;
  valJornales: number = 0;


  /* cultivo: any; */
  //cultivo1:string;


  // public lstCultivosUsuCultivo: any [] = [];


  public url: string;
  private _usuId: string;

  constructor(
    private _combosService: CombosService,
    private _cultivoService: CultivoService

  ) {
    this.url = Global.url;
    this._usuId = localStorage.getItem('idUsuario');

    this.cultivo = {
      idUsuCultivo: 0,
      idUsuario: 0,
      idPredio: 0,
      idCultivo: 0,
      nomPredio: '',
      nomCultivo: '',
      nomMunicipio: '',
      nomDepartamento: ''
    };

    this.producto = {
      idUsuCultivo: 0,
      cantidad: 0,
      producto: '',
      valUnidad: 0
    };

    this.jornales = {
      idUsuCultivo: 0,
      idActividad: 0,
      cantidad: 0,
      valLabor: 0,
      nombre: ''
    };


    this.verCompras = false;
    this.verJornales = false;
    this.idUsuCultivo = 0;
  }

  ngOnInit() {

    this.CargarPredios();
    this.CargarCultivos();
    this.CargarOperaciones();
    this.CargarActividades();
    this.CargarCultivosUsuario();
  }

  limpiarCompra(): void {
    this.producto = {
      idUsuCultivo: 0,
      cantidad: 0,
      producto: '',
      valUnidad: 0
    };
  }

  limpiarJornales() {
    this.jornales = {
      idUsuCultivo: 0,
      idActividad: 0,
      cantidad: 0,
      valLabor: 0,
      nombre: ''
    };
  }


  CargarCultivosUsuario() {

    this._cultivoService.getCultivosUsuario(this._usuId).subscribe(
      response => {

        if (response) {
          /* let data = JSON.parse(JSON.stringify(response)); */
          //this.lstCultivosUsu = response.respuesta[0];
          //this.lstCultivosUsuCultivo = response.respuesta;
          this.lstCultivosUsu = response.respuesta;
          this.cultivo = this.lstCultivosUsu[0];


          if (this.lstCultivosUsu.length != 0) {

            this.idUsuCultivo = this.lstCultivosUsu[0].idUsuCultivo;

            if (this.lstCultivosUsu.length == 1) {
              this.cultivo = this.lstCultivosUsu[0];
            }
          }


          //console.log(this.cultivo);
        }
      },
      error => {
        console.log(error);
      }
    );

  }





  CargarPredios(): void {
    this._combosService.getPredios().subscribe(
      response => {
        if (response) {
          let data = JSON.parse(JSON.stringify(response));
          this.lstPredios = data.respuesta;
          //console.log(this.lstPredios);
        }
      },
      error => {
        console.log(error);
      }
    );
  }


  CargarCultivos(): void {
    this._combosService.getCultivos().subscribe(
      response => {
        if (response) {
          let data = JSON.parse(JSON.stringify(response));
          this.lstCultivos = data.respuesta;
          //console.log(this.lstCultivos);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  CargarOperaciones(): void {
    this._combosService.getOperaciones().subscribe(
      response => {
        if (response) {
          let data = JSON.parse(JSON.stringify(response));
          this.lstOperaciones = data.respuesta;
          //console.log(this.lstOperaciones);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  CargarActividades() {
    this._combosService.getActividades().subscribe(
      response => {
        if (response) {
          let data = JSON.parse(JSON.stringify(response));
          this.lstActividades = data.respuesta;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  cmbRegistraChange(registraId: number): void {
    if (registraId == 2) {

      this.verCompras = false;
      this.verJornales = true;
    } else if (registraId == 1) {

      this.verCompras = true;
      this.verJornales = false;
    } else {

      this.verCompras = false;
      this.verJornales = false;
    }
  }


  Ver(idUsuCultivo: number) {
    console.log(idUsuCultivo);
  }

  AddProducto() {
    this.producto.idUsuCultivo = this.idUsuCultivo;
    this.lstMiCompra.push(this.producto);
    this.limpiarCompra();
    this.valfactura = 0;

    for (let item of this.lstMiCompra) {
      this.valfactura = this.valfactura + item.valUnidad * item.cantidad;
    }

  }

  AddJornal(): void {


    this.jornales.idUsuCultivo = this.idUsuCultivo;
    this.jornales.idActividad = Number(this.jornales.idActividad);

    for (var i = 0; i < this.lstActividades.length; i++) {

      if (this.lstActividades[i].id == Number(this.jornales.idActividad)) {
        this.jornales.nombre = this.lstActividades[i].nombre;
      }
    }

    this.valJornales = 0;


    this.lstObraLabor.push(this.jornales);
    for (let item of this.lstObraLabor) {
      this.valJornales = this.valJornales + item.cantidad * item.valLabor;
    }





    this.limpiarJornales();
  }

}
