/*
 * Default Router
 */

// Vue and Vue Router
import Vue from 'vue'
import Router from 'vue-router'

// Main layouts
import LayoutBackend from '@/layouts/variations/Backend.vue'
import LayoutBackendBoxed from '@/layouts/variations/BackendBoxed.vue'
import LayoutSimple from '@/layouts/variations/Simple.vue'
import VueRouter from 'vue-router'
var firebase = require("firebase/app");
// Register Vue Router
Vue.use(Router)

// Frontend: User
const ProductosUsuario = () =>
    import ("@/views/ProductosUsuario.vue")


//  Frontend: Admin
const Dashboard = () =>
    import ( /* webpackChunkName: "pages-dashboard", webpackPrefetch: true */ "@/views/Dashboard.vue")

const Prueba = () =>
    import ( /* webpackChunkName: "pages-dashboard", webpackPrefetch: true */ "@/views/Prueba.vue")

const Producto = () =>
    import ( /* webpackChunkName: "pages-dashboard", webpackPrefetch: true */ "@/views/Producto.vue")




const ProductosAdmin = () =>
    import ( /* webpackChunkName: "pages-dashboard", webpackPrefetch: true */ "@/views/ProductosAdmin.vue")


const Agregar = () =>
    import ( /* webpackChunkName: "pages-dashboard", webpackPrefetch: true */ "@/views/Agregar.vue")

const Login = () =>
    import ( /* webpackChunkName: "pages-dashboard", webpackPrefetch: true */ "@/views/Login.vue")

const Editar = () =>
    import ( /* webpackChunkName: "pages-dashboard", webpackPrefetch: true */ "@/views/Editar.vue")

const AgregarUsuario = () =>
    import ( /* webpackChunkName: "pages-dashboard", webpackPrefetch: true */ "@/views/AgregarUsuario.vue")

const Lista = () =>
    import ( /* webpackChunkName: "pages-dashboard", webpackPrefetch: true */ "@/views/Listadeusuarios.vue")

const Test = () =>
    import ( /* webpackChunkName: "pages-dashboard", webpackPrefetch: true */ "@/views/Test.vue")












// Router Configuration
const router = new Router({
    mode: 'history',


    routes: [{
            path: '/',
            component: LayoutSimple,
            children: [{
                    path: '/',
                    name: 'Home',
                    component: ProductosUsuario,

                },

                {
                    path: '/producto',
                    name: 'Producto',
                    component: Producto,

                },
                {
                    path: '/login',
                    name: 'Login',
                    component: Login,

                },
                {
                    path: '/prueba',
                    name: 'Prueba',
                    component: Prueba,

                },




            ]
        },
        {
            path: '/auth',
            component: LayoutSimple,
            children: []
        },
        {
            path: '/errors',
            component: LayoutSimple,
            children: []
        },
        {
            path: '/backend-boxed',
            redirect: '/backend-boxed/dashboard',
            component: LayoutBackendBoxed,
            children: []
        },
        {
            path: '/inicio',
            component: LayoutBackend,
            children: [{
                    path: '/dashboard',
                    name: 'Dashboard',
                    component: Dashboard,
                    meta: { requiresAuth: true }

                },
                {
                    path: '/inicio',
                    name: 'Productosadmin',
                    component: ProductosAdmin,
                    meta: { requiresAuth: true }
                },
                {
                    path: '/test',
                    name: 'Test',
                    component: Test,
                    meta: { requiresAuth: true }
                },
                {
                    path: '/agregar',
                    name: 'Agregar',
                    component: Agregar,
                    meta: { requiresAuth: true }
                },
                {
                    path: '/editar',
                    name: 'Editar',
                    component: Editar
                },
                {
                    path: '/lista',
                    name: 'Lista',
                    component: Lista,
                    meta: { requiresAuth: true }
                },
                {
                    path: '/usuarionuevo',
                    name: 'AgregarUsuario',
                    component: AgregarUsuario,
                    meta: { requiresAuth: true }
                },
                {
                    path: 'blocks',
                    redirect: '/blocks/styles',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    meta: { requiresAuth: true },
                    children: [




                    ]
                },
                {
                    path: 'elements',
                    redirect: '/elements/grid',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    meta: { requiresAuth: true },
                    children: []
                },
                {
                    path: 'tables',
                    redirect: '/tables/styles',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    meta: { requiresAuth: true },
                    children: []
                },
                {
                    path: 'forms',
                    redirect: '/forms/elements',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    meta: { requiresAuth: true },
                    children: []
                },
                {
                    path: 'plugins',
                    redirect: '/plugins/charts',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    meta: { requiresAuth: true },
                    children: []
                },
                {
                    path: 'layout',
                    redirect: '/layout/api',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    meta: { requiresAuth: true },
                    children: []
                },
                {
                    path: 'pages/generic',
                    redirect: '/pages/generic/blank',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    meta: { requiresAuth: true },
                    children: []
                },
                {
                    path: 'pages/auth',
                    redirect: '/pages/auth/all',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    meta: { requiresAuth: true },
                    children: []
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    const rutaProtegida = to.matched.some(record => record.meta.requiresAuth);
    const user = firebase.auth().currentUser;

    if (rutaProtegida === true && user === null) {
        next({ name: 'Login' })
    } else {
        next()
    }

})

export default router;