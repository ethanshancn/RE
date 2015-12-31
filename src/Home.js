/**
 * Created by GYQ on 15/12/29.
 */

var HomeLayer = cc.Layer.extend({

    ctor: function () {
        //1. call super class's ctor function
        this._super();

        //2. get the screen size of your game canvas
        var winsize = cc.director.getWinSize();

        var bkgd = new cc.Sprite("res/StartBg.jpg");
        bkgd.x = winsize.width / 2;
        bkgd.y = winsize.height / 2;
        this.addChild(bkgd);

        var tt = new cc.Sprite("res/titling.png");
        tt.x = winsize.width / 2;
        tt.y = winsize.height - 400;
        this.addChild(tt);

        var mmd = new cc.Sprite("res/momodiao.png");
        var startPng = new cc.Sprite("res/starting.png");
        var startMenu = new cc.MenuItemSprite(startPng, mmd, this.startGameCallback, this);
        startMenu.x = winsize.width / 2;
        startMenu.y = 700;

        var mmd2 = new cc.Sprite("res/momodiao.png");
        var tops = new cc.Sprite("res/ranking.png");
        var menuItemSprite = new cc.MenuItemSprite(tops, mmd2, this.catchTops, this);
        menuItemSprite.x = winsize.width / 2;
        menuItemSprite.y = 600;

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
        cc.director.runScene(new GameScene());
    },

    catchTops: function () {
        cc.director.runScene(new RankingListSence());
    }

});

var HomeScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new HomeLayer();
        this.addChild(layer);
    }
});



