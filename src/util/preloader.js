class PreLoader{

    //Loads our various assets - just hardcoded in here for demo purposes, ideally we'd specify all these in a separate JSON or XML file.
	constructor(cMainContainer, fOnLoadComplete) {
        console.log('PreLoader');

        this.fOnLoadComplete = fOnLoadComplete;

        //single images
        PIXI.Loader.shared.add("background","assets/images/background.png");
        PIXI.Loader.shared.add("logo","assets/images/logo.png");

        //sprite sheets
        PIXI.Loader.shared.add("ui","assets/images/ui.json");
        PIXI.Loader.shared.add("chest","assets/images/chest.json");
        PIXI.Loader.shared.add("backgroundElements","assets/images/backgroundElements.json");
        PIXI.Loader.shared.add("language","assets/images/language.json");

        //Bitmap fonts
        PIXI.Loader.shared.add('skranji-interface-export', 'assets/images/skranji-interface-export.xml');
        PIXI.Loader.shared.add('skranji-white-interface-export', 'assets/images/skranji-white-interface-export.xml');
        PIXI.Loader.shared.add('skranji-white-export', 'assets/images/skranji-white-export.xml');
        PIXI.Loader.shared.add('skranji-yellow-export', 'assets/images/skranji-yellow-export.xml');
        PIXI.Loader.shared.add('worksans-orange-export', 'assets/images/worksans-orange-export.xml');

        //SFX
        PIXI.Loader.shared.add('SND_Chest_Open', 'assets/audio/SND_Chest_Open.{ogg,mp3}');
        PIXI.Loader.shared.add('SND_Click', 'assets/audio/SND_Click.{ogg,mp3}');
        PIXI.Loader.shared.add('SND_End_Game_Lose', 'assets/audio/SND_End_Game_Lose.{ogg,mp3}');
        PIXI.Loader.shared.add('SND_End_Game_Win', 'assets/audio/SND_End_Game_Win.{ogg,mp3}');
        PIXI.Loader.shared.add('SND_Win_Revealed', 'assets/audio/SND_Win_Revealed.{ogg,mp3}');


        PIXI.Loader.shared.onProgress.add((e) => this.onProgress(e.progress)); // called once per loaded/errored file
        PIXI.Loader.shared.load(this.onLoadComplete.bind(this));


        //Quick dev load bar...

        this.cMainContainer = cMainContainer;
        const graphics = new PIXI.Graphics();
		graphics.beginFill(0x000000);
		graphics.drawRect(0, 0, 2000, 2000);
		graphics.endFill();
        this.cMainContainer.addChild(graphics);

        this.cLoader = new PIXI.Container();
        this.gLoadBar = new PIXI.Graphics();
        this.gLoadBar.beginFill(0xFFFFFF);
		this.gLoadBar.drawRect(0, 0, 500, 30);
        this.gLoadBar.endFill();

        this.gLoadBarBack = new PIXI.Graphics();
        this.gLoadBarBack.beginFill(0xCCCCCC);
		this.gLoadBarBack.drawRect(0, 0, 500, 30);
        this.gLoadBarBack.endFill();
        
        this.cLoader.addChild(this.gLoadBarBack);
        this.cLoader.addChild(this.gLoadBar);
        this.cLoader.x = 780;
        this.cLoader.y = 600;

        this.cMainContainer.addChild(this.cLoader);


    }

    onProgress(nProg){
        console.log('progress: ' + nProg);
        this.gLoadBar.scale.x = nProg/100;
    }

    onLoadComplete(){
        console.log('on Load Complete');
        this.fOnLoadComplete();
    }

}

export {PreLoader}
