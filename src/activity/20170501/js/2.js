/**
 * Created by Ch on 17/4/24.
 */
import "../sass/1.scss"


eluUtil.jsonp({
    url : eluConfig.serverPath + 'user/queryUserInfo'
},res => {
    eluConfig.user = res.user || {};
    eluConfig.car = res.car || {};
    eluConfig.user.verifyDriver = res.status;
    eluConfig.loginStatus = res.retCode;
    init();

});
const $operation = $(".operation"),
    $login = $(".login"),
    $success = $(".success"),
    $btn = $(".button"),
    $input = $(".input_text"),
    $loading = $(".loading"),
    $num = $("#num"),
    $old = $("#old"),
    init = ()=>{
        if(eluConfig.loginStatus != 400){
            $login.hide();
            if(new Date().getTime() >= new Date("2017/04/26 00:00:00").getTime()){
                if(eluConfig.user.idCard){
                    $success.show();
                    query();
                }else{
                    $operation.show();
                }
            }else{
                $loading.show();
            }
        }
    },
    query = ()=>{
        eluUtil.jsonp({
            url : eluConfig.serverPath + 'user/queryQueueId',
            data : {
                userId : eluConfig.user.uid
            }
        },res =>{
            if(res.retCode == 200){
                if(res.queue){
                    $num.show().find("small").text(res.queue);
                    $old.hide();
                }else{
                    $num.hide();
                    $old.show();
                }
            }else{
                eluUtil.tipsMod(res.retMsg);
            }
        })
    };

$btn.click(()=>{
    let val = $input.val();
    if(!eluUtil.isIdCard(val)){
        eluUtil.tipsMod("请填写有效身份证号!");
        return false;
    }
    if(!/^(430529|432627)[Xx0-9]{12}/.test(val)){
        eluUtil.tipsMod("非城步地区人不能参与此活动!");
        return false;
    }
    $btn.text("正在验证...");
    eluUtil.jsonp({
        url : eluConfig.serverPath + 'user/updateIdCard',
        data : {
            idCard : val
        }
    },res =>{
        if(res.retCode == 200){
            $success.show();
            $operation.hide();
            if(res.queue){
                $num.show().find("small").text(res.queue);
                $old.hide();
            }else{
                $num.hide();
                $old.show();
            }
        }else{
            eluUtil.tipsMod(res.retMsg);
            $btn.text("开始验证");
        }
    })
});