<template>
  <div>
    <base-background image="img/photos/photo3@2x.jpg" inner-class="bg-primary-dark-op">
      <div class="content content-narrow content-full">
        <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center mt-5 mb-2 text-center text-sm-left">
          <div class="flex-sm-fill">
            <h1 class="font-w600 text-white mb-0">Dashboard</h1>
            <h2 class="h4 font-w400 text-white-75 mb-0">Bienvenido Administrador</h2>
          </div>
          <div class="mt-3 mt-sm-0 ml-sm-3">
             <router-link 
              :to="{name: 'Agregar'}">
            <b-button variant="primary" class="px-4 py-2" href="javascript:void(0)" v-click-ripple>
              <i class="fa fa-plus mr-1"></i> AGREGAR
            </b-button>
               </router-link>
          </div>
        </div>
      </div>
    </base-background>
    <v-toolbar dense class="ml-100"  height="80">

<div class="pt-4 pr-5">
       
</div>
  <div class="pt-2 pr-5"> <!--DIV DONDE ENCUENTRA EL DROPDOWN Y EL FILTRO PARA BUSCAR-->
     <select v-model="tipo" @change="onchange()" class="form-control form-control-lg">
          <option value="" selected>TODOS LOS PRODUCTOS</option>
          <option>NOMBRE</option>
          <option>CATEGORÍA</option>
          <option>SUBCATEGORÍA</option>
          <option>DIVISIÓN</option>
        </select>     
  </div> 

    <!--FILTRO-->
 <div class="pt-3 pr-5 w-25">  
  
      <div >
   
  <md-autocomplete  @md-changed="onchange" v-model="search" :md-options="lista" :md-open-on-focus="false">
      <label>Buscar</label>
    </md-autocomplete>
        
     </div> 

    </div>  
  
<div>       

     
    </div>
 
    </v-toolbar>
  
    <!-- Page Content -->  

   <div class="content content-narrow">
     <v-container v-if="this.spinner" style="height: 400px;">
      <v-row
        class="fill-height"
        align-content="center"
        justify="center"
      >
        <v-col
          class="subtitle-1 text-center"
          cols="12"
        >
        <v-progress-circular
      :size="70"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular>
        </v-col>
        <v-col cols="6">
          <v-progress-linear
           
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>

      <!-- Bootstrap Buttons in Options -->
      <b-row>
        <b-col  md="3" v-for="(producto, index) in paginador(productos)"  :key="index">


  <v-card v-if="!spinner"
    class="mx-auto"
    max-width="500"
    outlined
       color="white"
  >
  
    <v-list-item three-line>
     
    <div   class="mt-3 mr-3">
       <v-img
     
         height="140PX"
         width="110"
         v-bind:src="'https://vicolors.com.mx/phpapi/storage/app/public/productos/' + producto.foto"
      
          ></v-img>
          </div>
      <v-list-item-content>

       
               <v-list-item-title class="headline">{{ producto.nombre }}</v-list-item-title>
        <v-list-item-title class="headline mb-1">{{ producto.categoria }}</v-list-item-title>
        <v-list-item-subtitle v-html="producto.descripcion">{{ producto.descripcion }}
</v-list-item-subtitle>
      </v-list-item-content>

    </v-list-item>

    <v-card-actions>
    
 <v-row
        class="fill-height"
        align-content="left"
        justify="left"
      >
        <v-col
          class="uno"
          cols="12"
        >
      <router-link 
    :to="{name: 'Producto', params:{ id: producto.id}}">
       <v-btn small class="" color="black">Ver</v-btn>
       </router-link> 
        </v-col>
        
  <v-col
          class="dos"
          cols="12"
        >
      <router-link
    :to="{name: 'Editar', params:{ id: producto.id}}">
       <v-btn small class="editar" color="black">EDITAR</v-btn>
       </router-link> 
        </v-col>
        
         <v-col
          class="tres"
          cols="12"
        >
       
 <div class="my-2">
        <v-btn small class="eliminar" @click="eliminarProducto(producto.id, index)">ELIMINAR</v-btn>
      </div>
        </v-col>
      
        
  </v-row>
    
         
                




    </v-card-actions>
 
  </v-card>

        </b-col>
      </b-row>

              <nav v-if="spinner === false" >
              <div v-if="this.productos.length>16 ">
    <b-pagination   class="pt-4" align="center" :total-rows="this.productos.length " v-model="paginaActual" :per-page="itemsPorPagina" >
    </b-pagination>
    </div>
</nav> 

             
  </div>

             
              
 
  </div>
</template>
<style>
.uno{
  margin-bottom: -13px;
}
.dos{
  margin-bottom: -20px;
}
  .eliminar{
    background-color: red !important;
    color: white !important;
}
.editar{
   background-color: gray !important;
    color: white !important;
}
.btn:not(:disabled):not(.disabled){
  color: white !important;
}
  
</style>
<style lang="scss">
// SweetAlert2
@import '~sweetalert2/dist/sweetalert2.min.css';
</style>

<script>
import Vuee from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vuee.use(VueMaterial)

import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import Chart from 'chart.js'


const options = {
  buttonsStyling: false,
  customClass: {
    confirmButton: 'btn btn-success m-1',
    cancelButton: 'btn btn-danger m-1',
    input: 'form-control'
  }
}
Vue.use(VueSweetalert2, options)
import axios from 'axios'
export default {
data () {
    return {
       paginaActual: 1,
    itemsPorPagina: 16,
      productos: [],
      search:"", 
      tipo:"",
      
      spinner:true, 
      lista:[], //LISTA QUE SE MOSTRARA EN EL AUTOCOMPLETE
      listaCategorias:[], //LISTA DE SUBCATEGORIAS PARA MOSTRAR EN EL AUTOCOMPLETE
      listaSubCategorias:[],//LISTA DE SUBCATEGORIAS PARA MOSTRAR EN EL AUTOCOMPLETE
      categorias: [], //CATEGORIAS OBTENIDAS DE LA API
      subcategorias: [], //SUBCATEGORIAS OBTENIDAS DE LA API
      divisiones: [], //DIVISIONES OBTENIDAS DE LA API
      listaDivisiones: [],//LISTA DE DIVISIONES PARA MOSTRAR EN EL AUTOCOMPLETE
     
        nota: {nombre: '', descripcion: ''},
     pagination:{
                'total':0,
                'current_page':0,
                'per_page':0,
                'last_page':0,
                'from':0,
                'to':null,
     },
     offset: 3,
      check: {
          id:3,
          status: 1
     
    
        },

      
    }
  },
computed: {
			isActived: function() {
			return this.pagination.current_page;
		},

		pagesNumber: function() {
			if(!this.pagination.to){
				return [];
			}

			var from = this.pagination.current_page - this.offset; 
			if(from < 1){
				from = 1;
			}

			var to = from + (this.offset * 2); 
			if(to >= this.pagination.last_page){
				to = this.pagination.last_page;
			}

			var pagesArray = [];
			while(from <= to){
				pagesArray.push(from);
				from++;
			}
			return pagesArray;
		}
	},

created() {
   
    this.productostotales()//OBTENER TODOS LOS PRODUCTOS
    this.getCategorias()//OBETENER LAS CATEGORIAS Y MOSTRALAS EN EL AUTOCOMPLETE
    this.getSubCategorias()//OBETENER LAS SUBCATEGORIAS Y MOSTRALAS EN EL AUTOCOMPLETE
    this.getDivisiones()//OBETENER LAS DIVISIONES Y MOSTRALAS EN EL AUTOCOMPLETE

},


  methods: {

 

    eliminarProducto(id, index){
      
     this.$swal({
        title: '¿Estas seguro?',
        text: '¡No podrás recuperar este producto!',
        icon: 'warning',
        showCancelButton: true,
        customClass: {
          confirmButton: 'btn btn-danger m-1',
          cancelButton: 'btn btn-secondary m-1'
        },
        confirmButtonText: 'Sí, borrar producto',
        cancelButtonText: 'Cancelar',
        html: false,
        preConfirm: () => {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve()
            }, 50)
          })
        }
      }).then(result => {
        if (result.value) {
           this.productos.splice(index, 1);
           axios.post(`/productos/${id}/eliminar`)
          
           this.productostotales()//OBTENER TODOS LOS PRODUCTOS
           this.getCategorias()//OBETENER LAS CATEGORIAS Y MOSTRALAS EN EL AUTOCOMPLETE
           this.getSubCategorias()//OBETENER LAS SUBCATEGORIAS Y MOSTRALAS EN EL AUTOCOMPLETE
          this.$swal('¡Eliminado!', 'Tu producto ha sido eliminado.', 'success')
          // result.dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
        } else if (result.dismiss === 'cancel') {
          this.$swal('Cancelado', 'Tu producto esta seguro :)', 'error')
        }
      })
  
      
     

    },
       swalConfirm () {
     
    },

    changePage: function(page) {
			this.pagination.current_page = page;
			this.gettasks(page);
		},
        //FUNCION EN CASO DE FALLAR EL FILTRO
    noop () {
        
      },
      //FUNCTION PARA PAGINAR 
     paginador(items) {
      const indiceInicio = (this.paginaActual - 1) * this.itemsPorPagina;
      const indiceFinal =
        indiceInicio + this.itemsPorPagina > items.length
          ? items.length
          : indiceInicio  + this.itemsPorPagina;
      return items.slice(indiceInicio , indiceFinal );
     },



    onchange(){
      console.log(this.search)
      console.log(this.tipo)
      this.paginaActual=1
      this.spinner = true;
      if (this.search === "") {
        this.productostotales()
      } else if (this.tipo === "SUBCATEGORÍA") {
        //EN CASO DE QUE SE BUSQUE POR CATEGORIA ENTRA AQUI
        this.lista = this.listaSubCategorias;
        this.search = this.search.toUpperCase();
        let url = "/productos";
        this.axios.get(url).then((res) => {
        this.productos = res.data;
        this.productos = this.productos.filter((pro) => pro.subcategoria.match(this.search));
        this.spinner = false;

       
        })
        .catch((err) => {
        console.error(err);
        });
      } else if (this.tipo === "") {
        console.log(this.search)
      //EN CASO DE BUSCAR EN TODO ENTRA AQUI
      this.lista = [];
      const primerCaracter = this.search.charAt(0).toUpperCase();
      const restoDeLaCadena = this.search.substring(1, this.search.length);
      let url = "/productos";
      this.axios.get(url).then((res) => {
      this.productos = res.data;
 
      //FILTRA EN TODOS LOS ATRIBUTOS DE LOS PRODUCTOS
      this.productos = this.productos.filter(
      (pro) => pro.categoria.match(this.search.toUpperCase()) || pro.subcategoria.match(this.search.toUpperCase()) ||
      pro.descripcion.match(this.search) || pro.descripcion.match(this.search.toUpperCase()) ||
      pro.descripcion.match(this.search.toLowerCase()) || pro.nombre.toLowerCase().match(this.search.toLowerCase()) ||
      pro.division.match(this.search.toUpperCase()));
      this.spinner = false;

      })
      .catch((err) => {
      console.error(err);
      });
      } else {
      //EN CASO DE BUSCAR POR NOMBRE ENTRA AQUI
      this.NombreResults = false;
      this.lista = [];
      let url = "/productos";
      this.axios.get(url).then((res) => {
      this.productos = res.data;
      this.productos = this.productos.filter((pro) => pro.division.match(this.search.toLowerCase()) );
      this.productos = this.productos.filter((pro) => pro.nombre.toLowerCase().match(this.search.toLowerCase()));
      this.spinner = false;

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
      this.axios.get(url).then((res) => {
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
            let url = '/productos';
            this.spinner = true
            this.axios.get(url)
     
            .then(res => {
                this.productos=res.data
                this.spinner = false
             })
            .catch(err => {
              console.error(err); 
            })
      },

      //FUNCIOPN PARA OBTENER LAS CATEGORIAS EXISTENTES
      getCategorias(){
            let url = '/productos/categorias';
            this.axios.get(url)
          
            .then(res => {
                this.categorias=res.data;
                for (let index = 0; index < this.categorias.length; index++) {//CICLO PARA METER LAS CATEGORIAS A UN ARRAY
                 this.listaCategorias.push(this.categorias[index].categoria)
                }
              
            })
            .catch(err => {
              console.error(err); 
            })  
      },

      //FUNCION PARA OBTENER LAS SUBCATEGORIAS
      getSubCategorias(){
            let url = '/productos/subcategorias';
            this.axios.get(url)
     
            .then(res => {
               this.Subcategorias=res.data;
               for (let index = 0; index < this.Subcategorias.length; index++) {
               this.listaSubCategorias.push(this.Subcategorias[index].subcategoria)
              }
            })
            .catch(err => {
                console.error(err); 
            })  
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
            })
            .catch(err => {
                console.error(err); 
            })  
      }

    
    },
}
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
<style lang="scss" scoped>
a{
  color:transparent !important;
}
  .md-autocomplete + strong {
    margin-top: 36px;
    display: block;
  }
</style>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
<style lang="scss" scoped>
a{
  color:transparent !important;
}
  .md-autocomplete + strong {
    margin-top: 36px;
    display: block;
  }
  
  .nav-main-link-name{
  color:white !important;
}
</style>