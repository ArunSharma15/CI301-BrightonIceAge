export class welcomeScene{
    
    constructor(){}

    private description:string = "Welcome to the Brighton Ice Age Experience!" + '\n' + 
                                 "Please click next to begin!";
    public getText():string {return this.description;}

}


export class scene1Text{

    constructor(){}

    private modelName:string = "Earth - Karoo Ice Age";
    public getMNameText():string {return this.modelName;}

    private modelDesc:string = "The Earth loooked very different in the 'Karoo Ice Age'." +
                               "Which was 350 million years ago. The Gondwana super contitent housed " +
                               "many modern day countries. See if you can spot Brighton!";
    public getMDescText():string {return this.modelDesc;}

}

export class scene2Text{
    constructor(){}

    private modelName:string = "";
    public getMNameText():string {return this.modelName;}

    private modelDesc:string = "It is theorised that Homo-Erectus (ancestor to modern day humans) were living in the UK, under glacial conditions." 
                                + "Having utilised primitive wooden spears to hunt Mammoths and Hippopotamus and utilised fire." 
                                + "This hominid was expected to have occupied South-East of the UK.";
    public getMDescText():string {return this.modelDesc;}
}

export class scene3Text{
    constructor(){}

    private modelName:string = "";
    public getMNameText():string {return this.modelName;}

    private modelDesc:string = "During the Karoo Ice Age, oxygen levels started to rise. The natural fauna and flora started to flourish " 
                             + "Some fern trees grew to 20m high! These weren't even the highest trees around, with others growing to 30m and higher.";
    public getMDescText():string {return this.modelDesc;}

}

export class scene4Text{
    constructor(){}

    private modelName:string = "";
    public getMNameText():string {return this.modelName;}

    private modeDesc:string = "40,000 years ago (coming closer to modern day), the Neanderthal constructed a variety of tools using wood"
                            + " and stone. As expected, these tools were used in the pursuit of hunting and predatory behaviour.";
    public getMDescText():string {return this.modeDesc;}

}

export class endText{
    constructor(){}
    private description:string = "The information imparted to you is only a taste of what the Ice Age contained. The journey can be "
                               + "continued by visiting exhibits and perusing online materials.";
    public getText():string {return this.description;}
}