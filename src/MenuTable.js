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

        var tableWidth = 306;
        var tableHeight = 700;

        var tableView = new cc.TableView(_this, cc.size(tableWidth, tableHeight));
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        tableView.setPosition((winSize.width - tableWidth)/2, (winSize.height-tableHeight) / 2);
        tableView.setDelegate(_this);
        tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(tableView);
        tableView.reloadData();

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
        if (idx == 2) {
            return cc.size(100, 100);
        }
        return cc.size(60, 60);
    },

    tableCellAtIndex:function (table, idx) {
        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        var label;
        if (!cell) {
            cell = new cc.TableViewCell();
            var sprite =new cc.Sprite("res/StartGame.png");
            sprite.setAnchorPoint(0,0);
            sprite.setPosition(0, 0);
            cell.addChild(sprite);

            label = new cc.LabelTTF(strValue, "Helvetica", 20.0);
            label.setPosition(0,0);
            label.setAnchorPoint(0,0);
            label.setTag(123);
            cell.addChild(label);
        } else {
            label = cell.getChildByTag(123);
            label.setString(strValue);
        }

        return cell;
    },

    numberOfCellsInTableView:function (table) {
        return 25;
    }
});

var RankingListSence = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var rankingList = new MenuTableLayer();
        this.addChild(rankingList);
    }
});