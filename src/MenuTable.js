/**
 * Author: Ethan
 * CreateTime: 2015/12/29 16:11
 * Description:
 */
var MenuTableLayer = cc.Layer.extend({

    ctor:function () {
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

        var tableView = new cc.TableView(_this, cc.size(tableWidth, tableHeight));
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        tableView.setPosition((winSize.width - tableWidth)/2, (winSize.height-tableHeight)-80);
        tableView.setDelegate(_this);
        tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(tableView);
        tableView.reloadData();

        //设置返回按钮
        var mmd = new cc.Sprite("res/momodiao.png");
        var tops = new cc.Sprite("res/homepage.png");
        var menuItemSprite = new cc.MenuItemSprite(tops, mmd, this.returnHome, this);
        menuItemSprite.x = winSize.width / 2;
        menuItemSprite.y = 100;
        var menu = new cc.Menu(menuItemSprite);
        menu.x = 0;
        menu.y = 0;

        this.addChild(menu);
        return true;
    },
    scrollViewDidScroll:function (view) {

    },
    scrollViewDidZoom:function (view) {

    },

    tableCellTouched:function (table, cell) {
        cc.log("cell touched at index: " + cell.getIdx());
    },

    tableCellSizeForIndex:function (table, idx) {
        return cc.size(600, 110);
    },

    tableCellAtIndex:function (table, idx) {
        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        var label;
        //if (!cell) {
            cell = new cc.TableViewCell();
            var sprite =new cc.Sprite("res/rankingCellBg.png");
            sprite.setAnchorPoint(0,0);
            sprite.setPosition(0, 0);
            cell.addChild(sprite);

            var showStr = " "+(parseInt(strValue) + 1) +"、"+ this.rankingList[strValue].userName + " 得分："+this.rankingList[strValue].score + " ,等级："+this.rankingList[strValue].level;
            label = new cc.LabelTTF(showStr, "Arial", 30.0,cc.size(600,80));
            label.x = 0;
            label.y = 30;
            label.setAnchorPoint(0,0.5);
            label.color = cc.color(2,2,2);
            label.setTag(123);
            cell.addChild(label);
        /*} else {
            label = cell.getChildByTag(123);
            label.setString(strValue);
        }*/

        return cell;
    },

    numberOfCellsInTableView:function (table) {
        if(typeof this.rankingList == "undefined")
        {
            this.rankingList = Storage.getRankingList();
        }

        return this.rankingList.length;
    },

    returnHome: function () {
        cc.director.runScene(new HomeScene());
    }
});

var RankingListSence = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var rankingList = new MenuTableLayer();
        this.addChild(rankingList);
    }
});