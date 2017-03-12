/**
 * Created by Ch on 16/12/18.
 */
import "../sass/index.scss";
// import "../js/libs/mobiscroll/mobiscroll.custom-2.17.0.min.scss";
import app_router from './router.js';

if(!(document.cookie || navigator.cookieEnabled)){
    alert('cookie未打开!');
}


Vue.use( VueRouter );
let router = new VueRouter(),
    App = Vue.extend({
        data : function () {
            
        },
        ready(){}
    });
router.redirect({
    '*' : '/driver',
    '/driver':'/driver/driverRelease',
    '/passenger':'/passenger/passengerRelease',
    '/account': '/account/main'
});
router.afterEach(function (transition) {
    if (transition.to.title) {
        document.title = transition.to.title;
    }
});
app_router(router);


eluUtil.jsonp({
    url : eluConfig.serverPath + 'user/queryUser',
    data : {
        uid:'test01'
    }
},res =>{
    eluConfig.user = res.user;
    eluConfig.user.verifyDriver = res.status;
    let layer = eluUtil.layers(`<div class="account_layers">
                <b>法律声明:</b>
                <p>e鹿同行平台免费提供发布顺风车信息服务,不与用户有任何利益关系。搭车前请自行协商,e鹿同行平台不负担任何责任!</p>
                <a>我知道了</a>
            </div>`);
    layer.$con.find("a").click(()=>{
        layer.close();
        router.start(App,'html');
    });
});