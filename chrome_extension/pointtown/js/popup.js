$(function(){

  //予定付与pt通知表示
  if (localStorage['prePointHistoryidList']) {
    if (localStorage['clickList']) {
      var flg = false;
      for (var i = 0; JSON.parse(localStorage['prePointHistoryidList']).length > i; i++) {
        // 未確認のAFID通知があるか
        if (JSON.parse(localStorage['clickList']).indexOf(JSON.parse(localStorage['prePointHistoryidList'])[i]) == -1) {
          flg = true;
          break;
        }
      }
      if (flg) {
    	  $(".notification-pre-pt").show();
      } else { // clickListにあってprePointHistoryidListにないものは不要なので上書き
      	localStorage['clickList'] = localStorage['prePointHistoryidList'];
      }
    } else {
      $(".notification-pre-pt").show();
    }
  }
  
  $('.notification-pre-pt').click(function(){
    // 確認フラグをtrueに
    localStorage['clickList'] = JSON.stringify(JSON.parse(localStorage['prePointHistoryidList']));
  });
  
  log('start', '$(function(){');
  //Web検索、ホテル検索以外の文字化け解消
  $("form.euc-jp input[type='submit']").click(function(e){
    //検索ボタンをクリックした時に、まずsubmit処理をキャンセル
    //次にinput内に入力された文字列の文字化け回避
    //その後、新しいタブで検索結果を表示する
    e.preventDefault();
    var $thisForm = $(this).closest("form.euc-jp");
    var searchKwd = EscapeEUCJP($(this).prev().val());
    var actionUrl = $thisForm.attr("action");
    var searchType = $thisForm.find("input[name='o']").val();
    var largeImg = $thisForm.find("input[name='large_img']").val();
    var searchUrl = actionUrl;
    if ($("[name='section-search-selecter']").val() == ".section-search-web") { //web検索オプション;
      searchUrl += "function="+$thisForm.find("input[name='function']").val()+"&type="+$thisForm.find("input[name='type']").val()+"&user_gender="+$thisForm.find("input[name='user_gender']").val();
    } else if ($("[name='section-search-selecter']").val() == ".section-search-goods") { //商品検索オプション
      searchUrl += "site="+$thisForm.find("input[name='site']").val();
    }
    searchUrl += "&o="+searchType+"&large_img="+largeImg+"&q="+searchKwd;
    chrome.tabs.create({url:searchUrl,selected: true});
  });

  $.ajax({
    url: 'http://' + application.pointtownDomain + '/ptu/get_top_page_values?pt=chrome', //ユーサー情報のURL
    type: "get", //GET, POSTという種類あり
    cache: false, //false = キャッシュさせない、 true = キャッシュさせる
    dataType: "xml", //取得するデータの形式。xmlの他には、json, jsonp, scriptなど
    success: function(httpObj){

      // on = ログイン済み | off = ログアウト状態
      var loginStatus = $(httpObj).find("login").text();
      //ログインしてなかったら
      if("off" == loginStatus){

        $("#pt-status").html('<div id="not-login"><p>ポイントタウンにログインしていません。</p><a id="btn-login" class="btn-action" href="https://' + application.pointtownDomain + '/ptu/show_login.do?from=chromeExtension" target="_blank" >今すぐログイン</a><a class="btn-regist" href="http://' + application.pointtownDomain + '/ptu/regist/form1.do?found=' + getFound() + '" target="_blank">無料新規登録</a><small>ログイン後もう一度このウインドウを開いてください。</small></div>')
      } else {

        var profImg = $(httpObj).find("profile_img_name").text();

        //var nickname = escapeHTML(this$(httpObj).find("nickname").text());
        var nickName = $(httpObj).find("nickname").text();
        var ptHeader = '<header class="clearfix"><a id="ptHeader" href="http://' + application.pointtownDomain + '" id="logo" target="_blank"></a><a id="nick-name" href="http://' + application.pointtownDomain + '/ptu/mypage/top.do" target="_blank"><strong>' + nickName + '</strong><img src="' + profImg + '"></a></header>';
        var ptHeader = '<header class="clearfix"><a href="http://' + application.pointtownDomain + '" id="logo" target="_blank"></a><a id="nick-name" href="http://' + application.pointtownDomain + '/ptu/mypage/top.do" target="_blank" onclick="_gaq.push([\'_trackEvent\', \'click\', \'link\', \'ニックネーム\']);"><strong>' + nickName + '</strong><img src="' + profImg + '"></a></header>';

        //保持ポイント数取得
        var userPoint = $(httpObj).find("point").text();
            userPoint = '<li id="user-pt"><a id="userPoint" href="http://' + application.pointtownDomain + '/ptu/mypage/point_history.do" target="_blank" ><b>現在のポイント</b><strong>' + userPoint + '<small>pt</small></strong></a></li>';
        // ポイント数を#user_pointに入れる

        //宝くじの枚数取得
        var lotteryPoint = $(httpObj).find("lottery").text();
        if(lotteryPoint == '0') {
          lotteryPoint = '<li id="lottery" class="no-item"><a id="lotteryPoint" href="http://' + application.pointtownDomain + '/ptu/takarakuji/index.do" target="_blank" ><b>宝くじ</b><strong>' + lotteryPoint + '枚</strong></a></li>';
        } else {
          lotteryPoint = '<li id="lottery"><a id="lotteryPoint" href="http://' + application.pointtownDomain + '/ptu/takarakuji/index.do" target="_blank" ><b>宝くじ</b><strong>' + lotteryPoint + '<small>枚</small></strong></a></li>';
        }

        //残りのメールポイント数取得
        var mailPoint = $(httpObj).find("enable_mail_point").text();
        if(mailPoint == '0'){
          // メールポイント数が0のとき
          mailPoint = '<li class="no-item"><a id="mailPoint" href="http://' + application.pointtownDomain + '/ptu/mail_box/list.do" target="_blank"><b>メールpt</b><strong>' + mailPoint + '<small>pt</small></strong></a></li>';
        } else {
          //メールポイントが1以上の時
          mailPoint = '<li><a id="mailPoint" href="http://' + application.pointtownDomain + '/ptu/mail_box/list.do" target="_blank"><b>メールpt</b><strong>' + mailPoint + '<small>pt</small></strong></a></li>';
        }
        //ユーザーランク取得。0,1,2,3で取得できる
        // 0 = レギュラー, 1 = シルバー, 2 = ゴールド, 3 = プラチナ
        var userRank = $(httpObj).find("user_rank").text();
        // ユーザーランクを数字からテキストに置き換える
        if (userRank == 0){
          rank_name = 'レギュラー';
        }else if(userRank == 4){
          rank_name = 'ブロンズ'; //3月1日よりブロンズ会員が追加されています
        }else if(userRank == 1){
          rank_name = 'シルバー';
        }else if(userRank == 2){
          rank_name = 'ゴールド';
        }else if(userRank == 3){
          rank_name = 'プラチナ';
        }else{
          rank_name = 'それ以外';
        }

        userRank = '<li><a id="userRank" href="http://' + application.pointtownDomain + '/ptu/mypage/status.do" target="_blank"><b>現在のランク</b><img src="../img/logo-rank-' + userRank + '.png"><strong>' + rank_name + '</strong></a></li>';
        $("#pt-status").prepend(ptHeader);
        $('#pt-status ul').append(userRank + userPoint + mailPoint + lotteryPoint);

        //成果タグ
        var tag = $(httpObj).find("thanks_tag").text();
        log("tag=" + tag, "get_top_page_values");
        if(tag){
            log("UnescapeUTF8(tag)=" + UnescapeUTF8(tag), "get_top_page_values");
            $("#tag").html(UnescapeUTF8(tag));
        }

        //お気に入り案件
        $.ajax({
          url:'http://' + application.pointtownDomain + '/ptu/api/favorite/list.do'
          ,async : true
          ,cache : false
          ,dataType: "json"
          ,type:"GET"
          ,success: function(data){
            var favItems = data.favoriteItemList;
            $(favItems).each(function(i){
              var afId   = favItems[i].afId; //afid
              var afImg  = favItems[i].imageUrl; //画像URL
              var afCond = favItems[i].givePointCond; //獲得条件
              var afName = favItems[i].serviceName; //サービス名称
              var afPt   = favItems[i].pointTitleUnit; //ポイント数
              var afItem = '<div class="af-item"><a class="af-inner" href="http://' + application.pointtownDomain + '/ptu/pointpark/service/detail_rd.do?afid=' + afId + '" target="_blank">'
                         + '<img src="' + afImg + '">'
                         + '<div class="af-info">'
                         + '<b>' + afName + '</b>'
                         + '<strong class="point">' + afPt + '</strong>'
                         + '</div>'
                         + '</a>'
                         + '<div class="check-detail"><a href="http://' + application.pointtownDomain + '/ptu/pointpark/service/comment.do?afid=' + afId + '#section-search-1" target="_blank">詳細を見る</a></div>'
                         + '</div>';
              $("#favorite-list .inner").append(afItem);
            });
            $(".af-inner").click(function(){
                _gaq.push(['_trackEvent', 'popup', 'click', "お気に入りリスト"]);
            });
          },
          error : function(XMLHttpRequest, textStatus, errorThrown){
              //errorはスルー
              log("favorit http error", getFunctionName(arguments.callee));
          },
          timeout : 1000
        });

        $("#section-search-1,#favorite-list").fadeIn();

        //tracking (inner はポリシー上不可みたい）
        track();

      }
    },
    error : function(XMLHttpRequest, textStatus, errorThrown){
        //errorはスルー
        log("get_top_page_values http error", getFunctionName(arguments.callee));
    },
    timeout : 1000
  });

  //こっちはお知らせ件数取得。
  // $.ajax({
  //   url:'http://' + application.pointtownDomain + '/ptu/api/mypage/info/push.do'
  //   ,async : true
  //   ,cache : false
  //   //,data : 'type=' + type + '&updateData=' + updateData
  //   ,dataType: "json"
  //   ,type:"GET"
  //   ,success: function(data){
  //       var pushInfo = data.mypagePushInfo;
  //       var pushData = pushInfo.pushData;

  //     //   if(pushData.infoCount !== 0){
  //     // //お知らせ件数表示
  //     //   $(".user_alert").append('<a href="javascript:void(0)" onclick="getURL(\'http://' + application.pointtownDomain + '/ptu/information/view.do\');_gaq.push([\'_trackEvent\', \'toolbar\', \'menu\', \'お知らせ\']);"><span class="alert_color">' +pushData.infoCount+ '</span>お知らせ</a>');
  //     // } else {
  //     //   $(".user_alert").prepend('<a href="javascript:void(0)" onclick="getURL(\'http://' + application.pointtownDomain + '/ptu/information/view.do\');_gaq.push([\'_trackEvent\', \'toolbar\', \'menu\', \'お知らせ\']);"><i class="icon-comment"></i>お知らせ</a>');
  //     // }
  //   }
  // });

  $(".section-search-formList form:not(:first-of-type)").hide();
  $(".section-search-web-rule").click(function(){
    $(".section-search-web-rule-detail").slideToggle("fast");
  });

  $(".section-search-web-rule-detail .close").click(function(){
    $(".section-search-web-rule-detail").slideUp("fast");
  });

  $(".section-search-selecter").change(function(){
    var selectedForm = $(".section-search-selecter option:selected").val();
    $(".section-search-formList form").hide();
    $(selectedForm).show();
  });
});

function track(){
    $("#userRank").click(function(){
        _gaq.push(['_trackEvent', 'popup', 'click', '現在のランク']);
    });
    $("#mailPoint").click(function(){
        _gaq.push(['_trackEvent', 'popup', 'click', 'メールpt']);
    });
    $("#lotteryPoint").click(function(){
        _gaq.push(['_trackEvent', 'popup', 'click', '宝くじ']);
    });
    $("#userPoint").click(function(){
        _gaq.push(['_trackEvent', 'popup', 'click', '現在のポイント']);
    });
    $("#logo").click(function(){
        _gaq.push(['_trackEvent', 'popup', 'click', 'ロゴ']);
    });
    $("#nick-name").click(function(){
        _gaq.push(['_trackEvent', 'popup', 'click', 'ニックネーム']);
    });
    $("#btn-login").click(function(){
        _gaq.push(['_trackEvent', 'popup', 'click', 'ログイン']);
    });
    $("#btn-regist").click(function(){
        _gaq.push(['_trackEvent', 'popup', 'click', '新規登録']);
    });
    $("#kuji_guide").click(function(){
        _gaq.push(['_trackEvent', 'popup', 'click', '宝くじについてはこちら']);
    });
    $("form.section-search-web").click(function(){
        _gaq.push(['_trackEvent', 'popup', 'search', 'ウェブ検索']);
    });
    $("form.section-search-goods").click(function(){
        _gaq.push(['_trackEvent', 'popup', 'search', '商品検索']);
    });
    $("form.section-search-service").click(function(){
        _gaq.push(['_trackEvent', 'popup', 'search', 'サービス検索']);
    });
    $("form.section-search-poitto").click(function(){
        _gaq.push(['_trackEvent', 'popup', 'search', '掲示板検索']);
    });
    $("form.section-search-hotel").click(function(){
        _gaq.push(['_trackEvent', 'popup', 'search', '国内ホテル検索']);
    });
    $(".notification-pre-pt a").click(function(){
    	_gaq.push(['_trackEvent', 'notification', 'click', '予定付与ポップアップ']);
    });
}
//popupの表示自体もクリックイベントとして集計
_gaq.push(['_trackEvent', 'popup', 'click', 'popup_open']);

/**
 * 予めlocalStorageにセットされた値を取り出すのではなく、このメソッドが呼ばれる都度
 * cookieを直接漁ればよいように思える。
 * が、chromeのapi（ここではchrome.cookies.get）は基本非同期で動くので、
 * 予め別途セットしておく必要がある。
 * なので、ここではlocalStorageから取り出すだけ。
 */
function getFound(){
    //found設定
    var found = localStorage['found'];
    if(found) return found;
    return application.defaultFound;
};
