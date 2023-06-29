
 $(document).ready(function(){
    
  
/*=======윈도우 리사이즈 ========*/

  var delay=100;
  var timer=null;
  $(window).load(function(){
   // console.log("window onload : start");
    //console.log("");
    main();
  }); 

  $(window).resize(function(){
   // console.log("window onload : star");
    //console.log("");
    main();
  });
 

  function main(){
   
   clearTimeout(timer);
   
   timer =  setTimeout(function(){
   
 //  console.log("main : start");
  // console.log("");
  
   
   var windowWidth = $(window).width();
  // console.log("windowWidth [px] : " + windowWidth);
   //console.log("");
  
   var elementWidth = $(".left_menu_wrap").width();
  // console.log("elementWidth [px] : " + elementWidth);
  // console.log("");
    
    
  
  if(windowWidth >= 1601){

   
  // console.log("");
  // console.log("windowWidth [px] : [min-width:1601px]");
   //console.log("");
   
   //alert("1600px");

  }
   else if(windowWidth <= 1600){
       TweenMax.to($(".left_menu_wrap"),0.6,{width:70,ease:Quint.easeQut});
       TweenMax.to($(".left_menu_inner"),0.3,{width:70,ease:Quint.easeQut});
       $("#logo").find('img').attr("src","/static/nflux/img/svg/s_logo.svg");
       $(".menu_tit").css("display", "none");
       $(".menu_txt").css("position","absolute").css("left","-9999999999px");
       $(".sub_menu_txt").css("position","absolute").css("left","-9999999999px");
       $(".left_menu li").css("text-indent","0px").css("text-align","center");
       $(".left_icon").css("margin-right","0px");
       $(".footer_logo").css("opacity","0");
   }
   },delay);
  }; 
   
  $(document).on("click", ".hide_menu", function(event) {
  // $('.hide_menu').on('click', function(){

   if( $(".left_menu_inner ").css('width') == '70px' ) { 
      $(".left_menu_wrap ").css("width", "14rem");
      $(".left_menu_inner ").css("width", "14rem");
      $("#logo").find('img').stop().css("opacity","0").attr("src","/static/nflux/img/svg/AI_PECS_logo.svg").animate({opacity:1},3000);
      $(".left_menu_wrap").addClass("open");
      $(".menu_tit").css("display", "block");
      $(".menu_txt").stop().css("opacity","0").css("position","unset").stop().animate({opacity:1},1000);
      $(".sub_menu_txt").stop().css("opacity","0").css("position","unset").stop().animate({opacity:1},1000);
      $(".left_menu").css("margin-top","0px");
      $(".left_menu > li").css("text-indent","20px").css("text-align","left");
       $(".sub_menu > li").css("text-indent","1.5rem").css("text-align","left");
      $(".left_icon").css("margin-right","10px");
      $(".footer_logo").stop().animate({opacity:1},600);
   }else {
     TweenMax.to($(".left_menu_wrap"),0.6,{width:70,ease:Quint.easeQut});
     TweenMax.to($(".left_menu_inner"),0.3,{width:70,ease:Quint.easeQut});
     $("#logo").find('img').attr("src","/static/nflux/img/svg/s_logo.svg");
     $(".menu_tit").css("display", "none");
     $(".menu_txt").css("position","absolute").css("left","-9999999999px");
     $(".sub_menu_txt").css("position","absolute").css("left","-9999999999px");
     $(".left_menu li").css("text-indent","0px").css("text-align","center");
     $(".sub_menu li").css("text-indent","0px").css("text-align","center");
     $(".left_icon").css("margin-right","0px");
     $(".footer_logo").css("opacity","0");
     }
  
   });


  $('.select_inner').on('click',function(){
     $(this).find('.combobox').css("display","block");
   });
  $('.setting, .hide_menu, .alarm, .top_icon01, .top_icon02, .input_txt').mouseenter(function(){
    $(this).find('img').attr("src", $(this).find('img').attr("src").replace(".svg","_on.svg"));
  });
   $('.setting, .hide_menu, .alarm, .top_icon01, .top_icon02, .input_txt').mouseleave(function(){
    $(this).find('img').attr("src", $(this).find('img').attr("src").replace("_on.svg",".svg"));
   });
   $('.alarm').mouseenter(function(){
    $('.alarm_contents').css("opacity","0").css("display","block").stop().animate({opacity:1},600);                 
    })
    $('.alarm').mouseleave(function(){
       $('.alarm_contents').css("opacity","1").css("display","none")              
    })
   $('.input_txt').mouseenter(function(){
     $(this).prev().css("color","#8593E8");
   });
  $('.input_txt').mouseleave(function(){
      $(this).prev().css("color","#4A5067");
    });
   $('.select_group').mouseenter(function(){
      $(this).children().css("color","#8593E8");
    });
  $('.select_group').mouseleave(function(){
      $(this).children().css("color","#4A5067");
    });

  
  /*=====       popup       ======*/
$(document).on("click", ".popupBtn", function(event) {
// $(".popupBtn").click(function(event){  //팝업 Open 버튼 클릭 시 
 $(".popup_inner").css({
    "top": (($(window).height()-$(".popup_inner").outerHeight())/2+$(window).scrollTop())+"px",
    "left": (($(window).width()-$(".popup_inner").outerWidth())/2+$(window).scrollLeft())+"px"
    //팝업창을 가운데로 띄우기 위해 현재 화면의 가운데 값과 스크롤 값을 계산하여 팝업창 CSS 설정
  });  
/*
 var div = $('.delete_popup');
  div.css("position", "absolute");
  div.css("top", Math.max(0, (($(window).height() - div.outerHeight()) / 2) + $(window).scrollTop()) + "px");
  div.css("left", Math.max(0, (($(window).width() - div.outerWidth()) / 2) + $(window).scrollLeft()) + "px");

  //$('.popup_inner').fadeIn(500);
*/

  $(".popup_bg").stop().animate({opacity:1},600).css("display","block"); //팝업 뒷배경 display block
  // $(".popup_inner").stop().animate({opacity:1},600).css("display","block"); //팝업창 display block
//$("body").css("overflow","hidden");//body 스크롤바 없애기

});

$(document).on("click", ".popupBtnDel", function(event) {
  // $(".popupBtn").click(function(event){  //팝업 Open 버튼 클릭 시 
   $(".dele_popup_inner").css({
      "top": (($(window).height()-$(".dele_popup_inner").outerHeight())/2+$(window).scrollTop())+"px",
      "left": (($(window).width()-$(".dele_popup_inner").outerWidth())/2+$(window).scrollLeft())+"px"
      //팝업창을 가운데로 띄우기 위해 현재 화면의 가운데 값과 스크롤 값을 계산하여 팝업창 CSS 설정
    
    }); 
   
  /*
   var div = $('.delete_popup');
    div.css("position", "absolute");
    div.css("top", Math.max(0, (($(window).height() - div.outerHeight()) / 2) + $(window).scrollTop()) + "px");
    div.css("left", Math.max(0, (($(window).width() - div.outerWidth()) / 2) + $(window).scrollLeft()) + "px");
  
    //$('.popup_inner').fadeIn(500);
  */
  
    $(".popup_bg").stop().animate({opacity:1},600).css("display","block"); //팝업 뒷배경 display block
    $(".dele_popup_inner").stop().animate({opacity:1},600).css("display","block"); //팝업창 display block
  //$("body").css("overflow","hidden");//body 스크롤바 없애기
  
  });
$(document).on("click", ".close_btn", function () {
  $(".popup_bg").stop().animate({opacity:0},600).css("display","none"); //팝업창 뒷배경 display none
  $(".popup_inner").stop().animate({opacity:0},600).css("display","none"); //팝업창 display none
  $(".dele_popup_inner").stop().animate({opacity:0},600).css("display","none"); //팝업창 display none
});
// $(".close_btn").click(function(event){
//    $(".popup_bg").stop().animate({opacity:0},600).css("display","none"); //팝업창 뒷배경 display none
//    $(".popup_inner").stop().animate({opacity:0},600).css("display","none"); //팝업창 display none
//    $(".dele_popup_inner").stop().animate({opacity:0},600).css("display","none"); //팝업창 display none
//   // $("body").css("overflow","auto");//body 스크롤바 생성
// });

 
  // $(".close_btn").click(function(event){
  //    $(".popup_bg").stop().animate({opacity:0},600).css("display","none"); //팝업창 뒷배경 display none
  //    $(".popup_inner").stop().animate({opacity:0},600).css("display","none"); //팝업창 display none
  //    $(".dele_popup_inner").stop().animate({opacity:0},600).css("display","none"); //팝업창 display none
  //   // $("body").css("overflow","auto");//body 스크롤바 생성
  // });
  
 
$(document).on("click", ".add_contents", function(){
//  $('.add_contents').on('click', function(){
   $('.popup_inner').stop().animate({opacity:1},600).css("display","block");
   $('.add_popup').css("display","block");
   $('.detail_popup').css("display","none");
   $('.delete_popup').css("display","none");
   $('.model_check_popup').css("display","none");
 }); 
 
 $(document).on("click", ".edit_page_btn", function(){
//  $('.edit_page_btn').on('click', function(){
   $('.popup_inner').stop().animate({opacity:1},600).css("display","block");
   $('.detail_popup').css("display","block");
   $('.add_popup').css("display","block");
   $('.model_check_popup').css("display","none");
   $('.delete_popup').css("display","none");

 });  
  $('.chart_box_wrap').on('click', function(){
   $('.popup_inner').stop().animate({opacity:1},600).css("display","block");
 });  
 $(document).on("click", ".delet_btn .dele_btn", function() {
//  $('.delet_btn, .dele_btn').on('click', function(){
   $('.popup_inner').stop().animate({opacity:1},600).css("display","block");
   $('.delete_popup').css("display","block");
   $('.add_popup').css("display","none");
   $('.model_check_popup').css("display","none");
   $('.detail_popup').css("display","none");

 });   

 $(document).on("click", ".run_btn", function () {
  // $('.run_btn').on('click', function(){
   $('.popup_inner').stop().animate({opacity:1},600).css("display","block");
   $('.delete_popup').css("display","none");
   $('.add_popup').css("display","none");
   $('.model_check_popup').css("display","none");
   $('.detail_popup').css("display","block");

  });
  $(document).on("click", ".detail_btn", function () {
  // $('.detail_btn').on('click', function(){
   $('.popup_inner').stop().animate({opacity:1},600).css("display","block");
   $('.delete_popup').css("display","none");
   $('.add_popup').css("display","none");
   $('.model_check_popup').css("display","none");
   $('.detail_popup').css("display","block");

  });

  $(document).on("click", ".model_check_btn", function () {
  // $('.model_check_btn').on('click',function(){
   $('.popup_inner').stop().animate({opacity:1},600).css("display","block");
   $('.delete_popup').css("display","none");
   $('.add_popup').css("display","none");
   $('.detail_popup').css("display","none"); 
   $('.model_check_popup').css("display","block");

  });

  $(document).on("click", ".close_btn", function () {
  // $('.close_btn').click(function(){
   $('.popup_inne').stop().animate({opacity:0},600).css("display","none");   

  }); 

  
$('.change02').hide();
$('.radio02').on('click', function(){
  $('.change02').slideDown(100);
  $('.change01').slideUp(100);
});   
$('.radio01').on('click', function(){
  $('.change01').slideDown(100);
  $('.change02').slideUp(100);
});   
  
//**==========   tab   ==========**// 
  $('.tab02 li').on('click',function(){
    $(this).addClass("on");
    $(this).siblings().removeClass("on");
  });
  
 $('.model_contents,.result_contents').hide();
  
  $('.result_tap').on('click',function(){
    $('.popup_type02 ').css("width","45rem");
    $('.result_contents').stop().slideDown(100);
    $('.model_contents, .input_data_contents').hide();
 }); 
  $('.input_tap').on('click',function(){
    $('.input_data_contents').stop().slideDown(100);
    $('.model_contents,.result_contents').hide();
    $('.popup_type02 ').css("width","34rem");
 });
 $('.model_tap').on('click',function(){
    $('.popup_type02 ').css("width","34rem");
    $('.model_contents').stop().slideDown(100);
    $('.input_data_contents,.result_contents').hide();
 });

  
  
//**==========   select  ==========**// 
  
 /* 셀렉트박스 보이게 하기 */
 $(document).on("click", ".select_box", function(){
 // $(".select_box").click(function(){
  $(this).find(".optionList").toggle();
 });  
 /* 셀렉트 박스 옵션 선택 */
 $(".optionList li").click(function(){
   var text = $(this).html();
   $(this).parent().siblings(".label").html(text);
   $(".optionList").slideUp(100);
 });   
 /* 셀렉트 박스 이외 선택시 보이지 않게 하기 */
 $(document).mouseup(function(e) {
     var seting = $(".optionList");
     if (seting.has(e.target).length === 0) {
       seting.slideUp(100);
     }
 });
  
  


  
  /*실시간 시간 데이터*/ 
const clock = document.querySelector("#clock");

 function getClock(){
  const d = new Date();
  const yy = String(d.getFullYear()).padStart(2,"0");
  const mm = String(d.getMonth()+1).padStart(2,"0");
  const dd = String(d.getDate()).padStart(2,"0");
  const h = String(d.getHours()).padStart(2,"0");
  const m = String(d.getMinutes()).padStart(2,"0");
  const s = String(d.getSeconds()).padStart(2,"0");
  clock.innerText = `${yy}년${mm}월${dd}일 ${h}시${m}분${s}초`;
 }

  getClock(); //맨처음에 한번 실행
  setInterval(getClock, 1000); //1초 주기로 새로실행 

  
  

 });


