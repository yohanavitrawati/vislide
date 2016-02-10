(function($){
    $.fn.ViSlide = function(options){
    var object = this;

    var defaults = {
        title : "h3",
        has_subtitle : false,
        subtitle : "h4",
        variant_until : false,
        until : "hr",
        except : ""
    }
    var options = $.extend(defaults, options);
    var object = $(this);
    var header = $(object).find(options.title);
    if(!options.variant_until){
        header.addClass('slide_header');
        
        //set content
        var i = 0;
        $(object).find(options.title).each(function(){
            
            if(!$(this).hasClass('not_expand')){
                $(this).nextUntil(options.title).wrapAll('<div class="slide_box slide_box'+i+'"></div>');
                $('.slide_box'+i).prev(options.title).prependTo('.slide_box'+i);
                $('.slide_box'+i).find(options.title).nextAll().wrapAll('<div class="slide_content"></div>');
                $('.slide_box'+i).find('.slide_content:not(:has(table.table-plain))').addClass('with_padding');
                $('.slide_box'+i).append('<a href="/" class="slide_active" id="slide_active'+i+'">Active</a>');
                i++;       
                if(options.has_subtitle){
                    var sub_header = $(this).parent('.slide_box').find(options.subtitle);
                    if(sub_header.size() > 0){
                        //$(this).parent('.slide_box').addClass('active');
                        //$(this).parent('.slide_box').find('.slide_active').addClass('open');
                        var n = 0;
                        sub_header.each(function(){
                            $(this).nextUntil(options.subtitle).wrapAll('<div class="slide_box_sub slide_box_sub'+n+'"></div>');
                            $(this).prependTo($(this).next('.slide_box_sub'));
                            $(this).addClass('slide_header sub_title');
                            $(this).nextAll().wrapAll('<div class="slide_content_sub"></div>');
                            $(this).parent().append('<a href="/" class="slide_active_sub slide_active" id="slide_active_sub'+n+'">Active</a>');
                            n++;
                        });
                    }
                }
            }
        });

        //first view
        object.find('.slide_box:first').addClass('active');
        object.find('.slide_box:first').children('.slide_active').addClass('open');

        
    }else{
        if (options.except != ""){
            $('<hr />').insertAfter('.main_header');
        }else{
            $(this).prepend('<hr />');
        }
        var count_box = options.until;
        var i = 0;
        $(object).find(options.until).each(function(){
            $(this).nextUntil(options.until).wrapAll('<div class="slide_box slide_box'+i+'"></div>');
            if($('.slide_box'+i).children(':header:first-child').length > 0){
                $('.slide_box'+i).children(':header:first-child').addClass('slide_header');
                $('.slide_box'+i).find('.slide_header').nextUntil(options.until).wrapAll('<div class="slide_content"></div>');
                $('.slide_box'+i).find('.slide_content:not(:has(table.table-plain))').addClass('with_padding');
                if(!$('.slide_box'+i).find('.slide_header').hasClass('not_expand')){
                    $('.slide_box'+i).append('<a href="/" class="slide_active" id="slide_active'+i+'">Active</a>');
                }
            }else{
                $('.slide_box'+i).children().wrapAll('<div class="slide_content"></div>');
                $('.slide_box'+i).children('.slide_content').css('display', 'block');
            }
            
            if(options.has_subtitle){
                    var sub_header = $('.slide_box'+i).find(options.subtitle);
                    if(sub_header.size() > 0){
                        //$(this).parent('.slide_box').addClass('active');
                        //$(this).parent('.slide_box').find('.slide_active').addClass('open');
                        var n = 0;
                        sub_header.each(function(){
                            $(this).nextUntil(options.subtitle).wrapAll('<div class="slide_box_sub slide_box_sub'+n+'"></div>');
                            $(this).prependTo($(this).next('.slide_box_sub'));
                            $(this).addClass('slide_header sub_title');
                            $(this).nextAll().wrapAll('<div class="slide_content_sub"></div>');
                            $(this).parent().append('<a href="/" class="slide_active_sub slide_active" id="slide_active_sub'+n+'">Active</a>');
                            n++;
                        });
                    }
                }
             i++;
        });
        //first view
        object.find('.slide_box:first').addClass('active');
        object.find('.slide_box:first').children('.slide_active').addClass('open');
        
        $(object).find(options.until).css('display', 'none');
    }
    
    //set slide
        $('.slide_active').click(function(e){
            e.preventDefault();
            if (!$(this).hasClass('open')){
                $(this).parent().find('.slide_content').slideDown(function(){
                    $(this).parent().addClass('active');
                    $(this).next('.slide_active').addClass('open');
                });
            }else{
                $(this).parent().find('.slide_content').slideUp(function(){
                    $(this).parent().removeClass('active');
                    $(this).next('.slide_active').removeClass('open');
                });
            }
        });
        if(options.has_subtitle){
            $('.slide_active_sub').click(function(e){
                e.preventDefault();
                if (!$(this).hasClass('open')){
                    $(this).parent().find('.slide_content_sub').slideDown(function(){
                        $(this).parent().addClass('active');
                        $(this).next('.slide_active_sub').addClass('open');
                    });
                }else{
                    $(this).parent().find('.slide_content_sub').slideUp(function(){
                        $(this).parent().removeClass('active');
                        $(this).next('.slide_active_sub').removeClass('open');
                    });
                }
            });
        }
}
})(jQuery);