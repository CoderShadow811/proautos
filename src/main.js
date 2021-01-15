import router from './router'
import store from './store/index'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)




axios.defaults.baseURL = 'https://vicolors.com.mx/phpapi/'


var firebase = require("firebase/app");

require("firebase/auth");
require("firebase/firestore");


// Vue, Vue Router, App and Vuex store
import Vue from 'vue'

// You can use the following starter router instead of the default one as a clean starting point
// import router from './router/starter'
import App from './App.vue'


// Bootstrap Vue
import BootstrapVue from 'bootstrap-vue'

// Custom components
import BaseLayoutModifier from '@/components/BaseLayoutModifier'
import BaseBlock from '@/components/BaseBlock'
import BaseBackground from '@/components/BaseBackground'
import BasePageHeading from '@/components/BasePageHeading'
import BaseNavigation from '@/components/BaseNavigation'

// Custom directives
import clickRipple from '@/directives/clickRipple'
import toggleClass from '@/directives/toggleClass'

// Register global plugins
Vue.use(BootstrapVue)

// Register global components
Vue.component(BaseLayoutModifier.name, BaseLayoutModifier)
Vue.component(BaseBlock.name, BaseBlock)
Vue.component(BaseBackground.name, BaseBackground)
Vue.component(BasePageHeading.name, BasePageHeading)
Vue.component(BaseNavigation.name, BaseNavigation)

// Register global directives
Vue.directive('click-ripple', clickRipple)
Vue.directive('toggle-class', toggleClass)

// Disable tip shown in dev console when in development mode


// Craft new application




import vuetify from '@/plugins/vuetify' // path to vuetify export



var Config = {
    apiKey: "AIzaSyAJS3ScNnl3kU2Ir3_eBZqXSDQ3F3lq7HY",
    authDomain: "crm-ennoble.firebaseapp.com",
    databaseURL: "https://crm-ennoble.firebaseio.com",
    projectId: "crm-ennoble",
    storageBucket: "crm-ennoble.appspot.com",
    messagingSenderId: "4577969880",
    appId: "1:4577969880:web:287d7be7912e22c36bb9ad"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(Config);

firebaseApp.firestore()

export default firebaseApp.firestore()

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged((user) => {

    if (user) {
        store.dispatch('detectarUsuario', { email: user.email, uid: user.uid })
    } else {
        store.dispatch('detectarUsuario', null)
    }

    new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
    }).$mount('#app')
})