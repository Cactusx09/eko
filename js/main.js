$(document).ready(function(){
    if($('.s_main').length){
        $('section').not('.s_main').addClass('wow fadeInUp');
        $('.footer').addClass('wow opacity');
        var wow = new WOW({
            offset: 100,
            mobile: false
        });
        wow.init();
    }

    if(getMobileOperatingSystem!=null){
        $('.header__nav_wrp').sticky({
            zIndex: 999
        });
        var bottom = $(document).height() - $('.s_catalog__body').outerHeight();
        $('.s_catalog__filter').sticky({
            zIndex: 997,
            topSpacing: $('.header__nav_wrp').outerHeight(),
            bottomSpacing: bottom
        });
    }

    ////sliders
    //main
    if($('.s_main__slider').length){

        var mainSlider = new Swiper('.s_main__slider_wrp',{
            slidesPerView: 1,
            loop: true,
            speed: 1000,
            parallax: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            navigation:{
                prevEl: '.s_main__slider_wrp .g_arr__prev',
                nextEl: '.s_main__slider_wrp .g_arr__next'
            },
            on:{
                slideChange: function(){
                    var n = this.realIndex;
                    console.log(n);
                    $('.s_main__bg_item').eq(n).addClass('_current')
                        .siblings().removeClass('_current');
                }
            }
        });
    }
    //best
    if($('.s_best__slider').length){
        var bestSlider = new Swiper('.s_best__slider_wrp',{
            slidesPerView: 4,
            loop: true,
            speed: 700,
            spaceBetween: 40,
            navigation:{
                prevEl: '.s_best__slider_wrp .g_arr__prev',
                nextEl: '.s_best__slider_wrp .g_arr__next'
            },
            breakpoints:{
                1200:{
                    spaceBetween: 20
                },
                1000:{
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                800:{
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                550:{
                    slidesPerView: 1,
                    spaceBetween: 20
                }
            }
        });
    }
    //item
    if($('.s_item__block_left').length){
        var item = $('.s_item__block_left'),
            galleryTop = new Swiper(item.find('.s_item__img'), {
                spaceBetween: 20,
                slidesPerView: 1,
                speed: 900,
                autoHeight: false,
                nested: true
            }),
            galleryThumbs = new Swiper(item.find('.s_item__thumb'), {
                spaceBetween: 10,
                centeredSlides: true,
                slidesPerView: 3,
                touchRatio: 0.2,
                slideToClickedSlide: true,
                autoHeight: false,
                nested: true,
                speed: 700,
                breakpoints:{

                }
            });
        galleryTop.controller.control = galleryThumbs;
        galleryThumbs.controller.control = galleryTop;
    }
    //cert
    if($('.s_cert__slider').length){
        var bestSlider = new Swiper('.s_cert__slider_wrp',{
            slidesPerView: 6,
            loop: true,
            speed: 700,
            spaceBetween: 20,
            navigation:{
                prevEl: '.s_cert__slider_wrp .g_arr__prev',
                nextEl: '.s_cert__slider_wrp .g_arr__next'
            },
            breakpoints:{
                950:{
                    slidesPerView: 4
                },
                550:{
                    slidesPerView: 3
                },
                450:{
                    slidesPerView: 2
                }
            }
        });
    }
    //similar
    if($('.s_similar__slider').length){
        var similarSlider = new Swiper('.s_similar__slider_wrp',{
            slidesPerView: 3,
            loop: true,
            speed: 700,
            spaceBetween: 20,
            navigation:{
                prevEl: '.s_similar__slider_wrp .g_arr__prev',
                nextEl: '.s_similar__slider_wrp .g_arr__next'
            },
            breakpoints:{
                1200:{
                    spaceBetween: 20
                },
                1000:{
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                800:{
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                550:{
                    slidesPerView: 1,
                    spaceBetween: 20
                }
            }
        });
    }
    //case
    if($('.s_case__block_left').length){
        var item = $('.s_case__block_left'),
            galleryTop = new Swiper(item.find('.s_case__img'), {
                spaceBetween: 10,
                slidesPerView: 1,
                speed: 900,
                autoHeight: false,
                direction: 'vertical',
                nested: true
            }),
            galleryThumbs = new Swiper(item.find('.s_case__thumb'), {
                spaceBetween: 10,
                centeredSlides: true,
                slidesPerView: 3,
                touchRatio: 0.2,
                autoHeight: false,
                slideToClickedSlide: true,
                direction: 'vertical',
                nested: true,
                speed: 700
            });
        galleryTop.controller.control = galleryThumbs;
        galleryThumbs.controller.control = galleryTop;
    }

    //validate
    $("._validate").each(function(){
        var it = $(this);
        it.validate({
            rules: {
                form: {required: false},
                name: {required: true},
                phone: {required: true},
                mail: {required: false},
                categ: {required: false},
                city: {required: false},
                comment: {required: true},
                namephone: {required: true},
                review: {required: true},
                col: {required: false}
            },
            messages: {},
            errorPlacement: function (error, element) {},
            submitHandler: function (form) {
                var data = new FormData(it[0]);
                $.ajax({
                    url: 'mail.php',
                    type: 'POST',
                    data: data,
                    cache: false,
                    processData: false,
                    contentType: false,
                    success: function( respond, textStatus, jqXHR ){
                        $('.popup').removeClass('_visible');
                        var name = 'thnx'
                        popup = $('.popup_'+name),
                            popup_h = popup.outerHeight(),
                            popup_w = popup.outerWidth(),
                            h = $(window).height(),
                            px = window.pageYOffset + h/2 - popup_h/2;
                        popup.css({
                            'top': px+'px',
                            'margin-left': '-'+ popup_w/2 +'px',
                        });
                        $('.popup.popup_'+name+', .overlay').addClass('_visible');
                        setTimeout(function () {
                            if ($('.popup_thnx').hasClass('_visible')) {
                                $('.popup_thnx, .overlay').removeClass('_visible');
                            }
                        }, 2000);
                        $("form").trigger( 'reset' );
                    },
                    error: function( jqXHR, textStatus, errorThrown ){
                        console.log('ОШИБКИ AJAX запроса: ' + textStatus );
                    }
                });
            },
            success: function () {
            },
            highlight: function (element, errorClass) {
                $(element).addClass('_error');
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass('_error');
            }
        });
    });

    //prevent only numbers
    $('input[name="phone"],._num').on('keydown',function(e){
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl/cmd+A
            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: Ctrl/cmd+C
            (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: Ctrl/cmd+X
            (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    //table wrp
    if($('.g_txt table').length){
        $('.g_txt table').wrap('<div class="g_txt__table_wrp"><div class="g_txt__table"></div></div>');
    }
    //video wrp
    if($('.g_txt iframe').length){
        $('.g_txt iframe').wrap('<div class="g_txt__video"></div>');
    }
    if($('.g_txt__toc').length){
        $('.g_txt__toc').initTOC({
            selector: 'h2, h3',
            scope: 'body',
            overwrite: false,
            prefix: 'toc'
        });
    }

    //map init
    if($('.s_contacts__map').length){
        mapInitialize('map');
    }

    //gallery init
    initPhotoSwipeFromDOM('._gallery');


    //selects
    $('.g_select__head').click(function(e){
        e.stopPropagation();
        var el = $(this),
            select = el.closest('.g_select');
        select.toggleClass('_active');

    });
    $('.g_select__body a').click(function(e){
        e.stopPropagation();
        e.preventDefault();
        var a = $(this),
            txt = a.text(),
            select = a.closest('.g_select'),
            input = select.find('input'),
            head = select.find('.g_select__head span');
        a.addClass('_current').siblings().removeClass('_current');
        input.val(txt);
        head.text(txt);
        select.removeClass('_error _active');

    });

    $(window).click(function(){
        $('.g_select').removeClass('_active');
    });

    //popups
    $('.popup').each(function(){
        var popup = $(this),
            popup_h = popup.outerHeight(),
            popup_w = popup.outerWidth(),
            h = $(window).height(),
            px = window.pageYOffset + h/2 - popup_h/2;
        popup.css({
            'top': px+'px',
            'margin-left': '-'+ popup_w/2 +'px',
        });
    });
    $('._open_pop').click(function(e){
        e.preventDefault();
        var visible = $('.popup._visible');
        visible.addClass('_back');
        setTimeout(function(){
            visible.removeClass('_visible _back');
        },700);
        var name = $(this).data('name'),
            txt = $(this).data('txt'),
            popup = $('.popup_'+name),
            popup_h = popup.outerHeight(),
            popup_w = popup.outerWidth(),
            h = $(window).height(),
            px = window.pageYOffset + h/2 - popup_h/2;
        popup.css({
            'top': px+'px',
            'margin-left': '-'+ popup_w/2 +'px',
        });
        if(txt){
            popup.find('.popup__title').html(txt);
            popup.find('input[name="form"]').val(txt);
        }
        if(name=="buy"){
            $('.popup_buy__item h5').html($(this).data('item'));
            $('.popup_buy__item_row>span').html($(this).data('price'));
            $('.popup_buy__item_left').attr('style', 'background-image: url('+ $(this).data('img') +')');
        }
        popup.find('form').trigger( 'reset' );
        $('.popup.popup_'+name+', .overlay').addClass('_visible');
        $('.s_main__menu').removeClass('_active');
    });
    $('.overlay, ._close_pop').click(function(e){
        e.preventDefault();
        $('.popup._visible').addClass('_back');
        $('.overlay').removeClass('_visible');
        setTimeout(function(){
            $('.popup._visible').removeClass('_visible _back');
        },700);
    });

    //main menu sub
    $('.s_main__menu_item._sub').on('mouseenter', function(e){
        e.preventDefault();
        $(this).addClass('_active');
    }).on("mouseleave", function(e){
        e.preventDefault();
        $(this).removeClass('_active');
    });

    //header mobile nav
    $('.header__nav_hamb').click(function(){
        $('.header__nav').addClass('_active');
    });
    $('.header__nav_close').click(function(){
        $('.header__nav').removeClass('_active');
    });

    //header mobile aside
    $('.header__nav_menuHamb').click(function(){
        $('.s_main__menu').toggleClass('_active');
        if($('.s_main__menu').hasClass('_active')){
            $('.overlay').addClass('_visible');
        }else{
            $('.overlay').removeClass('_visible');
        }
        $('.popup').removeClass('_visible');
    });
    $('.overlay').click(function(){
        $('.s_main__menu').removeClass('_active');
    });

    if(Modernizr.mq('only screen and (max-width: 1000px)')){
        $('.header__adress').insertAfter('.header__nav_menuHamb');

        if($('.s_main__menu').length){
            $('.s_main__menu').insertAfter('.header__nav_wrp');
        }else{
            $('.header__nav_menuHamb').remove();
        }
    }

    //anchors
    $('._anchor').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        var el = $(this).attr('href'),px;
        if(el==0){
            px = 0;
        }else{
            px = $('.'+el).offset().top;
        }
        $('body,html').stop().animate({scrollTop:px},500);
    });

    //input number
    $('.g_number__arr_top').click(function(){
        var arr = $(this),
            input = arr.closest('.g_number').find('input');
        input.val(Number(input.val())+1);
    });
    $('.g_number__arr_bot').click(function(){
        var arr = $(this),
            input = arr.closest('.g_number').find('input'),
            val = input.val();
        if(val>1){
            input.val(Number(input.val())-1);
        }
    });

    //colors
    $('.inputs .text').click(function(){
        $(this).closest('.inputs').toggleClass('toggle');
    });
    $('.inputs li').click(function(){
        $(this).closest('.inputs').find('.text').text($(this).data('text'));
        $(this).closest('.inputs').removeClass('toggle');

        var	curr_steps	= $(this).closest('.inputs').data('step'),
            curr_type	= $(this).closest('.inputs').data('type'),
            next_steps	= curr_steps+1,
            next_type	= $(this).data('type-next');

        for(var x = next_steps; x < 100; x++){
            $('.inputs[data-step="'+x+'"]').removeClass('active')
        }
        $('.inputs[data-step="'+curr_type+'"][data-type="'+curr_steps+'"]').addClass('active');
        $('.inputs[data-step="'+next_steps+'"][data-type="'+next_type+'"]').addClass('active');



    });
    $('.flexibels .col .plus').click(function(){
        var color = $(this).closest('.col').data('colors');
        var editor = $(this).closest('.flexibels').find('.rox[data-colors="'+color+'"]');
        var total_vals = 0
        var editor2 = $(this).closest('.flexibels').find('.roz[data-colors="'+color+'"]');
        $(this).closest('.flexibels').find('.rox').each(function(){
            total_vals = $(this).data('val') + total_vals;
        });
        var vals = editor.data('val');
        vals = vals + 20;
        var image = "url("+editor2.data('image')+'_'+vals+'.png)';

        if(vals != 100 && total_vals+20 != 100){
            editor.css({
                'height': vals+'%',
                'background-color': color
            });
            editor2.css({
                'background-image': image
            })
            editor.data('val',vals);
            editor.find('span').text(vals+'%');
        }
        total_vals = 0;
        $(this).closest('.flexibels').find('.rox').each(function(){
            total_vals = $(this).data('val') + total_vals;
        });
        var ret = 100 - total_vals;
        $(this).closest('.flexibels').find('.bg').find('span').text(ret+"%");
    });
    if($('select').length){
        $('select').select2({minimumResultsForSearch: Infinity,width:60});
    }
    $(document).click(function (e){ // событие клика по веб-документу
        var div = $(".colores"); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) { // и не по его дочерним элементам
            $('.colores').removeClass('toggle'); // скрываем его
        }
    });
    $('.flexibels .col .minus').click(function(){
        var color = $(this).closest('.col').data('colors');
        var editor = $(this).closest('.flexibels').find('.rox[data-colors="'+color+'"]');
        var editor2 = $(this).closest('.flexibels').find('.roz[data-colors="'+color+'"]');
        var total_vals = 0
        $(this).closest('.flexibels').find('.rox').each(function(){
            total_vals = $(this).data('val') + total_vals;
        });
        var vals = editor.data('val');
        vals = vals - 20;
        var image = "url("+editor2.data('image')+'_'+vals+'.png)';
        if(vals != -20 && total_vals-20 != -20){
            editor.css({
                'height': vals+'%',
                'background-color': color
            });
            editor2.css({
                'background-image': image
            })
            editor.data('val',vals);
            if(vals == 0){
                editor.find('span').text('');
            } else{
                editor.find('span').text(vals+'%');
            }
        } else{
            editor2.css('background-image','none');
        }
        total_vals = 0;
        $(this).closest('.flexibels').find('.rox').each(function(){
            total_vals = $(this).data('val') + total_vals;
        });
        var ret = 100 - total_vals;
        $(this).closest('.flexibels').find('.bg').find('span').text(ret+"%");
    });

    //faq click
    $('.s_faq .s_reviews__item').click(function(){
        $(this).toggleClass('_active');
    });
});


//gmap init
function mapInitialize(el_id) {
    var center = $('#'+el_id).data('center').split(','),
        zoom = $('#'+el_id).data('zoom');
    var center = new google.maps.LatLng(center[0],center[1]);
    var mapOptions = {
        zoom: zoom,
        center: center,
        mapTypeControl: false,
        scrollwheel: false,
        navigationControl: false,
        scaleControl: false
    };
    var mapElement = document.getElementById(el_id);
    var map = new google.maps.Map(mapElement, mapOptions);


    var points = $('#'+el_id).data('points').split(';');
    points.forEach(function(feature) {
        var dot_info = feature.split('['),
            dot = dot_info[0].split(','),
            content = dot_info[1];
        var icoImg = {
            path: 'M8 0C3.6 0 0 3.63 0 8.1c0 1.16.24 2.28.7 3.3 2 4.44 5.83 9.1 6.96 10.44.1.1.2.16.34.16.13 0 .25-.06.34-.16 1.13-1.33 4.96-6 6.96-10.44.46-1.02.7-2.14.7-3.3C16 3.63 12.4 0 8 0zm0 12.3c-2.3 0-4.16-1.88-4.16-4.2C3.84 5.78 5.7 3.9 8 3.9s4.15 1.88 4.15 4.2c0 2.32-1.86 4.2-4.15 4.2z',
            fillColor: '#e72929',
            fillOpacity: 1,
            scale: 2.6,
            strokeOpacity: 0
        };
        var marker = new google.maps.Marker({
            position: {
                lat: Number(dot[0]),
                lng: Number(dot[1])
            },
            icon: icoImg,
            map: map,
            title: "Мы находимся тут!",
            optimized: false
        });
    });
}

//mobile hover disable
function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return null;
}

if (getMobileOperatingSystem()) {
    try {
        for (var si in document.styleSheets) {
            var styleSheet = document.styleSheets[si];
            if (!styleSheet.rules) continue;

            for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                if (!styleSheet.rules[ri].selectorText) continue;

                if (styleSheet.rules[ri].selectorText.match(':hover')) {
                    styleSheet.deleteRule(ri);
                }
            }
        }
    } catch (ex) {}
}
//gallery
var initPhotoSwipeFromDOM = function(gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes
            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML;
            }

            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            }

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) {
                continue;
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
            params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if(pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {
            bgOpacity: 0.9,
            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();
                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }

        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

//preloader
function preloader(){
    setTimeout(function(){
        $('body,html').addClass('_visible');
    },1000);
}
//onload event
window.addEventListener ?
    window.addEventListener("load",preloader,false)
:
window.attachEvent && window.attachEvent("onload",preloader);
