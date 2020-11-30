import {Injectable} from '@angular/core';
import{abogado} from '../models/abogado';
@Injectable()

export class abogadoService{
  public abogados:Array<abogado>;
  constructor(){
    this.abogados=[
      new abogado('neftali', 'solano', '1234', 20800),
      new abogado('jimena', 'rodriguez', '1234', 30500),
      new abogado('marcela', 'rodriguez', '1234', 20000),
      new abogado('giovani', 'rodriguez', '1234', 75000),
    ];
  }
  getTexto(){
    return "hola mundo desde un servicio";
  }


  getAbogados():Array<abogado>{
    return this.abogados;
  }

}
