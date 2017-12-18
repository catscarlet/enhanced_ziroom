// ==UserScript==
// @name                Enhanced Ziroom
// @namespace           https://github.com/catscarlet/enhanced_ziroom
// @description         Enhanced Ziroom
// @version             0.0.1
// @author              catscarlet
// @match               *://*.ziroom.com/z/nl/*.html*
// @require             https://code.jquery.com/jquery-latest.js
// @compatible          chrome  支持
// @run-at              document-end
// @grant               none
// ==/UserScript==

window.jQueryLatest = $.noConflict(true);

(function() {

    'use strict';

    var $ = window.jQueryLatest;

    $(function() {
        console.log('enhanced_ziroom loaded');
        getHouseList();
    });

    function getHouseList() {
        var houselist = $('#houseList li');
        houselist.each(function(index) {
            var priceDetail = $(this).find('.priceDetail');

            var detailUrl = priceDetail.find('.more').find('a').attr('href');
            var detailId = url2id(detailUrl);
            if (detailId) {
                priceDetail.append('<strong id=' + detailId + '>检测中...</strong>');
                getDetail(detailUrl, detailId);
            }
        });
    };

    function getDetail(detailUrl, detailId) {
        //console.log(detailUrl);
        $.ajax({
            type: 'GET',
            url: detailUrl,
            dataType: 'html',
            async: true,
            success: function(msg, textStatus, jqXHR) {
                checkDetail(msg, detailId);
            },
            error: function(msg) {
                console.log(msg);
            }
        });
    }

    function checkDetail(msg, detailId) {
        //console.log(msg);
        var regexp_status_avaliable = new RegExp(/\<a[^\/a].*class=\"btn view\".*\>(.*)\<\/a>/);
        var regexp_status_unavaliable = new RegExp(/\s\<a[^\/a].*class=\"btn view viewGray\".*\>(.*)\<\/a>/);
        var regexp_name = new RegExp(/\<div.*class=\"room_name\".*\>(.|\n)*\<h2\>((.|\n)*)\<\/h2\>/g);
        //console.log(msg.match(regexp_name));
        var name = domtext2text(msg.match(regexp_name)[0]);
        //console.log(name);

        var status;
        var status_value = false;

        var status_avaliable = msg.match(regexp_status_avaliable);
        var status_unavaliable = msg.match(regexp_status_unavaliable);
        if (status_avaliable) {
            status = domtext2text(status_avaliable[0]);
            status_value = true;
        } else {
            status = domtext2text(status_unavaliable[0]);
            status_value = false;
        }

        drawList(status_value, status, detailId);
    }

    function drawList(status_value, status, detailId) {
        //console.log(status);
        //console.log(status_value);
        //console.log(detailId);
        var css;
        var thedom = $('#' + detailId);

        if (status_value) {
            thedom.text(status);
            thedom.parent().parent().css('background-color', 'lightgreen');
        } else {
            thedom.text(status);
            thedom.parent().parent().css('background-color', 'grey');
        }

    }

    function domtext2text(domtext) {
        //console.log(domtext);
        var rst;
        rst = $.trim($.text($.parseHTML(domtext)));
        //console.log(rst);
        return rst;
    }

    function url2id(url) {
        //console.log(url)
        var regexp_url2id = new RegExp(/\/(\d+)\.html/);
        var rst = url.match(regexp_url2id);
        if (rst) {
            return rst[1];
        }

        return false;
    }
})();
