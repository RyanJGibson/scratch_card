import ConfigData from '../engine/config_data.js';

import {ButtonUtil} from '../util/button_util.js';

class UI{
	constructor(cMain) {
        console.log('UI');
        this.cMain = cMain;

        this.cUI = new PIXI.Container();
        this.cMain.addChild(this.cUI);

        this.aPricePoints = ConfigData.oEngineData.pricePoints;
        this.nCurrentStakeIndex = 0;
        this.nCurrentStake = this.aPricePoints[this.nCurrentStakeIndex];

        
    }

    initEventHanders(fOnNewGame, fOnShowStake, fOnReplay, fOnRevealAll){
        console.log('initEventHanders');
        this.fOnNewGame = fOnNewGame;
        this.fOnShowStake = fOnShowStake;
        this.fOnReplay = fOnReplay;
        this.fOnRevealAll = fOnRevealAll;
    }

    initScreens(){
        this.initSetBet();
        this.initRevealAll();
        this.initGameComplete();

    }


    initSetBet(){
        this.cSetBet = new PIXI.Container();
        this.cUI.addChild(this.cSetBet);
        for(let i=0;i<ConfigData.oConfigData.config.viewData.UI.setBet.length;i++){
            let oData = ConfigData.oConfigData.config.viewData.UI.setBet[i];
            let oSprite = new PIXI.Sprite.from(oData.key);
            this.cSetBet.addChild(oSprite);
            oSprite = Object.assign(oSprite, oData.properties);
        }
        this.cSetBet.x = 516;


        this.oPlusButton = new ButtonUtil('plus.png','plusHighlight.png', this.onStakeInc.bind(this));
        this.oPlusButton.x = 215;
        this.oPlusButton.y = 590;
        this.cSetBet.addChild(this.oPlusButton);

        this.oMinusButton = new ButtonUtil('minus.png','minusHighlight.png', this.onStakeDec.bind(this));
        this.oMinusButton.x = 35;
        this.oMinusButton.y = 620;
        this.cSetBet.addChild(this.oMinusButton);

        this.oPlayButton = new ButtonUtil('playButton.psd','buttonLighten.png', this.fOnNewGame);
        this.oPlayButton.x = 65;
        this.oPlayButton.y = 745;
        this.cSetBet.addChild(this.oPlayButton);

        this.tStake = new PIXI.BitmapText('$1', { font: '75px worksans-orange-export', align: 'center' });
		this.tStake.x = 140;
		this.tStake.y = 510;
		this.cSetBet.addChild(this.tStake);

        this.cSetBet.visible = false;

    }

    onStakeInc(){
        console.log('onStakeInc');
        this.nCurrentStakeIndex++;
        this.updateStakeField();
    }

    onStakeDec(){
        console.log('onStakeDec');
        this.nCurrentStakeIndex--;
        this.updateStakeField();
    }

    updateStakeField(){
        this.nCurrentStake = this.aPricePoints[this.nCurrentStakeIndex];
        this.tStake.text = "$" + this.nCurrentStake;

        this.oPlusButton.enableButton();
        this.oMinusButton.enableButton();
        if(this.nCurrentStakeIndex === 0){
            this.oMinusButton.disableButton()
        }
        if(this.nCurrentStakeIndex === this.aPricePoints.length-1){
            this.oPlusButton.disableButton()
        }
    }


    initRevealAll(){
        this.cRevealAll = new PIXI.Container();
        this.cUI.addChild(this.cRevealAll);
        for(let i=0;i<ConfigData.oConfigData.config.viewData.UI.revealAll.length;i++){
            let oData = ConfigData.oConfigData.config.viewData.UI.revealAll[i];
            let oSprite = new PIXI.Sprite.from(oData.key);
            this.cRevealAll.addChild(oSprite);
            oSprite = Object.assign(oSprite, oData.properties);
        }
        this.cRevealAll.x = 530;
        this.cRevealAll.y = 30;

        this.oRevealAllButton = new ButtonUtil('revealAllButton.psd','buttonLighten.png', this.fOnRevealAll);
        this.oRevealAllButton.x = 15;
        this.oRevealAllButton.y = 368;
        this.cRevealAll.addChild(this.oRevealAllButton);

        this.cRevealAll.visible = false;
    }

    initGameComplete(){
        this.cGameComplete = new PIXI.Container();
        this.cUI.addChild(this.cGameComplete);

        for(let i=0;i<ConfigData.oConfigData.config.viewData.UI.gameComplete.length;i++){
            let oData = ConfigData.oConfigData.config.viewData.UI.gameComplete[i];
            let oSprite = new PIXI.Sprite.from(oData.key);
            if(oData.key === "winMessage.psd" ){
                this.sprWinMessage = oSprite;
            }
            if(oData.key === "loseMessage.psd" ){
                this.sprLoseMessage = oSprite;
            }

            this.cGameComplete.addChild(oSprite);
            oSprite = Object.assign(oSprite, oData.properties);
        }

        this.cGameComplete.x = 750;
        this.cGameComplete.y = 20;

        this.tWin = new PIXI.BitmapText('$1', { font: '60px worksans-orange-export', align: 'center' });
		this.tWin.x = 230;
		this.tWin.y = 380;
		this.cGameComplete.addChild(this.tWin);

        this.oPlayAgainButton = new ButtonUtil('playAgainButton.psd','buttonLighten.png', this.fOnReplay);
        this.oPlayAgainButton.x = 25;
        this.oPlayAgainButton.y = 450;
        this.cGameComplete.addChild(this.oPlayAgainButton);

        this.oChooseBetButton = new ButtonUtil('changeBetButton.psd','buttonLighten.png', this.fOnShowStake);
        this.oChooseBetButton.x = 280;
        this.oChooseBetButton.y = 450;
        this.cGameComplete.addChild(this.oChooseBetButton);

        this.cGameComplete.visible = false;
    }


    showSetBet(){
        this.cSetBet.visible = true;
    }
    disableSetBetButton(){
        this.oPlayButton.disableButton();
        this.oPlusButton.disableButton();
        this.oMinusButton.disableButton();
    }
    enableSetBetButton(){
        this.oPlayButton.enableButton();
        this.updateStakeField();
    }
    hideSetBet(){
        this.cSetBet.visible = false;
    }

    showRevealAll(){
        this.cRevealAll.visible = true;
    }
    hideRevealAll(){
        this.cRevealAll.visible = false;
    }
    
    disableRevealAllButton(){
        this.oRevealAllButton.disableButton();
    }
    enableRevealAllButon(){
        this.oRevealAllButton.enableButton();
    }

    showGameComplete(nPrize){

        setTimeout( 
            function() {
                this.cGameComplete.visible = true;
                this.sprWinMessage.visible = false;
                this.sprLoseMessage.visible = false;
                this.tWin.visible = false;
        
                if(nPrize > 0){
                    this.tWin.text = '$' + nPrize;
                    this.sprWinMessage.visible = true;
                    this.tWin.visible = true;
                }else{
                    this.sprLoseMessage.visible = true;
                }
            }.bind(this)
        , 1500)


    }
    hideGameComplete(){
        this.cGameComplete.visible = false;
    }
    disableGameCompleteButtons(){
        this.oPlayAgainButton.disableButton();
        this.oChooseBetButton.disableButton();
    }
    enableGameCompleteButtons(){
        this.oPlayAgainButton.enableButton();
        this.oChooseBetButton.enableButton();
    }

}

export {UI};
