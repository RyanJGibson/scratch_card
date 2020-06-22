class ResizeHelper{

	constructor(oApp, oDimensions) {
        console.log('ResizeHelper');
        
        this.oApp = oApp;
        console.log(oDimensions);

        this.oDimensions = oDimensions;
        this.elContainerDiv = document.getElementById('gamecontainer');
        this.elCanvas = document.querySelector("#gameCanvas");

        //this.elCanvas.style.width = '100%';

        this.onResize();
        window.addEventListener('resize', this.onResize.bind(this), true);
    }

    onResize(){
        //console.log('onResize');

        //For the purpose of the demo we're just going to set the canvas width to screen width, then centre it vertically.
        //Horizontal positioning taken care of via CSS
        //canvas height should be auto adjusted - but just for added peace of mind...
        let nHeight = window.innerWidth / (this.oDimensions.x/this.oDimensions.y);
        
        if(nHeight > window.innerHeight){
            nHeight = window.innerHeight;
        }
        let nWidth = nHeight * (this.oDimensions.x/this.oDimensions.y);

        this.oApp.view.style.height  = nHeight+'px';
        this.oApp.view.style.width  = nWidth+'px';

        this.elContainerDiv.style.marginTop = (((window.innerHeight  - nHeight) /2))+'px';
        this.elContainerDiv.style.width = nWidth + 'px';
        
    }


}

export {ResizeHelper}
