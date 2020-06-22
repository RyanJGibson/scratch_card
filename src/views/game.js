import {GameBackground} from './game_background.js';
import {GameForeground} from './game_foreground.js';

import ConfigData from '../engine/config_data.js';

import {Chest} from '../views/chest.js'


class Game{

	constructor(cMain) {
        console.log('Game');
        this.cMain = cMain;

        this.cGameContainer = new PIXI.Container();

        this.cBackground = new PIXI.Container();
        this.cMainGame = new PIXI.Container();
        this.cForeground = new PIXI.Container();
        this.cGameContainer.addChild(this.cBackground);
        this.cGameContainer.addChild(this.cMainGame);
        this.cGameContainer.addChild(this.cForeground);
		this.cMain.addChild(this.cGameContainer);

        this.oGameBackground = new GameBackground(this.cBackground);
        this.oGameForeground = new GameForeground(this.cForeground);

        this.initChests();
    }

    initEventHanders(fOnGameComplete){
        console.log('initEventHanders');
        this.fOnGameComplete = fOnGameComplete;
    }

    initChests(){
        console.log('initChests');

        this.aChests = [];
        for(let i=0;i<ConfigData.oConfigData.config.viewData.chestData.length;i++){
            let oChest = new Chest(this.cMainGame, i, this.onChestOpened.bind(this));
            this.aChests.push(oChest);
        }
    }

    initNewGame(oGameData){
        console.log('initNewGame');
        console.log(oGameData);
        console.log(oGameData.prizeIndexes);
        console.log(oGameData.winningIndexes);

        this.nCurrentWinners = 0;
        this.nTotalWinners = oGameData.winningIndexes.length;
        this.nTotalChestsOpened = 0;
        this.nTotalChests = ConfigData.oConfigData.config.viewData.chestData.length;
        this.bGameFuilyComplete = false;

        this.nPrize = 0;
        if(this.nTotalWinners > 0){
            //console.log(oGameData.winningIndexes[0]); //get the first winning position
            //console.log(oGameData.prizeIndexes[oGameData.winningIndexes[0]]); //get the index at that position
            //console.log(ConfigData.oEngineData.avaialablePrizes);
            //console.log(ConfigData.oEngineData.avaialablePrizes[oGameData.prizeIndexes[oGameData.winningIndexes[0]]]); //get the prize value for that index
            this.nPrize = ConfigData.oEngineData.avaialablePrizes[oGameData.prizeIndexes[oGameData.winningIndexes[0]]];
        }

        console.log("this.nPrize" + " " + this.nPrize);

        this.setChestPrizeAmounts(oGameData.prizeIndexes);
        this.setWinningChests(oGameData.winningIndexes);
        this.enableChests();
    }

    setChestPrizeAmounts(aPrizeIndexes){
        ConfigData.oEngineData.avaialablePrizes;
        this.aChests.forEach((el,i)=>el.setPrizeValue(ConfigData.oEngineData.avaialablePrizes[aPrizeIndexes[i]]));
    }

    setWinningChests(winningIndexes){
        winningIndexes.forEach((el,i)=>this.aChests[el].setWinner(true));
    }

    enableChests(){
        this.aChests.forEach((el)=>el.setSelectablle(true));
    }

    disableChests(){
        this.aChests.forEach((el)=>el.setSelectablle(false));
    }

    onChestOpened(nID, bWinner){

        if(this.bGameFuilyComplete){ //if we've already won, but want to open other boxes to show the player, we don't need to run this logic
            return;
        }

        console.log('chest opened' + nID);
        let bGameComplete = false;

        this.nTotalChestsOpened++;
        console.log(this.nTotalChestsOpened + " / " + this.nTotalChests);
        //determine if we've won the game, or if all chests are open and it's game over.
        if(this.nTotalChestsOpened == this.nTotalChests){
            bGameComplete = true;
        }

        if(bWinner){
            this.nCurrentWinners++
        }
        console.log(this.nCurrentWinners+ "/" + this.nTotalWinners);

        if(this.nTotalWinners === this.nCurrentWinners && this.nTotalWinners != 0){
            console.log('we have a win!');
            this.aChests.forEach(
                (el,i)=> {if(el.bWinner){
                    el.highlightWin();
                }});
            bGameComplete = true
        }

        if(bGameComplete){
            this.gameComplete();
        }
    }

    revealAll(){
        console.log('revealAll');
        this.aChests.forEach((el,i)=>{
            if(!el.bOpen){
                el.onChestSelected();
            }}
        );
    }

    gameComplete(){
        console.log('gameComplete: ' + this.nPrize);
        this.bGameFuilyComplete = true;
        //if we've any unopened boxes, let's open them...
        /*
        this.aChests.forEach((el,i)=>{
            if(!el.bOpen){
                el.onChestSelected();
            }}
        );*/
        this.revealAll();
        this.disableChests();
        this.fOnGameComplete(this.nPrize);

        let resources = PIXI.Loader.shared.resources;

        if(this.nPrize > 0){
            resources.SND_Win_Revealed.sound.play();
            setTimeout( 
                function() {
                    resources.SND_End_Game_Win.sound.play();
                }.bind(this)
            , 1000)
        }else{
            console.log('here>>>');
            setTimeout( 
                function() {
                    resources.SND_End_Game_Lose.sound.play();
                }.bind(this)
            , 1000)
        }
    }
    
    resetGame(){
        console.log('resetGAme');
        this.aChests.forEach((el)=>el.resetChest());
    }
}

export {Game}
