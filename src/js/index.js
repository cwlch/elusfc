/**
 * Created by Ch on 16/12/18.
 */
import "../sass/index.scss";
// import "../js/libs/mobiscroll/mobiscroll.custom-2.17.0.min.scss";
import app_router from './router.js';

Vue.use( VueRouter );
let router = new VueRouter(),
    App = Vue.extend({
        data : function () {
            
        }
    });
router.redirect({
    '*' : '/driver',
    '/driver':'/driver/driverRelease',
    '/account': '/account/main'
});
router.afterEach(function (transition) {
    if (transition.to.title) {
        document.title = transition.to.title;
    }
});
app_router(router);
router.start(App,'html');