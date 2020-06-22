import {ResizeHelper} from './util/resizehelper.js';
import {PreLoader} from './util/preloader.js';
import {Engine} from './engine/engine.js';
import ConfigData from './engine/config_data.js';
import {Game} from './views/game.js';
import {UI} from './views/ui.js';

class Main{
	constructor() {
		console.log('Main');
		const elCanvas = document.querySelector("#gameCanvas");
		console.log(elCanvas);

		let oDimensions = {x:2048,y:1280};

		this.oApp = new PIXI.Application(
			{ 	width: oDimensions.x, 
				height: oDimensions.y, 
				backgroundColor: 0x000000,
				view:elCanvas}
			);	

		this.cMain = new PIXI.Container();

		this.oApp.stage.addChild(this.cMain);

		var oResizeHelper = new ResizeHelper(this.oApp,oDimensions);
		this.oEngine = new Engine(this.onEngineInit.bind(this));

		
		this.tState = new PIXI.Text('');
		this.tState.x = 5;
		this.tState.y = 5;
		this.oApp.stage.addChild(this.tState);

		this.eStateEnums = {
			sWait: "WAIT",
			sLoading: "LOADING",
			sInitShowStakeScreen: "INIT_SHOW_STAKE_SCREEN",
			sStakeSelect: "STAKE_SELECT",
			sInitNewGame:"INIT_NEW_GAME",
			sGameInProgress:"GAME_IN_PROGRESS",
			sInitGameComplete:"INIT_GAME_COMPLETE",
			sGameComplete:"GAME_COMPLETE"
		};


		this.sState = this.eStateEnums.sLoading;
		this.oApp.ticker.add(this.loop.bind(this));
		
	}

	onEngineInit(){
		console.log('onEngineInit');
		console.log(ConfigData);
		for(let i in ConfigData){
			console.log(i);
			console.log(ConfigData[i]);
		}

		this.cMain = Object.assign(this.cMain, ConfigData.oConfigData.config.viewData.mainGame);

		var oPreLoader = new PreLoader(this.cMain, this.onLoadComplete.bind(this));
	}


	onLoadComplete(){
		console.log('Main OnLoadComplete');

		this.oGame = new Game(this.cMain);
		this.oUI = new UI(this.cMain);

		this.initGameEventHandlers();
		this.initUIEventHandlers();
		this.oUI.initScreens();

		this.sState = this.eStateEnums.sInitShowStakeScreen;
	}




	//Events
	initGameEventHandlers(){
		this.oGame.initEventHanders(
			this.onGameComplete.bind(this)
		)
	}	

	initUIEventHandlers(){
		this.oUI.initEventHanders(
			this.onNewGameButtonClick.bind(this),
			this.onShowStakeButtonClick.bind(this),
			this.onReplayButtonClick.bind(this),
			this.onRevealAllButtonClick.bind(this)
		);
	}


	// From UI
	onNewGameButtonClick(){
		console.log('onNewGameButtonClick');
		this.oUI.disableSetBetButton();
		this.sState = this.eStateEnums.sInitNewGame;
	}

	onShowStakeButtonClick(){
		console.log('onShowStakeButtonClick');
		this.oUI.hideGameComplete();
		this.oUI.enableSetBetButton();
		this.sState = this.eStateEnums.sInitShowStakeScreen;
	}

	onReplayButtonClick(){
		console.log('onReplayButtonClick');
		//disable replay button + set stake button
		//this.oUI.hideGameComplete();
		this.oUI.disableGameCompleteButtons();
		this.sState = this.eStateEnums.sInitNewGame;
	}

	onRevealAllButtonClick(){
		console.log('onRevealAllButtonClick');
		this.oUI.disableRevealAllButton();
		this.oGame.revealAll();
	}


	//From Game
	onGameComplete(nWinAmount){
		console.log('onGameComplete');
		if(nWinAmount > 0){
			console.log('Win');
		}else{
			console.log('Lose');
		}
		this.sState = this.eStateEnums.sInitGameComplete;
	}

	



	//Game Loop
	initShowStakeScreen(){
		this.oUI.showSetBet();
		
		this.sState = this.eStateEnums.sStakeSelect;
	}

	initNewGame(){
		this.oEngine.simulateNewGameRequest(this.onGameDataReceived.bind(this));
		//have game reset all boxes
		this.oGame.resetGame();
		this.sState = this.eStateEnums.sWait;
	}

	onGameDataReceived(oData){
		console.log('onGameDataReceived');
		console.log(oData);
		this.oUI.hideSetBet();
		this.oUI.hideGameComplete();
		this.oUI.showRevealAll();
		this.oUI.enableRevealAllButon();
		this.oGame.initNewGame(oData);
		this.sState = this.eStateEnums.sGameInProgress;
	}

	initGameComplete(){
		this.oUI.hideRevealAll();
		this.oUI.showGameComplete(this.oGame.nPrize);
		this.oUI.enableGameCompleteButtons();
		this.sState = this.eStateEnums.sGameComplete;
	}


	loop(){
		this.tState.text = this.sState;
        switch (this.sState){
            case this.eStateEnums.sInitShowStakeScreen:
				this.initShowStakeScreen();
			break;
			case this.eStateEnums.sInitNewGame:
				this.initNewGame();
			break;
			case this.eStateEnums.sInitGameComplete:
				this.initGameComplete();
			break;
        }
    }


}

export {Main}
