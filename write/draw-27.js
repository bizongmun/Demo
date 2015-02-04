function to_hex(number)
{return number.toString(16).toUpperCase();}
function base36(coord)
{var str=coord.toString(36);if(str.length==1)
str="0"+str;return str;}
function get_position(evt)
{evt=(evt)?evt:((event)?event:null);var left=0;var top=0;if(evt.pageX){left=evt.pageX;top=evt.pageY;}else if(typeof(document.documentElement.scrollLeft)!=undefined){left=evt.clientX+document.documentElement.scrollLeft;top=evt.clientY+document.documentElement.scrollTop;}else{left=evt.clientX+document.body.scrollLeft;top=evt.clientY+document.body.scrollTop;}
return{x:left,y:top};}
function random_colour()
{var colour=new String();for(var i=0;i<3;i++){colour=colour.concat(to_hex(Math.floor(Math.random()*13)));}
colour='#'+colour;return colour;}
function sendit(sendmessage,callback,cgi_override)
{var cgi;if(cgi_override){cgi=cgi_override;}else{cgi=cgiscript;}
if(!this.xmlhttp)
this.xmlhttp=createXmlHttp();if(!this.xmlhttp)
return;if(this.xmlhttp.readyState==1||this.xmlhttp.readyState==2||this.xmlhttp.readyState==3){this.xmlhttp.abort();}
this.xmlhttp.open("POST",cgi,true);var self=this;this.xmlhttp.onreadystatechange=function(){if(self.xmlhttp.readyState==4){if(self.xmlhttp.status==200){callback(self.xmlhttp.responseText);}}}
this.xmlhttp.send(sendmessage);}
function supports_html5_storage(){try{return'localStorage'in window&&window['localStorage']!==null;}catch(e){return false;}}
function value_from_bool(b)
{if(b){return"1";}else{return"0";}}
var drawkanji;function drawkanji_onload()
{var load_input=true;drawkanji=new DrawKanji(load_input);}
function DrawKanji(load_input)
{this.canvas=new DrawCanvas();this.found_kanji=getbyid("found_kanji");this.adjust_canvas_offsets();this.canvas_size=300;var self=this;this.canvas.element.onmouseup=function(event){self.mouseup(event);}
this.canvas.element.onmousedown=function(event){self.mousedown(event);}
this.canvas.element.onmousemove=function(event){self.mousemove(event);}
this.canvas.element.ontouchstart=function(event){self.touch_start(event);}
this.canvas.element.ontouchmove=function(event){self.touch_move(event);}
this.canvas.element.ontouchend=function(event){self.touch_end(event);}
var clear_button=getbyid("drawkanji-clear-button");clear_button.onclick=function(event){self.clearAll();}
var back_button=getbyid("drawkanji-back-line-button");back_button.onclick=function(event){self.backLine();}
if(!iframe){var make_image_button=getbyid("drawkanji-make-image-button");make_image_button.onclick=function(event){self.make_image();}
var send_image=getbyid("drawkanji-send-image-button");send_image.onclick=function(event){self.send_image();}}
window.onresize=function(){self.adjust_canvas_offsets();}
var look_ahead=getbyid("look-ahead");this.look_ahead=look_ahead.checked;look_ahead.onclick=function(event){self.toggle_look_ahead();}
var show_numbers=getbyid("show-numbers");this.show_numbers=show_numbers.checked;show_numbers.onclick=function(event){self.toggle_show_numbers();}
var save_my_input=getbyid("save-my-input");this.save_my_input=save_my_input.checked;save_my_input.onclick=function(event){self.toggle_save_my_input();}
var ignore_stroke_order=getbyid("ignore-stroke-order");this.ignore_stroke_order=ignore_stroke_order.checked;ignore_stroke_order.onclick=function(event){self.toggle_ignore_stroke_order();}
this.colours=new Array();this.clearDrawing();this.has_local_storage=supports_html5_storage();if(load_input){this.load_input();}}
DrawKanji.prototype.load_from_json=function(json,input_id)
{var load=parse_json(json);if(!load){return;}
if(load.status=="error"){return;}
var strokes=load.strokes;if(!strokes){return;}
this.sequence=new Array();for(var s=0;s<strokes.length;s++){var points=new Array();for(var p=0;p<strokes[s].length;p++){var point=new Object();point.x=strokes[s][p][0];point.y=strokes[s][p][1];points.push(point);}
this.sequence.push(points);this.colours.push(random_colour());}
this.stroke_num=strokes.length;this.drawAll();this.reply=load.response;this.show_kanji_list();}
DrawKanji.prototype.request_previous_input=function(input_id)
{var request="L="+input_id;var self=this;sendget(request,function(result){self.load_from_json(result,input_id)});}
DrawKanji.prototype.load_image_from_data=function(data)
{var lines=data.split("\n");for(var i=0;i<lines.length;i++){var line=lines[i];if(line.match(/^\s*$/)){break;}
if(i==0){line=line.replace(/^[A-Za-z]+ /,'');}
var points=line.length/4;for(var j=0;j<points;j++){var x36=line.substr(j*4,2);var y36=line.substr(j*4+2,2);var x=parseInt(x36,36);var y=parseInt(y36,36);this.addPoint(x,y);}
this.finishStroke();}
this.sendStroke();}
DrawKanji.prototype.load_from_storage=function()
{var kanji=localStorage.kanji;if(!kanji){return;}
this.load_image_from_data(kanji);var reply=localStorage.reply;if(reply){this.reply=parse_json(reply);this.show_kanji_list();}
else{this.sendStroke();}}
DrawKanji.prototype.load_input=function()
{if(this.save_my_input){if(this.has_local_storage){this.load_from_storage();}
else{var input_id=get_cookie("server_input_id=");if(input_id&&input_id!="undefined"){this.request_previous_input(input_id);}}}}
DrawKanji.prototype.clearDrawing=function()
{this.clear();clear(this.found_kanji);this.reply=undefined;}
DrawKanji.prototype.clearAll=function()
{if(this.has_local_storage){localStorage.removeItem('kanji');}
else{delete_save_cookie();}
this.clearDrawing();}
DrawKanji.prototype.backLine=function()
{if(this.stroke_num>0){this.sequence.pop();this.stroke_num--;}
if(this.stroke_num>0){this.canvas.clear();this.drawAll();this.sendStroke();}
else{this.clearAll();}}
DrawKanji.prototype.clear=function()
{this.reset_brush();this.sequence=[];this.stroke_num=0;this.canvas.clear();}
DrawKanji.prototype.sendStroke=function()
{if(this.stroke_num==0){return;}
if(this.stroke_num==1){if(this.sequence[0].length==1){return;}
var points_all_same=true;var seq0=this.sequence[0];var x0=seq0[0].x;var y0=seq0[0].y;for(var i=1;i<seq0.length;i++){if(seq0[i].x!=x0||seq0[i].y!=y0){points_all_same=false;break;}
}
if(points_all_same){return;}
}
if(this.stroke_num>50){return;}
var key="H";if(this.ignore_stroke_order){key="h";}
if(this.save_my_input){key+="S";}
if(this.look_ahead){key+="L";}
var r=this.makeMessage(key);var self=this;sendit(r,function(result){self.result_callback(result)});if(this.has_local_storage){localStorage.kanji=r;}}
DrawKanji.prototype.finish_line=function()
{if(this.point_num>1){this.finishStroke();this.sendStroke();}
else{this.sequence[this.stroke_num].length=0;this.reset_brush();}}
DrawKanji.prototype.mouseup=function(event)
{if(this.active){this.mouse_trace(event);this.finish_line();}}
DrawKanji.prototype.mousemove=function(event)
{this.mouse_trace(event);}
DrawKanji.prototype.start_line=function()
{this.active=true;}
DrawKanji.prototype.mousedown=function(event)
{this.start_line();this.mouse_trace(event);if(event.preventDefault){event.preventDefault();}
else{event.returnValue=false;}
return false;}
DrawKanji.prototype.touch_end=function(event)
{if(this.active){this.touch_trace(event);this.finish_line();}
this.touching=false;}
DrawKanji.prototype.touch_move=function(event)
{this.touch_trace(event);}
DrawKanji.prototype.touch_start=function(event)
{this.start_line();this.touching=true;this.touch_trace(event);}
DrawKanji.prototype.reset_brush=function()
{this.active=false;this.point_num=0;}
DrawKanji.prototype.finishStroke=function()
{this.annotate(this.stroke_num);this.stroke_num++;this.reset_brush();}
DrawKanji.prototype.drawAll=function()
{var sq=this.sequence;for(var s=0;s<this.stroke_num;s++){var st=sq[s];this.canvas.start_line(st[0].x,st[0].y,this.colours[s]);this.annotate(s);for(var p=1;p<st.length;p++){this.canvas.draw_line(st[p].x,st[p].y);}}}
DrawKanji.prototype.annotate=function(stroke)
{if(!this.show_numbers){return;}
var offsetlength=15;var x;var y;var xoffset=offsetlength;var yoffset=offsetlength;var str=this.sequence[stroke];var gap=1;x=str[0].x;y=str[0].y;if(str.length>1){if(str.length>5){gap=5;}
var sine=str[gap].x-str[0].x;var cosine=str[gap].y-str[0].y;var length=Math.sqrt(sine*sine+cosine*cosine);if(length>0){sine/=length;cosine/=length;xoffset=-offsetlength*sine;yoffset=-offsetlength*cosine;}}
this.canvas.draw_text(x+xoffset,y+yoffset,stroke+1);}
DrawKanji.prototype.addPoint=function(x,y)
{if(this.point_num==0){this.sequence[this.stroke_num]=new Array;var sq=this.sequence[this.stroke_num];sq[0]={x:x,y:y};this.point_num++;var colour=random_colour();this.colours[this.stroke_num]=colour;this.canvas.start_line(x,y,colour);}
else{var sq=this.sequence[this.stroke_num];var n=this.point_num;var prev=this.point_num-1;if(x!=sq[prev].x||y!=sq[prev].y){sq[n]={x:x,y:y};this.point_num++;this.canvas.draw_line(sq[prev].x,sq[prev].y,x,y);}}}
DrawKanji.prototype.trace=function(pos)
{if(pos.x<2||pos.y<2||pos.x>this.canvas_size-4||pos.y>this.canvas_size-4){this.finish_line();}
else{this.addPoint(Math.round(pos.x),Math.round(pos.y));}
}
DrawKanji.prototype.mouse_trace=function(event)
{if(!this.active){return;}
if(this.touching){return;}
var pos=this.canvas_adjust(get_position(event));this.trace(pos);}
function get_touch_position(event)
{var touchobj=event.changedTouches[0];var x=touchobj.pageX;var y=touchobj.pageY;return{"x":x,"y":y};}
DrawKanji.prototype.touch_trace=function(event)
{if(!this.active){return;}
var orig=get_touch_position(event);var pos=this.canvas_adjust(orig);this.trace(pos);event.preventDefault();}
DrawKanji.prototype.makeMessage=function(c)
{var r=c;r+=" ";for(var i=0;i<this.sequence.length;++i){for(var j=0;j<this.sequence[i].length;++j){r+=base36(this.sequence[i][j].x)
+""+base36(this.sequence[i][j].y);}
r+="\n";}
r+="\n\n";return r;}
DrawKanji.prototype.result_callback=function(reply)
{this.reply=parse_json(reply);if(!this.reply)
return;if(this.save_my_input){if(this.has_local_storage){localStorage.reply=reply;}
else{set_cookie("server_input_id="+this.reply.input_id);}}
this.show_kanji_list();}
DrawKanji.prototype.show_kanji_list=function()
{if(!this.reply||!this.reply.results){return;}
var window_preference=get_window_preference();clear(this.found_kanji);for(var k in this.reply.results){var kanji;kanji=this.reply.results[k];create_link(this.found_kanji,kanji,window_preference);append_text(this.found_kanji," ");}}
DrawKanji.prototype.show_image=function(reply,image_window)
{var parsed_reply=parse_json(reply);var id=parsed_reply.id;var location=ml.drawn_image_url;location+='?';location+='id='+id;image_window.location=location;}
DrawKanji.prototype.colour_string=function()
{var colour_string="";if(this.colours.length>0){for(colour in this.colours){colour_string+=this.colours[colour];}
colour_string=colour_string.replace(/#/g,"");colour_string="#"+colour_string+"\n";}
return colour_string;}
DrawKanji.prototype.image_data=function()
{if(this.stroke_num==0){alert(ml.no_image);throw"No image data available";}
var msg="";msg+=this.colour_string();msg+=this.makeMessage("P");return msg;}
DrawKanji.prototype.make_image=function()
{var msg=this.image_data();var self=this;var image_window=window.open("","kanji_image");sendit(msg,function(reply){self.show_image(reply,image_window);},"make-image.cgi");}
DrawKanji.prototype.send_image=function()
{if(this.stroke_num==0){alert(ml.no_image);throw"No image data available";}
var palette=this.colour_string();var image_data=this.makeMessage("");document.send_image.palette.value=palette;document.send_image.image_data.value=image_data;document.send_image.submit();}
DrawKanji.prototype.toggle_look_ahead=function()
{var look_ahead=getbyid("look-ahead");this.look_ahead=look_ahead.checked;set_cookie(draw_cookie("look-ahead")+
value_from_bool(this.look_ahead));this.sendStroke();}
DrawKanji.prototype.toggle_show_numbers=function()
{var show_numbers=getbyid("show-numbers");this.show_numbers=show_numbers.checked;set_cookie(draw_cookie("show-numbers")+
value_from_bool(this.show_numbers));this.canvas.clear();this.drawAll();}
DrawKanji.prototype.toggle_save_my_input=function()
{var save_my_input=getbyid("save-my-input");this.save_my_input=save_my_input.checked;set_cookie(draw_cookie("save-my-input")+
value_from_bool(this.save_my_input));if(this.save_my_input){this.sendStroke();if(this.reply){set_cookie("server_input_id="+this.reply.input_id);}}
else{delete_save_cookie();}}
DrawKanji.prototype.toggle_ignore_stroke_order=function()
{var ignore_stroke_order=getbyid("ignore-stroke-order");this.ignore_stroke_order=ignore_stroke_order.checked;set_cookie(draw_cookie("ignore-stroke-order")+
value_from_bool(this.ignore_stroke_order));this.sendStroke();}
function get_draw_preference(pref_id)
{//var preference=get_cookie(draw_cookie(pref_id));return preference;
return null;
}
function draw_cookie_set(pref_id)
{var control_cookie_value=get_draw_preference(pref_id);var control=getbyid(pref_id);if(control_cookie_value=="1"){control.checked=true;}
else if(control_cookie_value=="0"){control.checked=false;}}
function delete_save_cookie()
{delete_cookie("server_input_id");}
DrawKanji.prototype.adjust_canvas_offsets=function()
{var offset_left=0;var offset_top=0;for(var o=this.canvas.element;o;o=o.offsetParent){offset_left+=o.offsetLeft;offset_top+=o.offsetTop;}
this.canvas.offset_left=offset_left;this.canvas.offset_top=offset_top;this.canvas.clear();this.drawAll();}
DrawKanji.prototype.canvas_adjust=function(absolute)
{var relative=new Object();relative.x=absolute.x-this.canvas.offset_left;relative.y=absolute.y-this.canvas.offset_top;return relative;}

