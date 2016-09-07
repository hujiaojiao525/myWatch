define(['jquery'],function($){
	return {
		getAccountInfo:function(data,callback){
			data = data || {
				wechat_id :"123456",
				balance : 30,
				phoneNum : "13520975457",
				idCard : '132143243243423432'
			};

			$.ajax({
				url:"../data/getValidCode.json",
				type:'get',
				data:data,
				beforeSend:function(){

				},
				success:function(data){
					callback(data);
				},
				complete:function(data){
					//console.log(data);
				},
				error:function(err){
					console.log(err.responseText)
				}
			})
		},
		getVerifyCode:function(data,callback){
			$.when($.ajax({
				url:"../data/getValidCode.json",
				data:data
			}))
			.done(function(data){
				callback(data);
			})
			.fail(function(err){
				console.log(err)
			})
		},
		getNumber:function(data,callback){
			$.when($.ajax('../data/numList.json'))
			.done(function(data){
				callback(data);
			})
			.fail(function(err){
				console.log(err)
			})
		}
	}
})