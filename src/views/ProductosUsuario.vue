<template>
<v-app>
 
<!--Fondo de los productos-->
<base-background image="https://vicolors.com.mx/wp-content/uploads/2020/09/03_01.jpg" >   
<!--Termina Fondo-->

<!--Header-->
<v-toolbar dense class="ml-100"  height="80">

<div class="pt-4 pr-5">
       
</div>
<!--Filtro dropdown Header-->
    <div class="pt-2 pr-5">
     <select v-model="tipo" @change="onchange()" class="form-control form-control-lg">
     <option value="" selected>NOMBRE</option>
     <option>SUBCATEGORÍA</option>
     <option>TODOS LOS CAMPOS</option>
     </select>    
    </div> 
<!--Termina filtro dropdown Header-->
<!--Filtro text Header-->  
    <div class="pt-3 pr-5 w-50">  
    <div >
    
    <md-autocomplete class="2-50"  @md-changed="onchange" v-model="search" :md-options="lista" :md-open-on-focus="false">
    <label>Buscar</label>
    </md-autocomplete>
            
    </div> 

    </div>  
<!--Termina filtro text Header-->    
<div>       

</div>
</v-toolbar>
<!--Termina Header-->
            
<v-row no-gutters>
<!--Filtro Divisiones--> 
<v-col
class="sections"
cols=""
md="3"

>
        
<div class="col-md-5 menu-productos pad-top vertical-middle-responsive hidden-xs hidden-sm ">
<ol class="noselect" >
<!---->
<button pressed="true" variant="success" id="mp1" class="Side mt-4" @click="productostotales()">
<u>TODAS LAS DIVISIONES</u>
</button>
  <div
  v-for="division in listaDivisiones"
  :key="division"
  class=" pt-5 Side">
  <v-menu open-on-click offset-x right>
  <template class="botonDivisiones" v-slot:activator="{ on, attrs }">
  <div @click="hover(division)"  left v-bind="attrs" v-on="on">

  <button pressed="true" variant="success" class="Side pb-2" >
  <u>{{ division }}</u> </button>
  </div>
  </template>
  <div class="pl-10">
  <v-list class="listacat"  v-show="mostrarCategorias">
  <v-list-item  v-for="item in items" :key="item">
  <a><v-list-item-title class="lista" @click="onchangeCategoria(division,item)">{{ item }}</v-list-item-title></a>
  </v-list-item>
  </v-list>
  </div>
  </v-menu>
</div> 

<button pressed="true" variant="success" id="mp1" class="Side mt-4" @click="Side('OTROS')">
<u>OTROS</u>
</button>

<!---->                                
</ol>
</div>
   
</v-col>
<!--Termina filtro Divisiones-->

<v-col
cols="12"
sm="6"
md="9">
                 
<div class="content content-narrow">
      
<v-container v-if="this.spinner" style="height: 400px;">
<v-row
class="fill-height"
align-content="center"
justify="center">
<v-col
 class="subtitle-1 text-center"
cols="12">

<v-progress-circular
:size="70"
:width="7"
color="purple"
indeterminate
></v-progress-circular>

</v-col>
<v-col cols="6">
       
</v-col>
</v-row>
</v-container>

<div v-if="NombreResults">
<p>No se encontraron resultados con ese nombre</p>
</div>
    
<div>
    
<b-row xs="3">
      
<b-col  md="6" sm="4" xs="3" v-for="producto in paginador(productosTotales)"  :key="producto.id">

<v-card  v-if="!spinner"
class="carta mx-auto"
max-width="500"
outlined
color="white"
>
  
<v-list-item three-line>
    
<div class="mt-3 mr-3">
<v-img
height="140PX"
width="110"
v-bind:src="'https://vicolors.com.mx/phpapi/storage/app/public/productos/' + producto.foto">
</v-img>
</div>
<v-list-item-content>

       
<v-list-item-title class="cattitle headline">{{ producto.nombre }}</v-list-item-title>
<v-list-item-title class="catsubtitle  headline mb-1">{{ producto.categoria }}</v-list-item-title>
<v-list-item-subtitle v-html="producto.descripcion">{{ producto.descripcion }}
</v-list-item-subtitle>
</v-list-item-content>

</v-list-item>

<v-card-actions>
<router-link :to="{name: 'Producto', params:{ id: producto.id}}">
<v-btn text>VER PRODUCTO</v-btn>
</router-link> 
</v-card-actions>
</v-card>

</b-col>
</b-row>

<nav v-if="spinner === false" >
<div v-if="this.productosTotales.length>8 ">
<b-pagination class="pt-4" align="center" :total-rows="this.productosTotales.length " v-model="paginaActual" :per-page="itemsPorPagina" >
</b-pagination>
</div>
</nav> 
</div>
</div>   
        
</v-col>
</v-row>
</base-background>

</v-app>
</template>

<style lang="scss">
@import '~sweetalert2/dist/sweetalert2.min.css';
</style>

<script>

import Vuee from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import Chart from 'chart.js'
import axios from 'axios'

Vuee.use(VueMaterial)
Vue.use(VueSweetalert2, options)

const options = {
  buttonsStyling: false,
  customClass: {
  confirmButton: 'btn btn-success m-1',
  cancelButton: 'btn btn-danger m-1',
  input: 'form-control'
}
}

export default {
    name: 'AutocompleteAsync',
    data: () => ({
      paginaActual: 1,
      itemsPorPagina: 8  ,
      productos: [],
      productosTotales: [],
      search:"", 
      divisionSeleccionada:"",
      NombreResults:false,
      spinner:true, 
      lista:[], //LISTA QUE SE MOSTRARA EN EL AUTOCOMPLETE
      categorias: [], //CATEGORIAS OBTENIDAS DE LA API
      divisiones: [], //DIVISIONES OBTENIDAS DE LA API
      listaDivisiones: [],//LISTA DE DIVISIONES PARA MOSTRAR EN EL AUTOCOMPLETE
      listaCategoriasDinamica:[],
      items: [],
      mostrarCategorias:true,
      tipo:"",
      listaSubCategorias:[]
    }),

created() {

    this.productostotales()//OBTENER TODOS LOS PRODUCTOS
    this.getDivisiones()//OBETENER LAS DIVISIONES Y MOSTRALAS EN EL AUTOCOMPLETE
    this.Side()
    this.getSubCategorias()
     
},

methods: {
    //FUNCION PARA MOSTRAR LOS PRODUCTOS SEGUN LA DIVISION
    Side(parametro){
      this.search=""
      this.paginaActual=1
      this.NombreResults=false
      this.spinner=true
      if(parametro===""){
      this.productostotales()
      }
      else{
      this.divisionSeleccionada=parametro
      let url = '/productos';
      this.spinner = true
      this.axios.get(url)
        
      .then(res => {
      this.productos=res.data
      this.productosTotales=this.productos.filter(pro => (pro.division).match(parametro)) 
      })
      .catch(err => {
      console.error(err); 
      })}
      this.spinner = false
    },

    //FUNCION EN CASO DE FALLAR EL FILTRO
    noop () {
            
    },

    //FUNCTION PARA PAGINAR 
    paginador(items) {
      let indiceInicio = (this.paginaActual - 1) * this.itemsPorPagina;
      let indiceFinal = indiceInicio + this.itemsPorPagina > items.length ? items.length : indiceInicio  + this.itemsPorPagina; 
      return items.slice(indiceInicio , indiceFinal );
    },

    //FUNCION  PARA CUANDO SE SELCCIONA UNA CATEGORIA
    onchangeCategorias(){
      this.paginaActual=1
      this.spinner = true
      let url = '/productos';
      this.axios.get(url)
      .then(res => {
      this.productos=res.data
      this.productosTotales=this.productos.filter(pro => (pro.division).match(this.divisionSeleccionada)) 
      this.productosTotales=this.productosTotales.filter(pro => (pro.categoria).match(this.categoria))
      })
      .catch(err => {
      console.error(err); 
      })
      this.spinner = false
    },

    //FUNCION PARA BUSCAR LOS PRODUCTOS SEGUN EL FILTRO
    onchange(){
      this.paginaActual=1
      this.NombreResults = false;
      this.spinner = true;
      if (this.search === "") {
        this.Side(this.divisionSeleccionada);
      } else if (this.tipo === "SUBCATEGORÍA") {
        //EN CASO DE QUE SE BUSQUE POR CATEGORIA ENTRA AQUI
        this.NombreResults = false;
        this.lista = this.listaSubCategorias;
        this.search = this.search.toUpperCase();
        let url = "/productos";
        this.axios
        .get(url)
        .then((res) => {
        this.productos = res.data;
        this.productosTotales = this.productos.filter((pro) => pro.division.match(this.divisionSeleccionada));
        this.productosTotales = this.productosTotales.filter((pro) => pro.subcategoria.match(this.search));
        this.spinner = false;
        if (this.productosTotales.length != 0) {
        this.NombreResults = false;
        } else {
        this.NombreResults = true;
        }
       
        })
        .catch((err) => {
        console.error(err);
        });
      } else if (this.tipo === "TODOS LOS CAMPOS") {
      //EN CASO DE BUSCAR EN TODO ENTRA AQUI
      this.lista = [];
      const primerCaracter = this.search.charAt(0).toUpperCase();
      const restoDeLaCadena = this.search.substring(1, this.search.length);
      let url = "/productos";
      this.axios
      .get(url)
      .then((res) => {
      this.productos = res.data;
      this.productosTotales = this.productos.filter((pro) =>
      pro.division.match(this.divisionSeleccionada)
      );
      //FILTRA EN TODOS LOS ATRIBUTOS DE LOS PRODUCTOS
      this.productosTotales = this.productosTotales.filter(
      (pro) => pro.categoria.match(this.search.toUpperCase()) || pro.subcategoria.match(this.search.toUpperCase()) ||
      pro.descripcion.match(this.search) || pro.descripcion.match(this.search.toUpperCase()) ||
      pro.descripcion.match(this.search.toLowerCase()) || pro.nombre.toLowerCase().match(this.search.toLowerCase()) ||
      pro.division.match(this.search.toUpperCase()));
      this.spinner = false;
      if (this.productosTotales.length != 0) {
      this.NombreResults = false;
      } else {
      this.NombreResults = true;
       }
      })
      .catch((err) => {
      console.error(err);
      });
      } else {
      //EN CASO DE BUSCAR POR NOMBRE ENTRA AQUI
      this.NombreResults = false;
      this.lista = [];
      let url = "/productos";
      this.axios
      .get(url)
      .then((res) => {
      this.productos = res.data;
      this.productosTotales = this.productos.filter((pro) => pro.division.match(this.divisionSeleccionada) );
      this.productosTotales = this.productosTotales.filter((pro) => pro.nombre.toLowerCase().match(this.search.toLowerCase()));
      this.spinner = false;
      if (this.productosTotales.length != 0) {
      this.NombreResults = false;
      } else {
      this.NombreResults = true;
      }
      })
      .catch((err) => {
      console.error(err);
      });
      }    
    },
    
    hover(parametro) {
      this.spinner=true
      this.Side(parametro)
      this.mostrarCategorias=false
      this.items=[]
      this.listaCategoriasDinamica=this.items
      let url = "/productos";
      this.axios
      .get(url)
      .then((res) => {
      this.productos = res.data;
      this.productos = this.productos.filter((pro) => pro.division.match(parametro));
      for (let index = 0; index < this.productos.length; index++) {
      if (this.productos[index].categoria != "") {
      if (!this.listaCategoriasDinamica.includes(this.productos[index].categoria)) {
      this.listaCategoriasDinamica.push(this.productos[index].categoria);
      }
      }else{
      if (!this.listaCategoriasDinamica.includes("SIN CATEGORIA")) {
      this.listaCategoriasDinamica.push("SIN CATEGORIA");
      }            
      }
      }
      this.listaCategoriasDinamica.splice(this.listaCategoriasDinamica.indexOf("SIN CATEGORIA"), 1);
      //this.listaCategoriasDinamica.push("SIN CATEGORIA");
      this.items=this.listaCategoriasDinamica
      if(this.listaCategoriasDinamica.length<=1){
       this.Side(parametro)
      }else{
       this.mostrarCategorias=true

      }

      })
      .catch((err) => {
        console.error(err);
      });
      this.spinner=false
    },

    //FUNCION PARA OBTENER TODOS LOS PRODUCTOS
    productostotales(){
      this.divisionSeleccionada=""
      let url = '/productos';
      this.spinner = true
      this.axios.get(url)
         
      .then(res => {
      this.productos=res.data
      this.productosTotales=res.data
      this.spinner = false
      })
      .catch(err => {
      console.error(err); 
      })
    },

    //OBTIENE LAS CATEGORIAS DIRECTO DE LA BASE DE DATOS
    getSubCategorias() {
      let url = "/productos/subcategorias";
      this.axios
      .get(url)

      .then((res) => {
      this.Subcategorias = res.data;
      for (let index = 0; index < this.Subcategorias.length; index++) {
      this.listaSubCategorias.push(this.Subcategorias[index].subcategoria);
      }
      })
      .catch((err) => {
      console.error(err);
      });
    },

    //FUNCION PARA OBTENER LAS DIVISIONES EXISTENTES (PARA MOSTRAR EN EL AUTOCOMPLETE)
    getDivisiones(){
      
      let url = '/productos/divisiones';
      this.axios.get(url)    
      .then(res => {
      this.divisiones=res.data;
      for (let index = 0; index < this.divisiones.length; index++) {
      this.listaDivisiones.push(this.divisiones[index].division)
      }
      this.listaDivisiones.splice(this.listaDivisiones.indexOf("OTROS"), 1);
      })
      .catch(err => {
      console.error(err); 
      })  
      },

    onchangeCategoria(division,categoria){
      this.paginaActual=1
      this.divisionSeleccionada=division;  
      this.paginaActual=1
      this.spinner = true
      let url = '/productos';
      this.axios.get(url)
      .then(res => {
      this.productos=res.data
      this.productosTotales=this.productos.filter(pro => (pro.division).match(division))
      
      if(categoria=="SIN CATEGORIA"){
      this.productosTotales=this.productosTotales.filter(pro => (pro.categoria)=="")
      }else if(categoria=="TODAS LAS CATEGORIAS"){
      this.productosTotales=this.productosTotales.filter(pro => (pro.categoria).match(""))         
      }else{
      this.productosTotales=this.productosTotales.filter(pro => (pro.categoria).match(categoria))
      }
      
      if(this.productosTotales.length!=0){
      this.NombreResults=false
      }else{
      this.NombreResults=true
      }
      })
      .catch(err => {
      console.error(err); 
      })
      this.spinner = false
    },
},
}


</script>


<style lang="scss" scoped>

.v-progress-circular{
  margin: 1rem;
}
a{
  color:transparent !important;
}
.md-autocomplete + strong {
    margin-top: 36px;
    display: block;
}
.Side{
    align-content: left;
    list-style-type: none;
    text-align: left;
    color: white !important; 
    padding-left: 15 !important;
}
h2{
    text-align:center;
    font-family: "Kanit", Sans-serif;
}
u{
    padding-left: 15 !important;
    font-family: "Kanit", Sans-serif;
    text-align: center;
    font-size: 15.5px;
    width:100%;
    text-decoration: none;
    background-image: linear-gradient(#F37E42, #F37E42);
    background-position: 0% 100%;
    background-repeat: no-repeat;
    background-size: 0% 2px;
    transition: background-size .3s;

}
u:hover, u:focus {
    background-size: 100% 2px;
}
button:focus{
    u{
    text-align: center;
    color: white !important; 
    
    width:100%;
    text-decoration: none;
    background-image: linear-gradient(#F37E42, #F37E42);
    background-position: 0% 100%;
    background-repeat: no-repeat;
    background-size: 100% 2px;
    transition: background-size .3s;
    font-size: 17px !important
   }
}
p{
    font-size: 16px;
    color:white;
}
.carta{
    border-radius: 60px 60px 60px 60px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
}
.v-list-item .v-list-item_subtitle, .v-list-item .v-list-item_title {
    line-height: 1.2;
    color: black;
}
.v-menu__content {
    position: absolute;
    display: inline-block;
    max-width: 80%;
    overflow-y: auto;
    overflow-x: hidden;
    contain: content;
    will-change: transform;
    box-shadow: none;
    border-radius: 4px;
}
.catsubtitle{
font-family: "Kanit", Sans-serif !important;
font-size: 15px !important;
font-weight: 500 !important;

}
.cattitle{
font-family: "Kanit", Sans-serif !important;
color:#F37E42 !important;
}
.lista{
font-size:14px !important;
color:white !important;
font-family: "Kanit", Sans-serif !important;
}
.listacat{
background-color:#182226AB !important;

}
</style>