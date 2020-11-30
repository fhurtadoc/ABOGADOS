import { Component, OnInit } from '@angular/core';
import {PeticionesService} from '../services/peticiones.service';

@Component({
  selector: 'externo',
  templateUrl: './externo.component.html',
  styleUrls: ['./externo.component.sass'],
  providers:[PeticionesService]
})
export class ExternoComponent implements OnInit {

  constructor(private _peticionesService: PeticionesService) { }

  ngOnInit(): void {
    this._peticionesService.getabogados().subscribe(result=>{
      console.log(result);
    }, (err)=>{
      console.log(err);
    });
  }

}
