import ConfigData from '../engine/config_data.js';

class GameForeground{

    //stick all our background elements in
	constructor(cMainContainer) {
        console.log('GameForeground');
        this.cMainContainer = cMainContainer;


        for(let i=0;i<ConfigData.oConfigData.config.viewData.gameForeground.length;i++){
            let oForegroundData = ConfigData.oConfigData.config.viewData.gameForeground[i];
            console.log(oForegroundData);
            let oSprite = new PIXI.Sprite.from(oForegroundData.key);
            this.cMainContainer.addChild(oSprite);
            oSprite = Object.assign(oSprite, oForegroundData.properties);
        }


        

    }
    
}

export {GameForeground}