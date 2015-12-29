
var Storage = {

    getCurrentLevel: function () {
        var level = cc.sys.localStorage.getItem("level") || 0;
        return parseInt(level);
    },

    setCurrentLevel: function (level) {
        cc.sys.localStorage.setItem("level", level);
        return true;
    },

    getCurrentScore: function () {
        var score = cc.sys.localStorage.getItem("score") || 0;
        return parseInt(score);
    },

    setCurrentScore: function (score) {
        cc.sys.localStorage.setItem("score", score);
        return true;
    },

    setCurrentUser : function(userName){
        if(!(userName instanceof string) || userName.length <= 0)
        {
            return FALSE;
        }
        cc.sys.localStorage.setItem("currentUser", userName);
    },

    getCurrentUser : function(){
        return cc.sys.localStorage.getItem("currentUser");
    },

    addUser : function(userName){
        if(!(userName instanceof string) || userName.length <= 0)
        {
            return FALSE;
        }
        var totalUser = this.getUserList();
        if(typeof totalUser[userName] != "undefined")
        {
            return FALSE;
            cc.log("User : "+userName+" exists!");
        }
        totalUser[userName] = {
            'level' : 1,
            'score' : 0
        };
        cc.sys.localStorage.setItem("userList",JSON.stringify(totalUser));
    },

    deleteUser : function(userName){
        if(!(userName instanceof string) || userName.length <= 0)
        {
            return FALSE;
        }
        var totalUser = this.getUserList();
        if(typeof totalUser[userName] != "undefined")
        {
            totalUser[userName] = undefined;
            cc.sys.localStorage.setItem("userList",JSON.stringify(totalUser));
        }
        return TRUE;
    },

    updateUserInfo : function(userName,level,score){
        if(!(userName instanceof string) || userName.length <= 0)
        {
            return FALSE;
        }
        var totalUser = this.getUserList();
        if(typeof totalUser[userName] == "undefined")
        {
            return FALSE;
            cc.log("User : "+userName+" not exists!");
        }
        totalUser[userName].level = (level > 0) ? level : 1;
        totalUser[userName].score = (score > 0) ? score : 0;
        cc.sys.localStorage.setItem("userList",JSON.stringify(totalUser));
    },

    updateRankingList : function (){
        var userList = this.getUserList();
        if(Object.keys(userList).length == 0)
        {
            return new Array();
        }
        var rankingList = new Array();
        for(var key in userList)
        {
            rankingList.push({
                "userName" : key,
                "score" : userList[key].score,
                "level" : userList[key].level
            });
        }
        rankingList = this.rankingSort(rankingList.shift(),new Array(),rankingList);

    },

    getRankingList : function (){

    },

    getUserInfo : function(userName){
        if(!(userName instanceof string) || userName.length <= 0)
        {
            return FALSE;
        }
        var totalUser = this.getUserList();
        if(typeof totalUser[userName] != "undefined")
        {
            return totalUser[userName];
        }
        else
        {
            return FALSE;
        }
    },

    getUserList : function(){
        var totalUser = cc.sys.localStorage.getItem("userList");
        return totalUser ? JSON.parse(totalUser) : new Object();
    },

    rankingSort : function (middle,leftArr,rightArr){
        var left = new Array();
        var right = new Array();

    }
};

