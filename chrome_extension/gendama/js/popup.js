$(function(){
	$.ajax({
        type: "POST",
        url: "http://"+ gendama_url.gendama_jp +"/api/api_extension/get_user_info",
        data: {},
        cache:false,
        dataType: 'json',
        success: function(data) {
        	if (data.user_info) {
        		$("#pageBox")[0].style.display = 'block';
        		$("#profile").text(data.nickname + 'さん');
        		$("#pointhold").text(data.pointhold + 'pt');
        		$("#pointexpect").text(data.pointexpect + 'pt');
        		$("#logout_link").attr('href',data.logout_url);
        	} else {
        		$("#login_link").attr('href',data.login_url);
        		$("#loginBox")[0].style.display = 'block';
        	}
        },
        error: function(data) {
            alert('取得に失敗しました');
            console.log(data);
        }
    });
    $(".searchMenu").change(function(){
    	changeSearch($(".searchMenu option:selected").val());
  	});
  	$(".kensakumadoboxBtn")
    	.mouseover(function() { 
        	var src = "http://img.gendama.jp/img/neo/index/service_btn_on.png";
        	$(this).attr("src", src);
        })
        .mouseout(function() {
            var src = "http://img.gendama.jp/img/neo/index/service_btn.png";
            $(this).attr("src", src);
        });
  	$(".kensakumadobox").blur(function(){
    	myBlur(this);
	});
	$(".kensakumadobox").focus(function(){
    	myBlur(this);
	});
	$("form.search_form input[type='image']").click(function(e) {
		//検索ボタンをクリックした時に、まずsubmit処理をキャンセル
    	//次にinput内に入力された文字列の文字化け回避
    	//その後、新しいタブで検索結果を表示する
    	e.preventDefault();
    	var searchKwd = EscapeEUCJP($("#searchtext").val());
    	var actionUrl = $(".search_form").attr("action");
    	var searchUrl = actionUrl;
    	// サービス検索
    	if ($(".searchMenu").val() == 'service') {
    		searchUrl += "?searchMenu=service&word=" +  searchKwd + "&x=0&y=0&type=";
    	} else {
    		searchUrl += "?searchMenu=" + $(".searchMenu").val() + "&word=" + searchKwd + "&x=0&y=0&type=" + $(".searchMenu").val();
    	}
    	chrome.tabs.create({url:searchUrl,selected: true});
	});
});