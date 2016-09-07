define(['template'],function(tpl){
    if(window.location.href.indexOf('my.html') == -1) return;

    var wrap = $('.tab-main-wrap section');
    var queryTpl = '<ul class="count">'+
                    '<% for(var i=0;i<list.length;i++) {%>'+
                        '<li><h4><%= list[i].name %></h4>'+
                        '<p><%= list[i].info %></p></li>'+
                    '<% } %>';

    // 点击tab-title下面的span时候
    $(".tab-title").on("click",'span',function(){
        var id = $(this).attr("data-msg");
        console.log(id)
        $(this).addClass('on').siblings('span').removeClass('on');
        render(id);    
    })

    render('flows')
    function render(id){
        if(id=="flows"){
            url='../data/usedInfo.json'
        }
        $.when($.ajax(url))
            .done(function(data){
                var tmp = {
                    list:data
                };        
                             
                var html = tpl(id,tmp);
                     
                /*var render = tpl.compile(queryTpl);
                var html = render({
                    list:data
                })*/
                var com = $("#common").html()   
                wrap.html(html+com);
            })
            .fail(function(){
                console.log('error');
                     
            })
    }
})