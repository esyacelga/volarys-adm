import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'black'},
    {
        path: 'folder/:id',
        loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
    },
    {
        path: 'sector',
        loadChildren: () => import('./pages/geo-config/sector/sector.module').then(m => m.SectorPageModule)
    },
    {
        path: 'tipo-usuario',
        loadChildren: () => import('./pages/persona/tipo-usuario/tipo-usuario.module').then(m => m.TipoUsuarioPageModule)
    },
    {
        path: 'articulo',
        loadChildren: () => import('./pages/mensajeria/articulo/articulo.module').then(m => m.ArticuloPageModule)
    },
    {
        path: 'segmento',
        loadChildren: () => import('./pages/mensajeria/segmento/segmento.module').then(m => m.SegmentoPageModule)
    },
    {
        path: 'tipo-articulo',
        loadChildren: () => import('./pages/mensajeria/tipo-articulo/tipo-articulo.module').then(m => m.TipoArticuloPageModule)
    },
    {path: 'black', loadChildren: './pages/login/black/black.module#BlackPageModule'},
    {path: 'rol-persona', loadChildren: './pages/login/rol-persona/rol-persona.module#RolPersonaPageModule'},  { path: 'managment', loadChildren: './pages/notificador/managment/managment.module#ManagmentPageModule' },
  { path: 'notificacion-masiva', loadChildren: './pages/notificador/notificacion-masiva/notificacion-masiva.module#NotificacionMasivaPageModule' },
  { path: 'dato-persona', loadChildren: './pages/persona/dato-persona/dato-persona.module#DatoPersonaPageModule' },
  {
    path: 'notificador-persona',
    loadChildren: () => import('./pages/persona/notificador-persona/notificador-persona.module').then( m => m.NotificadorPersonaPageModule)
  },
  {
    path: 'parametro',
    loadChildren: () => import('./pages/common/parametro/parametro.module').then( m => m.ParametroPageModule)
  }



];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
