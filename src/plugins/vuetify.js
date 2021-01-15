import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)



export default new Vuetify({
    icons: {
        iconfont: 'fa'
    },
    theme: {
        themes: {
            light: {
                primary: '#ed544d',
                secondary: 'white',
                accent: '#f7be3e',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107'
            },
        },
        dark: false
    }
})