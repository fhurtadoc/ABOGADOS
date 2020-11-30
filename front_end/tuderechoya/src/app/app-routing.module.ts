// importar modules router

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import de componentes

import{abogados} from './abogados/abogados.component';
import{ ExternoComponent } from './externo/externo.component';



const routes: Routes = [
  {path: '/abogados', component: abogados
  },

  {path: '/externo', component: ExternoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
