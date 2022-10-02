// ==UserScript==
// @name         Toby'Blog 色图
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @require      https://lib.baomitu.com/jquery/3.6.0/jquery.js
// @match        https://tobyprime.top/lolicon-gui/
// @match        http://192.168.65.128:4000/lolicon-gui/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lolicon.app
// @grant        GM_xmlhttpRequest
// ==/UserScript==

$("#search").click(function() {
    var tags = $("#tag").val().trim().split(/\s+/)
    var index=tags.indexOf("r18");
    if(index>=0){
        tags.splice(index,1);
    }

    GM_xmlhttpRequest({
        method: "get",
        url: `https://api.lolicon.app/setu/v2?keyword=${$("#keyword").val()}&tag=${tags.join("&tag=")}&num=${ $("#num").val()}&size=original&size=regular&r18=${Number(index>=0)}`,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        onload: function(r) {
            var return_value = JSON.parse(r.response)

            var image_datas = return_value["data"]

            var gallery = "<p>"
            for(let data of image_datas){
                gallery += `
                <a href=${data['urls']['original']} data-fancybox="gallery" data-caption="${data['title']}:${data['pid']}" data-thumb="${data['urls']['original']}">
                <img src="${data['urls']['regular']}" alt="${data['urls']['regular']}"></a><br>`
            }
            gallery += "</p>"
            console.log(image_datas)

            $(".fj-gallery").html(gallery)
        }
    });

})
