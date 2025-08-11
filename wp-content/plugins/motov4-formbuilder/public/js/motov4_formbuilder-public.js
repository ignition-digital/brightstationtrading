(function( $ ) {
	'use strict';
	
	$(".motov4_form_submit").click(function(){
		var $this = $(this);
		var obj = $(this).parents('.motov4_form_render');
		var form_id = $(this).data('form_id');
		obj.find('.motov4_req_field').each(function(){
			if( $(this).val().length == 0 ){
				$(this).addClass('motov4_empty_error');
			}
		});
		var messages = {};
		var m = 0;
		$('.motov4_messages input').each(function () {
			messages[m] = $(this).val();
			m++;
	    });
			
		if( $('.motov4_empty_error').length == 0 ){
			var fieldType;
			var attachments = new FormData();
			var fields = {};
			var label,attach_invalid;
			obj.find('.form-group').each(function(){
				fieldType = $(this).attr('data-fieldtype');
				
				if( fieldType != 'button' && fieldType != 'select' ){
					if( $(this).find('.motov4_label').text() != '' ){
						label = ($(this).find('.motov4_label').text()).replace(' ', '_');
					}else if( ($(this).find('.form-control').attr('placeholder')) != '' ){
						label = ($(this).find('.form-control').attr('placeholder')).replace(' ', '_');
					}
				}
				
				switch( fieldType ){
					case 'text':
						fields[label] = $(this).find('input').val();
					break;
					case 'textarea':
						fields[label] = $(this).find('textarea').val();
					break;
					case 'number':
						fields[label] = $(this).find('input').val();
					break;
					case 'email':
						if( ($(this).find('input').val().length != 0) && motov4validateEmail( $(this).find('input').val() ) == true ){
							fields[label] = $(this).find('input').val();
							fields['user_email'] = $(this).find('input').val();
						}else{
							$(this).find('input').addClass('motov4_empty_error invalid_email');
							motov4_form_alert( messages[4], "error" );
							setTimeout(function(){
								obj.find('input').removeClass('motov4_empty_error invalid_email');
							}, 7000);
						}
					break;
					case 'select':
						fields['Options'] = $(this).find('select').val();
					break;
					case 'radiogroup':
						fields[label] = $(this).find('input').val();
					break;
					case 'checkboxgroup':
						var options = '';
						var i =0;
						$(this).find('input:checked').each(function(){
							options += $(this).val() + ',';
							i++;
						});
						fields[label] = options.slice(0, -1);
					break;
					case 'date':
						fields[label] = $(this).find('input').val();
					break;
					case 'fileupload':
						var input_file = $(this).find('input[type=file]');
							$.each(input_file[0].files, function(i, file) {
								attachments.append('file-'+i, file);
							});
					break;
				}
				
			});
			attachments.append('action', 'motov4_form_submit'); //Ajax Action
			attachments.append('form_id', form_id);
			for ( var key in fields ) {
				attachments.append(key, fields[key]);
			}
			
			
			if(attach_invalid == 'invalid'){
				motov4_form_alert( "The file you tried to attach is invalid.", "error" );
				setTimeout(function(){
					obj.find('.motov4_req_field').removeClass('motov4_empty_error');
				}, 7000);
				return;
			}
			
			if($(".invalid_email").length != 0){
				return false;
			}
			
			$this.next('.motov4_loader_img').css('display','inline-block');
			 jQuery.ajax({
				 url: ajax_object.ajax_url,
				 data: attachments,
				 cache: false,
				 contentType: false,
				 processData: false,
				 method: 'POST',
				 type: 'POST', // For jQuery < 1.9
				 success: function(response){
					console.log(response);
					var res = JSON.parse(response);
					if(typeof(res.success) !== "undefined"){
						$this.next('.motov4_loader_img').hide(2000);
						 obj.find('.form-group').each(function(){
							$(this).find('.form-control').val('');
						});
						motov4_form_alert( messages[0], "success" );
					}else{
						motov4_form_alert( res.error, "error" );
					}
					$this.next('.motov4_loader_img').hide(2000);
				 },
				 error: function(response){
					 motov4_form_alert( messages[1], "error" );
					 console.log(response);
					 $this.next('.motov4_loader_img').hide(2000);
				 }
			 });
			
		}else{
			motov4_form_alert( messages[2], "error" );
			setTimeout(function(){
				obj.find('.motov4_req_field').removeClass('motov4_empty_error motov4_form_error');
			}, 7000);
		}
	});
	
	//Newsletter Submit
	$(".motov4_newsletter_submit").click(function(){
	
		var $this = $(this);
		var responder = $('.responder_data').data('responder');
		var listType = $('.responder_data').data('listtype');
		var listid = $('.responder_data').data('responder_listid');
		var name_field = $('.responder_data').data('name_field');
		var email_field = $('.responder_data').data('email_field');
		var obj = $(this).parents('.motov4_form_render');
		obj.find('.motov4_req_field').each(function(){
			if( $(this).val().length == 0 ){
				$(this).addClass('motov4_empty_error');
			}
		});
		
		var messages = {};
		var m = 0;
		$('.motov4_messages input').each(function () {
			messages[m] = $(this).val();
			m++;
		});
		
		if( $('.motov4_empty_error').length == 0 ){
			var fieldType;
			var fields = {};
			var label;
			//selected name field
			fields['name'] = $('input[name='+name_field+']').val();
			obj.find('.form-group').each(function(){
				fieldType = $(this).attr('data-fieldtype');
				
				if( fieldType != 'button' ){
					if( $(this).find('.motov4_label').text() != '' ){
						label = ($(this).find('.motov4_label').text()).replace(' ', '_');
					}else if( ($(this).find('.form-control').attr('placeholder')) != '' ){
						label = ($(this).find('.form-control').attr('placeholder')).replace(' ', '_');
					}
				}
				
				switch( fieldType ){
					case 'text':
						fields[label] = $(this).find('input').val();
					break;
					case 'email':
						if( motov4validateEmail( $('input[name='+email_field+']').val() ) == true ){
							fields['email'] = $('input[name='+email_field+']').val();
						}else{
							$(this).find('input').addClass('motov4_empty_error invalid_email');
							motov4_form_alert( messages[4], "error" );
							setTimeout(function(){
								obj.find('input').removeClass('motov4_empty_error invalid_email');
							}, 5000);
						}
					break;
					case 'number':
						fields['number'] = $(this).find('input').val();
					break;
					
				}
				
			});
			
			if($(".invalid_email").length != 0){
				return false;
			}
			
			$this.next('.motov4_loader_img').css('display','inline-block');
			 $.ajax({
				 url: ajax_object.ajax_url,
				 data: {
					 action:'motov4_newsletter_submit',
					 responder: responder,
					 listid: listid,
					 listType: listType,
					 fields: fields
				 },
				 type: 'POST',
				 success: function(response){
					 console.log(response);
					 var res = JSON.parse(response);
					 if( res.msg == 'success' ){
						 obj.find('.form-group').each(function(){
							$(this).find('.form-control').val('');
						 });
						motov4_form_alert( messages[0], "success" ); 
					 }else{
						 motov4_form_alert( messages[1], "error" ); 
					 }
					  $this.next('.motov4_loader_img').hide(2000);
				 },
				 error: function(response){
					 motov4_form_alert( messages[1], "error" );
					 console.log(response);
					 $this.next('.motov4_loader_img').hide(2000);
				 }
			 });
		}else{
			motov4_form_alert( messages[2], "error" );
			setTimeout(function(){
				obj.find('.motov4_req_field').removeClass('motov4_empty_error motov4_form_error');
			}, 5000);
		}
	});
	
	//Submit on both Email and Newsletter
	$(".motov4_form_submit_both").click(function(){
		var $this = $(this);
		var obj = $(this).parents('.motov4_form_render');
		var form_id = $(this).data('form_id');
		obj.find('.motov4_req_field').each(function(){
			if( $(this).val().length == 0 ){
				$(this).addClass('motov4_empty_error');
			}
		});
		var messages = {};
		var m = 0;
		$('.motov4_messages input').each(function () {
			messages[m] = $(this).val();
			m++;
	    });
			
		if( $('.motov4_empty_error').length == 0 ){
			var fieldType;
			var attachments = new FormData();
			var fields = {};
			var label,attach_invalid;
			obj.find('.form-group').each(function(){
				fieldType = $(this).attr('data-fieldtype');
				
				if( fieldType != 'button' ){
					if( $(this).find('.motov4_label').text() != '' ){
						label = ($(this).find('.motov4_label').text()).replace(' ', '_');
					}else if( ($(this).find('.form-control').attr('placeholder')) != '' ){
						label = ($(this).find('.form-control').attr('placeholder')).replace(' ', '_');
					}
				}
				
				switch( fieldType ){
					case 'text':
						fields[label] = $(this).find('input').val();
					break;
					case 'textarea':
						fields[label] = $(this).find('textarea').val();
					break;
					case 'number':
						fields[label] = $(this).find('input').val();
					break;
					case 'email':
						if( ($(this).find('input').val().length != 0) && motov4validateEmail( $(this).find('input').val() ) == true ){
							fields[label] = $(this).find('input').val();
							fields['user_email'] = $(this).find('input').val();
						}else{
							$(this).find('input').addClass('motov4_empty_error invalid_email');
							motov4_form_alert( messages[4], "error" );
							setTimeout(function(){
								obj.find('input').removeClass('motov4_empty_error invalid_email');
							}, 7000);
						}
					break;
					case 'select':
						fields[label] = $(this).find('select').val();
					break;
					case 'radiogroup':
						fields[label] = $(this).find('input').val();
					break;
					case 'checkboxgroup':
						var options = '';
						var i =0;
						$(this).find('input:checked').each(function(){
							options += $(this).val() + ',';
							i++;
						});
						fields[label] = options.slice(0, -1);
					break;
					case 'date':
						fields[label] = $(this).find('input').val();
					break;
					case 'fileupload':
						var input_file = $(this).find('input[type=file]');
							$.each(input_file[0].files, function(i, file) {
								attachments.append('file-'+i, file);
							});
					break;
				}
				
			});
			
			attachments.append('action', 'motov4_form_submit'); //Ajax Action
			attachments.append('form_id', form_id);
			for ( var key in fields ) {
				attachments.append(key, fields[key]);
			}
			
			
			if(attach_invalid == 'invalid'){
				motov4_form_alert( "The file you tried to attach is invalid.", "error" );
				setTimeout(function(){
					obj.find('.motov4_req_field').removeClass('motov4_empty_error');
				}, 7000);
				return;
			}
			
			if($(".invalid_email").length != 0){
				return false;
			}
			
			$this.next('.motov4_loader_img').css('display','inline-block');
			 jQuery.ajax({
				 url: ajax_object.ajax_url,
				 data: attachments,
				 cache: false,
				 contentType: false,
				 processData: false,
				 method: 'POST',
				 type: 'POST', // For jQuery < 1.9
				 success: function(response){
					 var response = Object.keys(JSON.parse(response));
					 if( response == 'success' ){
						motov4_form_alert( messages[0], "success" );
						var responder = $('.responder_data').data('responder');
						var listid = $('.responder_data').data('responder_listid');
						var name_field = $('.responder_data').data('name_field');
						var email_field = $('.responder_data').data('email_field');
						var obj = $this.parents('.motov4_form_render');
						if( $('.motov4_empty_error').length == 0 ){
							var fieldType;
							var fields = {};
							var label;
							//selected name field
							fields['name'] = $('input[name='+name_field+']').val();
							obj.find('.form-group').each(function(){
								fieldType = $(this).attr('data-fieldtype');
								if( fieldType != 'button' ){
									if( $(this).find('.motov4_label').text() != '' ){
										label = ($(this).find('.motov4_label').text()).replace(' ', '_');
									}else if( ($(this).find('.form-control').attr('placeholder')) != '' ){
										label = ($(this).find('.form-control').attr('placeholder')).replace(' ', '_');
									}
								}
								switch( fieldType ){
									case 'text':
										fields[label] = $(this).find('input').val();
									break;
									case 'email':
										if( motov4validateEmail( $('input[name='+email_field+']').val() ) == true ){
											fields['email'] = $('input[name='+email_field+']').val();
										}else{
											$(this).find('input').addClass('motov4_empty_error invalid_email');
											motov4_form_alert( messages[4], "error" );
											setTimeout(function(){
												obj.find('input').removeClass('motov4_empty_error invalid_email');
											}, 7000);
										}
									break;
								}
								
							});
							
							 $.ajax({
								 url: ajax_object.ajax_url,
								 data: {
									 action:'motov4_newsletter_submit',
									 responder: responder,
									 listid: listid,
									 fields: fields
								 },
								 type: 'POST',
								 success: function(response){
									 console.log(response);
									 obj.find('.form-group').each(function(){
										$(this).find('.form-control').val('');
									});
									motov4_form_alert( messages[0], "success" );
								 },
								 error: function(response){
									 motov4_form_alert( messages[1], "error" );
									 console.log(response);
								 }
							 });
						}else{
							motov4_form_alert( messages[2], "error" );
							setTimeout(function(){
								obj.find('.motov4_req_field').removeClass('motov4_empty_error motov4_form_error');
							}, 7000);
						}
					 }
					 $this.next('.motov4_loader_img').hide(2000);
				 }
			 });
			
		}else{
			motov4_form_alert( messages[2], "error" );
			setTimeout(function(){
				obj.find('.motov4_req_field').removeClass('motov4_empty_error motov4_form_error');
			}, 7000);
		}
	});
	
		/* jQuery Validate Emails with Regex */
		function motov4validateEmail(Email) {
			var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
			return $.trim(Email).match(pattern) ? true : false;
		}
		
		 //Leadpress Form Alerts Function
		 function motov4_form_alert( msg, msg_type ){
			$(".um_alert_wrapper").addClass('alert_open um_'+msg_type+'');
			$(".um_alert_wrapper .um_alert_inner").children("p").text(msg);
			setTimeout(function(){
			  $(".um_alert_wrapper").removeClass('alert_open '+msg_type+'');
			}, 5000);
		}
	
})( jQuery );