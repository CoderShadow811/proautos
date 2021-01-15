<template>
  <!-- Page Content -->
  <div class="hero-static d-flex align-items-center" >
  
    <div class="w-100">
      <!-- Sign In Section -->
      <div class="bg-white">
        <div class="content content-full">
          <b-row class="justify-content-center">
            <b-col md="8" lg="6" xl="4" class="py-4">
              <!-- Header -->
              <div class="text-center">
                <p class="mb-2">
                  <i class="fa fa-2x fa-circle-notch text-primary"></i>
                </p>
                <h1 class="">
                 INICIAR SESIÓN
                </h1>
                <h2 style="font-weight:100;" class="">
                 Evoluciona a tu máximo potencial.
                </h2>
              </div>
              <!-- END Header -->

              <!-- Sign In Form -->
              <b-form @submit.prevent="ingresoUsuario({email, password:pass})">
                <div class="py-3">
                  <div class="form-group">
                    <b-form-input size="lg" class="form-control-alt" id="username" name="username" placeholder="Email" v-model="email" :state="!$v.form.username.$error && null" aria-describedby="username-feedback"></b-form-input>
                  </div>
                  <div class="form-group">
                    <b-form-input type="password" size="lg" class="form-control-alt" id="password" name="password" placeholder="Password" v-model="pass" :state="!$v.form.password.$error && null" aria-describedby="password-feedback"></b-form-input>
                  </div>
                  <div class="form-group">

                  </div>
                </div>
                <b-row class="form-group row justify-content-center mb-0">
                  <b-col md="6" xl="5">
                    <b-button type="submit" variant="primary" block>
                    Iniciar Sesión
                    </b-button>
                  </b-col>
                </b-row>
              </b-form>
              <!-- END Sign In Form -->
            </b-col>
          </b-row>
        </div>
      </div>
      <!-- END Sign In Section -->

      <!-- Footer -->
    |
             
      <!-- END Footer -->
    </div>
  </div>
  <!-- END Page Content -->
</template>
<style>
.justify-content-center {
    text-align-last: center!important;
}
</style>
<script>
// Vuelidate, for more info and examples you can check out https://github.com/vuelidate/vuelidate
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'
export default {
  mixins: [validationMixin],
  data () {
    return {
       email:'',
       pass:'',
      form: {
        username: null,
        password: null
      }
    }
  },
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(3)
      },
      password: {
        required,
        minLength: minLength(5)
      }
    }
  },
  methods: {
    ...mapActions(['ingresoUsuario']),
    
  },
  computed: {
      ...mapState(['error'])
  },
}
</script>
