import ConfigData from '../engine/config_data.js';

class GameBackground{

    //stick all our background elements in
	constructor(cMainContainer) {
        console.log('GameBackground');
        this.cMainContainer = cMainContainer;


        let resources = PIXI.Loader.shared.resources;
        let background = new PIXI.Sprite(resources.background.texture);
		this.cMainContainer.addChild(background);
        background.y= -385;



        for(let i=0;i<ConfigData.oConfigData.config.viewData.gameBackground.length;i++){
            let oBackgroundData = ConfigData.oConfigData.config.viewData.gameBackground[i];
            console.log(oBackgroundData);
            let oSprite = new PIXI.Sprite.from(oBackgroundData.key);
            if(oBackgroundData.key == 'waterRipple.png'){
                this.sprWater = oSprite;
            }
            this.cMainContainer.addChild(oSprite);
            oSprite = Object.assign(oSprite, oBackgroundData.properties);
        }


        this.tMaxWin = new PIXI.BitmapText('$100,000', { font: '35px skranji-yellow-export', align: 'center' });
		this.tMaxWin.x = 980;
        this.tMaxWin.y = 512;
        this.cMainContainer.addChild(this.tMaxWin);


        TweenMax.to(this.sprWater, 3, 
            {y:530,
            yoyo:true,
            ease:"sine.inOut",
            repeat:-1,
        });
        

        TweenMax.to(background, 3, 
            {y:background.y+10,
            yoyo:true,
            ease:"sine.inOut",
            repeat:-1
		});

        

    }
    
}

export {GameBackground}