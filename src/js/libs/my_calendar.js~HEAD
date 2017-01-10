(function(){
    var added=false;
    window.makeUpCalendar=function (oTxt){
        var oDiv=document.createElement('div');
        oDiv.className='my_calendar';
        oDiv.innerHTML=
            "<a href='javascript:;' class='prev'>&lt;</a>\
            <span>2014年11月</span>\
            <a href='javascript:;' class='next'>&gt;</a>\
            <ol>\
                <li>一</li>\
                <li>二</li>\
                <li>三</li>\
                <li>四</li>\
                <li>五</li>\
                <li>六</li>\
                <li>日</li>\
            </ol>\
            <ul></ul>\
            ";
        document.body.appendChild(oDiv);

        oTxt.onfocus=function(){
            oDiv.style.display='block';
            oDiv.style.left=oTxt.offsetLeft+"px";
            oDiv.style.top=oTxt.offsetTop+oTxt.offsetHeight+"px";
        };
        var oUl = oDiv.getElementsByTagName('ul')[0];
        var oS = oDiv.getElementsByTagName('span')[0];
        var aLi=oUl.children;
        var now=0;
        refreshCalendar();
        function refreshCalendar(){
            var oDate=new Date();
            oDate.setMonth(oDate.getMonth()+now);
            oS.innerHTML=oDate.getFullYear()+"年"+(oDate.getMonth()+1)+"月";
            oUl.innerHTML="";

            //空格
            var oDate = new Date();
            oDate.setMonth(oDate.getMonth()+now);
            oDate.setDate(1);
            var w=oDate.getDay();
            if(w==0){
                w=7;
            }
            w--;
            for(var i=0;i<w;i++){
                var oLi = document.createElement('li');
                oUl.appendChild(oLi);
            }
            //li
            var oDate = new Date();
            oDate.setMonth(oDate.getMonth()+now);
            oDate.setMonth(oDate.getMonth()+1,0);
            var n = oDate.getDate();
            for(var i=0;i<n;i++){
                var oLi = document.createElement('li');
                oLi.innerHTML=i+1;
                oLi.onclick=function(){
                    var oDate =new Date();
                    oDate.setMonth(oDate.getMonth()+now);
                    if(this.className!='past'){
                        if(this.className=='today'){
                            oTxt.value=oDate.getFullYear()+"-"+(oDate.getMonth()+1)+"-"+oDate.getDate();
                        }else{
                            oTxt.value=oDate.getFullYear()+"-"+(oDate.getMonth()+1)+"-"+this.innerHTML;
                        }
                        oDiv.style.display='none';
                    }
                };
                oUl.appendChild(oLi);
            }

            if(now<0){
                for(var i=0;i<aLi.length;i++){
                    aLi[i].className='past';
                }
            }else if(now==0){
                var oDate = new Date();
                oDate.setMonth(oDate.getMonth()+now);
                var today=oDate.getDate();
                for(var i=0;i<aLi.length;i++){
                    var n = parseInt(aLi[i].innerHTML);
                    if(n==today){
                        aLi[i].className='today';
                        aLi[i].innerHTML='今天';
                    }else if(n<today){
                        aLi[i].className='past';
                    }
                }
            }
        }

        var oPrev = oDiv.children[0];
        var oNext = oDiv.children[2];

        oPrev.onclick=function(){
            now--;
            refreshCalendar();
        };
        oNext.onclick=function(){
            now++;
            refreshCalendar();
        };

        if(added)return;
        added=true;

        var oLink = document.createElement('link');
        oLink.rel='stylesheet';
        oLink.href="my_calendar.css";
        var oHead = document.getElementsByTagName('head')[0];
        oHead.appendChild(oLink);
    }

})();