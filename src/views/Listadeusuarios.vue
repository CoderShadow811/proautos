<template>
  <div>
 
    <!-- Page Content -->
    <div class="content">
      <!-- Full Table -->
      <base-block title="List Users">
        <template #options>
          <button type="button" class="btn-block-option">
            <i class="si si-settings"></i>
          </button>
        </template>
      
        <b-table-simple responsive bordered striped table-class="table-vcenter">
          <b-thead>
            <b-tr>
              <b-th class="text-center" style="width: 100px;">
                <i class="far fa-user"></i>
              </b-th>
              <b-th>Nombre</b-th>
              <b-th style="width: 30%;">Email</b-th>
              
              <b-th class="text-center" style="min-width: 110px; width: 110px;"></b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="user in users" :key="user.id">
              <b-td class="text-center">
                <img class="img-avatar img-avatar48" :src="`https:ennobledesign.co/wp-content/uploads/2020/07/user.png`" alt="Avatar">
              </b-td>
              <b-td class="font-w600 font-size-sm">
                
                  {{ user.name }}  {{ user.lastname }}
               
              </b-td>
              <b-td class="font-size-sm">
             {{ user.mail}}
              </b-td>
           
              <b-td class="text-center">
                
                <b-button size="sm" class="botoneliminar" variant="alt-danger">
                  <i class="fa fa-fw fa-times"></i>
                </b-button>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </base-block>
      <!-- END Full Table -->

    </div>
    <!-- END Page Content -->
 
  </div>
</template>

<style >
  .botoneliminar{
    background-color:red !important;
  }
</style>
<script>
import {mapActions, mapState} from 'vuex'
export default {
  
    
  methods:{
    ...mapActions(['getUsers'])
  },
  created(){
    this.getUsers()
    
  },
  computed:{
    ...mapState(['users']),
  
    }

  }

</script>
