define(['js/common'],function(common){
    if(window.location.href.indexOf('order.html') == -1) return;

    var time = common.getNowFormatDate();
    var phone = common._trim(common.getUrlParams('phone'));
    var prestore = common.getUrlParams('prestore');
    var packages = common.getUrlParams("packages");

    message();
    
    
    // 点击按钮让其跳转到下一页
    $('.pay-btn').on("click",function(){
        var stateBox = $(".order-state");
        stateBox.removeClass('right-hide')
        stateBox.html($("#state").html());
        message();
        stateBox.off().on("click",function(){
            window.location.href = "../html/my.html";
        })
    }) 
    function message(){
        $(".order-time").text(time);
        $(".order-phone").text(phone);
        $(".order-prestore").text(prestore);
        $(".order-packages").text(packages);
    }    
})