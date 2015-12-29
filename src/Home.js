/**
 * Created by GYQ on 15/12/29.
 */

var HomeLayer = cc.Layer.extend({

    ctor: function () {
        //1. call super class's ctor function
        this._super();

        //2. get the screen size of your game canvas
        var winsize = cc.director.getWinSize();

        var bkgd = new cc.Sprite("res/helloBG_png.png");
        bkgd.x = winsize.width / 2;
        bkgd.y = winsize.height / 2;
        this.addChild(bkgd);

        var ccew = new cc.Sprite("res/compnay.png");
        ccew.x = winsize.width / 2;
        ccew.y = winsize.height - 200;
        this.addChild(ccew);

        var tt = new cc.Sprite("res/title.png");
        tt.x = winsize.width / 2;
        tt.y = winsize.height - 400;
        this.addChild(tt);

        var mmd = new cc.Sprite("res/momodiao.png");
        var startPng = new cc.Sprite("res/start.png");
        var startMenu = new cc.MenuItemSprite(startPng, mmd, this.startGameCallback, this);
        startMenu.x = winsize.width / 2;
        startMenu.y = 600;

        var mmd2 = new cc.Sprite("res/momodiao.png");
        var tops = new cc.Sprite("res/top10.png");
        var menuItemSprite = new cc.MenuItemSprite(tops, mmd2, this.catchTops, this);
        menuItemSprite.x = winsize.width / 2;
        menuItemSprite.y = 300;

        var menu = new cc.Menu(startMenu, menuItemSprite);
        menu.x = 0;
        menu.y = 0;

        var textField = new cc.TextFieldTTF("<click here for input>");
        this.addChild(textField);
        textField.x = winsize.width / 2;
        textField.y = winsize.height / 2;

        this.addChild(menu);

    },
    startGameCallback: function () {
        console.log("youxikaishi ");
        cc.director.runScene(new GameScene());
    },

    catchTops: function () {
        console.log("top10!");
        cc.director.runScene(new TopScene());
    }

});


var HomeScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new HomeLayer();
        this.addChild(layer);
    }
});



