tiansu_suggestion = function($container, url, params, tiansu_id) {
    var suggestion = [];
    if (suggestion.length < 1) {
        getList();
    }

    function getList() {
        // $.ajax({
        //     url: url,
        //     dataType: "json",
        //     type: "POST",
        //     async: false,
        //     data: { Inputs: JSON.stringify(params) },
        //     success: function(json) {
        //         try {
        //             var description = "";

        //             function writeObj(obj) {
        //                 for (var i in obj) {
        //                     var property = obj[i];
        //                     description += i + " = " + property + "\n";
        //                     if (typeof obj[i] == "object") {
        //                         writeObj(obj[i])
        //                     }
        //                 }
        //             }
        //             //writeObj(json);
        //             //writeObj(json['Plazas']);
        //             //alert(description);
        suggestion = json;
        description = "";
        //             //writeObj(suggestion);
        //             //alert(description);
        //             //alert('输入框错误调试信息0:ajax成功' + suggestion[0].SquareName);
        //         } catch (e) {
        //             alert('输入框调试信息2:事件初始化发生错误 ' + e)
        //         }

        //     },
        //     error: function(jqXHR, textStatus, errorThrown) {
        //         alert('输入框调试信息02:ajax失败 ' + jqXHR + '|||' + textStatus + '|||' + errorThrown);
        //     },
        //     complete: function(XMLHttpRequest, textStatus) {
        //         //alert('输入框错误调试信息03:ajax失败' + XMLHttpRequest + '|||' + textStatus);
        //     }
        // });
    }



    $container.on('click', '#quickdelete', function(e) {
        $('input[type="text"]', $container).val('');
        $('.tiansu_suggestion', $container).hide();
        $('ul', $container).empty();
    });
    $container.on('mousedown', 'li', function(e) {
        $('input[type="text"]', $container).val(this.innerHTML);
        for (var i = 0; i < suggestion.length; i++) {
            if (suggestion[i].dongruan_name === this.innerHTML) {
                $('input[ type="text"]', $container).attr('data-id', suggestion[i].dongruan_id);
                break;
            }
        }
    });
    $('body').on('click.tiansu_suggestion', function(e) {
        if (e.target !== $('input[type="text"]', $container)[0]) {
            $('.tiansu_suggestion', $container).hide();
            $('ul', $container).empty();
        }
    });
    $container.on('input mousedown', 'input[type="text"]', function(e) {
        //alert('输入框错误调试信息4:事件成功触发,事件类型'+ e.type);
        try {
            //console.log(e)
            if (e.type == 'input') {
                $('input[type="text"]', $container).attr('data-id', '500000000');
            }
            if (this.value === '') {
                $('input[type="text"]', $container).attr('data-id', '');
                $('.tiansu_suggestion', $container).hide();
                $('ul', $container).empty();
                return;
            }
            var result = [];
            //alert('输入框错误调试信息4' + suggestion[0]);
            for (var i = 0; i < suggestion.length; i++) {
                var index = suggestion[i].dongruan_name.indexOf(this.value);
                console.log(suggestion[i].dongruan_name)
                if (index !== -1) {
                    result.push(index + '@#seprate#@' + suggestion[i].dongruan_name);
                    if (suggestion[i].dongruan_name == this.value) {
                        $('input[type="text"]', $container).attr('data-id', suggestion[i].dongruan_id);
                    }
                }
            }
            result = result.sort(function(a, b) {
                return Number(a.slice(0, a.indexOf('@#seprate#@'))) - Number(b.slice(0, b.indexOf('@#seprate#@')));
            });
            //alert('输入框错误调试信息5' + result[0]);
            var html = '';
            var max = result.length;
            for (var j = 0; j < max; j++) {
                html += '<li>' + result[j].slice(result[j].indexOf('@#seprate#@') + 11) + '</li>';
            }
            //console.log(html);
            //alert('输入框错误调试信息6' + html);
            if (result.length > 0) {
                $('ul', $container).empty();
                $('.tiansu_suggestion', $container).show();
                $('ul', $container).append(html);
            } else {
                $('.tiansu_suggestion', $container).hide();
                $('ul', $container).empty();
            }
        } catch (e) {
            alert('输入框错误调试信息3:事件中发生错误 ' + e)
        }
    })
};