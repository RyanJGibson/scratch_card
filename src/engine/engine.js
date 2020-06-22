import ConfigData from './config_data.js';

class Engine{

	constructor(fOnEngineInit) {
        console.log('Engine');
        this.fOnEngineInit = fOnEngineInit;

        this.oEngineData = {};
        this.oConfigData = {};

        fetch('data/gameinfo.json')
			.then(response => response.json())
            .then(data => this.onGameDataFetched(data))
    }

    onGameDataFetched(data){
        this.oEngineData = data;
        ConfigData.oEngineData = this.oEngineData;
        console.log(this.oEngineData);
        this.fetchConfigData();
    }

    fetchConfigData(){
        fetch('data/config.json')
        .then(response => response.json())
        .then(data => this.onConfigDataFetched(data))
    }

    onConfigDataFetched(data){
        this.oConfigData = data;
        ConfigData.oConfigData = this.oConfigData;
        
        this.onAllDataLoaded();
    }

    onAllDataLoaded(){
        console.log('onAllDataLoaded');
        this.fOnEngineInit();
        //this.fOnLoadComplete();
    }


    simulateNewGameRequest(fOnGameDataReceived){
        console.log('simulateNewGameRequest')
        let demoPromise = new Promise((resolve, reject) => {
            setTimeout( 
                function() {
                    //console.log( this.oEngineData );
                    var oRandomScenario = this.oEngineData.scenarioData[parseInt(Math.random()*this.oEngineData.scenarioData.length)];
                    console.log(oRandomScenario);
                    resolve(oRandomScenario) 
                }.bind(this)
            , 500) 
        })
        demoPromise.then((oScenario)=>fOnGameDataReceived(oScenario))
    }

}

export {Engine}
