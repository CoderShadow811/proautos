<template>
  <!-- Footer -->
  <footer id="page-footer">
    <slot>
      <div class="content py-3">
        <b-row class="font-size-sm">
          <b-col class="py-1 text-center text-sm-right">
           <img alt="Colmena" data-src="https://cmkt.mx/wp-content/uploads/2019/07/LogoColorW.png" class="logofooter" src="https://cmkt.mx/wp-content/uploads/2019/07/LogoColor.png"> Developed by <a class="font-w600" style="color:black;" href="https://cmkt.mx/" target="_blank">Colmena MKT</a> 
          </b-col>
        
        </b-row>
      </div>
    </slot>
  </footer>
  <!-- END Footer -->
</template>

<script>
export default {
  name: 'BaseFooter',
  props: {
    classes: String
  }
}
</script>
<style>
.logofooter{
    max-height: 40px;
    padding-bottom: 4px;
}
</style>