!(function ($, window, document, undefined) {

    var options = {
        width: "100%",   //组件长度
        height: "380px", //组件高度
        interval: 1000,  //滚动的时间间隔
        current: 0,      //当前显示的组件序号
        total: 0,        //总的轮播图片数量
    };

    var bds = [];     //轮播项
    var hds = [];     //轮播导航按钮
    var prev, next = {};   //前后翻页
    var banner = {};
    var intervalRun = true;

    /*定义构造函数*/
    var fdcarousel = function () {

    };

    fdcarousel.prototype = {
        _init: function () {
            var tmpbds = $(".fd-bd ul li");

            /*取得所有的轮播图*/
            options.total = tmpbds.length;
            tmpbds.each(function () {
                bds.push($(this));
            });

            /*生成相应的ul放置到<div class="fd-hd"></div>中,并放置*/
            var fd_hd = this._generate_fd_hd(options.total);
            $(".fd-banner .fd-hd").html(fd_hd);

            /*取得所有轮播导航*/
            var tmphds = $(".fd-banner .fd-hd li");
            tmphds.each(function () {
                hds.push($(this));
            });


            /*前后翻页*/
            prev = $(".fd-banner .fd-bd-pre");
            next = $(".fd-banner .fd-bd-next");
            banner = $(".fd-banner");

            /*绑定事件*/
            this._eventBind();

            /*设置定时任务*/
            this._interval = this._intervalEvent();

            /*显示默认界面*/
            this._showItem(options.current);
            console.log("carousel initinal success!");
        },
        /*生成导航*/
        _generate_fd_hd: function (n) {
            var open = '<ul>';
            var close = '</ul>';
            var result = "";
            for (var i = 0; i < n; i++) {
                result += "<li>" + i + "</li>";
            }
            return open + result + close;
        },
        /*隐藏第idx个页面*/
        _hideItem: function (idx) {
            hds[idx].removeClass("active");
            bds[idx].animate({'opacity': '0'}, 1000);
            bds[idx].css('display', 'none');
            // bds[idx].animate({}, 100);

        },
        /*显示第idx个页面*/
        _showItem: function (idx) {
            hds[idx].addClass("active");
            bds[idx].animate({'opacity': '1'}, 1000);
            bds[idx].css('display', "block");

        },
        /*获得下一页编号*/
        _getNextPage: function () {
            if (options.current + 1 == options.total) {
                return 0;
            } else {
                return options.current + 1;
            }
        },
        /*获取上一页编号*/
        _getPrevPage: function () {
            if (options.current - 1 < 0) {
                return options.total - 1;
            } else {
                return options.current - 1;
            }
        },
        /*绑定事件*/
        _eventBind: function () {
            var hideCurrent = this._hideItem;
            var showItem = this._showItem;
            /*为轮播导航绑定事件*/
            for (var i = 0; i < hds.length; i++) {
                var tmp = {idx: i};
                hds[i].click(tmp, function (event) {
                    if (options.current == event.data.idx)
                        return;
                    hideCurrent(options.current);
                    options.current = event.data.idx;
                    showItem(options.current);
                });
            }
            /*为左右翻页按钮绑定事件*/
            var nextPage = this._getNextPage;
            var prevPage = this._getPrevPage;
            prev.click(function () {
                hideCurrent(options.current);
                options.current = prevPage();
                showItem(options.current);
            });
            next.click(function () {
                hideCurrent(options.current);
                options.current = nextPage();
                showItem(options.current);
            });
            /*设置悬浮的时候清除自动滚动，离开后继续*/
            banner.mouseenter(function () {
                intervalRun=false;
            });
            banner.mouseleave(function () {
                intervalRun=true;
            });
        },
        /*定时刷新*/
        _intervalEvent: function () {
            return window.setInterval(function () {
                if (intervalRun == true)
                    next.click();
            }, 5000);
        }
    };
    this.fdCarousel = function (options) {
        var ret = new fdcarousel();
        ret._init();
        return ret;
    };
})(jQuery, window, document);