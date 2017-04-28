/**
 * Created by Ch on 16/12/18.
 * 网站所有的一些公共方法
 * 这个Util对外暴露
 */
let ajaxStatus = [],
    Util = {

        /**
         * 弹出提示
         * @param str
         * @param time
         */
        tipsMod(str, time = 3000) {
            // 提示模块
            return new Promise((resolve, rejec)=>{
                var $doc = $(document),
                    $body = $('body'),
                    tips = '<div class="tips"></div>',
                    $tips = '';

                if ($doc.find('.tips').length == 0) {
                    $body.append(tips);
                }
                $tips = $doc.find('.tips');

                if (str) {
                    $tips.html(str);
                }

                if (!$tips.data('ends')) {
                    $tips.data('ends', 1);
                    $tips.show().addClass('bounceIn').on('webkitAnimationEnd', function (event) {
                        $(this).removeClass('bounceIn').addClass('bounceOut');
                    });
                    setTimeout(function () {
                        $tips.removeClass('bounceOut').remove();
                        $tips.data('ends', 0);
                        resolve();
                    }, time);
                }
            });

        },
        layers(str,{close = true,confirm = false,cancel = false} = {}){
            let closeStr = close ? '<div class="layers_close"><em>×</em></div>' : '',
                operationStr = (confirm || cancel) ? `<div class="layers_operation"></div>` : '',
                $con = $(`<div class="layers">${closeStr}<div class="layers_con">${str}</div>${operationStr}</div>`),
                $bg = $(`<div class="bg"></div>`),
                closeFn = ()=>{
                    $con.remove();
                    $bg.remove();
                };
            $("body").append($con).append($bg);
            if(close){
                $con.find(".layers_close").on('click',closeFn);
            }
            return {
                $con : $con.find(".layers_con"),
                close : closeFn
            };
        },
        /**
         * 时间格式化
         * @param date
         * @param fmt
         * @returns {*}
         */
        dateFormat(fmt,date,type){
            if(type === 'empty'){
                if(!date){
                    return '';
                }
            }
            let myDate = date ? (/^\d+$/.test(date) ? new Date(parseInt(date)) : new Date(date) ) : new Date(),
                o = {
                "m+": myDate.getMonth() + 1, //月份
                "d+": myDate.getDate(), //日
                "h+": myDate.getHours(), //小时
                "i+": myDate.getMinutes(), //分
                "s+": myDate.getSeconds(), //秒
                "q+": Math.floor((myDate.getMonth() + 3) / 3), //季度
                "S": myDate.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (myDate.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (let k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },
        /***
         * 验证身份证号码
         * @param cid
         * @returns {boolean}
         */
        isIdCard (cid) {
            let arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], // 加权因子
                arrValid = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]; // 校验码
            if (/^\d{17}\d|x$/i.test(cid)) {
                let sum = 0,
                    idx;
                for (let i = 0; i < cid.length - 1; i++) {
                    // 对前17位数字与权值乘积求和
                    sum += parseInt(cid.substr(i, 1), 10) * arrExp[i];
                }
                // 计算模（固定算法）
                idx = sum % 11;
                // 检验第18为是否与校验码相等
                return arrValid[idx] == cid.substr(17, 1).toUpperCase();
            } else {
                return false;
            }
        },
        isMobile : str =>/^(1[3-9])\d{9}$/.test(str),
        isCarPlate :str =>/^[\u4e00-\u9fa5]{1}[a-zA-Z]{1}[a-zA-Z_0-9]{5}$/.test(str),
        setDateDay(date = new Date(),num){
            let myDate = new Date(date),
                time = myDate.getTime(),
                endTime = time + (num * 24 * 60 * 60 * 1000);
            return new Date(endTime);
        },
        /**
         * jsonp跨域请求
         * @param url
         * @param type
         * @param dataType
         * @param data
         * @param error
         * @param finish
         * @param success
         * @param cbk
         * @returns {*}
         */
        jsonp ({url,
            type = 'get',
            dataType = 'jsonp',
            data = {},
            error = () =>{
                for(let i = ajaxStatus.length; i--;){
                    if(ajaxStatus[i] == url){
                        ajaxStatus.splice(i,1)
                    }
                }
                alert('请求服务器出错了!');
                finish();
            },
            finish =() =>{},
            success = res =>{
                for(let i = ajaxStatus.length; i--;){
                    if(ajaxStatus[i] == url){
                        ajaxStatus.splice(i,1)
                    }
                }
                cbk(res);
                finish();
            }
        },cbk){
            //防止重复请求
            console.log(ajaxStatus);
            for(let i = ajaxStatus.length; i--;){
                if(ajaxStatus[i] == url){
                    return false;
                }
            }
            ajaxStatus.push(url);
            let promise =  $.ajax({
                url : url,
                type: type,
                dataType : dataType,
                data : data,
                success : cbk ? success : undefined,
                error : error
            });
            if(!cbk){
                return promise.then(()=>{
                    for(let i = ajaxStatus.length; i--;){
                        if(ajaxStatus[i] == url){
                            ajaxStatus.splice(i,1)
                        }
                    }
                });
            }
        },
        /**
         * 图片转换成Base64
         * @param url
         * @param callback
         * @param outputFormat
         */
        convertImgToBase64(url, callback, outputFormat){
            var canvas = document.createElement('CANVAS'),
                ctx = canvas.getContext('2d'),
                img = document.createElement('img');
            // img.crossOrigin = 'Anonymous';
            img.src = url;
            $(img).load(function(){
                let w = 400,
                    rda = w / img.width,
                    h = img.height * rda;
                canvas.height = h;
                canvas.width = w;
                ctx.drawImage(img,0,0,w,h);
                var dataURL = canvas.toDataURL(outputFormat || 'image/png');
                // alert(dataURL)
                callback.call(this, dataURL);
                canvas = null;
            });
        },
        verifyDriver (){
            return new Promise((resolve, reject)=>{
                if(!eluConfig.user.verifyDriver){
                    let layer = eluUtil.layers(`<div class="account_layers">
                        <p>认证成为司机,发布的信息可信度更高!</p>
                        <a>马上去认证</a><em>不认证,继续发布</em>
                        </div>
                        `);
                    layer.$con.find("a").on("click",()=>{
                        layer.close();
                        resolve();

                    });
                    layer.$con.find("em").on("click",()=>{
                        layer.close();
                        reject();
                    })
                }else{
                    reject();
                }
            })
        },
        verifyLogin(){
            let url = $("#myCode").attr("src");
            return new Promise((resolve, reject)=>{

                if(eluConfig.loginStatus == 400){
                    let layer = eluUtil.layers(`<div class="login_layers">
                        <span>发布和个人中心仅限公众号内使用</span>
                        <img src="${url}">
                        <p>1、扫码关注公众号登录<br>2、搜索"e鹿同行"公众号关注登录</p>
                    </div>
                    `);
                }else{
                    resolve();
                }
            });
        },
        verifyPhone (){
            return new Promise((resolve, reject)=>{
                if(eluConfig.user.phone){
                    resolve();
                }else{
                    let layer = eluUtil.layers(`<div class="account_layers">
                            <b>联系方式</b>
                            <span>留下联系方式，方便司机或乘客联系您哦！</span>
                            <p><input type="tel" id="tel" placeholder="请输入手机号"/><label id="tips"></label></p>
                            <a id="next">下一步</a>
                        </div>`,{close : false});
                    layer.$con.find("#next").on("click",()=> {
                        let tel = layer.$con.find("#tel").val(),
                            tip = layer.$con.find("#tips");
                        if (!tel) {
                            tip.text("手机号不能为空!");
                            return false;
                        }
                        if (!eluUtil.isMobile(tel)) {
                            tip.text("手机号格式错误!");
                            return false;
                        }
                        eluUtil.jsonp({
                            url : eluConfig.serverPath + 'user/sendSms',
                            data : {
                                telNum : tel,
                                uid : eluConfig.user.uid
                            }
                        },(data) =>{
                            if (data.retCode == '200') {
                                Util.pushMsg(tel).then(resolve);
                                layer.close();

                            } else {
                                tip.text(data.retMsg);
                            }
                        });
                    });
                }


            })
        },
        pushMsg (tel){
            return new Promise((resolve, reject)=>{
                let layer = eluUtil.layers(`<div class="account_layers">
                            <b>身份验证</b>
                            <p><input type="text" id="code" placeholder="请输入手机验证码"/><label id="tips"></label></p>
                            <a id="push">提交验证码</a>
                            </div>`,{close : false});
                layer.$con.find("#push").on("click",()=>{
                    let code = layer.$con.find("#code").val(),
                        tip = layer.$con.find("#tips");
                    if (!code || code.length != 6) {
                        tip.text("请输入6位数验证码!");
                        return false;
                    }
                    eluUtil.jsonp({
                        url : eluConfig.serverPath + 'user/checkSms',
                        data : {
                            verifyCode : code,
                            telNum : tel
                        }
                    },(data) =>{
                        if (data.retCode == '200') {
                            layer.close();
                            eluConfig.user.phone = tel;
                            resolve();
                        } else {
                            tip.text(data.retMsg);
                        }
                    });
                })

            });
        }

};
window.eluUtil = window.eluUtil || Util;