import {Component, OnInit, DoCheck} from '@angular/core';
import{abogado} from '../models/abogado';
import {abogadoService} from '../services/abogado.service';
@Component({
  selector: 'abogados',
  templateUrl: './abogados.component.html',
  providers: [abogadoService]

})

export class abogados implements OnInit, DoCheck{
  public titulo: string;
  public abogados:Array<abogado>;
  public propuesta: number;
   constructor(private _abogadoService:abogadoService){


   }
   ngOnInit(){
     this.abogados=this._abogadoService.getAbogados();
   }
   ngDoCheck(){
     console.log("do ckeck ejecuado");

   }
   cambiartitulo(){
     this.titulo="nuevo titulo";
   }
   getpropuesta(){
     alert(this.propuesta);
   }
}
