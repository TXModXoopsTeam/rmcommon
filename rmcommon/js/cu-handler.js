var cuHandler={ismobile:/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()),loadRemoteDialog:function(launcher){var url=void 0!=$(launcher).attr("href")&&"#"!=$(launcher).attr("href")?$(launcher).attr("href"):$(launcher).data("url"),handler=$(launcher).data("handler"),window_id=$(launcher).data("window-id"),params_retriever=$(launcher).data("retriever"),params_setter=$(launcher).data("parameters");if(void 0!=params_retriever)var params=eval(params_retriever+"(launcher)");else if(void 0!=params_setter)eval("var params = "+params_setter);else var params={CUTOKEN_REQUEST:$("#cu-token").val()};return 0==params?!1:(cuHandler.showLoader(),$.get(url,params,function(response){return cuHandler.retrieveAjax(response)?(void 0==handler&&""!=handler?(cuHandler.closeLoader(),cuDialog.dialog({message:response.content,title:response.message,icon:void 0!=response.icon?response.icon:"",width:void 0!=response.width?response.width:"",id:void 0!=response.windowId?response.windowId:window_id,animate:!1,closeButton:void 0!=response.closeButton?response.closeButton:!0})):(cuHandler.closeLoader(),eval(handler+"(response, launcher);")),$(".cu-data-table").each(function(){cuHandler.createDataTable($(this))}),cuHandler.checkAjaxAction(response),!1):!1},"json"),!1)},submitAjaxForm:function(e){if(!$(e).valid())return!1;cuHandler.showLoader();var a=e.serialize();a+="&CUTOKEN_REQUEST="+$("#cu-token").val();var t=e.attr("action"),o=e.attr("method");return"post"==o?$.post(t,a,cuHandler.retrieveAjax,"json"):$.get(t,a,cuHandler.retrieveAjax,"json"),!1},retrieveAjax:function(e){return"error"==e.type&&(void 0!=e.modal_message?cuDialog.alert({message:e.message}):alert(e.message)),""!=e.token&&$("#cu-token").val(e.token),cuHandler.closeLoader(),cuHandler.checkAjaxAction(e),"error"==e.type?!1:!0},checkAjaxAction:function(data){return void 0!=data.showMessage&&alert(data.message),void 0!=data.closeWindow&&$(data.closeWindow).modal("hide"),void 0!=data.runHandler&&eval(data.runHandler+"(data)"),void 0!=data.goto&&(window.location.href=data.goto),void 0!=data.function&&eval(data.function),void 0!=data.openDialog&&cuDialog.dialog({message:data.content,title:data.message,icon:void 0!=data.icon?data.icon:"",width:void 0!=data.width?data.width:"",owner:void 0!=data.owner?data.owner:"",id:void 0!=data.windowId?data.windowId:"",animate:!1,closeButton:void 0!=data.closeButton?data.closeButton:!0}),void 0!=data.reload?void window.location.reload():void 0},showLoader:function(){$(".cu-window-loader").hide(),$(".cu-window-blocker").hide();var e='<div class="cu-window-blocker"></div>';e+='<div class="cu-window-loader"><div class="loader-container text-center"><button class="close" type="button">&times;</button><span>Operación en progreso...</span></div></div>',$("body").append(e),$(".cu-window-blocker").fadeIn(0,function(){$(".cu-window-loader").fadeIn(1)})},closeLoader:function(e){$(".cu-window-loader").fadeOut(1,function(){$(".cu-window-blocker").fadeOut(0,function(){$(".cu-window-loader").remove(),$(".cu-window-blocker").remove()})})},getURI:function(module,controller,action,zone,params){var url=xoUrl;if(void 0!=cu_modules[module]&&void 0!=controller&&""!=controller)url+="backend"==zone?"/admin":"",url+=cu_modules[module]+"/"+controller+"/"+action+"/";else{if(url+="/modules/"+module,url+="backend"==zone?"/admin":"",""==controller||void 0==controller)return url;url+="/index.php/"+controller+"/"+action+"/"}if(void 0==params)return url;var query="";for(key in params)query+=(""==query?"?":"&")+key+"="+eval("params."+key);return url+query},createDataTable:function(e){if(!e.hasClass("dataTable")){var a=$(e).data("exclude"),t=void 0!=a?a.toString().split(","):"";$(e).dataTable({bProcessing:!0,bServerSide:!0,sAjaxSource:$(e).data("source"),bPaginate:!0})}},runAction:function(e){var action=$(e).data("action");switch(action){case"load-remote-dialog":case"load-module-dialog":cuHandler.loadRemoteDialog(e);break;case"goto":var url=$(e).data("url");void 0==url&&(url=$(e).attr("href"));var retriever=$(e).data("retriever");void 0!=retriever&&(url+=eval(retriever+"(e)")),void 0!=url&&""!=url&&(window.location.href=url);break;default:eval(action+"(e)")}},enableCommands:function(id_activator,type){var commands=$("*[data-activator='"+id_activator+"']"),total=$("#"+id_activator+" :"+type+"[data-switch]:checked").length;$(commands).each(function(index){var required=void 0!=$(this).data("oncount")?$(this).data("oncount"):" >= 1";eval("total "+required)?$(this).enable():$(this).disable()})}};Number.prototype.formatMoney=function(e,a,t){var o=this,e=isNaN(e=Math.abs(e))?2:e,a=void 0==a?".":a,t=void 0==t?",":t,n=0>o?"-":"",r=parseInt(o=Math.abs(+o||0).toFixed(e))+"",i=(i=r.length)>3?i%3:0;return n+(i?r.substr(0,i)+t:"")+r.substr(i).replace(/(\d{3})(?=\d)/g,"$1"+t)+(e?a+Math.abs(o-r).toFixed(e).slice(2):"")},jQuery.fn.enable=function(){this.each(function(){jQuery(this).attr("disabled",!1),jQuery(this).removeClass("disable")})},jQuery.fn.disable=function(){this.each(function(){jQuery(this).attr("disabled",!0),jQuery(this).addClass("disable")})},$(document).ready(function(){var e="";if($("body").on("click","*[data-action]",function(){return cuHandler.runAction($(this)),!1}),$("body").on("submit",".ajax-form",function(){return cuHandler.submitAjaxForm($(this)),!1}),$("body").on("click",".cu-window-loader .close",function(){cuHandler.closeLoader()}),$(".cu-data-table").each(function(){cuHandler.createDataTable($(this))}),$("*[data-rel='tooltip']").tooltip(),$("body").on("change",".activator-container :checkbox[data-switch], .activator-container :radio[data-switch]",function(){var e=$(this).parents(".activator-container").attr("id");cuHandler.enableCommands(e,$(this).attr("type")),$(this).is(":checked")?$(this).parents("tr").addClass("tr-checked"):$(this).parents("tr").removeClass("tr-checked")}),$("body").on("click",".activator-container > tbody > tr > td",function(){var e=$(this).parent().find("input[data-switch]");e.is(":checked")?e.removeAttr("checked"):e.prop("checked","checked"),e.change()}),$("body").on("change",":checkbox[data-checkbox]",function(){var e=$(this).data("checkbox");void 0!=e&&$(":checkbox[data-oncheck='"+e+"']").prop("checked",$(this).prop("checked"))}),$("body").on("change",":checkbox",function(){if(!this.hasAttribute("data-checkbox")&&this.hasAttribute("data-oncheck")){var e=$(":checkbox[data-oncheck='"+$(this).data("oncheck")+"']"),a=$(":checkbox[data-oncheck='"+$(this).data("oncheck")+"']:checked"),t=$(":checkbox[data-checkbox='"+$(this).data("oncheck")+"']");t.length<=0||(a.length<=0?$(t).removeAttr("checked"):a.length>0&&!$(t).is(":checked")&&$(t).prop("checked","checked"))}}),1==$("*[data-news='load']").length||$("*[data-boxes='load']").length>0){var a=$("*[data-news='load']");if(a.length<=0&&(a=$("*[data-boxes='load']")),a.length<=0)return!1;var t=a.data("module"),o=$(a.data("target"));void 0!=o&&o.html('<div class="text-success"><span class="fa fa-spinner fa-spin"></span> '+cuLanguage.downloadNews+"</div>");var n=$("*[data-boxes='load']"),r={module:t,CU_TOKEN:$("#cu-token").val()};$.get(xoUrl+"/modules/rmcommon/ajax/module-info.php",r,function(e){if("error"==e.type)return void o.html('<div class="text-danger"><span class="fa fa-exclamation-triangle"></span> '+cuLanguage.downloadNewsError+"</div>");if(void 0!=e.news&&void 0!=o){for(news=$("<ul>").addClass("cu-ajax-news list-unstyled"),i=0;i<e.news.length;i++){var a="<li><small>"+e.news[i].date+'</small><h5><a href="'+e.news[i].link+'" target="_blank">'+e.news[i].title+"</a></h5>";a+='<p class="help-block">'+e.news[i].content+"</p></li>",news.append(a)}o.html("").append(news),news.fadeIn("fast")}if(void 0!=e.boxes&&void 0!=n)for(i=0;i<e.boxes.length;i++){var t=$("<div>").addClass("cu-box").css("display","none");if(t.append('<div class="box-header"><span class="fa fa-caret-up box-handler"></span><h3>'+e.boxes[i].title+"</h3></div>"),t.append('<div class="box-content">'+e.boxes[i].content+"</div>"),void 0!=e.boxes[i].container){var r=$(e.boxes[i].container);r.length>0&&$(r).each(function(){var a=t.clone();"top"==e.boxes[i].position?$(this).prepend(a):$(this).append(a),a.fadeIn("fast")})}}},"json")}$("body").on("click",".ed-container .full-screen",function(){$(this).parents(".ed-container").addClass("full-screen-edit"),$(this).removeClass("full-screen").addClass("normal-screen"),e=$(this).parents(".ed-container").find(".txtarea-container").attr("style"),$(this).parents(".ed-container").find(".txtarea-container").attr("style",""),$("body").css("overflow","hidden")}),$("body").on("click",".ed-container .normal-screen",function(){$(this).parents(".ed-container").removeClass("full-screen-edit"),$(this).addClass("full-screen").removeClass("normal-screen"),$(this).parents(".ed-container").find(".txtarea-container").attr("style",e),e="",$("body").css("overflow","visible")})});