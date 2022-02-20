(function( $ ) {
    var _size;
    $.fn.pte = function(p) {
        var defaults = {
            data : '/Labs/PeriodicTable/jquery.pte.json',
            config : {},
            clickHandler : function() {}
        }
        var params = $.extend(defaults, p);
        var obj = $(this);
        
        var pte_table_left = (params.config.x==undefined)?10:params.config.x;
        var pte_table_top = (params.config.y==undefined)?10:params.config.y;
        var pte_element_size = (params.config.size==undefined)?40:params.config.size;
        var pte_element_spacing = (params.config.spacing==undefined)?1:params.config.spacing;
        var pte_element_tooltip = (params.config.tooltip==undefined)?false:params.config.tooltip;
        var pte_element_closable = (params.config.closable==undefined)?false:params.config.closable;
        var _row, _col, _top, _left, _width, _height;
        _size = pte_element_size + pte_element_spacing;
        _width = 19*_size+10+'px';
        _height = 12*_size+10+'px';
        _top = pte_table_top+'px';
        _left = pte_table_left+'px';
        $(obj).addClass('pte_table').css('top',_top).css('left',_left).css('width',_width).css('height',_height).css('position','absolute');
        
        $.getJSON(params.data, function(data) {
            var elements = [];
            $.each(data.PERIODIC_TABLE.ATOM, function(key, val) {
                var n = parseInt(val.ATOMIC_NUMBER);
                if(n == 1) {
                    _row = 0;
                    _col = 0;
                } else if(n == 2) {
                    _row = 0;
                    _col = 17;
                } else if(n <= 4) {
                    _row = 1;
                    _col = n - 3;
                } else if(n <= 10) {
                    _row = 1;
                    _col = n + 7;
                } else if(n <= 12) {
                    _row = 2;
                    _col = n - 11;
                } else if(n <= 18) {
                    _row = 2;
                    _col = n - 1;
                } else if(n <= 36) {
                    _row = 3;
                    _col = n - 19;
                } else if(n <= 54) {
                    _row = 4;
                    _col = n - 37;
                } else if(n <= 57) {
                    _row = 5;
                    _col = n - 55;
                } else if(n <= 71) {
                    _row = 8;
                    _col = n - 54;
                } else if(n <= 86) {
                    _row = 5;
                    _col = n - 69;
                } else if(n <= 89) {
                    _row = 6;
                    _col = n - 87;
                } else if(n <= 103) {
                    _row = 9;
                    _col = n - 86;
                } else {
                    _row = 6;
                    _col = n - 101;
                }
                _top = ( (2+_row) * _size)+'px';
                _left = ( (1+_col) * _size)+'px';
                _width = pte_element_size+'px';
                _height = pte_element_size+'px';
                var ediv = $('<div>').addClass('pte_element').css('left',_left).css('top',_top).css('width',_width).css('height',_height).css('position','absolute').css('overflow','hidden').css('cursor','pointer').html('<div class="pte_number">' 
                    + val.ATOMIC_NUMBER + '</div><div class="pte_symbol">' + val.SYMBOL 
                    + '</div>').appendTo(obj).click(function() {
                        params.clickHandler(val);
                    });
                if(pte_element_tooltip) {
                    ediv.hover(function(){
                        $('.pte_detail').remove();
                        var vside = 'top';
                        var hside = 'left';
                        _top = $(this).position().top;
                        if(_top <= 4*_size){
                            _top =  _top + 'px';
                        } else if (_top <= 5*_size) {
                            _top =  _top-_size + 'px';
                        } else if (_top <= 6*_size) {
                            _top =  _top-2*_size + 'px';
                        } else if (_top <= 7*_size) {
                            _top =  _top-3*_size + 'px';
                        } else if (_top <= 8*_size) {
                            _top =  3*_size+10 + 'px';
                            vside = 'bottom';
                        } else if (_top <= 10*_size) {
                            _top =  _size+10 + 'px';
                            vside = 'bottom';
                        } else {
                            _top =  10 + 'px';
                            vside = 'bottom';
                        }
                        _width = 9*_size + 'px';
                        _left = $(this).position().left;
                        if( _left <= 9*_size ) {
                            _left = _left+_size+'px';
                        } else {
                            _left = _left-9*_size+'px';
                        }
                        $('<div>').addClass('pte_detail').css('position','absolute').css(hside,_left).css(vside,_top).css('width',_width).appendTo(obj).pte_detail(val);
                    });
                }
            });
            
            for(i=1;i<=7;i++){
                _top = (i+1.3)*_size + 'px';
                _left = '0' + 'px';
                $('<div>').addClass('pte_label').html(i).css('position','absolute').css('top',_top).css('left',_left).css('width',_width).css('height',_height).css('text-align','center').appendTo(obj);
            }
            
            for(i=1;i<=18;i++){
                if(i==1||i==18){
                    _top = 1.4*_size + 'px';
                } else if (i>2 && i<13) {
                    _top = 4.4*_size + 'px';
                } else {
                    _top = 2.4*_size + 'px';
                }
                _left = i*_size + 'px';
                $('<div>').addClass('pte_label').html(i).css('position','absolute').css('top',_top).css('left',_left).css('width',_width).css('height',_height).css('text-align','center').appendTo(obj);
            }

            _top = '10px';
            _left = '10px';
            $('<div>').addClass('pte_title').html("TABELA PERIÓDICA").css('position','relative').css('top',_top).css('left',_left).appendTo(obj);
            _top = 10.3*_size + 'px';
            _left = _size + 'px';
            $('<div>').addClass('pte_label').html("Lantanídeos").css('position','absolute').css('top',_top).css('left',_left).appendTo(obj);
            _top = 11.3*_size + 'px';
            _left = _size + 'px';
            $('<div>').addClass('pte_label').html("Actinídeos").css('position','absolute').css('top',_top).css('left',_left).appendTo(obj);
            
            if(pte_element_closable) {
                _left = 0.2*_size + 'px';
                _top = 0.2*_size + 'px';
                $('<div>').addClass('pte_close').html('[x]').css('position','absolute').css('right',_left).css('top',_top).css('cursor','pointer').click(function(){obj.remove();}).appendTo(obj);
            }
        });
    };
    $.fn.pte_detail = function(element, column) {
        var obj = $(this);
        var detail = '';
        var _width;
        obj.hover(function(){$(this).remove();});
        for( x in element) {
            if(typeof(element[x])=='object'){
                detail += '<div class="pte_detail_label">' + pte_detail_fmt(x) + '</div><div class="pte_detail_value">' + element[x].VALUE + ' ' + element[x].UNIT + '</div>';
            } else {
                detail += '<div class="pte_detail_label">' + pte_detail_fmt(x) + '</div><div class="pte_detail_value">' + element[x] + '</div>';
            }
        }
        obj.html(detail);
        _width = 3*_size+'px';
        $('.pte_detail_label').css('width',_width);
        _width = 5*_size+'px';
        $('.pte_detail_value').css('width',_width);
    }
    function pte_detail_fmt (str) { 
        str = str.replace(/_/g, " ");
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) { 
            return index == 0 ? letter.toUpperCase() : letter.toLowerCase(); 
        }).replace(/\s+/g, '&nbsp;'); 
    }
})( jQuery );