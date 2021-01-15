<template>
 <v-app>
 <div  class="text-center">
    <v-menu
 
      open-on-hover
      top
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Dropdown
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <a><v-list-item-title>{{ item.title }}</v-list-item-title></a>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>

  </v-app>
  
</template>
<script>
import Vuetify from 'vuetify'
  export default {
    data: () => ({
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    }),
  }
</script>