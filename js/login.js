define(['js/ID','js/api','js/common','js/dialog'],function(I,api,common,dialog){
	if(window.location.href.indexOf('index.html') == -1) return;

	var login=function(){
		var Id = $(".ID"),
			code = $(".Code"),
			validBtn = $(".code");  //获取验证码

		var idVal = $.trim(Id.val()),
			codeVal = $.trim(code.val()),
			validCode = null;
			
			var Dialog = new dialog();

			// 点击获取验证码的时候
			validBtn.on("click",function(){
				if(I.idCard($.trim(Id.val()))){
					common.countDown(validBtn);
					api.getAccountInfo({
						//wechat_id : common.getUrlParams("wechat_id"),
						idCard:$.trim(Id.val())
					},function(data){
						validCode = data.code;  //******

					});
					return;
				}

				Dialog.alert("请输入正确的书写格式",function(){
					Id.focus();
					Id.val("");
				});
			})

			// 412726199508080445

			function checkNum(){
				var idVal = $.trim(Id.val()),
					codeVal = $.trim(code.val());
				// 判断文本框的条件都满足时
				if(idVal && codeVal){
					if(I.idCard(idVal) && /^\d{6}$/.test(codeVal)){
						$(".login-btn").removeClass("btn-dis");
					}else{
						$(".login-btn").addClass("btn-dis");
					}

					// 点击login-btn的时候
					$(".login-btn").on("click",function(){
						if($.trim(code.val()) == validCode){
							location.href="../html/bind.html";
						}else{
							Dialog.confirm('验证码有误')
						}
					}) 
				}
			}


		Id.on("input",function(){
			checkNum();
		})
		code.on("input",function(){
			checkNum();
		})

		
	}
	login()
	//return login;
})