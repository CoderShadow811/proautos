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
   <b-form v-show="spin == 1" @submit.prevent="addProduct" @reset="onReset"  v-if="users !== null" enctype="multipart/form-data">
   <b-form-group id="input-group-1" label="Nombre del producto" label-for="input-1">
 
         <input   required class="e-input" name='input' type="text"  v-model="form.nombre"/>
     </b-form-group>
     <b-form-group id="input-group-2" label="Codigo" label-for="input-2">
    
            <input  id="input-1" required class="e-input" name='input' type="text"  v-model="form.codigo"/>
     </b-form-group>


<b-form-group id="input-group-3" label="Division
" label-for="input-3">

         <ejs-autocomplete   required :dataSource='divisiones'   v-model="form.division" :fields='dataDivision' placeholder="">
                
                </ejs-autocomplete>
   </b-form-group>


   
   <b-form-group id="input-group-4" label="Categoría
" label-for="input-4">

         <ejs-autocomplete id="input-4"  required :dataSource='categorias' v-model="form.categoria" :fields='dataCategoria' placeholder="">
                
                </ejs-autocomplete>
          
   </b-form-group>
   <b-form-group id="input-group-5" label="Sub Categoría
" label-for="input-5">
          <ejs-autocomplete   required :dataSource='subcategorias' v-model="form.subcategoria" :fields='dataSubcategoria' placeholder="">
                
                </ejs-autocomplete>
   </b-form-group>
      
   

   <b-form-group id="input-group-6" label="Descripción
" label-for="input-6">
 <base-block  content-full >
        <ckeditor :editor="ckeditor" v-model="form.descripcion" :config="ckeditorConfig"></ckeditor>
      </base-block>
   </b-form-group>
   <b-form-group id="input-group-7" label="Notas Adicionales
" label-for="input-7">
 <base-block  content-full >
        <ckeditor :editor="ckeditor" v-model="form.notas" :config="ckeditorConfig"></ckeditor>
      </base-block>
   </b-form-group>
     <b-form-group  label="Foto del producto
" label-for="input-7">
 <input type="file" class="form-control" ref="file"  required="required" placeholder="" v-on:change="ObtenerImagen">
 </b-form-group>
 <figure>
 <img with="200" height="200"  :src="imagen">
 </figure>
      <b-button v-if="spin == 1" type="submit" variant="primary" >GUARDAR PRODUCTO</b-button>
     
      <b-button type="reset" class="ml-2" v-if="spin == 1" variant="danger">REINICIAR</b-button>
      
    </b-form>
  
 
    
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
  .wrap {
    box-sizing: border-box;
    margin: 0 auto;
    padding: 20px 10px;
    width: 340px;
  }

  #input-container .e-input-group {
    margin: 30px 0;
  }
  .e-input-group-icon:before {
    font-family: e-icons;
  }

  .e-input-group .e-input-group-icon.e-input-popup-date {
    font-size:16px;
  }

  .e-input-group.e-small .e-input-group-icon.e-input-popup-date {
    font-size:14px;
  }

  .e-input-group-icon.e-input-popup-date:before {
    content: "\e901";
  }
</style>
<style lang="scss">
// SweetAlert2
@import '~sweetalert2/dist/sweetalert2.min.css';
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
import VueSweetalert2 from 'vue-sweetalert2'
Vue.use(VueSweetalert2)
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
     dialog: false,
       form: {
          nombre: ' ',
          division: ' ',
          categoria: ' ',
          subcategoria:'NA',
          descripcion:' ',
          notasadicionales:' ',
          codigo:' ',
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
   watch: {
      dialog (val) {
        if (!val) return

        setTimeout(() => (this.dialog = false), 4000)
      },
    },
  
   mounted() {
 
  

  },
  methods: {
    test(){
    this.$swal('Success', 'Everything was updated perfectly!', 'success')
    },
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

  ObtenerImagen(e){
        let file = e.target.files[0];
        this.form.image = file;
        this.CargarImagen(file);
          
          
          },
CargarImagen(file){
let reader = new FileReader();

reader.onload = (e) => {
this.imagenMiniatura = e.target.result;
}

reader.readAsDataURL(file);

},

addProduct(){
        this.spin = 2;
        let formData = new FormData();
       
        formData.append('nombre',this.form.nombre),
        formData.append('codigo',this.form.codigo),
        formData.append('descripcion',this.form.descripcion),
        formData.append('division',this.form.division),
        formData.append('categoria',this.form.categoria),
        formData.append('subcategoria',this.form.subcategoria),
        formData.append('notasadicionales',this.form.notas)
      
        formData.append('image',this.form.image)

        //axios.post('http://127.0.0.1:5050/productos/new', formData)
        axios.post('https://vicolors.com.mx/phpapi/productos/nuevo', formData)
        .then(response => {
            console.log(response.data);
            this.$swal('Éxito', 'Producto ha sido registrado correctamente', 'success')
            this.spin = 1;
        })
},






  ...mapActions(['getUsers']),
     onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
    
        this.form.nombre = '',
        this.form.division = '',
        this.form.categoria = '',
        this.form.subcategoria = null,
        this.form.descripcion = '',
        this.form.notas = '',
        this.form.codigo = '',
        this.form.image = null,
        this.imagenMiniatura =  '',
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
   ...mapState(['usuario','users']),
   filtro: function(){

      let usuario = this.usuario
     
      let userfilter = this.users.find(user => user.mail === usuario.email)
      let usertask = this.usertask
        usertask = userfilter.name 
     
     return userfilter
    
    },
 },
 created() {
  
         this.getclases()
        
 },
 
}
</script>
