
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './dashboard/sidenav/sidenav.component';
import { LoginComponent } from './login/login.component';
import { SubmenuComponent } from './dashboard/submenu/submenu.component';
import { AnimalComponent } from './dashboard/animal/animal/animal.component';
import { RazaComponent } from './dashboard/animal/raza/raza.component';
import { ReproduccionComponent } from './dashboard/animal/reproduccion/reproduccion.component';
import { ParcelaComponent } from './dashboard/animal/parcela/parcela.component';
import { ProduccionComponent } from './dashboard/animal/produccion/produccion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule,MatNativeDateModule,MatFormFieldModule,MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatButtonModule, MatPaginatorIntl} from '@angular/material';
import { SubmenufaturasComponent } from './dashboard/submenufaturas/submenufaturas.component';
import { ListarfacturasComponent } from './dashboard/submenufaturas/listarfacturas/listarfacturas.component';
import { NuevafacturaComponent } from './dashboard/submenufaturas/nuevafactura/nuevafactura.component';
import { DetalleComponent } from './dashboard/submenufaturas/detalle/detalle.component';
import { ClienteComponent } from './dashboard/submenufaturas/cliente/cliente.component';
import { MatCardModule, MatDialogModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from './services/cliente/cliente.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RazadetalleComponent } from './dashboard/animal/raza/razadetalle/razadetalle.component';
import { RazaeditComponent } from './dashboard/animal/raza/razaedit/razaedit.component';
import { RazaaddComponent } from './dashboard/animal/raza/razaadd/razaadd.component';
import { RazalistComponent } from './dashboard/animal/raza/razalist/razalist.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { EditParcelaComponent } from './dashboard/animal/parcela/edit-parcela/edit-parcela.component';
import { EditAnimalComponent } from './dashboard/animal/animal/edit-animal/edit-animal.component';
import { EditClienteComponent } from './dashboard/submenufaturas/cliente/edit-cliente/edit-cliente.component';
import { SubmenuempleadosComponent } from './dashboard/submenuempleados/submenuempleados.component';
import { EmpleadoComponent } from './dashboard/submenuempleados/empleado/empleado.component';
import { TipoEmpleadoComponent } from './dashboard/submenuempleados/tipo-empleado/tipo-empleado.component';
import { EditTipoEmpleadoComponent } from './dashboard/submenuempleados/tipoEmpleado/edit-tipo-empleado/edit-tipo-empleado.component';
import { EditEmpleadoComponent } from './dashboard/submenuempleados/empleado/edit-empleado/edit-empleado.component';
import { SubmenuproductosComponent } from './dashboard/submenuproductos/submenuproductos.component';
import { TipoproductoComponent } from './dashboard/submenuproductos/tipoproducto/tipoproducto.component';
import { EditTipoProductoComponent } from './dashboard/submenuproductos/tipoproducto/edit-tipo-producto/edit-tipo-producto.component';
import { ProveedorComponent } from './dashboard/submenuproductos/proveedor/proveedor.component';
import { EditProveedorComponent } from './dashboard/submenuproductos/proveedor/edit-proveedor/edit-proveedor.component';
import { ProductoComponent } from './dashboard/submenuproductos/producto/producto.component';
import { EditProductoComponent } from './dashboard/submenuproductos/producto/edit-producto/edit-producto.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { DataTablesModule } from 'angular-datatables';
import {MatRadioModule} from '@angular/material/radio';
import { PaginatorEspañol } from './paginator-español';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { ProductosVentaComponent } from './dashboard/submenuproductos/productos-venta/productos-venta.component';
// import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    LoginComponent,
    SubmenuComponent,
    AnimalComponent,
    RazaComponent,
    ReproduccionComponent,
    ParcelaComponent,
    ProduccionComponent,
    SubmenufaturasComponent,
    ListarfacturasComponent,
    NuevafacturaComponent,
    DetalleComponent,
    ClienteComponent,
    RazadetalleComponent,
    RazaeditComponent,
    RazaaddComponent,
    RazalistComponent,
    EditParcelaComponent,
    EditAnimalComponent,
    EditClienteComponent,
    SubmenuempleadosComponent,
    EmpleadoComponent,
    TipoEmpleadoComponent,
    EditTipoEmpleadoComponent,
    EditEmpleadoComponent,
    SubmenuproductosComponent,
    TipoproductoComponent,
    EditTipoProductoComponent,
    ProveedorComponent,
    EditProveedorComponent,
    ProductoComponent,
    EditProductoComponent,
    DashboardComponent,
    ProductosVentaComponent,

  ],
  imports: [
    AlifeFileToBase64Module,
    BrowserModule,
    MatRadioModule,
    DataTablesModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    NgxPaginationModule,
    MatAutocompleteModule,
    CalendarModule,
    ModalModule.forRoot()

  ],
  providers: [
  ClienteService,
  BsModalService,
  MatPaginatorIntl,
  PaginatorEspañol],

  bootstrap: [AppComponent],
  entryComponents: [
    ClienteComponent,
    EditParcelaComponent,
    EditClienteComponent,
    EditEmpleadoComponent,
    EditTipoEmpleadoComponent,
    EditProveedorComponent,
    EditProductoComponent,
    RazaeditComponent
  ],
})
export class AppModule { }
