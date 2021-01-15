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
         <input type="text" placeholder="Buscar" class="form-control " style="width:300px;">
</div>
      

<div>       

    </div>

 
    </v-toolbar>
  
    <!-- Page Content -->  

   <div class="content content-narrow">


      <!-- Bootstrap Buttons in Options -->
      <b-row>
        <b-col  md="3" v-for="(item, index) in productos" :key="index">


  <v-card
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
         v-bind:src="'https://vicolors.com.mx/phpapi/storage/app/public/productos/' + item.foto"
      
          ></v-img>
          </div>
      <v-list-item-content>

       
               <v-list-item-title class="headline">{{ item.nombre }}</v-list-item-title>
        <v-list-item-title class="headline mb-1">{{ item.categoria }}</v-list-item-title>
        <v-list-item-subtitle v-html="item.descripcion">{{ item.descripcion }}
</v-list-item-subtitle>
      </v-list-item-content>

    </v-list-item>

    <v-card-actions>
    <router-link 
    :to="{name: 'Producto', params:{ id: item.id}}">
       <v-btn small class="mr-3 ml-2" color="black">VER PRODUCTO</v-btn>
       </router-link> 
          <router-link 
    :to="{name: 'Editar', params:{ id: item.id}}">
       <v-btn small class="editar mr-3" color="black">EDITAR</v-btn>
       </router-link> 
                
   
 <div class="my-2">
        <v-btn small class="eliminar" @click="eliminarProducto(item.id, index)" color="black">ELIMINAR</v-btn>
      </div>



    </v-card-actions>
 
  </v-card>

        </b-col>
      </b-row>

            <nav >
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#" @click.prevent="changePage(pagination.current_page - 1)" v-if="pagination.current_page > 1">Anterior</a></li>

<li class="page-item" v-for="page in pagesNumber" :key="page.id" v-bind:class="[ page == isActived ? 'active' : '']"><a class="page-link" href="#" @click.prevent="changePage(page)">	{{ page }}</a></li>
    <li class="page-item"><a class="page-link" href="#" @click.prevent="changePage(pagination.current_page + 1)" v-if="pagination.current_page < pagination.last_page">Siguiente</a></li>
  </ul>
</nav> 

             
  </div>

             
              
 
  </div>
</template>
<style>
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
      productos: []
      
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
    this.gettasks()
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
          
          this.$swal('¡Eliminado!', 'Tu producto ha sido eliminado.', 'success')
          // result.dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
        } else if (result.dismiss === 'cancel') {
          this.$swal('Cancelado', 'Tu producto esta seguro :)', 'error')
        }
      })
  
      
     

    },
       swalConfirm () {
     
    },
    gettasks(page){
   
      let url = '/productos/paginate?page='+page;
      this.axios.get(url)
      .then(res => {
       
      
        this.productos=res.data.tasks.data,
        this.pagination = res.data.pagination
      })
      .catch(err => {
        console.error(err); 
      })
    },
    changePage: function(page) {
			this.pagination.current_page = page;
			this.gettasks(page);
		}
    
    },
}
</script>