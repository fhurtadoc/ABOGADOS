import {Injectable} from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';


@Injectable()
export class PeticionesService{
  public url:string

  constructor ( public _http: HttpClient){

    this.url="http://localhost:3500";

  }

  getabogados(){

    return this._http.get(this.url+'/users_abog');

  }


}
