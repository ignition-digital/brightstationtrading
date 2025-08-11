/*--------------------- Copyright (c) 2019 -----------------------
[Master Javascript]

Project: MOTO Theme V4
Version: 1.0.0
-------------------------------------------------------------------*/
(function($) {
    "use strict";
	
		var motov4 = {
		initialised: false,
		version: 1.0,
		mobile: false,
		init: function () {

			if(!this.initialised) {
				this.initialised = true;
			} else {
				return;
			}

			/*-------------- Functions Calling ---------------------------------------------------
			------------------------------------------------------------------------------------------------*/
			this.RTL();
			this.CookieBar();
			this.NavMenu();
			this.SearchBox();	
			this.newsletterWidget();			
		},
		
		/*-------------- Functions definition ---------------------------------------------------
		---------------------------------------------------------------------------------------------------*/
		RTL: function () {
			// On Right-to-left(RTL) add class 
			var rtl_attr = $("html").attr('dir');
			if(rtl_attr){
				$('html').find('body').addClass("rtl");	
			}		
		},
		
		CookieBar: function () {
			$('.motov4_cookie_bar_close').on('click', function(){
				$('.motov4_cookie_bar').hide();
			});
		},
		NavMenu: function () {
			$('.motov4_nav_toggle').on('click', function(){
				$('body').toggleClass('nav_open');
			});
						
				//Toggle Header Start
				$('.motov4_toggle_box').on('click',function(){
					$('body').toggleClass('motov4_menu_open');
				});
				$('.motov4_menu_close').on('click',function(){
					$('body').removeClass('motov4_menu_open'); 
				});
				
				// Close Header On click
				if($('.motov4_toggle_box').length != ''){
					$(document).on('click',function(event){
						var target = $(event.target).attr('class');
						//console.log(target);
						if( target != 'motov4_logo_box' && target != 'motov4-mega-menu' && target != 'motov4-mega-menu-ul' && target != 'motov4_toggle_box' && target != 'motov4_menu_box' && target != 'menu_dropdown category_open' && target != 'menu_dropdown' && target != 'motov4_social' && target != 'motov4_menu_wrapper' && target != 'motov4-menu' && !$(event.target).is( "a" ) && !$(event.target).is( "input" ) ){
							$('body').removeClass('motov4_menu_open');
							$('.motov4-mega-menu-ul').hide();
							$('.motov4_menu ul > li:has(ul) > a,.motov4_nav ul > li:has(ul) > a').removeClass('category_open');
						}
					});
				}
								
				//Header Dropdown
				$('.motov4_menu ul > li:has(ul) > a,.motov4_nav ul > li:has(ul) > a').addClass('menu_dropdown');
				$(".motov4_menu ul > li:has(ul) > a,.motov4_nav ul > li:has(ul) > a").on('click', function(e) {
					$(this).toggleClass('category_open');
					e.preventDefault();
					$(this).parent('.motov4_menu ul li,.motov4_nav ul li').children('ul.sub-menu,ul.motov4-mega-menu-ul').slideToggle(300); 
				});
			
		},
		SearchBox: function () {
			$('.motov4_search_link').on('click', function(){
				
				$('body').addClass('open_search');
				$("body").keypress(function(){
					$('#motov4_search_id').focus();	
				});
			});
			
			$(document).keyup(function(e) {
				if (e.keyCode == 27) { 
					$('body').removeClass('open_search');
					$('#motov4_search_id').val('');
				}
			});
			
			$('.motov4_search_close').on('click', function(){
				$('body').removeClass('open_search');
				$('#motov4_search_id').val('');
			});
			
			$(document).keyup(function(e) {
				if (e.keyCode == 27) { 
					$('body').removeClass('open_search');
					$('#motov4_search_id').val('');
				}
			});
			
		},
				
		/*-------------- Functions definition ---------------------------------------------------
		---------------------------------------------------------------------------------------------------*/
		newsletterWidget: function(){
			$(".newsletter_widget_submit").click(function(){
				var $this = $(this);
				var getInfo = $this.parent(".newsletter_form").attr("data-mail-info");
				var info = jQuery.parseJSON(getInfo);
				var email = $this.prev("input").val();
				$this.next('.motov4_loader_img').css('display','inline-block');
				if( email.length != '' ) {
					if(motov4ValidateNewsletterEmail(email) == false){
						$this.next('.motov4_loader_img').hide(2000);
						motov4_newsletter_alert( "Please provide a valid email address.", "error" );
						return;
					}
					
					var obj = $(this);
			
					var data = { 'action' : 'motov4_autoresponder_subscribe', 'email' : email, 'name' : '', 'responder' : info['fd'], 'listid' : info['bvc'] };
					$.ajax({
						'url' : motov4.ajax_url,
						'data' : data,
						'type' : 'post',
						'success' : function( res ){
							var result = jQuery.parseJSON(res);
							$this.next('.motov4_loader_img').hide(2000);
							 if(result.success){
								 motov4_newsletter_alert( info['msg'], "success" );
							 }else{
								 motov4_newsletter_alert( "Something is wrong, please contact to administration.", "error" );
							 }
							
						}
					});
				}else{
					$this.next('.motov4_loader_img').hide(2000);
					motov4_newsletter_alert( "Please enter an email, you can't keep it empty.", "error" );
				}
			});
		},
	};
	motov4.init();
	
    $(document).ready(function() {
		if ($("body").hasClass("rtl")) {
			var rtl = true;
		}else{ var rtl = false; }
		//Slider
		//news autoplay 
		$('.motov4_news_slider').slick({
            autoplay:true,
			rtl: rtl,
            autoplaySpeed:2000,
            arrows:false,
            centerMode:true,
            slidesToShow:1,
            slidesToScroll:1
        });
		
		$('.motov4_testimonial_slide').slick({
		   slidesToShow: 1,
		   rtl: rtl,
		   slidesToScroll: 1,
		   arrows: true,
		   fade: false,
		   infinite: 0
		 });
		
		if($(".motov4_team_slider").length != ''){
			$(".motov4_team_slider").each(function(){
				var team_data = $(this).prev(".team_slider_data").attr("data-team_slider_data");
				team_data = jQuery.parseJSON(team_data);
				var auto = team_data['autoplay'] == 'on' ? true : false;
				var dots = team_data['dots'] == 'true' ? true : false;
				var arrow = team_data['arrow'] == 'true' ? true : false;
				$(this).slick({
					rtl: rtl,
					slidesToShow: parseInt(team_data['columns']),
					slidesToScroll: parseInt(team_data['scrollto']),
					dots: dots,
					arrows: arrow,
					autoplay: auto,
					autoplaySpeed: parseInt(team_data['speed']),
					responsive: [
					{
					  breakpoint: 1024,
					  settings: {
						slidesToShow: 3,
					  }
					},
					
					{
					  breakpoint:992,
					  settings: {
						slidesToShow:2,
					  }
					},
					
					{
					  breakpoint: 767,
					  settings: {
						slidesToShow:1, 
					  }
					}
				  ]
				});
			});
		}
		
		/****** Testimonial Slider 1 *******/
		if($(".motov4_slider_style1").length != ''){
			$(".motov4_slider_style1").each(function(){
				var testi_data = $(this).find(".testi_slider_data").val();
				testi_data = jQuery.parseJSON(testi_data);
				var auto = testi_data['autoplay'] == 'on' ? true : false;
				var dots = testi_data['dots'] == 'true' ? true : false;
				var arrows = testi_data['arrows'] == 'true' ? true : false;
				$(this).find(".slick_crousel").slick({
					rtl: rtl,
					slidesToShow: parseInt(testi_data['columns']),
					slidesToScroll: parseInt(testi_data['scrollto']),
					dots: dots,
					autoplay: auto,
					autoplaySpeed: parseInt(testi_data['speed']),
					infinite: true,
					arrows:arrows,
					nextArrow: '<span class="motov4_next_arrow"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></span>',
					prevArrow: '<span class="motov4_prev_arrow"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></span></i>'
				});
			});
		}
		
		/****** Testimonial Slider 2 *******/
		if($(".motov4_slider_style2").length != ''){
			$(".motov4_slider_style2").each(function(){
				var testi_data = $(this).find(".testi_slider_data").val();
				testi_data = jQuery.parseJSON(testi_data);
				var auto = testi_data['autoplay'] == 'on' ? true : false;
				var dots = testi_data['dots'] == 'true' ? true : false;
				var arrows = testi_data['arrows'] == 'true' ? true : false;
				$(this).find(".slick_crousel").slick({
					rtl: rtl,
					slidesToShow: parseInt(testi_data['columns']),
					slidesToScroll: parseInt(testi_data['scrollto']),
					dots: dots,
					autoplay: auto,
					autoplaySpeed: parseInt(testi_data['speed']),
					infinite: true,
					arrows:arrows
				});
			});
		}
	   
	   /****** Testimonial Slider 3 *******/
	   if($(".motov4_slider_style3").length != ''){
			$(".motov4_slider_style3").each(function(){
				var testi_data = $(this).find(".testi_slider_data").val();
				testi_data = jQuery.parseJSON(testi_data);
				var auto = testi_data['autoplay'] == 'on' ? true : false;
				var dots = testi_data['dots'] == 'true' ? true : false;
				var arrows = testi_data['arrows'] == 'true' ? true : false;
				$(this).find(".slick_crousel").slick({
					rtl: rtl,
					slidesToShow: parseInt(testi_data['columns']),
					slidesToScroll: parseInt(testi_data['scrollto']),
					dots: dots,
					autoplay: auto,
					autoplaySpeed: parseInt(testi_data['speed']),
					infinite: true,
					arrows:arrows,
					nextArrow:'<div class="motov4_next_arrow"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="8px" height="10px"> <path fill-rule="evenodd"  fill="rgb(34, 34, 34)"d="M7.888,4.798 L0.405,0.031 C0.325,-0.019 0.223,-0.024 0.138,0.016 C0.053,0.058 -0.000,0.139 -0.000,0.227 L-0.000,9.762 C-0.000,9.850 0.053,9.932 0.138,9.973 C0.176,9.991 0.217,10.000 0.258,10.000 C0.309,10.000 0.360,9.986 0.405,9.958 L7.888,5.191 C7.958,5.146 8.000,5.073 8.000,4.995 C8.000,4.916 7.958,4.843 7.888,4.798 ZM0.516,9.308 L0.516,0.681 L7.287,4.995 L0.516,9.308 Z"/></svg></div>',
					prevArrow:'<div class="motov4_prev_arrow"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="8px" height="10px"> <path fill-rule="evenodd"  fill="rgb(34, 34, 34)"d="M0.111,4.798 L7.595,0.031 C7.675,-0.019 7.777,-0.024 7.862,0.016 C7.947,0.058 8.000,0.139 8.000,0.227 L8.000,9.762 C8.000,9.850 7.947,9.932 7.862,9.973 C7.824,9.991 7.783,10.000 7.742,10.000 C7.690,10.000 7.639,9.986 7.595,9.958 L0.111,5.191 C0.041,5.146 -0.000,5.073 -0.000,4.995 C-0.000,4.916 0.042,4.843 0.111,4.798 ZM7.484,9.308 L7.484,0.681 L0.712,4.995 L7.484,9.308 Z"/></svg></div>',
				});
			});
		}

		/****** Testimonial Slider 4 *******/
	   if($(".motov4_slider_style4").length != ''){
			$(".motov4_slider_style4").each(function(){
				var testi_data = $(this).find(".testi_slider_data").val();
				testi_data = jQuery.parseJSON(testi_data);
				var auto = testi_data['autoplay'] == 'on' ? true : false;
				var dots = testi_data['dots'] == 'true' ? true : false;
				var arrows = testi_data['arrows'] == 'true' ? true : false;
				$(this).find(".slick_crousel").slick({
					rtl: rtl,
					slidesToShow: parseInt(testi_data['columns']),
					slidesToScroll: parseInt(testi_data['scrollto']),
					dots: dots,
					autoplay: auto,
					autoplaySpeed: parseInt(testi_data['speed']),
					infinite: true,
					arrows:arrows
				});
			});
		}	
		
		/****** Testimonial Slider 5 *******/
	   if($(".motov4_slider_style5").length != ''){
			$(".motov4_slider_style5").each(function(){
				var testi_data = $(this).find(".testi_slider_data").val();
				testi_data = jQuery.parseJSON(testi_data);
				var auto = testi_data['autoplay'] == 'on' ? true : false;
				var dots = testi_data['dots'] == 'true' ? true : false;
				var arrows = testi_data['arrows'] == 'true' ? true : false;
				$(this).find(".slick_crousel").slick({
					rtl: rtl,
					centerMode: true,
					slidesToShow: 3,
					centerPadding: '10px',
					dots: dots,
					autoplay: auto,
					autoplaySpeed: parseInt(testi_data['speed']),
					infinite: true,
					loop:true,
					arrows:true,
					prevArrow:'<div class="motov4_next_arrow"><svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink"width="13px" height="26px"><path fill-rule="evenodd"  fill="rgb(184, 184, 184)"d="M13.000,0.000 L0.001,13.000 L13.000,25.999 L7.747,13.179 L13.000,0.000 Z"/></svg></div>',
					nextArrow:'<div class="motov4_prev_arrow"><svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink"width="13px" height="26px"><path fill-rule="evenodd"  fill="rgb(184, 184, 184)"d="M-0.000,25.999 L12.999,13.000 L-0.000,0.000 L5.252,12.820 L-0.000,25.999 Z"/></svg></div>',
					responsive: [{
						breakpoint: 992,
						settings: {
							arrows: true,
							centerMode: true,
							centerPadding: '10px',
							slidesToShow: 3
						}
					},
					{
						breakpoint: 768,
						settings: {
							arrows: true,
							centerMode: true,
							centerPadding: '10px',
							slidesToShow: 1
						}
					},
					{
						breakpoint: 480,
						settings: {
							arrows: true,
							centerMode: true,
							centerPadding: '10px',
							slidesToShow: 1
						}
					}

				]
				});
				$('.content_1').show();
				$('.motov4_slider_style5 .slick_crousel').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
					$('.slick_cls').hide();
					$('.content_' + (parseInt(nextSlide) + 1)).show();
				});
			});
		}
		
	   /****** Testimonial Slider 6 *******/
	   if($(".motov4_slider_style6").length != ''){
		  $(".motov4_slider_style6").each(function(){
				var testi_data = $(this).find(".testi_slider_data").val();
				testi_data = jQuery.parseJSON(testi_data);
				var auto = testi_data['autoplay'] == 'on' ? true : false;
				var dots = testi_data['dots'] == 'true' ? true : false;
				var arrows = testi_data['arrows'] == 'true' ? true : false;
				$(this).find(".slick_crousel").slick({
					rtl: rtl,
					slidesToShow: parseInt(testi_data['columns']),
					slidesToScroll: parseInt(testi_data['scrollto']),
					dots: dots,
					autoplay: auto,
					autoplaySpeed: parseInt(testi_data['speed']),
					infinite: true,
					arrows:arrows,
					nextArrow:'<div class="motov4_next_arrow"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="22px" height="29px"> <path fill-rule="evenodd"  fill="#707070" d="M21.693,13.929 L1.113,0.117 C0.895,-0.029 0.612,-0.045 0.380,0.074 C0.146,0.193 -0.000,0.428 -0.000,0.685 L-0.000,28.310 C-0.000,28.567 0.146,28.802 0.380,28.922 C0.483,28.974 0.597,29.001 0.710,29.001 C0.851,29.001 0.991,28.959 1.113,28.878 L21.693,15.066 C21.886,14.937 22.000,14.725 22.000,14.497 C22.000,14.270 21.885,14.058 21.693,13.929 ZM1.419,26.995 L1.419,2.001 L20.040,14.498 L1.419,26.995 Z"/></svg></div>',   
					prevArrow:'<div class="motov4_prev_arrow"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="22px" height="29px"> <path fill-rule="evenodd"  fill="#707070"d="M0.307,13.929 L20.887,0.117 C21.105,-0.029 21.387,-0.045 21.620,0.074 C21.854,0.193 22.000,0.428 22.000,0.685 L22.000,28.310 C22.000,28.567 21.854,28.802 21.620,28.922 C21.517,28.974 21.403,29.001 21.290,29.001 C21.149,29.001 21.009,28.959 20.887,28.878 L0.307,15.066 C0.114,14.937 -0.000,14.725 -0.000,14.497 C-0.000,14.270 0.115,14.058 0.307,13.929 ZM20.581,26.995 L20.581,2.001 L1.959,14.498 L20.581,26.995 Z"/></svg></div>',
				});
			});
	   }
	   
	   /****** Testimonial Slider 7 *******/
	   if($(".motov4_slider_style7").length != ''){
		  $(".motov4_slider_style7").each(function(){
				var testi_data = $(this).find(".testi_slider_data").val();
				testi_data = jQuery.parseJSON(testi_data);
				var auto = testi_data['autoplay'] == 'on' ? true : false;
				var dots = testi_data['dots'] == 'true' ? true : false;
				var arrows = testi_data['arrows'] == 'true' ? true : false;
				$(this).find(".slick_crousel").slick({
					rtl: rtl,
					slidesToShow: parseInt(testi_data['columns']),
					slidesToScroll: parseInt(testi_data['scrollto']),
					dots: dots,
					autoplay: auto,
					autoplaySpeed: parseInt(testi_data['speed']),
					infinite: true,
					arrows:arrows,
					nextArrow: '<span class="motov4_next_arrow"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></span>',
					prevArrow: '<span class="motov4_prev_arrow"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></span></i>'
				});
			});
	   }
			
		/****** Testimonial Slider 8 *******/
	   if($(".motov4_slider_style8").length != ''){
		  $(".motov4_slider_style8").each(function(){
				var testi_data = $(this).find(".testi_slider_data").val();
				testi_data = jQuery.parseJSON(testi_data);
				var auto = testi_data['autoplay'] == 'on' ? true : false;
				var dots = testi_data['dots'] == 'true' ? true : false;
				var arrows = testi_data['arrows'] == 'true' ? true : false;
				$(this).find(".slick_crousel").slick({
					rtl: rtl,
					slidesToShow: parseInt(testi_data['columns']),
					slidesToScroll: parseInt(testi_data['scrollto']),
					dots: dots,
					autoplay: auto,
					autoplaySpeed: parseInt(testi_data['speed']),
					infinite: true,
					arrows:arrows,
					nextArrow: '<span class="motov4_next_arrow"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></span>',
					prevArrow: '<span class="motov4_prev_arrow"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></span></i>'
				});
			});
	   }

		/****** Testimonial Slider 9 *******/
	   if($(".motov4_slider_style9").length != ''){
		   $(".motov4_slider_style9").each(function(){
				var testi_data = $(this).find(".testi_slider_data").val();
				testi_data = jQuery.parseJSON(testi_data);
				var auto = testi_data['autoplay'] == 'on' ? true : false;
				var dots = testi_data['dots'] == 'true' ? true : false;
				var arrows = testi_data['arrows'] == 'true' ? true : false;
				$(this).find(".slick_crousel").slick({
					rtl: rtl,
					slidesToShow: parseInt(testi_data['columns']),
					slidesToScroll: parseInt(testi_data['scrollto']),
					dots: dots,
					autoplay: auto,
					autoplaySpeed: parseInt(testi_data['speed']),
					infinite: true,
					fade: true,
					arrows:arrows,
					nextArrow:'<div class="motov4_next_arrow"><svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink" width="13px" height="18px"> <path fill-rule="evenodd"  fill="rgb(53, 67, 89)"d="M12.819,8.646 L0.658,0.072 C0.529,-0.018 0.362,-0.028 0.224,0.046 C0.086,0.120 -0.000,0.266 -0.000,0.425 L-0.000,17.572 C-0.000,17.731 0.086,17.877 0.224,17.951 C0.285,17.984 0.353,18.000 0.419,18.000 C0.503,18.000 0.586,17.975 0.658,17.925 L12.819,9.351 C12.932,9.271 13.000,9.140 13.000,8.998 C13.000,8.857 12.932,8.726 12.819,8.646 ZM0.839,16.756 L0.839,1.242 L11.842,8.999 L0.839,16.756 Z"/></svg></div>',
					prevArrow:'<div class="motov4_prev_arrow"><svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink"width="13px" height="18px"><path fill-rule="evenodd"  fill="rgb(53, 67, 89)"d="M0.181,8.646 L12.342,0.072 C12.471,-0.018 12.638,-0.028 12.776,0.046 C12.914,0.120 13.000,0.266 13.000,0.425 L13.000,17.572 C13.000,17.731 12.914,17.877 12.776,17.951 C12.714,17.984 12.647,18.000 12.581,18.000 C12.497,18.000 12.414,17.975 12.342,17.925 L0.181,9.351 C0.067,9.271 -0.000,9.140 -0.000,8.998 C-0.000,8.857 0.068,8.726 0.181,8.646 ZM12.161,16.756 L12.161,1.242 L1.158,8.999 L12.161,16.756 Z"/></svg></div>',
				});
			});
	   }
	   
	   /****** Testimonial Slider 10 *******/
	   if($(".motov4_slider_style10").length != ''){
		   $(".motov4_slider_style10").each(function(){
				var testi_data = $(this).find(".testi_slider_data").val();
				testi_data = jQuery.parseJSON(testi_data);
				var auto = testi_data['autoplay'] == 'on' ? true : false;
				var dots = testi_data['dots'] == 'true' ? true : false;
				var arrows = testi_data['arrows'] == 'true' ? true : false;
				$(this).find(".slick_crousel").slick({
					rtl: rtl,
					slidesToShow: parseInt(testi_data['columns']),
					slidesToScroll: parseInt(testi_data['scrollto']),
					dots: dots,
					autoplay: auto,
					autoplaySpeed: parseInt(testi_data['speed']),
					infinite: true,
					arrows:arrows
				});
			});
	   }
	   
	   /****** Testimonial Slider 11 *******/
	   if($(".motov4_slider_style11").length != ''){
		   $(".motov4_slider_style11").each(function(){
				var testi_data = $(this).find(".testi_slider_data").val();
				testi_data = jQuery.parseJSON(testi_data);
				var auto = testi_data['autoplay'] == 'on' ? true : false;
				var dots = testi_data['dots'] == 'true' ? true : false;
				var arrows = testi_data['arrows'] == 'true' ? true : false;
				$(this).find(".slick_crousel").slick({
					rtl: rtl,
					slidesToShow: parseInt(testi_data['columns']),
					slidesToScroll: parseInt(testi_data['scrollto']),
					dots: dots,
					autoplay: auto,
					autoplaySpeed: parseInt(testi_data['speed']),
					infinite: true,
					arrows:arrows
				});
			});
	   }
	   
	   /****** Testimonial Slider 12 *******/
	   if($(".motov4_slider_style12").length != ''){
		   $(".motov4_slider_style12").each(function(){
				var testi_data = $(this).find(".testi_slider_data").val();
				testi_data = jQuery.parseJSON(testi_data);
				var auto = testi_data['autoplay'] == 'on' ? true : false;
				var dots = testi_data['dots'] == 'true' ? true : false;
				var arrows = testi_data['arrows'] == 'true' ? true : false;
				$(this).find(".slick_crousel").slick({
					rtl: rtl,
					slidesToShow: parseInt(testi_data['columns']),
					slidesToScroll: parseInt(testi_data['scrollto']),
					dots: dots,
					autoplay: auto,
					autoplaySpeed: parseInt(testi_data['speed']),
					infinite: true,
					arrows:arrows,
					nextArrow: '<span class="motov4_next_arrow"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></span>',
					prevArrow: '<span class="motov4_prev_arrow"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></span></i>'
				});
			});
	   }
	   
	   /****** Testimonial Slider 13 *******/
	   if($(".motov4_slider_style13").length != ''){
		   $(".motov4_slider_style13").each(function(){
				var testi_data = $(this).find(".testi_slider_data").val();
				testi_data = jQuery.parseJSON(testi_data);
				var auto = testi_data['autoplay'] == 'on' ? true : false;
				var dots = testi_data['dots'] == 'true' ? true : false;
				var arrows = testi_data['arrows'] == 'true' ? true : false;
				$(this).find(".slick_crousel").slick({
					rtl: rtl,
					slidesToShow: parseInt(testi_data['columns']),
					slidesToScroll: parseInt(testi_data['scrollto']),
					dots: dots,
					autoplay: auto,
					autoplaySpeed: parseInt(testi_data['speed']),
					infinite: true,
					fade: true,
					arrows:arrows,
					nextArrow: '<span class="motov4_next_arrow"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></span>',
					prevArrow: '<span class="motov4_prev_arrow"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></span></i>'
				});
			});
	   }
	   
	   /****** Testimonial Slider 14 *******/
	   if($(".motov4_slider_style14").length != ''){
		   $(".motov4_slider_style14").each(function(){
				var testi_data = $(this).find(".testi_slider_data").val();
				testi_data = jQuery.parseJSON(testi_data);
				var auto = testi_data['autoplay'] == 'on' ? true : false;
				var dots = testi_data['dots'] == 'true' ? true : false;
				var arrows = testi_data['arrows'] == 'true' ? true : false;
				$(this).find(".slick_crousel").slick({
					rtl: rtl,
					slidesToShow: parseInt(testi_data['columns']),
					slidesToScroll: parseInt(testi_data['scrollto']),
					dots: dots,
					autoplay: auto,
					autoplaySpeed: parseInt(testi_data['speed']),
					infinite: true,
					arrows:arrows,
					prevArrow: '<span class="motov4_next_arrow"><i class="fa fa-caret-left" aria-hidden="true"></i></span>',
					nextArrow: '<span class="motov4_prev_arrow"><i class="fa fa-caret-right" aria-hidden="true"></i></span></i>'
				});
			});
	   }
	   
	   /****** Testimonial Slider 15 *******/
	   if($(".motov4_slider_style15").length != ''){
		   $(".motov4_slider_style15").each(function(){
				var testi_data = $(this).find(".testi_slider_data").val();
				testi_data = jQuery.parseJSON(testi_data);
				var auto = testi_data['autoplay'] == 'on' ? true : false;
				var dots = testi_data['dots'] == 'true' ? true : false;
				var arrows = testi_data['arrows'] == 'true' ? true : false;
				$(this).find(".slick_crousel").slick({
					rtl: rtl,
					centerMode: true,
					centerPadding: '10px',
					slidesToShow: 3,
					slidesToScroll: parseInt(testi_data['scrollto']),
					dots: dots,
					autoplay: auto,
					autoplaySpeed: parseInt(testi_data['speed']),
					infinite: true,
					arrows:arrows,
					responsive: [{
						breakpoint: 992,
						settings: {
							arrows: true,
							centerMode: true,
							centerPadding: '10px',
							slidesToShow: 3
						}
					},
					{
						breakpoint: 767,
						settings: {
							arrows: true,
							centerMode: true,
							centerPadding: '10px',
							slidesToShow: 1
						}
					},
					{
						breakpoint: 480,
						settings: {
							arrows: true,
							centerMode: true,
							centerPadding: '10px',
							slidesToShow: 1
						}
					}

				]
				});
				$('.content_1').show();
				$('.motov4_slider_style15 .slick_crousel').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
					$('.slick_cls').hide();
					$('.content_' + (parseInt(nextSlide) + 1)).show();
				});
			});
	   }
	   
	   /****** Testimonial Slider 16 *******/
	   if($(".motov4_slider_style16").length != ''){
		   $(".motov4_slider_style16").each(function(){
				var testi_data = $(this).find(".testi_slider_data").val();
				testi_data = jQuery.parseJSON(testi_data);
				var auto = testi_data['autoplay'] == 'on' ? true : false;
				var dots = testi_data['dots'] == 'true' ? true : false;
				var arrows = testi_data['arrows'] == 'true' ? true : false;
				$(this).find(".slick_crousel").slick({
					rtl: rtl,
					slidesToShow: parseInt(testi_data['columns']),
					slidesToScroll: parseInt(testi_data['scrollto']),
					dots: dots,
					autoplay: auto,
					fade: true,
					autoplaySpeed: parseInt(testi_data['speed']),
					infinite: true,
					arrows:arrows,
					nextArrow:'<div class="motov4_next_arrow"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="9px" height="18px"> <path fill-rule="evenodd"  fill="#e7e7e7" d="M-0.000,17.991 L8.991,9.000 L-0.000,0.009 L3.814,8.760 L-0.000,17.991 Z"/></svg></div>',
					prevArrow:'<div class="motov4_prev_arrow"><svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink" width="9px" height="18px"> <path fill-rule="evenodd"  fill="#e7e7e7"d="M9.000,17.991 L0.009,9.000 L9.000,0.009 L5.185,8.760 L9.000,17.991 Z"/></svg></div>',
				});
			});
	   }
	   
	   /****** Testimonial Slider 17 *******/
	   if($(".motov4_slider_style17").length != ''){
		   $(".motov4_slider_style17").each(function(){
				var testi_data = $(this).find(".testi_slider_data").val();
				testi_data = jQuery.parseJSON(testi_data);
				var auto = testi_data['autoplay'] == 'on' ? true : false;
				var dots = testi_data['dots'] == 'true' ? true : false;
				var arrows = testi_data['arrows'] == 'true' ? true : false;
				$(this).find(".slick_crousel").slick({
					rtl: rtl,
					slidesToShow: parseInt(testi_data['columns']),
					slidesToScroll: parseInt(testi_data['scrollto']),
					dots: dots,
					autoplay: auto,
					autoplaySpeed: parseInt(testi_data['speed']),
					infinite: true,
					fade: true,
					arrows:arrows,
					nextArrow:'<div class="motov4_next_arrow"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="9px" height="18px"> <path fill-rule="evenodd"  fill="#fff" d="M-0.000,17.991 L8.991,9.000 L-0.000,0.009 L3.814,8.760 L-0.000,17.991 Z"/></svg></div>',
					prevArrow:'<div class="motov4_prev_arrow"><svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink" width="9px" height="18px"> <path fill-rule="evenodd"  fill="#fff"d="M9.000,17.991 L0.009,9.000 L9.000,0.009 L5.185,8.760 L9.000,17.991 Z"/></svg></div>',
				});
			});
	   }
	   
	   /****** Testimonial Slider 18 *******/
	   if($(".motov4_slider_style18").length != ''){
		   $(".motov4_slider_style18").each(function(){
				var testi_data = $(this).find(".testi_slider_data").val();
				testi_data = jQuery.parseJSON(testi_data);
				var auto = testi_data['autoplay'] == 'on' ? true : false;
				var dots = testi_data['dots'] == 'true' ? true : false;
				var arrows = testi_data['arrows'] == 'true' ? true : false;
				$(this).find(".slick_crousel").slick({
					rtl: rtl,
					slidesToShow: parseInt(testi_data['columns']),
					slidesToScroll: parseInt(testi_data['scrollto']),
					dots: dots,
					autoplay: auto,
					autoplaySpeed: parseInt(testi_data['speed']),
					infinite: true,
					arrows:arrows
				});
			});
	   }
	   
	    /****** Testimonial Slider 19 *******/
	   if($(".motov4_slider_style19").length != ''){
		   $(".motov4_slider_style19").each(function(){
				var testi_data = $(this).find(".testi_slider_data").val();
				testi_data = jQuery.parseJSON(testi_data);
				var auto = testi_data['autoplay'] == 'on' ? true : false;
				var dots = testi_data['dots'] == 'true' ? true : false;
				var arrows = testi_data['arrows'] == 'true' ? true : false;
				$(this).find(".slick_crousel").slick({
					rtl: rtl,
					slidesToShow: parseInt(testi_data['columns']),
					slidesToScroll: parseInt(testi_data['scrollto']),
					dots: dots,
					autoplay: auto,
					autoplaySpeed: parseInt(testi_data['speed']),
					infinite: true,
					arrows:arrows
				});
			});
	   }
	   
	   /****** Testimonial Slider 20 *******/
	   if($(".motov4_slider_style20").length != ''){
		   $(".motov4_slider_style20").each(function(){
				var testi_data = $(this).find(".testi_slider_data").val();
				testi_data = jQuery.parseJSON(testi_data);
				var auto = testi_data['autoplay'] == 'on' ? true : false;
				var dots = testi_data['dots'] == 'true' ? true : false;
				var arrows = testi_data['arrows'] == 'true' ? true : false;
				$(this).find(".slick_crousel").slick({
					rtl: rtl,
					slidesToShow: parseInt(testi_data['columns']),
					slidesToScroll: parseInt(testi_data['scrollto']),
					dots: dots,
					autoplay: auto,
					autoplaySpeed: parseInt(testi_data['speed']),
					infinite: true,
					arrows:arrows
				});
			});
	   }
	   
	   /****** Testimonial Slider 21 *******/
	   if($(".motov4_slider_style21").length != ''){
		   $(".motov4_slider_style21").each(function(){
				var testi_data = $(this).find(".testi_slider_data").val();
				testi_data = jQuery.parseJSON(testi_data);
				var auto = testi_data['autoplay'] == 'on' ? true : false;
				var dots = testi_data['dots'] == 'true' ? true : false;
				var arrows = testi_data['arrows'] == 'true' ? true : false;
				$(this).find(".slick_crousel").slick({
					rtl: rtl,
					slidesToShow: parseInt(testi_data['columns']),
					slidesToScroll: parseInt(testi_data['scrollto']),
					dots: dots,
					autoplay: auto,
					autoplaySpeed: parseInt(testi_data['speed']),
					infinite: true,
					arrows:arrows,
					responsive: [{
						breakpoint: 992,
						settings: {
							slidesToShow: 1
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1
						}
					}

				]
				});
			});
	   }
	   
	   /****** Testimonial Slider 22 *******/
	   if($(".motov4_slider_style22").length != ''){
		   $(".motov4_slider_style22").each(function(){
				var testi_data = $(this).find(".testi_slider_data").val();
				testi_data = jQuery.parseJSON(testi_data);
				var auto = testi_data['autoplay'] == 'on' ? true : false;
				var dots = testi_data['dots'] == 'true' ? true : false;
				var arrows = testi_data['arrows'] == 'true' ? true : false;
				$(this).find(".slick_crousel").slick({
					rtl: rtl,
					slidesToShow: parseInt(testi_data['columns']),
					slidesToScroll: parseInt(testi_data['scrollto']),
					dots: dots,
					autoplay: auto,
					autoplaySpeed: parseInt(testi_data['speed']),
					infinite: true,
					arrows:arrows,
					prevArrow:'<div class="motov4_next_arrow"><svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink"width="19px" height="23px"><path fill-rule="evenodd"  stroke-width="1px" stroke="#707070" fill-opacity="0" fill="#707070" d="M16.500,2.500 L16.500,20.500 L2.500,11.500 L16.500,2.500 Z"/></svg></div>',
					nextArrow:'<div class="motov4_prev_arrow"><svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink"width="19px" height="23px"><path fill-rule="evenodd"  stroke-width="1px" stroke="#707070" fill-opacity="0" fill="#707070" d="M2.500,2.500 L2.500,20.500 L16.500,11.500 L2.500,2.500 Z"/></svg></div>',
				});
			});
	   }
	   
	   /****** Testimonial Slider 23 *******/
	   if($(".motov4_slider_style23").length != ''){
		   $(".motov4_slider_style23").each(function(){
				var testi_data = $(this).find(".testi_slider_data").val();
				testi_data = jQuery.parseJSON(testi_data);
				var auto = testi_data['autoplay'] == 'on' ? true : false;
				var dots = testi_data['dots'] == 'true' ? true : false;
				var arrows = testi_data['arrows'] == 'true' ? true : false;
				$(this).find(".slick_crousel").slick({
					rtl: rtl,
					slidesToShow: parseInt(testi_data['columns']),
					slidesToScroll: parseInt(testi_data['scrollto']),
					dots: dots,
					autoplay: auto,
					autoplaySpeed: parseInt(testi_data['speed']),
					infinite: true,
					arrows:arrows,
					prevArrow:'<div class="motov4_next_arrow"><svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink"width="13px" height="26px" viewBox="0 0 13 26"><path fill-rule="evenodd"  fill="rgb(43, 50, 178)"d="M13.000,0.001 L0.001,13.000 L13.000,25.998 L5.647,12.792 L13.000,0.001 Z"/></svg></div>',
					nextArrow:'<div class="motov4_prev_arrow"><svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink"width="13px" height="26px" viewBox="0 0 13 26"><path fill-rule="evenodd"  fill="rgb(43, 50, 178)"d="M-0.000,0.001 L12.999,13.000 L-0.000,25.998 L7.353,12.792 L-0.000,0.001 Z"/></svg></div>',              
				});   
			});
	   }
	   
	   /****** Testimonial Slider 24 *******/
	   if($(".motov4_slider_style24").length != ''){
		   $(".motov4_slider_style24").each(function(){
				var testi_data = $(this).find(".testi_slider_data").val();
				testi_data = jQuery.parseJSON(testi_data);
				var auto = testi_data['autoplay'] == 'on' ? true : false;
				var dots = testi_data['dots'] == 'true' ? true : false;
				var arrows = testi_data['arrows'] == 'true' ? true : false;
				$(this).find(".slick_crousel").slick({
					rtl: rtl,
					slidesToShow: parseInt(testi_data['columns']),
					slidesToScroll: parseInt(testi_data['scrollto']),
					dots: dots,
					autoplay: auto,
					autoplaySpeed: parseInt(testi_data['speed']),
					infinite: true,
					arrows:arrows
				});
			});
	   }
	   
	   /****** Testimonial Slider 25 *******/
	   if($(".motov4_slider_style25").length != ''){
		   $(".motov4_slider_style25").each(function(){
				var testi_data = $(this).find(".testi_slider_data").val();
				testi_data = jQuery.parseJSON(testi_data);
				var auto = testi_data['autoplay'] == 'on' ? true : false;
				var dots = testi_data['dots'] == 'true' ? true : false;
				var arrows = testi_data['arrows'] == 'true' ? true : false;
				$(this).find(".slick_crousel").slick({
					rtl: rtl,
					slidesToShow: parseInt(testi_data['columns']),
					slidesToScroll: parseInt(testi_data['scrollto']),
					dots: dots,
					autoplay: auto,
					autoplaySpeed: parseInt(testi_data['speed']),
					infinite: true,
					arrows:arrows
				});
			});
	   }
	   
	   /****** Testimonial Slider 26 *******/
	   if($(".motov4_slider_style26").length != ''){
		   $(".motov4_slider_style26").each(function(){
				var testi_data = $(this).find(".testi_slider_data").val();
				testi_data = jQuery.parseJSON(testi_data);
				var auto = testi_data['autoplay'] == 'on' ? true : false;
				var dots = testi_data['dots'] == 'true' ? true : false;
				var arrows = testi_data['arrows'] == 'true' ? true : false;
				$(this).find(".slick_crousel").slick({
					rtl: rtl,
					slidesToShow: parseInt(testi_data['columns']),
					slidesToScroll: parseInt(testi_data['scrollto']),
					dots: dots,
					autoplay: auto,
					autoplaySpeed: parseInt(testi_data['speed']),
					infinite: true,
					arrows:arrows
				});
			});
	   }
	   
		/****** Countdown JS *******/
		if($(".motov4_countdown_wrapper").length != ''){
			let auto = $(this).find(".counter_date_time").data("autoupdate");
			if(auto != undefined && auto['in'] != "disable"){
				let autoTime = parseInt(auto['updateTime']);
				let date = $(".motov4_countdown_wrapper").find(".counter_date_time").data("date");
				function initCountdown() {
					var currentDate = new Date();
					var $countdown = $('.ce-countdown');
					$countdown.countEverest({
						day: currentDate.getDate(),
						month: currentDate.getMonth() + 1,  // this is necessary because of the JavaScript standard. 0 = January and 11 = December.
						year: currentDate.getFullYear(),
						hour: auto['in'] == 'hour' ? currentDate.getHours() + autoTime : currentDate.getHours(),
						minute: auto['in'] == 'minute' ? currentDate.getMinutes() + autoTime : currentDate.getMinutes(),
						second: auto['in'] == 'second' ? currentDate.getSeconds() + autoTime : currentDate.getSeconds(),
						timeZone: Number(date['zone']),
						onComplete: function() {
							$countdown.countEverest('destroy');
							initCountdown();
						}
					});
				}
				initCountdown();
			}else{
				let date = $(".motov4_countdown_wrapper").find(".counter_date_time").data("date");
				let time = $(".motov4_countdown_wrapper").find(".counter_date_time").data("time");
				if(date.length != ''){
					let coun_time = time.split("/");
					$('.motov4_countdown_wrapper').find('.ce-countdown').countEverest({
						// Set your target date here!
						day: date['day'],
						month:date['month'], 
						year: date['year'],
						hour: coun_time[0],
						minute: coun_time[1],
						timeZone: Number(date['zone']),
						pluralLabels: true,
						singularLabels: true,
						onComplete: function() {
							$('.motov4_countdown_wrapper').find('.ce-countdown').countEverest('destroy');
						}
					});
				}else{
					alert("Pleae enter proper date and time.");
				}
			}
		}
			
		//Blog Related Posts
		$('.motov4_blog_related .motov4_related_slider').slick({
		  rtl: rtl,
		  dots: false,
		  infinite: true,
		  speed: 400,
		  slidesToShow: 2,
		  slidesToScroll: 1,
		  autoplay: false,
		  arrows: true,
		  responsive: [
			{
			  breakpoint: 767,
			  settings: {
				slidesToShow: 1,
			  }
			}
		  ]
		});
		
	//Below js are exported from motov4 core plugin
	$(".motov4_events .nav-link").on("click", function(){
			if( !$(this).hasClass('active') ){
				var cat_slug = $(this).attr("href");
				var numb = $(this).closest('#motov4_event_tab').find(".motov4_number_events").val();
				var btn_txt = $(this).closest('#motov4_event_tab').find(".motov4_number_events").attr("data-btn_text");
				jQuery.ajax({
					 url: ajax_object.ajax_url,
					 data: {
						 action:'motov4_load_event_ajax',
						 cat_slug: cat_slug,
						 numb: numb,
						 btn_txt: btn_txt
					 },
					 type: 'POST',
					 success: function(response){
						 $(".tab-pane").html(response);
					 }
				 });
			}
		});
			
		//Blog Post Show All Post
		$(".motov4_load_posts").on('click', function(){
			var $this = $(this);
			var getData = $this.attr("data-post-data");
			var data = getData.length != '' ? jQuery.parseJSON( getData ) : '';
			
			$.ajax({
				 data: {
					action  : 'motov4_show_all_posts',
					cat	    : data['cat'],
					columns : data['columns'],
					number  : data['number'],
					order_by: data['order_by'],
					sorting : data['sorting'],
					icon_url : data['icon_url']
				 },
				 type: 'post',
				 url: ajax_object.ajax_url,
				 success: function(response) {
					//console.log(response);
					$this.closest('.row').append(response);
					$this.removeClass('motov4_load_posts');
				 }
			});
		});
		
		//Enable Popup
		if($('.motov4_gal_wrapper').length != ''){
			 $('.motov4_gal_wrapper .motov4_gal_zoom').magnificPopup({
				delegate: 'a',
				type: 'image',
				mainClass: 'mfp-with-zoom',
				gallery: {
					enabled: true,
				},
			 });
		}
		
		
		//Video Popup For Shaped Images Shortcode
		$(".motov4_pop_video_btn").on('click', function() {
			var vid_url = $(this).next('input').val();
			$(this).parent(".motov4_shaped_img ").next(".motov4_shaped_popup_video").find("iframe").attr("src",vid_url);
			$(this).parent(".motov4_shaped_img ").next(".motov4_shaped_popup_video").modal();
		});
		
		$(".motov4_shaped_popup_video").on('hidden.bs.modal', function (e) {
			$(".motov4_shaped_popup_video iframe").attr("src", '#');
		});
		
		$("#play_inline_video").click(function(e){
			$(this).parent(".usiv_overlay").hide();
		});
		
		
		//Video Popup For Call To Action Shortcode
		$(".motov4_pop_call_to_btn").on('click', function() {
			var vid_url = $(this).next('input').val();
			$(this).parents(".motov4_call_action_img").parent().next(".motov4_callto_popup_video").find("iframe").attr("src",vid_url);
			$(this).parents(".motov4_call_action_img").parent().next(".motov4_callto_popup_video").modal();
		});
		
		//Video Popup For Training Video
		$(".motov4_training_video_btn").on('click', function() {
			var vid_url = $(this).next('input').val();
			$(this).parents(".motov4_tra_video_box ").find(".motov4_shaped_popup_video").find("iframe").attr("src",vid_url);
			$(this).parents(".motov4_tra_video_box ").find(".motov4_shaped_popup_video").modal();
		});
		
		//Client Logo Sliders
		if( $(".motov4_client_slider .slick_crousel").length != '' ){
			$(".motov4_client_slider .slick_crousel").each(function(){
				var data = $(this).parent().attr("data-additional").split(",");
				console.log(data);
				$(this).slick({
					rtl: rtl,
					slidesToShow: parseInt(data[0]),
					slidesToScroll: parseInt(data[1]),
					dots: data[2] == 1 ? true : false,
					arrows: data[3] == 1 ? true : false,
					autoplay: data[4] == 1 ? true : false,
					loop:true,
					autoplaySpeed: parseInt(data[5]),
					nextArrow: data[6] == 'style3' ? '<span class="motov4_next_arrow"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></span>' : (data[6] == 'style4' ? '<span class="motov4_next_arrow"><i class="fa fa-angle-right" aria-hidden="true"></i></span>' : (data[6] == 'style6' ? '<div class="motov4_prev_arrow"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31px" height="14px"> <path fill-rule="evenodd"  fill="rgb(212, 212, 212)"d="M30.714,6.331 L24.465,0.277 C24.083,-0.093 23.465,-0.093 23.084,0.277 C22.702,0.646 22.702,1.245 23.084,1.615 L27.666,6.054 L0.976,6.054 C0.437,6.054 0.000,6.477 0.000,7.000 C0.000,7.522 0.437,7.946 0.976,7.946 L27.666,7.946 L23.084,12.385 C22.703,12.754 22.703,13.353 23.084,13.723 C23.275,13.907 23.525,14.000 23.774,14.000 C24.024,14.000 24.274,13.907 24.465,13.723 L30.714,7.669 C31.095,7.299 31.095,6.700 30.714,6.331 Z"/></svg></div>' : '<span class="motov4_clnt_next_arrow"><i class="fa fa-angle-right" aria-hidden="true"></i></span>')),
					prevArrow: data[6] == 'style3' ? '<span class="motov4_prev_arrow"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></span></i>' : (data[6] == 'style4' ? '<span class="motov4_prev_arrow"><i class="fa fa-angle-left" aria-hidden="true"></i></span></i>' : (data[6] == 'style6' ? '<div class="motov4_next_arrow"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"width="31px" height="14px"><path fill-rule="evenodd"  fill="rgb(212, 212, 212)"d="M0.286,6.331 L6.535,0.277 C6.917,-0.093 7.535,-0.093 7.916,0.277 C8.298,0.646 8.298,1.245 7.916,1.615 L3.334,6.054 L30.024,6.054 C30.563,6.054 31.000,6.477 31.000,7.000 C31.000,7.522 30.563,7.946 30.024,7.946 L3.334,7.946 L7.916,12.385 C8.297,12.754 8.297,13.353 7.916,13.723 C7.725,13.907 7.475,14.000 7.226,14.000 C6.976,14.000 6.726,13.907 6.535,13.723 L0.286,7.669 C-0.095,7.299 -0.095,6.700 0.286,6.331 Z"/></svg></div>' : '<span class="motov4_clnt_prev_arrow"><i class="fa fa-angle-left" aria-hidden="true"></i></span></i>')),
					infinite: true,
					responsive: [
					{
					  breakpoint: 992,
					  settings: {
						slidesToShow: 4,
					  }
					},
					{
					  breakpoint: 767,
					  settings: {
						slidesToShow: 3,
					  }
					},
					{
					  breakpoint: 480,
					  settings: {
						slidesToShow: 1,
					  }
					}
				  ]
			   });
			});
		}
		
		//Initialization Counters
		if($('.count_no').length != ''){
			$('.count_no').appear(function() {
				$('.count_no').countTo();
			});
		}
		
		//Add Right Border TO The Counter 2nd Style.
		if( $(".motov4_counter_style1").length != '' ){
			$(".motov4_counter_style1 .counter_block").each(function(i){
				if( i < ($(".motov4_counter_style1 .counter_block").length)-1)
				$(this).find('.counter_text').next('.ldcounter_border').addClass('motov4_counter_divider');
			});
		}
		
		//Add Right Border TO The Counter 4th Style.
		if( $(".motov4_counter_section3").length != '' ){
			$(".motov4_counter_section3 .counter_block").each(function(i){
				if( i < ($(".motov4_counter_section3 .counter_block").length)-1)
				$(this).find('.counter_text').next('.ldcounter_border').addClass('motov4_counter_divider');
			});
		}
		
		//Image Sliders
		if( $(".motov4_img_slider").length != '' ){
			$(".motov4_img_slider .slick_crousel").each(function(){
				var data = $(this).parent().prev('input').attr("data-img_slider").split(",");console.log(data);
				$(this).slick({
					rtl: rtl,
					dots:false,
					infinite: false,
					slidesToShow:1,
					slidesToScroll: 1,
					autoplay: data[1] == 'true' ? true : false,
					autoplaySpeed: parseInt(data[2]),
					arrows: data[0] == 'true' ? true : false,
					prevArrow:'<div class="motov4_prev_arrow1"><svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink"width="19px" height="23px"><path fill-rule="evenodd"  stroke-width="1px" stroke="rgb(112, 112, 112)" fill-opacity="0" fill="rgb(255, 255, 255)"d="M2.500,2.500 L2.500,20.500 L16.500,11.500 L2.500,2.500 Z"/></svg></div>',
					nextArrow:'<div class="motov4_next_arrow1"><svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink"width="19px" height="23px"><path fill-rule="evenodd"  stroke-width="1px" stroke="rgb(112, 112, 112)" fill-opacity="0" fill="rgb(255, 255, 255)"d="M16.500,2.500 L16.500,20.500 L2.500,11.500 L16.500,2.500 Z"/></svg></div>',
			   });
			});
		}
		
		//Blog Slider
		if( $(".motov4_post_slider").length != '' ){
			var window_width = $(window).innerWidth();
			$(".motov4_blog_slider").each(function(){
				var getData = $(this).attr("data-slider-data");
				var data = getData.length != '' ? jQuery.parseJSON( getData ) : '';
				$(this).slick({
					rtl: rtl,
				  dots: data['dots'] == 'off' ? false : true,
				  infinite: true,
				  speed: parseInt(data['speed']),
				  slidesToShow: parseInt(data['columns']),
				  slidesToScroll: parseInt(data['scrollto']),
				  autoplay: data['autoplay'] == 'off' ? false : true,
				  arrows: data['arrows'] == 'off' ? false : true,
				  responsive: [
					{
					  breakpoint: 1024,
					  settings: {
						slidesToShow: 3,
					  }
					},
					
					{
					  breakpoint: 992,
					  settings: {
						slidesToShow: window_width<992 && window_width>768 ? 2 : 2,
					  }
					},
					
					{
					  breakpoint: 767,
					  settings: {
						slidesToShow: 1,
					  }
					}
				  ]
				});
			});
		}
		
		//Blog Banner Slider
		if( $(".motov4_blog_banner").length != '' ){
			var getData = $(".motov4_blog_banner").attr("data-slider-data");
			var data = getData.length != '' ? jQuery.parseJSON( getData ) : '';
			$('.motov4_banner_slider .motov4_blog_banner').slick({
				  dots: false,
				  rtl: rtl,
				  infinite: true,
				  speed: parseInt(data['speed']),
				  slidesToShow: 1,
				  slidesToScroll: 1,
				  autoplay: data['autoplay'] == true ? true : false,
				  arrows: true
			});
		}
		
		//Product Slider
		if( $(".motov4_product_crousel").length != '' ){
			$(".motov4_product_crousel").each(function(){
				var getData = $(this).prev(".pro_slider_data").val();
				var data = getData.length != '' ? jQuery.parseJSON( getData ) : '';
				$(this).slick({
					rtl: rtl,
					dots: data['dots'] == 'off' ? false : true,
					infinite: true,
					slidesToShow: parseInt(data['columns']),
					slidesToScroll: parseInt(data['scrollto']),
					autoplay: data['autoplay'] == 'off' ? false : true,
					arrows: data['arrows'] == 'true' ? true : false,
					responsive: [{
						breakpoint: 992,
						settings: {
							slidesToShow: 3
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 2
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1
						}
					}

				]
			  });
			});
		}

		$(".hs_stickybar_toggle").on('click', function(){ 
			$(".hs_stickybar_wrapper").toggleClass("motov4_stiky_show_hide");
		});
		
		//button scroll
		$(".motov4_scroll_down_to_section").click(function(event) {
			if (this.hash !== "") {
				event.preventDefault();

				var hash = this.hash;

				$('html, body').animate({
				scrollTop: $(hash).offset().top
				}, 800, function(){
				window.location.hash = hash;
				});
			}
		});
		
		//Single Page Website
		if($('body').hasClass('page-template-motov4-single-page')){
			$('.motov4_nav ul li a[href*="#"],.motov4_menu ul li a[href*="#"]').click(function() {
				if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				 $('.motov4-menu li').removeClass('current_page_item');
				 $(this).parent().addClass('current_page_item');
				  var target = $(this.hash);
				  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				  var sect_pos = target.offset().top-95;
				  if (target.length) {
					$('html, body').animate({
					  scrollTop: sect_pos
					}, 1000);
					return false;
				  }
				}
			  });
	   }
	   // fixed header start
		if ( $('.motov4_transparent_header').length == '' && $('.header_style6').length == '' && $('.header_style8').length == '' && $("body").hasClass("motov4_fixed_header")) {
			var h_ih = $('.motov4_header').innerHeight();
			if($('.motov4_boxed_wrapper').length != 0){
				$('.motov4_boxed_wrapper').css('padding-top', h_ih );
			}else{
				$('body').css('padding-top', h_ih );
			}
			
		}
		// fixed header end
    });
	
	$( window ).load(function() {
		
		//Porfolio Filter
		if( $(".motov4_filter_menu").length != '' ){
			
			var active = $(".motov4_filter_menu ul").find(".active").attr("data-filter");
			$('.motov4_grid_filter').isotope({
			  itemSelector: '.id_filter_item',
			  filter: active
			});
			
			$('.motov4_filter_menu ul li').click(function(){
			  var selector = $(this).attr('data-filter');
				  $('.motov4_grid_filter').isotope({
					filter: selector,
				  });
			  
			  //changing active class with click event
			  $('.motov4_filter_menu ul li.active').removeClass('active');
			  $(this).addClass('active');
			  
		   });
		}
		
	});
	
	//MOTO V4 Newsletter Widget Alert
	 function motov4_newsletter_alert( msg, msg_type ){
		$(".um_alert_wrapper").addClass('alert_open um_'+msg_type+'');
		$(".um_alert_wrapper .um_alert_inner").children("p").text(msg);
		setTimeout(function(){
		  $(".um_alert_wrapper").removeClass('alert_open '+msg_type+'');
		}, 5000);
	}
	
	//jQuery Validate Emails with Regex
		function motov4ValidateNewsletterEmail(Email) {
			var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
			return $.trim(Email).match(pattern) ? true : false;
	 }

	// Load Event
	$(window).on('load', function() {
		
		$('body').addClass('site_loaded');
		
		//Isotop Initialization
		if($('.motov4_gal_wrapper').length != '' && $('.motov4_gal_wrapper').attr("data-port_style") == "masonry"){
			$('.motov4_gal_wrapper').isotope({
				itemSelector: '.element-item',
				percentPosition: true,
				masonry: {
					columnWidth: '.element-item'
				}
			});
		}
		
		//Heaidng Vertical Center Align
		if( $(".motov4_vertical_center").length != '' ){
			$(".motov4_vertical_center").each(function(){
				var row_height = $(this).closest('.vc_row').outerHeight();
				$(this).css("height",row_height);
			});
		}
		
		//Manage height of second setiion in Call To Action
		if( $(".motov4_call_action_section").length != '' ){
			var width = $(window).width();
			if(width > 500){
				setTimeout(function(){ 
				var height = $(".motov4_call_action_section").outerHeight();
				$(".motov4_action_style1 .motov4_call_action_img").css("height",height);
				}, 5);
			}
		}
		
		//Manage height for process shortcode
		if( $(".motov4_process_section").length != '' ){
			setTimeout(function(){
			var height = $(".motov4_process_section .motov4_call_action").innerHeight();
			var window_width = $(window).innerWidth();
			if( window_width >= 990 ){
				$(".motov4_process_section .motov4_process_content").css("height",height);
			}	
			}, 10);
			$(".motov4_process_content .motov4_process_box").last().addClass('border_none');
		}
		
		//Manage Mega Menu columns
		if($('.motov4-mega-menu-ul').length != ''){
			const count = $(".motov4-mega-menu-ul li.widget").length;
			if(count<=4){
				let col = count == 2 ? 'col-lg-6' : ( count == 3 ? 'col-lg-4' : ( count == 4 ? 'col-lg-3' : '' ) );
				$('.motov4-mega-menu-ul').find('li.widget').each(function(){
					$(this).addClass(col);
				});
			}else{
				$('.motov4-mega-menu-ul').find('li.widget').each(function(){
					$(this).addClass('col-lg-3');
				});
			}
		}
		
	});

	// Scroll Event
	$(window).on('scroll', function () {
		if ($("body").hasClass("motov4_fixed_header")) {
			var ht_ih = $('.motov4_header_top').length != '' ? $('.motov4_header_top').innerHeight() : 50;
			var scroll = $(window).scrollTop();
			if ( scroll >= ht_ih ) {
				$("body").addClass("sticky_header_class");
			}else{
				$("body").removeClass("sticky_header_class");
			}
		}
		
		//Single Page Website
		if($('body').hasClass('page-template-motov4-single-page')){
			var windscroll = $(window).scrollTop();
			var target = '.motov4-menu li';
			$('.motov4_single_layout').each(function(i){
				if( $(this).position().top <= windscroll+100 ){
					$(target).removeClass('current_page_item');
					$(target).eq(i).addClass('current_page_item');
				}
			});
		}
	//Go to top
        if (
		$(this).scrollTop() > 100) {
            $('.motov4_gotop').addClass('goback');
        } else {
            $('.motov4_gotop').removeClass('goback');
        }

    });
    $(".motov4_gotop").on("click", function() {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false
    });
	
	// Resize Event
	$(window).resize(function(){
		if ($("body").hasClass("motov4_fixed_header")) {
			var h_ih = $('.motov4_header').innerHeight();	
			var width = $(window).width();
			if( !$('.motov4_header').hasClass('motov4_transparent_header') && !$('.motov4_header').hasClass('motov4_toggle_header') && !$('.motov4_header').hasClass('header_style6') && !$('.motov4_header').hasClass('header_style8') ){
				if(width < 480){ 
					$('body').css('padding-top', h_ih );
				}
			}
			if(width < 765){
				$(".motov4_action_style1 .motov4_call_action_img").css("height",'auto');
			}
		}
	});
})(jQuery);