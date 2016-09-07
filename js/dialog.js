define([],function(){
	var Dialog = function(option){
		// 看是否传入值
		this.option = typeof 'undefined' ? {
			msg:'dialog弹出框提示信息',
			title:'对话框'
		}:option;
		//this.agent=common.getAgentType();
		this.defaultDom = this.option.defaultDom || '<p class="dialog-title">{title}</p><p class="dialog-msg">{msg}</p> <p class="dialog-btn-wrap">{btnwrap}</p>'
		this.init();
	}

	Dialog.prototype = {
		// 初始化
		init:function(){
			this.callback = null;
			this.defaultDom = this.defaultDom.replace('{title}',this.option.title);
			//this.ifNeedAnimate = this.agent.isTos || this.agent.isiPad || this.agent.isIphone;
		},
		// 只是确定按钮
		alert:function(msg,callback){
			this.show();
			this.defaultDom = this.defaultDom.replace("{msg}",msg)
				.replace("{btnwrap}",'<span class="dialog-btn dialog-certain">确定</span>');
			this.dialogBox.html(this.defaultDom);
			if(callback){
				this.callback = callback;
			}
		},
		// 确定和取消按钮
		confirm:function(msg,callback){
			this.show();
			this.defaultDom = this.defaultDom.replace("{msg}",msg)
                .replace('{btnwrap}','<span class="dialog-btn dialog-certain">确定</span><span class="dialog-btn dialog-cancel">取消</span>');
            this.dialogBox.html(this.defaultDom);
            if(callback){
            	this.callback = callback;
            }
		},
		// 给按钮绑定事件
		bindEvent:function(){
			var that = this;
			this.dialogBox.on("click",'.dialog-certain',function(){
				that.hide();
				if(that.callback){
					that.callback();
				}
			});
			this.dialogBox.on('click','.dialog-cancel',function(){
                that.hide();
            })
		},
		// show函数
		show:function(){
			var _body = $("body");
			if($(".mask-layer").length==0){
				var mask = "";
				if(!this.ifNeedAnimate){
                    mask = $('<div class="mask-layer" style="transition: none;"></div>')
                }else{
                    mask = $('<div class="mask-layer"></div>');
                }
                mask.appendTo(_body);
                setTimeout(function(){
                	mask.addClass("mask-active");
                },10)
			}
			if($('.dialog-box').length == 0){
                this.dialogBox = $('<div class="dialog-box"></div>').appendTo(_body);
            }
            this.afterShow();
		},
		// 调用bind函数
		afterShow:function(){
			this.bindEvent();
		},
		// 隐藏
		hide:function(){
			var db = $(".dialog-box");
			var ml = $('.mask-layer');
			if(this.ifNeedAnimate){
				db.addClass("transparency");
				ml.addClass("mask-active");
				ml.on(common.transitionEnd(),function(){
					ml.length>0 && ml.remove();
					db.length>0 && db.remove();
				})
			}else {
                ml.length>0 && ml.remove();
                db.length>0 && db.remove();
            }
		}
	};

	return Dialog;
})