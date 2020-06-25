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

            if(oForegroundData.key == 'palmL.png'){
                this.sprPalmL = oSprite;
            }
            if(oForegroundData.key == 'palmR.png'){
                this.sprPalmR = oSprite;
            }
            if(oForegroundData.key == 'bushesL.png'){
                this.sprBushesL = oSprite;
            }
            if(oForegroundData.key == 'bushesR.png'){
                this.sprBushesR = oSprite;
            }
            if(oForegroundData.key == 'instructionGame01.psd'){
                this.sprInst = oSprite;
            }

            this.cMainContainer.addChild(oSprite);
            oSprite = Object.assign(oSprite, oForegroundData.properties);
        }



        TweenMax.to(this.sprPalmL, 3, 
            {x:this.sprPalmL= this.sprPalmL.x-10,
            yoyo:true,
            ease:"sine.inOut",
            repeat:-1,
        });
        TweenMax.to(this.sprPalmR, 3, 
            {x:this.sprPalmR= this.sprPalmR.x+10,
            yoyo:true,
            ease:"sine.inOut",
            repeat:-1,
        });

        TweenMax.to(this.sprBushesL, 3, 
            {x:this.sprBushesL= this.sprBushesL.x-10,
            yoyo:true,
            ease:"sine.inOut",
            repeat:-1,
        });
        TweenMax.to(this.sprBushesR, 3, 
            {x:this.sprBushesR= this.sprBushesR.x+10,
            yoyo:true,
            ease:"sine.inOut",
            repeat:-1,
        });


        TweenMax.to(this.sprInst, 3, 
            {y:this.sprInst = this.sprInst.y - 20,
            yoyo:true,
            ease:"sine.inOut",
            repeat:-1,
            delay:1
        });



        

    }
    
}

export {GameForeground}