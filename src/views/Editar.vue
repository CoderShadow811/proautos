<template>
  <div>
<base-background image="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1348&q=80" inner-class="bg-primary-dark-op">
      <div  class="content content-narrow content-full">
        <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center mt-5 mb-2 text-center text-sm-left">
          <div class="flex-sm-fill">
            <h1 class="font-w600 text-white mb-0">Agregar Producto</h1>
           
         
            
          </div>

          <div class="mt-3 mt-sm-0 ml-sm-3">
              <router-link 
              :to="{name: 'Productosadmin'}">
            <b-button variant="primary" class="px-4 py-2" href="javascript:void(0)" v-click-ripple>
              REGRESAR
            </b-button>
               </router-link>
          </div>
        </div>
      </div>
    </base-background>

    <div class="content" >
     <v-row v-if="spin == 2"
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
     
      </v-row>
<div  style="background-color:white; padding: 10px; margin-bottom:25px; border-radius:15px; border-color:black !important; border-width: 1px;
  border-style: solid;"> 
  <b-form v-show="spin == 1" @submit.prevent="addEnlace" @reset="onReset" enctype="multipart/form-data">
 <b-form-group id="input-group-1" label="Ficha tecnica" label-for="input-1">
 
             <input   required class="e-input" name='input' type="text"  v-model="enlace.tecnica"/>
     </b-form-group>
     <b-form-group id="input-group-2" label="Hoja de seguridad" label-for="input-2">
           <input  id="input-1" required class="e-input" name='input' type="text" v-model="enlace.seguridad"/>
     </b-form-group>
 <b-button type="submit" variant="primary" COLOR="WHITE">GUARDAR ENLACES</b-button>
</b-form>
</div>
<div style="background-color:white; padding: 10px; margin-bottom:25px; border-radius:15px; border-color:black !important; border-width: 1px;
  border-style: solid;"> 

   <b-form v-show="spin == 1" @submit.prevent="addProduct" @reset="onReset" enctype="multipart/form-data">
   <b-form-group id="input-group-1" label="Nombre del producto" label-for="input-1">
 
             <input   required class="e-input" name='input' type="text"  v-model="producto.nombre"/>
     </b-form-group>
     <b-form-group id="input-group-2" label="Codigo" label-for="input-2">
           <input  id="input-1" required class="e-input" name='input' type="text" v-model="producto.codigo"/>
     </b-form-group>


<b-form-group id="input-group-3" label="Division
" label-for="input-3">

              <ejs-autocomplete   required :dataSource='divisiones'   v-model="producto.division" :fields='dataDivision' placeholder="">
                
                </ejs-autocomplete>
   </b-form-group>


   
   <b-form-group id="input-group-4" label="Categoría
" label-for="input-4">

            <ejs-autocomplete id="input-4"  required :dataSource='categorias'  v-model="producto.categoria" :fields='dataCategoria' placeholder="">
                
                </ejs-autocomplete>
   </b-form-group>
   <b-form-group id="input-group-5" label="Sub Categoría
" label-for="input-5">

             <ejs-autocomplete   required :dataSource='subcategorias'  v-model="producto.subcategoria" :fields='dataSubcategoria' placeholder="">
                
                </ejs-autocomplete>
   </b-form-group>
      
   

   <b-form-group id="input-group-6" label="Descripción
" label-for="input-6">
 <base-block  content-full >
        <ckeditor :editor="ckeditor" v-model="producto.descripcion" :config="ckeditorConfig"></ckeditor>
      </base-block>
   </b-form-group>
   <b-form-group id="input-group-7" label="Notas Adicionales
" label-for="input-7">
 <base-block  content-full >
        <ckeditor :editor="ckeditor" v-model="producto.notasadicionales" :config="ckeditorConfig"></ckeditor>
      </base-block>
   </b-form-group>

     
     <b-form-group id="input-group-7" label="Foto del producto
" label-for="input-7">
 <input type="file" class="form-control" ref="file" v-on:change="ObtenerImagen">
 </b-form-group>
 <figure>
 <img with="200" height="100px"  :src="imagen">
 </figure>
      <b-button type="submit" variant="primary" COLOR="WHITE">GUARDAR PRODUCTO</b-button>
      <b-button type="reset" style="margin-left:15px;" variant="danger">REINICIAR</b-button>
    </b-form>
  </div>
   
 
   </div>
  </div>
</template>

<style lang="scss">
// CKEditor Custom overrides
@import './src/assets/scss/vendor/ckeditor';
@import url(https://cdn.syncfusion.com/ej2/material.css);
// SimpleMDE + Custom overrides
@import '~simplemde/dist/simplemde.min.css';
@import './src/assets/scss/vendor/simplemde';
</style>

<script>
import Vue from "vue";
import { AutoCompletePlugin } from "@syncfusion/ej2-vue-dropdowns";
Vue.use(AutoCompletePlugin);
import {mapActions, mapState} from 'vuex'
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
  name:'Newtask',
 
  components: {
     ckeditor: CKEditor.component
  },

  data () {
    return { 
          spin:1,
          categorias:[],
    divisiones:[],
    subcategorias:[],
    dataCategoria:{value:'categoria'},
    dataSubcategoria:{value:'subcategoria'},
    dataDivision:{value:'division'},
    imagenMiniatura: '',
      
     enlace:{
     
seguridad:'',
tecnica:'',
     },
    producto:{    
    
          nombre: '',
          division: '',
          categoria: '',
          subcategoria:'',
          descripcion:'',
          notasadicionales:'',
          codigo:'',
          image:null
          },
 
      id: this.$route.params.id,   
    
      ckeditorData: '<p></p>',
      ckeditorConfig: {
        // The configuration of the editor
      },
      // Here we specify the editor you've imported before
      // ClassicEditor, InlineEditor, BalloonEditor, BalloonBlockEditor
      ckeditor: ClassicEditor
    }
  },
  
 
  methods: {
 getclases(){
   
      let urlCat = '/productos/categorias';
      let urlSub = '/productos/subcategorias';
      let urlDiv = '/productos/divisiones';
      this.axios.get(urlCat)
      .then(res => {
       
      
        this.categorias=res.data
       
      })
      .catch(err => {
        console.error(err); 
      })
        this.axios.get(urlSub)
      .then(res => {
       
      
        this.subcategorias=res.data
       
      })
      .catch(err => {
        console.error(err); 
      })
         this.axios.get(urlDiv)
      .then(res => {
       
      
        this.divisiones=res.data
       
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
        this.imagenMiniatura = 'https://vicolors.com.mx/phpapi/storage/app/public/productos/' + this.producto.foto;
       if(this.producto.notas === undefined || this.producto.notas === null){
        this.producto.notas = '';
       }
       if(this.producto.subcategoria === undefined || this.producto.notas === null){
        this.producto.subcategoria = '';
       }
      })
      .catch(err => {
        console.error(err); 
      })
    },


  ObtenerImagen(e){
        let file = e.target.files[0];
        this.producto.image = file;
        this.CargarImagen(file);
          
          
          },
CargarImagen(file){
let reader = new FileReader();

reader.onload = (e) => {
this.imagenMiniatura = e.target.result;
}

reader.readAsDataURL(file);

},

  addEnlace() {
     const params = {
     idproducto:this.id,
     tecnica: this.enlace.tecnica,
     seguridad: this.enlace.seguridad
}
  let url = '/enlace/nuevo/';
 this.axios.post(url,params)
.then(res => {
console.log(res)
 this.form.push(res.data)
 console.log(res.data.message);
 this.$swal('Éxito', 'Enlace ha sido agregado correctamente', 'success')
})
.catch(err => {
  console.log(params)
  console.error(err); 
})

    } ,


addProduct(){
  this.spin = 2;
let formData = new FormData();
      
        formData.append('id',this.id),
        formData.append('nombre',this.producto.nombre),
        formData.append('codigo',this.producto.codigo),
        formData.append('descripcion',this.producto.descripcion),
        formData.append('division',this.producto.division),
        formData.append('categoria',this.producto.categoria),
        formData.append('subcategoria',this.producto.subcategoria),
        formData.append('notasadicionales',this.producto.notasadicionales)
        console.log(this.producto.notasadicionales)
        formData.append('image',this.producto.image)
          let url = '/productos/'+this.id+'/editar';
      
        this.axios.post(url, formData)
        .then(response => {
            console.log(response.data);
    
        
            this.spin = 1;
            console.log(response.data.message);
                this.$swal('Éxito', 'Producto ha sido editado correctamente', 'success')
        })
},






      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.producto.nombre = '',
        this.producto.codigo = '',
        this.producto.descripcion = '',
        this.producto.division = '',
        this.producto.categoria = '',
        this.producto.subcategoria = '',
        this.producto.notas = '',
        this.producto.image = null,
        this.imagenMiniatura= ''
        this.imagen
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
  
     
  },
 computed: {
    
     imagen(){
         return this.imagenMiniatura;
     },
     
   
 },
 created() {
     
     this.getproducto()
     this.getclases()
 },
 
}
</script>
