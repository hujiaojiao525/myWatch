require.config({
	
	paths:{
		"jquery":"../lib/jquery-3.0.0.min",
		"template":"../lib/template-native",
        "fastclick":"../lib/fastclick"
	}
});

require(['fastclick','jquery','js/login','js/text',"js/bind",'js/choose','js/info','js/order','js/my'],function(fc){
	fc.attach(document.body);
})