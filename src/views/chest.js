import ConfigData from '../engine/config_data.js';


class Chest{

	constructor(cMainContainer, nID, fOnChestOpened) {
        console.log('chest: ' + nID);
        this.cMainContainer = cMainContainer;
        this.nID = nID;
        this.fOnChestOpened = fOnChestOpened;

        let resources = PIXI.Loader.shared.resources;
        let sheet = resources.chest.spritesheet;
        let aChestAnims = sheet._frameKeys.filter((el)=>el.indexOf('chest_animation')===0);
        let aTextures = [];
        for(let i=0;i<aChestAnims.length;i++){
            let oTexture = PIXI.Texture.from(aChestAnims[i]);
            aTextures.push(oTexture);
        }



        this.oChestContainer = new PIXI.Container();
        this.cMainContainer.addChild(this.oChestContainer);

       /*

       */
        

        this.sprChest = new PIXI.AnimatedSprite(aTextures);
        this.sprChest.animationSpeed = 2; 
        this.sprChest.loop = false;
        console.log(this.sprChest);
        this.sprChest.onComplete = () => this.onAnimCommplete();
        //sprChest.play();
        this.oChestContainer.addChild(this.sprChest);
        this.oChestContainer= Object.assign(this.oChestContainer, ConfigData.oConfigData.config.viewData.chestData[nID]);

        this.sprGlow = PIXI.Sprite.from("chestGlow.png");
        this.oChestContainer.addChild(this.sprGlow);
        this.sprGlow.anchor.x =0.5;
        this.sprGlow.anchor.y =0.5;
        this.sprGlow.y = -20;

        let aPrize = ['1','11','1111']; //just testing the text centers nicely for values of differing length
        
        
        this.tPrizeGray = new PIXI.BitmapText(aPrize[parseInt(Math.random()*aPrize.length)], { font: '40px skranji-white-export', align: 'center' });
		this.tPrizeGray.x = 0;
        this.tPrizeGray.y = -70;
        this.tPrizeGray.anchor.x = 0.5;
        this.oChestContainer.addChild(this.tPrizeGray);

        this.tPrize = new PIXI.BitmapText(aPrize[parseInt(Math.random()*aPrize.length)], { font: '40px skranji-yellow-export', align: 'center' });
		this.tPrize.x = 0;
        this.tPrize.y = -70;
        this.tPrize.anchor.x = 0.5;
        this.oChestContainer.addChild(this.tPrize);        

        this.sprChest.anchor.x =0.5;
        this.sprChest.anchor.y =0.5;
        this.sprChest.rotation = (Math.random()/10) - 0.05;

        this.sprChest.interactive = true;
        this.sprChest.on('pointerdown', this.onChestSelected.bind(this));

        this.resetChest();
    }


    resetChest(){
        console.log('reset ' + this.nID);
        this.bOpen = false;
        this.bWinner = false;
        this.sprChest.gotoAndStop(0);
        this.sprGlow.visible = false;
        this.tPrize.visible = false;
        this.tPrizeGray.visible = false;
        this.bSelectable = false;
    }

    setPrizeValue(nPrizeValue){
        this.nPrizeValue = nPrizeValue;
        this.tPrize.text = "$" + nPrizeValue;
        this.tPrizeGray.text = "$" + nPrizeValue;
    }

    setWinner(bWinner){
        console.log('Winner!!!');
        this.bWinner = bWinner;
    }

    setSelectablle(bSelectable){
        this.bSelectable = bSelectable;
    }

    highlightWin(){
        this.sprGlow.visible = true;
        this.tPrize.visible = true;
    }

    onChestSelected(){
        console.log('onChestSelected: ' + this.nID + " " + this.bSelectable);
        if(this.bSelectable && !this.bOpen){
            this.bOpen = true;
            this.sprChest.play();

            let resources = PIXI.Loader.shared.resources;
            resources.SND_Chest_Open.sound.play();
        }
    }

    onAnimCommplete(){
        console.log('onAnimCommplete:' + this.nID);
        this.tPrizeGray.visible = true;
        this.fOnChestOpened(this.nID, this.bWinner);
    }



    


    
}

export {Chest}
