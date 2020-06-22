class ButtonUtil{

	constructor(oTextureMain,oTextureHighlight,fOnClick) {
        console.log('ButtonUtil');
        let sprMain = new PIXI.Sprite.from(oTextureMain);
        let sprHighlight = new PIXI.Sprite.from(oTextureHighlight);
        this.fOnClick = fOnClick;


        this.oContainer = new PIXI.Container();
        this.oContainer.addChild(sprMain);
        //oContainer.addChild(sprHighlight);


        if(fOnClick){
            console.log('found click');
            this.oContainer.interactive = true;
            this.oContainer.on('pointerdown', this.onButtonSelected.bind(this));

        }else{
            console.log('not found click');
        }

        this.oContainer.enableButton = this.enableButton;
        this.oContainer.disableButton = this.disableButton;

        return this.oContainer;
    }

    onButtonSelected(){
        let resources = PIXI.Loader.shared.resources;
        resources.SND_Click.sound.play();

        this.fOnClick();
    }


    enableButton(){
        this.interactive = true;
        this.alpha = 1;
    }

    disableButton(){
        this.interactive = false;
        this.alpha = 0.5;
    }


}

export {ButtonUtil}
