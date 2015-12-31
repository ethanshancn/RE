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
        if(!(typeof  userName ==='string') || userName.length <= 0)
        {
            return;
        }
        cc.sys.localStorage.setItem("currentUser", userName);
    },

    getCurrentUser : function(){
        return cc.sys.localStorage.getItem("currentUser");
    },

    addUser : function(userName){
        if(!(typeof  userName ==='string') || userName.length <= 0)
        {
            return;
        }
        var totalUser = this.getUserList();
        if(typeof totalUser[userName] != "undefined")
        {
            return FALSE;
            cc.log("User : "+userName+" exists!");
        }
        totalUser[userName] = {
            level : 1,
            score : 0
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
        if(!(typeof userName === 'string') || userName.length <= 0)
        {
            return;
        }

        var totalUser = this.getUserList();
        if(typeof totalUser[userName] == "undefined")
        {
            this.addUser(userName);
            totalUser = this.getUserList();
        }
        totalUser[userName].level = (level > totalUser[userName].level) ? level : totalUser[userName].level;
        totalUser[userName].score = (score > totalUser[userName].score) ? score : totalUser[userName].score;
        cc.sys.localStorage.setItem("userList",JSON.stringify(totalUser));
    },

    getRankingList : function (){
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

        return this.rankingSort(rankingList);
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

    rankingSort : function (arrList){
        if (arrList.length <= 1)
        {
            return arrList;
        }
        var pivotIndex = Math.floor(arrList.length / 2);
        var pivot = arrList.splice(pivotIndex, 1)[0];
        var left = [];
        var right = [];
        for (var i = 0; i < arrList.length; i++){
            if (arrList[i].score < pivot.score) {
                left.push(arrList[i]);
            } else {
                right.push(arrList[i]);
            }
        }
        return this.rankingSort(right).concat([pivot], this.rankingSort(left));
    }
};

