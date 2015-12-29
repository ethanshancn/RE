/**
 * Author: Ethan
 * CreateTime: 2015/12/28 22:05
 * Description:
 */
var StartLayer = cc.Layer.extend({
    ctor : function()
    {
        var _this = this;
        _this._super();

        var size = cc.winSize;
        _this.startBgSprite = new cc.Sprite("res/StartBg.jpg");
        _this.startBgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
        });
        _this.addChild(_this.startBgSprite, 0);


        var startItem = new cc.MenuItemImage(
            "res/StartGame.png",
            "res/StartGame.png",
            function () {
                //切换到游戏使用页
                cc.director.runScene(new cc.TransitionFade(1, new GameScene()));
            }, this);
        startItem.attr({
            x: size.width/2,
            y: size.height/2,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(startItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);
    }
});

var StartSence = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StartLayer();
        this.addChild(layer);
    }
});