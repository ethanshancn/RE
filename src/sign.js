/**
 * Created by GYQ on 15/12/30.
 */
var SignLayer = cc.Layer.extend({

    level: null,
    score: null,

    ctor: function () {
        var _this = this;
        _this._super();
        var winSize = cc.winSize;

        //设置背景
        _this.startBgSprite = new cc.Sprite("res/StartBg.jpg");
        _this.startBgSprite.attr({
            x: winSize.width / 2,
            y: winSize.height / 2,
        });
        _this.addChild(_this.startBgSprite, 0);

        var tableWidth = 600;
        var tableHeight = 1000;

        //var tableView = new cc.TableView(_this, cc.size(tableWidth, tableHeight));
        //tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        //tableView.setPosition((winSize.width - tableWidth) / 2, (winSize.height - tableHeight) - 80);
        //tableView.setDelegate(_this);
        //tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        //this.addChild(tableView);
        //tableView.reloadData();

        //设置返回按钮
        //var mmd = new cc.Sprite("res/momodiao.png");
        //var tops = new cc.Sprite("res/homepage.png");
        //var menuItemSprite = new cc.MenuItemSprite(tops, mmd, this.returnHome, this);
        //menuItemSprite.x = winSize.width / 2;
        //menuItemSprite.y = 100;
        //var menu = new cc.Menu(menuItemSprite);
        //menu.x = 0;
        //menu.y = 0;
        //
        //this.addChild(menu);
        this.recordInfoForCurrentGame(Storage.getCurrentLevel(), Storage.getCurrentScore());
        return true;
    },

    recordInfoForCurrentGame: function (level, score) {
        //接受用户名
        this.showSign(level, score);
    },

    showSign: function (level, score) {
        var sprite = new cc.Sprite("res/sign_wenzi.png");
        sprite.x = cc.winSize.width / 2;
        sprite.y = 1030;
        this.addChild(sprite);
        this._userName = new cc.EditBox(cc.size(234, 29), new cc.Scale9Sprite("res/sign_input.png"));
        this._userName.x = cc.winSize.width / 2;
        this._userName.y = 1000;
        this._userName.setFontSize(20);
        this._userName.setPlaceHolder("一个响当当的名号很重要! :-D");
        this._userName.setDelegate(this);
        this._userName.setMaxLength(20);
        this._userName.setReturnType(this._userName.KEYBOARD_RETURNTYPE_DONE);
        this.addChild(this._userName);

        cc.MenuItemFont.setFontSize(60);

        this.level = Storage.getCurrentLevel();
        this.score = Storage.getCurrentScore();
        //6.create a menu and assign onPlay event callback to it
        var menuItemPlay = cc.MenuItemSprite.create(
            cc.Sprite.create("res/signok.png"), // normal state image
            cc.Sprite.create("res/signdown.png"), //select state image
            this.textFieldEvent, this);
        var menu = cc.Menu.create(menuItemPlay);  //7. create the menu
        menu.x = cc.winSize.width / 2;
        menu.y = 960;
        this.addChild(menu);
    },

    textFieldEvent: function (sender, type) {
        Storage.setCurrentUser(this._userName.getString());

        this.scheduleOnce(function () {
            cc.director.runScene(new RankingListSence());
        }, 0);
    },


    scrollViewDidScroll: function (view) {

    },
    scrollViewDidZoom: function (view) {

    },

    tableCellTouched: function (table, cell) {
        cc.log("cell touched at index: " + cell.getIdx());
    },

    tableCellSizeForIndex: function (table, idx) {
        return cc.size(600, 110);
    },

    tableCellAtIndex: function (table, idx) {
        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        var label;

        cell = new cc.TableViewCell();
        var sprite = new cc.Sprite("res/rankingCellBg.png");
        sprite.setAnchorPoint(0, 0);
        sprite.setPosition(0, 0);
        cell.addChild(sprite);

        var showStr = " " + (parseInt(strValue) + 1) + "、" + this.rankingList[strValue].userName + " 得分：" + this.rankingList[strValue].score + " ,等级：" + this.rankingList[strValue].level;
        label = new cc.LabelTTF(showStr, "Arial", 30.0, cc.size(600, 80));
        label.x = 0;
        label.y = 30;
        label.setAnchorPoint(0, 0.5);
        label.color = cc.color(2, 2, 2);
        label.setTag(123);
        cell.addChild(label);

        return cell;
    },

    numberOfCellsInTableView: function (table) {
        if (typeof this.rankingList == "undefined") {
            this.rankingList = Storage.getRankingList();
        }

        return this.rankingList.length;
    },

    returnHome: function () {
        cc.director.runScene(new HomeScene());
    }
});

var SignScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var rankingList = new SignLayer();
        this.addChild(rankingList);
    }
});