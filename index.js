// ==UserScript==
// @name            bilibili_helper
// @version         0.1
// @description     Improve user experience of bilibili.
// @author          blackmiaool
// @match           http://www.bilibili.com/
// @grant           GM_addStyle
// @grant           GM_setValue
// @grant           GM_getValue
// @grant           GM_log
// @run-at          document-end
// ==/UserScript==

(function () {
    'use strict';
    var log = GM_log;
    var slideRows = GM_getValue("slideRows") || {};
    console.log(slideRows, "slideRows")
        //    $(".i_menu_community_msg_btn .num").remove();
    var headstyle = ".i_menu_community_msg_btn .num" +
        "{display:none !important;opacity:0 !important;} " +
        ".slide-btn" +
        "{margin-top:5px;font-size: 10px;padding: 2px;position: absolute;left: -32px;top: 6px;margin: auto;}" +
        ".container-row .b-l .b-body" +
        "{margin-bottom:20px;}"+
        "div.container-row .b-r.b-hotspot"+
        "{height:initial !important;min-height:initial !important;}";
    GM_addStyle(headstyle);
    $("#index_container>.container-row .b-l .b-head-i+.b-head-t").after('<button class="slide-btn">收起</button>');
    var id;
    var $row;
    var $btn;
    var state;
    for(var i in slideRows){
        id=i;
        $row=$("#index_container>.container-row#"+id);
        $btn=$row.find(".slide-btn");
        $row.data("up","0");
        state=false;
        setState($btn,$row,state);
    }
    function setState($btn, $row, state) {
        if (!state) {
            $row.data("up", "0");
            $btn.text("放下");
            $row.find(".b-body").slideUp();
            slideRows[$row.attr("id")] = 1;
            GM_setValue("slideRows", slideRows)
            $row.find(".b-r").css("min-height", "0px").css("height", "0px");
        } else {
            $row.data("up", "1");
            $btn.text("收起");
            $row.find(".b-body").slideDown();
            delete slideRows[$row.attr("id")];
            GM_setValue("slideRows", slideRows)
        }
    }
    $(".slide-btn").on("click", function () {
        var $btn = $(this);
        var $row = $btn.parents(".container-row");
        var state = !($row.data("up")=="1"||!$row.data("up"));
        setState($btn,$row,state);
    });
})();