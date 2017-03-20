/**
 * Created by Ch on 16/12/18.
 */
import "../sass/index.scss";
import app_router from './router.js';


//
// document.querySelector('body').addEventListener('touchend', function (ev) {
//     event.preventDefault();
// });


if(!(document.cookie || navigator.cookieEnabled)){
    alert('cookie未打开!');
}


Vue.use( VueRouter );
let router = new VueRouter(),
    App = Vue.extend({
        data () {
            return {

            }
        },
        ready(){
            if(!eluConfig.user.phone){
                let layer = eluUtil.layers(`<div class="account_layers">
                        <b>身份验证</b>
                        <p><input type="tel" placeholder="请输入手机号"/></p>
                        <a id="next">下一步</a>
                    </div>`,{close : false});
                layer.$con.find("#next").on("click",()=>{
                    layer.close();
                    let msgLayer = eluUtil.layers(`<div class="account_layers">
                        <b>身份验证</b>
                        <p><input type="tel" placeholder="请输入手机验证码"/></p>
                        <a id="push">提交验证码</a>
                        </div>`,{close : false});
                    msgLayer.$con.find("#push").on("click",()=>{
                        msgLayer.close();
                    })
                })
            }
        }
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


// eluUtil.jsonp({
//     url : eluConfig.serverPath + 'user/queryUser',
//     data : {
//         uid:'test01'
//     }
// },res =>{
//     eluConfig.user = res.user;
//     eluConfig.user.verifyDriver = res.status;
//     let layer = eluUtil.layers(`<div class="account_layers">
//                 <b>服务协议:</b>
//                 <p>e鹿同行平台免费提供发布顺风车信息服务,不与用户有任何利益关系。搭车前请自行协商,e鹿同行平台不负担任何责任!</p>
//                 <a id="ok">我同意</a> <span style="margin-left: 10px;" id="no">我不同意</span>
//             </div>`);
//     layer.$con.find("#ok").click(()=>{
//         layer.close();
//
//     });
//     layer.$con.find("#no").click(()=>{
//         window.close()
//     });
// });

// eluUtil.jsonp({
//     url : eluConfig.serverPath + 'user/queryUserInfo'
// },res => {
//     eluConfig.user = res.user;
//     eluConfig.car = res.car;
//     eluConfig.user.verifyDriver = res.status;
//     router.start(App,'html');
// });

eluUtil.jsonp({
    url : eluConfig.serverPath + 'user/queryUser',
    data : {
        uid:'test01'
    }
},res => {
    eluConfig.user = res.user;
    eluConfig.car = res.car;
    eluConfig.user.verifyDriver = res.status;
    router.start(App,'html');
});