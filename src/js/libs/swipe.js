/**
 * [swipe 事件扩展]
 * swipeup       上滑事件
 * swipedown     下滑事件
 * swipeleft     左滑事件
 * swiperight    右滑事件
 * swipemove     滑动中move事件
 * swipeclick    点击事件
 */
'use strict';
// window.console.log($)
/*exports.swipe =*/ (function() {
    var min = 80,//最小滑动幅度
        max = 30,//点击最大幅度
        x1 = 0,
        y1 = 0,
        x2 = 0,
        y2 = 0,
        isMove = false,
        $doc = $(document);
    //获取XY值
    function getXY(e){
        var touch = e.originalEvent ? e.originalEvent.changedTouches[0] : (e.changedTouches ? e.changedTouches[0] : e);
        return {
            pageX : Math.round(touch.pageX)
            ,pageY : Math.round(touch.pageY)
        }
    }
    function start(e) {
        var touch = getXY(e); //e.originalEvent ? e.originalEvent.changedTouches[0] : (e.changedTouches ? e.changedTouches[0] : e);
        x1 = touch.pageX;
        y1 = touch.pageY;
    };

    function stop(e) {
        var touch = getXY(e); //e.originalEvent ? e.originalEvent.changedTouches[0] : (e.changedTouches ? e.changedTouches[0] : e);
        x2 = touch.pageX;
        y2 = touch.pageY;
    };

    function ismove(e) {
        if (!isMove) {
            isMove = true;
        }
        //添加move事件
        var touch = getXY(e)
            ,msg = {
                startX : x1
                ,startY : y1
                ,endX : touch.pageX
                ,endY : touch.pageY
            }
        $(e.target).trigger("swipemove",[msg])
    };

    function direction(e) {
        var dir = ''
            ,absX  = Math.abs(x2 - x1)
            ,absY = Math.abs(y2 - y1)
            ,$target = $(e.target)
            ,msg = {
                startX : x1
                ,startY : y1
                ,endX : x2
                ,endY : y2
            }
            ;
        // $("#add_mess").html("x1=" + x1 + "x2=" + x2 + "y1=" + y1 + "y2=" + y2 + "absX" + absX + "absY" + absY);
        //哪条轴运动幅度大就使用那个方向 y(上下) x(左右)
        if(absX < absY){

            if(absY > min){
                dir = y1 < y2 ? 'down' : 'up';
            }else if(absY < max){
                $target.trigger('swipeclick');
            }
        }else{
            if(absX > min){
                dir = x1 < x2 ? 'right' : 'left';
            }else if(absX < max){
                $target.trigger('swipeclick');
            }
        }
        // $("#add_mess").html(absX + "---" + absY)
       /* if (Math.abs(x2 - x1) < x && Math.abs(y2 - y1) > 30) {
            dir = y1 < y2 ? 'down' : 'up';
        } else if (Math.abs(x2 - x1) > 30 && Math.abs(y2 - y1) < y) {
            dir = x1 < x2 ? 'right' : 'left';
        }*/
        switch (dir) {
            case 'up':
                $target.trigger('swipeup',[msg]);
                break;
            case 'down':
                $target.trigger('swipedown',[msg]);
                break;
            case 'left':
                $target.trigger('swipeleft',[msg]);
                break;
            case 'right':
                $target.trigger('swiperight',[msg]);
                break;
        }
    };

    $doc.on('touchstart', function(e) {
        // console.log(e.target.tagName)
        e.stopPropagation();
        // e.preventDefault();
        start(e);
        $(e.target).trigger("touchmove");
    }).on('touchmove', function(e) {
        e.stopPropagation();
        // e.preventDefault();
        ismove(e);
    }).on('touchend', function(e) {
        if (!isMove) {
            return;
        }
        e.stopPropagation();
        // e.preventDefault();
        stop(e);
        direction(e);
        isMove = false;
    });

})();