/**
 * Created by XSM on 2017/11/6 0006.
 */
window.onload= function () {
    var oBox1=document.getElementById('boxOne');
    var oBox2=document.getElementById('boxTwo');
    var table1=document.getElementById('R1_table');
    var table2=document.getElementById('R2_table');
    var scroller1=document.getElementById('scrollOne');
    var scroller2=document.getElementById('scrollTwo');

    var dis_p1=table1.offsetHeight-oBox1.offsetHeight;//table的高度减去box的高度
    var dis_span1=oBox1.offsetHeight-scroller1.offsetHeight;//滑块移动距离

    var dis_p2=table2.offsetHeight-oBox2.offsetHeight;
    var dis_span2=oBox2.offsetHeight-scroller2.offsetHeight;
    console.log(table1.offsetHeight,oBox1.offsetHeight)
    //滚轮比率
    var wheel_rate1=dis_span1/dis_p1;
    var wheel_rate2=dis_span2/dis_p2;


    function mouseWheel(obj,fn){
        if(window.navigator.userAgent.indexOf('Firefox')!=-1){
            obj.addEventListener('DOMMouseScroll',wheelFn,true);

        }else obj.onmousewheel=wheelFn;

        function wheelFn(ev){
            var oEv=ev||event;
            var direct=oEv.wheelDelta ? oEv.wheelDelta<0 : oEv.detail>0;
            fn && fn(direct);
            if(window.event){
                oEv.returnValue = false;
                return false;
            }
            else{
                oEv.preventDefault();
            }
        };
    };
    mouseWheel(oBox1,function(ererer){
        if(ererer){
            var t=table1.offsetTop-30;
            console.log(t,table1.offsetTop,dis_p1)
            if(t<-dis_p1)t=-dis_p1;
            table1.style.top=t+'px';
            scroller1.style.top=-t*wheel_rate1+'px';
        }else{
            var t=table1.offsetTop+30;
            if(t>0)t=0;
            table1.style.top=t+'px';
            //console.log(t,table1.offsetTop)

            scroller1.style.top=-t*wheel_rate1+'px';
        }
    });
    mouseWheel(oBox2,function(ererer){
        if(ererer){
            var t=table2.offsetTop-30;
            if(t<-dis_p2)t=-dis_p2;
            table2.style.top=t+'px';
            scroller2.style.top=-t*wheel_rate2+'px';
        }else{
            var t=table2.offsetTop+30;
            if(t>0)t=0;
            table2.style.top=t+'px';
            scroller2.style.top=-t*wheel_rate2+'px';
        }
    });
    scroller1.onmousedown=function(ev){
        var oEv=ev || window.event;
        var mt=oEv.clientY-this.offsetTop;//只取Y方向
        document.onmousemove=function(ev){
            var oEv=ev||window.event;
            var t=oEv.clientY-mt;
            if(t<=0) t=0;//限制顶部位置
            if(t>=dis_span1-2) t=dis_span1;//限制底部位置
            //计算移动比率
            var move_rate=t/dis_span1;
            table1.style.top=-dis_p1*move_rate+'px';//移动比率
            scroller1.style.top=t+'px';
        };
        document.onmouseup=function(){
            document.onmousemove=null;
            if(oBox1.releaseCapture) oBox1.releaseCapture();
        };
        if(oBox1.setCapture) oBox1.setCapture();

        return false;//阻止选中文字

    };
    scroller2.onmousedown=function(ev){
        var oEv=ev || window.event;
        var mt=oEv.clientY-this.offsetTop;//只取Y方向

        document.onmousemove=function(ev){
            var oEv=ev||window.event;
            var t=oEv.clientY-mt;
            if(t<=0) t=0;//限制顶部位置
            if(t>=dis_span2-2) t=dis_span2;//限制底部位置

            //计算移动比率
            var move_rate=t/dis_span2;

            table2.style.top=-dis_p2*move_rate+'px';//移动比率

            scroller2.style.top=t+'px';
        };
        document.onmouseup=function(){
            document.onmousemove=null;
            if(oBox2.releaseCapture) oBox2.releaseCapture();
        };
        if(oBox2.setCapture) oBox2.setCapture();
        return false;
    };
}




