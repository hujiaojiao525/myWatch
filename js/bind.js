define(["js/common","js/dialog","js/api"],function(common,dialog,api){
	if(window.location.href.indexOf('bind.html') == -1) return;
    // 验证码的链接
    var url = 'https://ticwear-account.mobvoi.com/captcha/img?origin=ticwatch-service';
	var arr = [];

	// 生成随机数
	function randNum(max,min){
		var tmp = Math.floor(Math.random()*(max-min))+min;

		while(arr.indexOf(tmp)>-1 && arr.length<(max-min)){
			tmp = Math.floor(Math.random()*(max-min))+min;
		}
		if(arr.length<=(max-min)){
			arr.push(tmp);
			return tmp;
		}else{
			return false;
		}
	}
	// 点击获取验证码  通过改变其自定义属性的值
	$("#randomImg").on("click",function(){
		
		var tmp = randNum(9999,1000) || "error";
		url = url + '&random_code='+ tmp;
		$(this).attr('src',url).attr('data-random-code',tmp);
	});

	var Dialog = new dialog();
	var flag = true;
	var _code = '';

	// 点击获取验证码的时候
	$(".code").on("click",function(){

		// 分别获取前两个文本框的的值
		var phone = $(".phone-number").val(),
			imgCode = $(".img-code").val();
		// 分别定义两个正则
		var reg_phone = /^1[3578]\d{9}$/g,
			reg_imgcode = /[a-zA-Z0-9]{4}/;

		// 判读第一个框里的值是否符合条件
		if(!reg_phone.test(phone)){
			Dialog.alert("请输入正确的手机号码",function(){
				$('.phone-number').focus();
				flag = false;
			})
			return;
		}
		flag = true;
		// 判读图片验证码框里的值是否符合条件
		if(!reg_imgcode.test(imgCode)){
			Dialog.alert("请输入验证码",function(){
				$(".img-code").focus();
				flag = false;
			})
			return false;
		}

		// 如果flag为false  
		if(!flag) return;
		// 调用定时器
		common.countDown($(this));

		// 13520975457
		// 调用api中的ajax请求  
		api.getVerifyCode({},function(data){
			if(data.msg == 'success'){
				_code = data.code;
			}
		})

	});

	// 在图片验证码中输入值的时候
	$(".img-code").on("input propertychange",function(){
		var self = $(this);
		var val = self.val();
		// 只能在文本框中显示4个
		if(val.length>4){
			val = val.substr(0,4);
			self.val(val);
		}
	})
	.on("blur",function(){
		var self = $(this);
		if(self.val().length == 4){
			$.ajax({
				url:"../data/getValidCode.json?imgcode"+$(this).val(),
				success:function(data){
					console.log(data)
					if(self.val() != data.imgcode){
						Dialog.alert("验证码输入有误",function(){
							$("#randomImg").click();
							self.focus();
							flag = false;
						});
					}else{
						flag == true;
					}
				}
			})
		}else{
			Dialog.alert("图片验证码有误")
		}
	});

	// 在验证码框里输入值的时候
	$(".verify-code").on('input propertychange',function(){
		var val = $(this).val();
		if(val){
			if(/^\d{6}$/.test(val)){
	            $('.bind-btn').removeClass('btn-dis');
	        }else{
	        	$('.bind-btn').addClass('btn-dis');
	        }
		}
		
	})

	// 点击登陆判断验证码是否和json数据里获得值是否一样
	$(".bind-btn").on("click",function(){
		if($(this).hasClass('btn-dis')) return;
		if($('.verify-code').val() != _code){
			Dialog.alert("验证码输入有误！！！",function(){
				$(".verify-code").focus();
			})
			return;
		}
		window.location.href = "../html/choose.html";
	})
})