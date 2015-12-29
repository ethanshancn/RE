/**
 * Created by GYQ on 15/12/29.
 */

var TopLayer = cc.Layer.extend({

    ctor: function () {
        //1. call super class's ctor function
        this._super();

        var mmd = new cc.Sprite("res/momodiao.png");


        //2. get the screen size of your game canvas
        var winsize = cc.director.getWinSize();

        var bg = new cc.Sprite("res/bg.jpg");
        this.addChild(bg);
        bg.x = winsize.width / 2;
        bg.y = winsize.height / 2;

        var ccew = new cc.Sprite("res/compnay.png");
        ccew.x = winsize.width / 2;
        ccew.y = winsize.height - 200;
        this.addChild(ccew);

        var tops = new cc.Sprite("res/return.png");
        var menuItemSprite = new cc.MenuItemSprite(tops, mmd, this.returnHome, this);
        menuItemSprite.x = 360;
        menuItemSprite.y = 200;

        var menu = new cc.Menu(menuItemSprite);
        menu.x = 0;
        menu.y = 0;

        this.addChild(menu);

    },
    returnHome: function () {
        cc.director.runScene(new HomeScene());
    }

});


var TopScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new TopLayer();
        this.addChild(layer);
    }
});



