/**
 * Created by Ch on 16/12/18.
 * 网站所有的一些公共方法
 * 这个Util对外暴露
 */
let Util = {

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
            cbk(res);
            finish();
        }
    },cbk){
        let promise =  $.ajax({
            url : url,
            type: type,
            dataType : dataType,
            data : data,
            success : cbk ? success : undefined,
            error : error
        });
        if(!cbk){
            return promise;
        }
    }
};
window.elUtil = window.elUtil || Util;