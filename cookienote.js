var cookieNotice = (function (options) {
    var cookieNotice;
    cookieNotice = {
        getCookie: function (cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) == 0)
                    return c.substring(name.length, c.length);
            }
            return "";
        },
        check: function (options) {
            var theC = cookieNotice.getCookie("jwCookieConsent");
            if (theC === "") {
                cookieNotice.append(options);
            }
        },
        append: function (options) {
            var defaultOptions = {
                style: {position: "fixed",
                    bottom: "0",
                    width: "100%",
                    height: "60px",
                    padding: "0",
                    "line-height": "60px",
                    "background-color": "#f5f5f5",
                    "opacity": "0.95"
                },
                text: "This website uses cookies to track usage anonymously and to make basic functions work properly.&nbsp;&nbsp;",
                buttonText: "OK",
                buttonOpen: '<a class="btn btn-sm btn-default" id="cookieAgree">',
                buttonClose: '</a>',
                open: '<div id="cookieBar"><div class="container"><div class="col-xs-12">',
                close: '</div></div></div>'
            };

            $("body").on("click", "#cookieAgree", function () {
                document.cookie = "jwCookieConsent=true; expires=Thu, 01 Jan 2023 00:00:00 GMT";
                $(cookieFooter).hide();
            });

            if (typeof options === 'object') {
                options = $.extend(defaultOptions, options);
            } else {
                options = defaultOptions;
            }
            var o = options;
            var cookieFooter = $(o.open + o.text + o.buttonOpen + o.buttonText + o.buttonClose + o.close).css(o.style);
            $("body").append(cookieFooter);
            return cookieFooter;
        }
    };
    return cookieNotice;
});
$(document).ready(function () {
    cookieNotice().check();
});
