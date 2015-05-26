// Made with milk and cookies by Nicholas Ruggeri
// https://github.com/nicholasruggeri/cookies-enabler

window.COOKIES_ENABLER = window.COOKIES_ENABLER || (function () {

    var defaults = {
            scriptClass: document.getElementsByClassName('ce-script'),
            eventScroll: false,
            bannerHTML: 'This website uses cookies.<a href="#" class="ce-trigger">Enable Cookies</a>',
            cookie: {
                name: 'ce-consent',
                duration: '365'
            }

        },
        markupClass = {
            classTrigger: 'ce-trigger',
            classBanner: 'ce-banner'
        },
        opts, domElmts;

    function _extend(){

        var i, key;

        for(i=1; i<arguments.length; i++)
            for(key in arguments[i])
                if(arguments[i].hasOwnProperty(key))
                    arguments[0][key] = arguments[i][key];
        return arguments[0];
    }

    var init = function (options) {

        opts = _extend( {}, defaults, options );

        if (getCookie() == 'Y') {

            getScripts();

        } else {

            createBanner();

            if (opts.eventScroll === true) {
                window.addEventListener('scroll', enableCookies);
            }

            domElmts.trigger[0].addEventListener("click", enableCookies);
        }
    }

    var enableCookies = function(event){

        if( event.type === 'click' ){

            event.preventDefault();

        }

        if (getCookie() != 'Y') {

            setCookie();
            getScripts();
            domElmts.banner[0].style.display = 'none';

            window.removeEventListener('scroll', enableCookies);

        }

    }

    var createBanner = function(){

        var el = '<div class="'+ markupClass.classBanner +'">'
                + opts.bannerHTML
                +'</div>';

        document.body.insertAdjacentHTML('beforeend', el);
        
        domElmts = {
            trigger:  document.getElementsByClassName(markupClass.classTrigger),
            banner: document.getElementsByClassName(markupClass.classBanner)
        }

    }

    var setCookie = function(){

        var value = "Y",
            date, expires;

        if (opts.cookie.duration) {
            date = new Date();
            date.setTime(date.getTime()+( opts.cookie.duration*24*60*60*1000));
            expires = "; expires="+date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = opts.cookie.name +"="+ value+expires +"; path=/";
    }

    var getCookie = function(){

        var cookies = document.cookie.split(";"),
            i, x, y;

        for (i = 0; i < cookies.length; i++){
            x = cookies[i].substr(0,cookies[i].indexOf("="));
            y = cookies[i].substr(cookies[i].indexOf("=")+1);
            x = x.replace(/^\s+|\s+$/g,"");
            if (x == opts.cookie.name) {
                return unescape(y);
            }
        }
    }

    var getScripts = function(){

        var n = opts.scriptClass.length,
            documentFragment = document.createDocumentFragment(),
            i, y, s, attrib;

        for (i = 0; i < n; i++){
            s = document.createElement('script');
            s.type = 'text/javascript';
            for (y = 0; y < opts.scriptClass[i].attributes.length; y++) {
                attrib = opts.scriptClass[i].attributes[y];
                if (attrib.specified) {
                    if ((attrib.name != 'type') && (attrib.name != 'class')){
                        s.setAttribute(attrib.name, attrib.value);
                    }
                }
            }
            s.innerHTML = opts.scriptClass[i].innerHTML;
            documentFragment.appendChild(s);
        }

        document.body.appendChild(documentFragment);
    }

    return {
        init: init
    };

}());