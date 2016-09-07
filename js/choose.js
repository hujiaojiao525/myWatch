define(['js/api','js/slideSelect','js/common'],function(api,slideSelect,common){
    if(window.location.href.indexOf('choose.html') == -1) return;

    // 从本地存储中获取到值赋给号码匡内

    if(localStorage.getItem("selected-phone") && localStorage.getItem("selected-phone")!=='undefined'){
        $(".choose-tel").text("已选："+JSON.parse(localStorage.getItem('selected-phone')));
         $('<input type="hidden" value="'+JSON.parse(localStorage.getItem('selected-phone'))+'">').appendTo($('.choose-tel'));
    }

    // 当点击问号的时候出现对应的内容
    $(".question").on("click",function(){
        $(".question-page").removeClass('hide');
    })
    $(".question-page").on("click",function(){
        $(this).addClass('hide');
    })

    // 让手机号码3   4   4  间隔
    
    
    // 请求ajax中的数据拼接字符串添加到对应的页面中
    api.getNumber({},function(data){
        var str = "";
        if(data){
            data.result.forEach(function(v,i){
               str+="<span class='number'>"+common._trim(v.svcNumber)+"</span>";
            })
        }
        $(".tel-number").html(str);
    })

    // 点击手机号码的时候 号码页面显示
   
    var _href = location.href;
    $(".choose-tel").on("click",function(){
        $('.tel-number').removeClass('right-hide');
        history.pushState({},'choose phone number',_href+'?__PLU');
    })
    // 点击页面上的回退按钮  让其返回
    $(window).on("popstate",function(){
        $(".tel-number").addClass('right-hide')
    })

    // 点击手机号码的span 加上高亮 获得text 让其返回
    $(".tel-number").on("click",'span',function(){
        // 家高亮
        $(this).addClass('num-high').siblings('span').removeClass('num-high');
        $(".tel-number").addClass('right-hide');
        var text= $(this).text();
        $(".choose-tel").text('已选：'+text);
        history.replaceState({},'choose phone number',_href)
        check($('.box input').val());   //  调用高亮的方法 传入iccid文本框的值
        $('<input type="hidden" value="'+text+'">').appendTo($('.choose-tel'));  // 加入一个隐藏文本域

    })

    // 预存金额
    $(".pre-box .pre").slideSelect({
        init:3,   // 初始值
        wapper:$(".container"),                       // 大盒子
        data:['10元','20元','30元','50元','100元'],  //带渲染的数据
        title:'预存金额',                            // 标题
        renderTo:'.pre-box .pre',                    // 值的存放地
        callback:function(a,b){
            console.log('success');
        },
        cls:'selected'
    });

    // 当点击choose-package的时候
    $(".choose-package").on("click",".choose-item",function(){
        $(this).addClass('checked-item').siblings('.choose-item').removeClass('checked-item')
    })
    $(".open-box").on("click","span",function(){
        $(this).addClass('open-high').siblings('span').removeClass('open-high')
    })
    

    // 判断输入手表的iccid是否符合要求
    $(".box input").on("input propertychange",function(){
        var tmp = $(this).val();
        tmp = tmp.replace(/(\d{5})+$/g,function(a,b){
            return b.substr(0,4)+" "+b.substr(4);
        })
        // 只能输入20位  截取字符串加上空格总共24位
        if(tmp.length>=24){
            tmp = tmp.substring(0,24);
        }
        $(this).val(tmp);
        check(tmp)
    })

    // 按钮高亮
    function check(tmp){
        var reg = /^(\d{4}\s){4}(\d{4})$/;
        var ele = $(".next-btn");
        if($(".choose-tel").text().indexOf('已选')>-1 && reg.test(tmp)){
            ele.removeClass('btn-dis');
        }else{
            ele.addClass('btn-dis');
        }
    }

     
    // 收集信息
    function collectInformation(){
        var str = "";
        var ICCID = $(".box input").val();
        var phone = $(".choose-tel input").val();
        var prestore = $(".pre-box .pre").text();
        var packages = $(".choose-package .checked-item").attr("data");
        var showCaller = $(".open-high").index();
        ICCID = ICCID.replace(/\s/g,"");
        phone = phone.replace(/\s/g,"");
        str+='?ICCID='+ICCID;
        str+='&phone='+phone;
        str+='&prestore='+prestore;
        str+='&packages='+packages;
        str+='&showCaller='+showCaller;

        return decodeURI(str);
    }


    $(".pos-btn").on("click",function(){
        if($(this).find("span").hasClass('btn-dis')) return;
        console.log()
        // 把电弧号码存储到本地
        localStorage.setItem('selected-phone',JSON.stringify($('.choose-tel input').val()));
        //localStorage.setItem('selected-phone',[]);
       
        location.href = "../html/info.html"+ collectInformation();
    })
    

})