var GameOver = cc.Layer.extend({
    init:function () {
        var bRet = false;
        if (this._super) {
            var winSize = cc.Director.sharedDirector().getWinSize();

            var bg = cc.Sprite.create(gameoverbg_path);
            bg.setPosition(winSize.width / 2, winSize.height / 2);
            this.addChild(bg, my.bgLayer);

            var playAgainNormal = cc.Sprite.create(s_menu, cc.RectMake(378, 0, 126, 33));
            var playAgainSelected = cc.Sprite.create(s_menu, cc.RectMake(378, 33, 126, 33));
            var playAgainDisabled = cc.Sprite.create(s_menu, cc.RectMake(378, 33 * 2, 126, 33));

            var playAgain = cc.MenuItemSprite.create(playAgainNormal, playAgainSelected, playAgainDisabled, this, this.onPlayAgain);

            var menu = cc.Menu.create(playAgain);
            this.addChild(menu, my.fgLayer);
            menu.setPosition(cc.ccp(winSize.width / 2, 220));

            var lbScore = cc.LabelTTF.create("Your Score : " + my.score, "Arial Bold", 30);
            lbScore.setPosition(cc.ccp(winSize.width / 2, 280));
            lbScore.setColor(cc.ccc3(250, 179, 0));
            this.addChild(lbScore, 10);

            bRet = true;
        }
        return bRet;
    },
    onPlayAgain:function (pSender) {
        my.graveyard = [];
        my.score = 0;
        my.scoreLabel = null;
        my.lifeLabel = null;

        var scene = cc.Scene.create();
        scene.addChild(GameLayer.create());
        cc.Director.sharedDirector().replaceScene(cc.TransitionFade.create(1.2, scene));
    }
});

GameOver.create = function () {
    var sg = new GameOver();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

GameOver.scene = function () {
    var scene = cc.Scene.create();
    var layer = GameOver.create();
    scene.addChild(layer);
    return scene;
};