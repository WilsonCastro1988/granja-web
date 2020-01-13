import { AuthService } from './auth.service';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ProductoComponent } from './dashboard/submenuproductos/producto/producto.component';
import { SubmenuempleadosComponent } from './dashboard/submenuempleados/submenuempleados.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SidenavComponent } from './dashboard/sidenav/sidenav.component';
import { LoginComponent } from './login/login.component';
import { SubmenuComponent } from './dashboard/submenu/submenu.component';
import { AnimalComponent } from './dashboard/animal/animal/animal.component';
import { RazaComponent } from './dashboard/animal/raza/raza.component';
import { ReproduccionComponent } from './dashboard/animal/reproduccion/reproduccion.component';
import { ParcelaComponent } from './dashboard/animal/parcela/parcela.component';
import { ProduccionComponent } from './dashboard/animal/produccion/produccion.component';
import { SubmenufaturasComponent } from './dashboard/submenufaturas/submenufaturas.component';
import { ListarfacturasComponent } from './dashboard/submenufaturas/listarfacturas/listarfacturas.component';
import { NuevafacturaComponent } from './dashboard/submenufaturas/nuevafactura/nuevafactura.component';
import { ClienteComponent } from './dashboard/submenufaturas/cliente/cliente.component';
import { RazaaddComponent } from './dashboard/animal/raza/razaadd/razaadd.component';
import { RazaeditComponent } from './dashboard/animal/raza/razaedit/razaedit.component';
import { RazadetalleComponent } from './dashboard/animal/raza/razadetalle/razadetalle.component';
import { RazalistComponent } from './dashboard/animal/raza/razalist/razalist.component';
import { EmpleadoComponent } from './dashboard/submenuempleados/empleado/empleado.component';
import { TipoEmpleadoComponent } from './dashboard/submenuempleados/tipo-empleado/tipo-empleado.component';
import { SubmenuproductosComponent } from './dashboard/submenuproductos/submenuproductos.component';
import { Producto } from './model/producto/producto';
import { ProveedorComponent } from './dashboard/submenuproductos/proveedor/proveedor.component';
import { TipoproductoComponent } from './dashboard/submenuproductos/tipoproducto/tipoproducto.component';
import { ProductosVentaComponent } from './dashboard/submenuproductos/productos-venta/productos-venta.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo:'login'},
  {path:'login', component:LoginComponent},
  {path:'menu', component: SidenavComponent,
  children: [
    {path: "gestionAnimales", component: SubmenuComponent },
    {path: "animal", component:AnimalComponent },
    {path: "raza", component: RazaComponent },
    {path: "reproduccion", component:ReproduccionComponent },
    {path: "parcela", component:ParcelaComponent },
    {path: "produccion", component:ProduccionComponent },

    {path:"facturas", component: SubmenufaturasComponent },
    {path:"listafacturas", component: ListarfacturasComponent },
    {path:"nuevafactura", component:NuevafacturaComponent },
    {path:"clientes", component: ClienteComponent },

    {path:"empleados", component: SubmenuempleadosComponent },
    {path:"listaempleados", component: EmpleadoComponent },
    {path:"tipoempleados", component:TipoEmpleadoComponent },

    {path:"productos", component:SubmenuproductosComponent },
    {path:"productos_de_venta", component:ProductosVentaComponent},
    {path:"listaproductos", component:ProductoComponent },
    {path:"listaproveedores", component: ProveedorComponent },
    {path:"tipoproducto", component: TipoproductoComponent },
  ]},

  // {path: 'login', component: LoginComponent },
];
// const routes: Routes = [
//   {path: "", component: LoginComponent},
//   {path: "dashboard", component: DashboardComponent},
//   {path: "gestionAnimales", component: SubmenuComponent},
//   {path: "animal", component:AnimalComponent},
//   {path: "raza", component: RazaComponent},
//   {path: "reproduccion", component:ReproduccionComponent},
//   {path: "parcela", component:ParcelaComponent},
//   {path: "produccion", component:ProduccionComponent},

//   {path:"facturas", component: SubmenufaturasComponent},
//   {path:"listafacturas", component: ListarfacturasComponent},
//   {path:"nuevafactura", component:NuevafacturaComponent},
//   {path:"clientes", component: ClienteComponent},

//   {path:"empleados", component: SubmenuempleadosComponent},
//   {path:"listaempleados", component: EmpleadoComponent},
//   {path:"tipoempleados", component:TipoEmpleadoComponent},

//   {path:"productos", component:SubmenuproductosComponent},
//   {path:"listaproductos", component:ProductoComponent},
//   {path:"listaproveedores", component: ProveedorComponent},
//   {path:"tipoproducto", component: TipoproductoComponent}

// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
