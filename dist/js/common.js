function myPrizes(){
  var mySwiper = new Swiper('.myPrizes-col-first .myPrizes-slider', {
    slidesPerView: 1,
    watchOverflow: true,
    effect: "fade",
    navigation: {
      nextEl: '.myPrizes-col-first .swiper-button-next',
      prevEl: '.myPrizes-col-first .swiper-button-prev',
    },
  });
}
function myPrizes2(){
  var mySwiper = new Swiper('.myPrizes-col-second .myPrizes-slider', {
    slidesPerView: 1,
    watchOverflow: true,
    effect: "fade",
    navigation: {
      nextEl: '.myPrizes-col-second .swiper-button-next',
      prevEl: '.myPrizes-col-second .swiper-button-prev',
    },
  });
}
if($('.myPrizes-slider').length){
	myPrizes();
	myPrizes2();
}

$(document).ready(function(){

  if($('.tournament-slider').length){
    var mySwiper = new Swiper('.tournament-slider', {
      slidesPerView: 1,
      watchOverflow: true,
      effect: "fade",
      autoHeight: true,
      navigation: {
        nextEl: '.tournament-arrow .swiper-button-next',
        prevEl: '.tournament-arrow .swiper-button-prev',
      },
    });

    $('.tournament-link').click(mySwiper,function(){
      var attr = $(this).attr('data-slide');

      mySwiper.slideTo(attr);
    });
  }

  $('.myCodes-content').mCustomScrollbar();
  $('.forecasts-content').mCustomScrollbar();
  $('.winners-content').mCustomScrollbar();

  //scrollbar
  function scrollbar(){
    $('.faq-block').mCustomScrollbar();
  }

  $(window).on('scroll', function(){
    if($(window).outerWidth() > 890)
      scrollbar();
    else{
      $('.myCodes-content').mCustomScrollbar();
      $('.forecasts-content').mCustomScrollbar();
    }
  });
  if($(window).outerWidth() > 890)
    scrollbar();

  if($(window).outerWidth() < 768)
    $('.winners-content').mCustomScrollbar('destroy');

	//menu mob
	$('.header-bar,.header-close').on('click', function(){
    $('html,body').toggleClass('scroll-hidden');
		$('.header').toggleClass('header-active');
	});

	//tab
	$('.tab-list li a').on('click', function(e){
		e.preventDefault();

		$(this).parents('.tab-list').find('a').removeClass('active');
		$(this).parents('.allTabs').find('.tab').removeClass('tab-active');

		var attr = $(this).attr('href');
		$(attr).addClass('tab-active');
		$(this).addClass('active');

    setTimeout(function(){
    	if($('.myPrizes-slider').length){
    		myPrizes();
    		myPrizes2();
    	}
    }, 500);
	});

	//accordeons
	$(".accordeon .accordeon-block").hide().prev().click(function() {

		if($(this).parents(".accordeon").hasClass('accordeon-active'))
			$(".accordeon").removeClass('accordeon-active');
		else {
			$(".accordeon").removeClass('accordeon-active');
			$(this).parents(".accordeon").addClass('accordeon-active');
		}

		$(this).parents().find(".accordeon-block").not(this).slideUp().prev();
		$(this).next().not(":visible").slideDown().prev().parents();

	});

  $('.prompt-top, .prompt .close-ico').on('click', function (e) {
    e.preventDefault();

    if($(window).width() <= 768)
      $(this).parents('.prompt').toggleClass('active');
  });

  //modal
	var modalCont = $('.modal');
		
	$('.modal-btn').on('click',function(e){
		e.preventDefault();

		$(modalCont).removeClass('open');

		var id = '#' + $(this).attr('href');

    $('html, body').addClass('scroll-hidden');
		$(id).addClass('open');
		$('.modal-overlay').addClass('open-overlay');
	});

	$('.modal-close, .fancybox-close, .modal-cross').on('click',function(e){
    e.preventDefault();

		$(modalCont).removeClass('open');
		$('.modal-overlay').removeClass('open-overlay');
		$('.intermediate').removeClass('intermediate');
    $('html, body').removeClass('scroll-hidden');
	});

  if ($('.select').length > 0) {
    $('.select select').select2({
      minimumResultsForSearch: Infinity,
      dropdownParent: $('.select')
    });
    $('.select-search').each(function () {
      var $this = $(this);
      var parent = $(this).parents('.select');
      $this.select2({
        dropdownParent: parent
      });
    });

    $('.select-date .select-search').on('select2:select', function (e) {
      var data = e.params.data.text;
      $(this).parents('.prizes-block').find('.prizes-col').removeClass('active')
      $(this).parents('.prizes-block').find("[data-date='" + data + "']").addClass('active');
      //console.log(data);
    });
  }

	//forms
	function maskInit() {
	  $('.phone-mask').inputmask({
	    mask: "+7(999)999-99-99",
	    "clearIncomplete": true
	  });
	}
	maskInit();

	function checkValidate() {
    var form = $('form');

    $.each(form, function () {
        $(this).validate({
            ignore: [],
            errorClass: 'error',
            validClass: 'success',
            rules: {
                Region: {
                    required: true
                },
                City: {
                    required: true
                },
                Street: {
                    required: true
                },
                House: {
                    required: true
                },
                File: {
                    required: true
                },
                Text: {
                    required: true
                },
                Checkbox: {
                    required: true
                },
                FullName: {
                    required: true
                },
                LName: {
                    required: true
                },
                FName: {
                    required: true
                },
                MName: {
                    required: true
                },
                Date: {
                    required: true
                },
                Who: {
                    required: true
                },
                Adress: {
                    required: true
                },
                Numbers: {
                    required: true
                },
                Email: {
                    required: true,
                    Email: true
                },
                PhoneNumber: {
                    required: true,
                    PhoneNumber: true
                },
                Message: {
                    required: true
                },
                Password: {
                    required: true,
                    normalizer: function normalizer(value) {
                        return $.trim(value);
                    }
                }
            },
            errorPlacement: function (error, element) {
                var placement = $(element).data('error');
                $('.modal.open form').addClass('error-form');
                setTimeout(function() {
                   $('.modal.open form').removeClass('error-form');
                }, 3000);
                if (placement) {
                    $(placement).append(error);
                } else {
                    error.insertBefore(element);
                }
            },
            messages: {
                PhoneNumber: 'Некорректный номер',
                Email: 'Некорректный e-mail'
            },
        });
    });
    jQuery.validator.addMethod('Email', function (value, element) {
        return this.optional(element) || /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/.test(value);
    });
    jQuery.validator.addMethod('PhoneNumber', function (value, element) {
        return this.optional(element) || /\+7\(\d+\)\d{3}-\d{2}-\d{2}/.test(value);
    });
	}
	checkValidate();

});