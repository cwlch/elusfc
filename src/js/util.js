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
    tipsMod(str, time) {
        // 提示模块
        return new Promise((resolve, rejec)=>{
            var $doc = $(document),
                $body = $('body'),
                tips = '<div class="tips"></div>',
                $tips = '',
                time = time || 3000;

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
    dateFormat(fmt,date){
        let myDate = date ? new Date(date) : new Date(),
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
    }
};
window.eluUtil = window.eluUtil || Util;