/**
 * Created by Ch on 16/12/18.
 */
import "../sass/index.scss";
import app_router from './router.js';

Vue.use( VueRouter );
let router = new VueRouter();
router.redirect({
    '*' : '/driver',
    '/driver':'/driver/driverRelease'
});
app_router(router);
var App = Vue.extend();
router.start(App,'html');