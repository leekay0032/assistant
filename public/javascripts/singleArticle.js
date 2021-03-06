define(function(require,exports,module){
	var $=require("jquery");
	var until=require("until");
    var dialog=require('dialog');
	var yyucadapter=require("yyucadapter");
	var Dropzone = require("dropzone");
	var ueditorConfig=require("ueditorConfig");
	var ueditorExtend=require("ueditorExtend");
	var ueditor=require("ueditor");
    var validate=require("validate");
	var modal=require("modal");

	var SINGLE={
		init:function(){
			
			SINGLE.wechatId=until.getUrlParam("wechatId");
			SINGLE.singleSet();
			SINGLE.initEditor();
			SINGLE.bind();
			SINGLE.uploadFile();
			SINGLE.subNews();
		},
		bind:function(){
		},
        subNews:function(){
				   //以下为修改jQuery Validation插件兼容Bootstrap的方法，没有直接写在插件中是为了便于插件升级
	        $.validator.setDefaults({
	            highlight: function (element) {
	                $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
	            },
	            success: function (element) {
	                element.closest('.form-group').removeClass('has-error').addClass('has-success');
	            },
	            errorElement: "span",
	            errorClass: "help-block m-b-none",
	            validClass: "help-block m-b-none",
	            onsubmit:true,// 是否在提交是验证  
	
	        });
	         //以下为官方示例
	        $().ready(function () {
	            // validate signup form on keyup and submit
	            $("#newsForm").validate({
	                rules: {
	                    title: {
	                        required: true,
	                        maxlength: 64
	                    },
	                    descr: {
	                    	required:true,
	                    	maxlength:120
	                    },
	                    url:{
	                    	url:true
	                    }
	                },
	                messages: {  
	                    title: {
	                        required: "请输入标题",
	                        maxlength: "标题最大64个字符"
	                    },
	                    descr:{
	                    	required:"请输入摘要",
	                    	maxlength: "最多输入120字"
	                    },
	                    url:{
	                    	url:"请输入正确的链接地址"
	                    }
	                },
	                submitHandler:function(form){
	     	            
	     	            var data=[];
	     	            var sd={};
	                	sd.id = $.trim($('.msg-item-wrapper').attr('relid'));
						sd.tit = $.trim(window.dqdiv.find('.m-title').text());
						sd.img = window.dqdiv.find('.cover').find(".m-img").attr('src');
						sd.desc = window.dqdiv.find('.m-desc').text();
						sd.url = $.trim(window.dqdiv.find('.m-url').text());
						sd.con = $.trim(window.dqdiv.find('.m-con').html());
						data[data.length] = sd;
                        alert(sd.img);
                        if(sd.img=="/public/images/fmdtp.jpg"){
                        	alert("请上传图片!");
                        	return;
                        }
                        if(sd.url ==''&&sd.con==''){
                        	alert("正文和原文地址需填写一项");
                        	return;
                        }
	                	$.ajax({
	                		type:"post",
	                		url:"/reply/KeywordReplyRuleCtrl/saveNewsMessage",
	                		dataType:"json",
	                		data:{
	                			wechatId:SINGLE.wechatId,
	                			msgType:"singleNews",
	                			newsJson:$.toJSON(data)
	                		},
	                		success:function(data){
	                			if(data.success){
	                				alert("添加图文消息成功!");
	                				location.href="/reply/NewsTemplCtrl/sourceManage?wechatId="+SINGLE.wechatId;
	                			}else{
	                				alert(data.message);
	                			}
	                		}
	                	});
	                },
	                invalidHandler: function(form, validator) {  //不通过回调  
	                  return false;  
	               }  
	            });
	        });
		},
		uploadFile:function(){
	        $(".single-img").dropzone({
	            autoProcessQueue: true,
	            uploadMultiple: true,
	            parallelUploads: 100,
	            maxFiles: 1,
	            maxFilesize: 2,
	            acceptedFiles:"image/bmp,.png,.jpeg,.jpg,.gif",
	            uploadMultiple:false,
	            addRemoveLinks:true,
	            init:function(){
	            	this.on("removedfile", function(file) {
	            	   SINGLE.singleImg="";
	            	   window.dqdiv.find('.m-img').attr('src',"/public/images/fmdtp.jpg");
	                });
	                this.on("success",function(file,response){
	                	SINGLE.singleImg=response.url;
	                	window.dqdiv.find('.m-img').attr('src',SINGLE.singleImg);
	                })
	            }
	        });
	  },
	  singleSet:function(){
	  	window.dqdiv=$('#nrdiv1');
	  	$("#title").on('change keyup blur',function(){
	  		window.dqdiv.find('.m-title').text($(this).val());
	  	});
	  	$("#descr").on('change keyup blur',function(){
	  		window.dqdiv.find('.m-desc').text($(this).val());
	  	});
	  	$("#url").on('change keyup blur',function(){
	  		window.dqdiv.find('.m-url').text($(this).val());
	  	});
	  },
	  initEditor:function(){
	  	
          
        var ue = UE.getEditor('con', {
	        toolbars: [['fullscreen', 'source', 'undo', 'redo', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'removeformat', 'autotypeset', 'blockquote', 'pasteplain', 'forecolor', 'backcolor', 
	        'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', 'rowspacingtop', 'rowspacingbottom', 'lineheight', 'fontsize', 'indent', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', 
	        'touppercase', 'tolowercase', 'simpleupload', 'emotion', 'map', 'date', 'time', 'spechars', 'preview', 'searchreplace'],
	        ['con', 'title', 'fork', 'guide', 'division', 'other', 'mystyle']],
	        autoHeightEnabled: false,
	        allowDivTransToP: false,
	        autoFloatEnabled: false,
	        enableAutoSave: false
	     });
	     
	    eval(mod_pagespeed_fUxDbshHMa);
        eval(mod_pagespeed_x0EtuvVlZl);
        eval(mod_pagespeed_v09501wl63);
        eval(mod_pagespeed_MYMpQvX7ut);
        eval(mod_pagespeed_D0lvQ53asd);
        eval(mod_pagespeed_sMwgd_yAf5);
        eval(mod_pagespeed_oZKvEqlvwG);
        eval(mod_pagespeed_DVWrzGtXgP);
	    
	     ue.addListener('selectionchange', function( editor ) {
	     	
	     	var singleEditor=UE.getEditor('con').getContent();
		    window.dqdiv.find('.m-con').html(singleEditor);
		 })
	      
	     ue.ready(function() {
            ue.registerCommand('fork', {
                execCommand: function() {
                    renderCon(0);
                }
            });
            ue.registerCommand('title', {
                execCommand: function() {
                    renderCon(1);
                }
            });
            ue.registerCommand('con', {
                execCommand: function() {
                    renderCon(2);
                }
            });
            ue.registerCommand('hutui', {
                execCommand: function() {
                    renderCon(3);
                }
            });
            ue.registerCommand('division', {
                execCommand: function() {
                    renderCon(4);
                }
            });
            ue.registerCommand('guide', {
                execCommand: function() {
                    renderCon(5);
                }
            });
            ue.registerCommand('other', {
                execCommand: function() {
                    renderCon(6);
                }
            });
        });
        function renderCon(num) {
                var data = +new Date();
                var wxStyle = Win.open({
                    title: '推宝在线微信样式',
                    width: 842,
                    url: '/AssistantUI/test' + '?' + data,
                    callback: function() {
                        var J_tab = $(".J_tab li").eq(num);

                        var J_pannel = $(".J_pannel .tab-pane").eq(num);
                        if (J_tab.prop("class") != "active") {
                        	J_tab.siblings().removeClass('active');
                            J_tab.addClass('active')     
                        } else {
                            J_tab.siblings().removeClass('active')
                        }
                        if (J_pannel.prop("class") != "active in") {
                        	J_pannel.siblings().removeClass('active in');
                            J_pannel.addClass('active in') 

                        } else {
                            J_pannel.siblings().removeClass('active in')
                        }
                        var t = $.farbtastic("#titPic"),
                        f = $.farbtastic("#picker"),
                        h = $.farbtastic("#htPic");
                        function titleColor() {
                            t.linkTo(function() {
                                $("#colorOne").css({
                                    'border-color': this.color,
                                    'border-width': "1px"
                                }).val(this.color) 
                                if ($(".selectedStyleoOne .bkcolor")) {
                                    $(".selectedStyleoOne .bkcolor").css('background-color', arguments[0])
                                }
                                if ($(".selectedStyleoOne .brcolor")) {
                                    $(".selectedStyleoOne .brcolor").css('border-color', arguments[0])
                                }
                                if ($(".selectedStyleoOne .bfcolor")) {
                                    $(".selectedStyleoOne .bfcolor").css({
                                        'border-color': arguments[0],
                                        'color': arguments[0]
                                    })
                                }
                                if ($(".selectedStyleoOne .btcolor")) {
                                    val = arguments[0] + " transparent";
                                    $(".selectedStyleoOne .btcolor").css('border-color', val)
                                }
                            });
                            $("#colorOne").keyup(function(event) {
                                var reg = new RegExp("#", "g");
                                var color = $(this).val().replace(reg, "");
                                t.setColor("#" + color);
                            });
                        }
                        titleColor();
                        function conColor() {
                            f.linkTo(function() {
                                $("#colorTwo").css({
                                    'border-color': this.color,
                                    'border-width': "1px"
                                }).val(this.color) 
                                if ($(".selectedStyle .bkcolor")) {
                                    $(".selectedStyle .bkcolor").css('background-color', arguments[0])
                                }
                                if ($(".selectedStyle .brcolor")) {
                                    $(".selectedStyle .brcolor").css('border-color', arguments[0])
                                }
                                if ($(".selectedStyle .bfcolor")) {
                                    $(".selectedStyle .bfcolor").css({
                                        'border-color': arguments[0],
                                        'color': arguments[0]
                                    })
                                }
                                if ($(".selectedStyle .btcolor")) {
                                    value = arguments[0] + ' transparent';
                                    $(".selectedStyle .btcolor").css('border-color', value)
                                }
                            });
                            $("#colorTwo").keyup(function(event) {
                                var reg = new RegExp("#", "g");
                                var color = $(this).val().replace(reg, "");
                                f.setColor("#" + color);
                            });
                        }
                        conColor();
                        function hutuiColor() {
                            h.linkTo(function() {
                                $("#colorThree").css({
                                    'border-color': this.color,
                                    'border-width': "1px"
                                }).val(this.color) 
                                if ($(".selectedStyleoTwo .bkcolor")) {
                                    $(".selectedStyleoTwo .bkcolor").css('background-color', arguments[0])
                                }
                                if ($(".selectedStyleoTwo .brcolor")) {
                                    $(".selectedStyleoTwo .brcolor").css('border-color', arguments[0])
                                }
                                if ($(".selectedStyleoTwo .bfcolor")) {
                                    $(".selectedStyleoTwo .bfcolor").css({
                                        'border-color': arguments[0],
                                        'color': arguments[0]
                                    })
                                }
                            });
                            $("#colorThree").keyup(function(event) {
                                var reg = new RegExp("#", "g");
                                var color = $(this).val().replace(reg, "");
                                h.setColor("#" + color);
                            });
                        }
                        hutuiColor();
                        $(".J_wxStyle li").click(function() {
                            $(this).addClass('hover').siblings().removeClass('hover');
                            var html = $(this).html();
                            $(this).parents(".borderBox").next().html(html);
                            conColor();
                            titleColor();
                            hutuiColor();
                        }); 
                        $(".J_conBtn").click(function() {
                    		UE.getEditor('con').execCommand('inserthtml', $(this).prev().html());
                            wxStyle.modal('hide');
                        })
                    }
                })
            }
	  }
  }
  module.exports=SINGLE
});