define(['js/common','js/dialog','js/ID'], function(common,dialog,ID) {
    if (window.location.href.indexOf('info.html') == -1) return;

    // 从地址栏上获取参数
    var phone = common.getUrlParams("phone");
    var prestore = common.getUrlParams("prestore");
    var packages = common.getUrlParams("packages");
    var pp = {
        p1: "0元",
        p2: "30元"
    };
    var Dialog = new dialog();
    console.log(packages == "p1" ? "0元月租" : "30元月租");

    console.log(phone + "----" + prestore + '----' + packages)

    // 拼接字符串添加到info-header
    $(".info-header").text(prestore + "预存/" + pp[packages] + "月租/" + common._trim(phone));




//412726199508080445

    
    var reg = /\d/;
    var reg2 = ID.idCard;
    console.log(reg2($(".info-ID").val()))
         
    console.log(common.getType(reg2))
         
//验证文本框
    function valid(ele,reg){
        if(common.getType(reg) == '[object RegExp]'){
            return reg.test(ele.val());
        }else if(common.getType(reg) == '[object Function]'){
            return reg(ele.val())
        }
    }

                                                     
         
// 检测所以的内容是否符合条件
    function check(){
        var btn = $(".next-btn");
        if(valid($(".info-name"),/\S/)
         &&valid($(".info-ID"),ID.idCard)
         &&valid($(".info-address"),/^[\u4E00-\u9FA5]+$/)
         &&valid($(".info-tel"),/^1[3578]\d{9}$/)
         &&$("#upload").hasClass('high')
         &&$('#info-ck').prop("checked")
            ){
            btn.removeClass('btn-dis');
        }else{
            btn.addClass('btn-dis');
        }
    
    }
    
// 分别给输入框获得焦点
    $(".info-name").on("input propertychange",function(){       
        check()
        console.log(valid($(".info-name"),/\S/))                  
    })

    $(".info-ID").on("input propertychange",function(){       
        check()
        console.log(valid($(".info-ID"),ID.idCard))
    })

    $(".info-address").on("input propertychange",function(){
        check()
        console.log(valid($(".info-address"),/^[\u4E00-\u9FA5]+$/))

    })

    $(".info-tel").on("input propertychange",function(){  
        check()  
        console.log(valid($(".info-tel"),/^1[3578]\d{9}$/))

    })


    // 当点击upload的时候让上传照片的页面出来
    $("#upload").on("click",function(){
        var bigBox = $(".info-upload");
        $('.right-page').removeClass('right-hide');
        if(bigBox.children().length == 0){
            bigBox.html($("#info-upload").html()).trigger('page-show');
        }
        history.pushState({},'upload img',location.href+'&__PLU__upload'); b 
        
        
    }) 

// 触发自定义事件
    $(".info-upload").on('page-show',function(){
        // 点击第一个上传图片
        $(".pic1").on('change',function(){
            uploadImg($(this));                 
        })
        $(".pic2").on('change',function(){
            uploadImg($(this));                 
        })
        $(".pic3").on('change',function(){
            uploadImg($(this));                 
        })

        // 点击over-btn按钮返回到前一页
        $(".over-btn").on("click",function(){
            if($(this).hasClass('btn-dis')) return;
            $('.info-upload').addClass('right-hide');    //让这个页面隐藏
            $("#upload").text("照片已上传").addClass('high');
            check();
        })
    })
// 点击info-ck的时候
    $("#info-ck").on("click",function(){
        check()
    })


    // 上传图片
    function uploadImg(ele){
        var _now = ele;
        var file = ele[0].files[0];
        if(file.size/(1024*1024)>1){
            Dialog.alert("请上传小于1MB的图片");
            return;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(){
            _now.prev().attr('src',this.result);
            // 为了让选择照片这个页面下面的按钮加上高亮  让照片上传成功之后给其加上一个自定义属性
            _now.parents('.photo-item').attr("data",1);
            if(checkUploaded()){
                $(".over-btn").removeClass('btn-dis')
            }                      
        }
    }

    // 照片这个页面下面的按钮加上高亮
    function checkUploaded(){
        var idx=0;
        $(".photo-item").each(function(){
            if($(this).attr("data")){
                idx++;
            }     
        })
        console.log(idx)
        return idx>=3 ? !0 : !1;
    }



    // 当点击window上的返回时
    $(window).on("popstate",function(){ 
        // 如果在地址栏上得到 新加的路径  让其显示   否则让其隐藏
        if(location.href.indexOf('__PLU__upload')==-1){
             $('.right-page').addClass('right-hide');  // 让盒子隐藏
        }else{
             $('.right-page').removeClass('right-hide');
        }
    })   

    function collectData(){
        $(".info-header").text(prestore + "预存/" + pp[packages] + "/" + common._trim(phone));

    }

    // 当点击$(".next-btn")的时候让其跳转到字一个页面
    $(".next-btn").on("click",function(){
        if($(this).hasClass('btn-dis')) return;
        location.href = "../html/order.html?phone="+phone+"&prestore="+prestore+"&packages="+pp[packages] +"";
    })


         


})