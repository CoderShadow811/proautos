<template>

  <div >
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">


    <!-- Page Content -->
    <div >

     

 <base-page-heading id="content" :title='producto.nombre' >
 
      <template #extra>
        <b-breadcrumb class="breadcrumb-alt">
       
        <router-link   :to="{name: 'Home'}">
          <b-breadcrumb-item href="javascript:void(0)">REGRESAR</b-breadcrumb-item>
  </router-link>
  
          
        </b-breadcrumb>
      </template>
    </base-page-heading>
    <!-- END Hero -->

    <!-- Page Content -->
    <div class="content">
      <!-- Toolbar -->
     
      <!-- END Toolbar -->

      <!-- Image Cropper -->
      <base-block content-full  >
        <b-row class="items-push">
          <b-col xl="6">
            <h4 style="border-bottom-color:#EFAA15 !important; " class="border-bottom pb-2 ">{{producto.categoria}}</h4>
              <span style="margin-bottom:30px !important;">Código: {{producto.codigo}}</span>
          
            <div>
                <v-img
     v-if="producto.foto != undefined"
         height="auto"
            width="300"
          v-bind:src="'https://vicolors.com.mx/phpapi/storage/app/public/productos/' + producto.foto"
      
          ></v-img>
               <v-chip
      class="ma-2"
      color="white"
    >
      {{producto.division}}
    </v-chip>
          <v-chip
      class="ma-2"
      v-if="producto.subcategoria==!null || producto.subcategoria ==! this.na "
    >
      {{producto.subcategoria}}
    </v-chip>
            </div>
          </b-col>
          <b-col xl="6">
            <h4 style="border-bottom-color:#EFAA15 !important;" class="border-bottom pb-2">Descripción</h4>
            <div class="overflow-hidden mb-2" v-html="producto.descripcion">
              {{producto.descripcion}}
            </div>
            
            <v-btn v-if="enlace.tecnica != undefined"><a id="enlaces" target="_blank" v-bind:href="enlace.tecnica">FICHA TECNICA</a></v-btn>
            <v-btn v-if="enlace.seguridad != undefined" class="boton2" ><a id="enlaces" target="_blank" v-bind:href="enlace.seguridad">HOJA DE SEGURIDAD </a></v-btn>
            <br>
            <br>
            <h4 style="border-bottom-color:#EFAA15 !important;" class="border-bottom pb-2">Notas Adicionales</h4>
            <div class="overflow-hidden mb-2" v-html="producto.notasadicionales">
            {{producto.notasadicionales}} 
            </div>
          </b-col>
        </b-row>
    
    


      </base-block>
      <!-- END Image Cropper -->      
    </div>
</div>
  </div>
  
</template>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>

<style lang="scss">
// CKEditor Custom overrides
@import './src/assets/scss/vendor/ckeditor';

// SimpleMDE + Custom overrides
@import '~simplemde/dist/simplemde.min.css';
@import './src/assets/scss/vendor/simplemde';
</style>
<style>
.v-chip {
   
    color: white !important;
    background-color: #EFAA15 !important;
    margin-top:30px;
}
</style>
<script>

import axios from 'axios'
// Vue SimpleMDE, for more info and examples you can check out https://github.com/F-loat/vue-simplemde
import VueSimplemde from 'vue-simplemde'

// CKEditor 5, for more info and examples you can check out https://ckeditor.com/ckeditor-5
import CKEditor from '@ckeditor/ckeditor5-vue'

// You can import one of the following CKEditor variation (only one at a time)
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
//import InlineEditor from '@ckeditor/ckeditor5-build-inline'
//import BalloonEditor from '@ckeditor/ckeditor5-build-balloon'
//import BalloonBlockEditor from '@ckeditor/ckeditor5-build-balloon-block'

export default {
  name:'Task',
  
  components: {
 
  },
  data () {
    return {   
        producto: {},
        na:"NA",
        productos: [],
        enlaces: [],
        enlace:{},
        if_enlaces:false,
        id: this.$route.params.id,   
    
    
    }
  },
  
   mounted() {
   this.getproducto()
  this.getproductos()
    this.getenlaces()

  },
  methods: {
    
    getenlaces(){
      let url = '/enlace/'+this.id;
      this.axios.get(url)
      .then(res => {
 this.enlace=res.data
      })
      .catch(err => {
        console.error(err); 
      })
    },

     getproducto(){
     let url = '/productos/'+this.id;
    this.axios.get(url)
      .then(res => {
       
      
        this.producto=res.data
      })
      .catch(err => {
        console.error(err); 
      })
    },
    getproductos(){
    let url = '/productos';
    this.axios.get(url)
      .then(res => {
       
      
        this.productos=res.data
        this.productos.splice(this.productos.indexOf(this.producto.id), 1);
        this.productos=this.productos.filter(pro => (pro.division).match(this.producto.division)) 
        this.productos = this.productos.slice(this.productos.length-6, this.productos.length);
        //console.log(this.productos)
        //console.log(this.productos[1].foto)
        //console.log(this.productos)
      })
      .catch(err => {
        console.error(err); 
      })
    },

    verProducto(numero){
      this.producto=this.productos[numero]
      //window.scroll(0, 0)
    }
    
  },
  created() {
   
    
  },
  
 
}
</script>
<style >
  
.fa-chevron-left:before {
    content: "";
    color: black;
}
.fa-chevron-right:before {
    content: "";
    color: black;
     text-align-last: justify !important;
}

.row {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    justify-content: center;
    margin-right: -15px;
    margin-left: -15px;
}
.justify-content-center {
    padding-left: 30px;
    padding-right: 30px;
    text-align-last: justify !important;
}

.botonVer {
    height: 36px;
    min-width: 64px;
    padding: 0 0 !important;
}

.boton2{
  margin-left: 20px;
}

#enlaces{
  font-weight:bold !important;
  

}
</style>