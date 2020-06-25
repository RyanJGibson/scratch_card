class ButtonUtil{

	constructor(oTextureMain,oTextureHighlight,fOnClick,nHiglightOffsetX,nHiglightOffsetY) {
        console.log('ButtonUtil');
        let sprMain = new PIXI.Sprite.from(oTextureMain);
        let sprHighlight = new PIXI.Sprite.from(oTextureHighlight);
        this.fOnClick = fOnClick;


        this.bInteractive =

        this.oContainer = new PIXI.Container();
        this.oContainer.addChild(sprMain);
        
        if(oTextureHighlight){
            this.sprHighlight = sprHighlight;
            this.oContainer.addChild(this.sprHighlight); 
            this.sprHighlight.alpha = 0;
            if(nHiglightOffsetX){
                this.sprHighlight.x = nHiglightOffsetX;
            }
            if(nHiglightOffsetY){
                this.sprHighlight.y = nHiglightOffsetY;
            }
        }

    

        if(fOnClick){
            this.oContainer.interactive = true;
            this.oContainer.on('pointerdown', this.onButtonSelected.bind(this));
            this.oContainer.on('pointerover', this.onButtonOver.bind(this));
            this.oContainer.on('pointerout', this.onButtonOut.bind(this));
        }

        this.oContainer.enableButton = this.enableButton;
        this.oContainer.disableButton = this.disableButton;
        this.oContainer.sprHighlight = this.sprHighlight;


        return this.oContainer;
    }

    onButtonSelected(){
        let resources = PIXI.Loader.shared.resources;
        resources.SND_Click.sound.play();
        this.fOnClick();
    }

    onButtonOver(){
        this.sprHighlight.alpha = 0.1;
    }

    onButtonOut(){
        this.sprHighlight.alpha = 0;
    }


    enableButton(){
        this.interactive = true;
        this.alpha = 1;
      
        //this.sprHighlight.visible = true;
        //this.sprHighlight.alpha = 0.8;
    }

    disableButton(){
        this.interactive = false;
        this.alpha = 0.5;
        
        //this.sprHighlight.visible = false;
        //this.sprHighlight.alpha = 0;
        
    }


}

export {ButtonUtil}
