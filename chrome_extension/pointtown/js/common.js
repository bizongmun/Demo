//アプリケーション情報
var application = {
         pointtownDomain   : "www.pointtown.com"
//         pointtownDomain   : "st-www.pointtown.com"
//         pointtownDomain   : "rwww.pointtown.com"
//         pointtownDomain   : "localhost:8080"
        ,afDetailPath      : "/ptu/pointpark/service/comment.do"
        ,afRedirectPath    : "/ptu/pointpark/service/detail_rd.do"
        ,itemRedirectPath  : "/ptu/exterior_rd.do"
        ,defaultFound      : "300053"
    }
    //各タブの情報
    //{tabId : Tabオブジェクト}
    ,tabs = {}
    ;

// 通知定数
const noticeClose = 0 //通知しない
    ,noticeOpen = 1 //通知する
    ,noticeNotActive = 0 //未完了
    ,noticeActived = 1 //完了済み
    ;

//log
function log(value, funcName){
    if(!funcName) return;
    if("www.pointtown.com" != application.pointtownDomain){
        if(!funcName) funcName = "no name";
        console.log(getTimeStr() + " : " + funcName + " -> " + value);
    }
}

function getTimeStr(){
    myD = new Date();
    myYear = myD.getFullYear();
    myMonth = myD.getMonth() + 1;
    myDate = myD.getDate();
    myDay = myD.getDay();
    myHours = myD.getHours();
    myMinutes = myD.getMinutes();
    mySeconds = myD.getSeconds();

    myMess1 = myYear + "/" + myMonth + "/" + myDate;
    myMess2 = myHours + ":" + myMinutes + ":" + mySeconds;
    myMess = myMess1 + " " + myMess2;
    return myMess;
}
