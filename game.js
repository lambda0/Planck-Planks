var game = {
    tab:"plank",
    subtab:"main",
    playedTime:0,
    planks:new Decimal(10),
    planksPerSec:new Decimal(0),
    plankGenerators:[
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0)],
    plankGeneratorsBought:[
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0)],
    plankGeneratorsPerSec:[
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0)],
    plankGeneratorsMult:[
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1)],
    plankGeneratorsCost:[
        new Decimal(10),
        new Decimal(100),
        new Decimal(1000),
        new Decimal(100000),
        new Decimal("1e8"),
        new Decimal("1e13"),
        new Decimal("1e21"),
        new Decimal("1e34"),
        new Decimal("1e55"),
        new Decimal("1e89")],
    plankGeneratorsStartingCost:[
        new Decimal(10),
        new Decimal(100),
        new Decimal(1000),
        new Decimal(100000),
        new Decimal("1e8"),
        new Decimal("1e13"),
        new Decimal("1e21"),
        new Decimal("1e34"),
        new Decimal("1e55"),
        new Decimal("1e89")],
    sacrificeMultiplier:new Decimal(1),
    sacrificeRequire:new Decimal("1e13")
};
var originalSave = "eyJ0YWIiOiJzZXR0aW5ncyIsInN1YnRhYiI6InNhdmVzIiwicGxheWVkVGltZSI6Mzg5MCwicGxhbmtzIjoiMTAiLCJwbGFua3NQZXJTZWMiOiIwIiwicGxhbmtHZW5lcmF0b3JzIjpbIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiXSwicGxhbmtHZW5lcmF0b3JzQm91Z2h0IjpbIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiXSwicGxhbmtHZW5lcmF0b3JzUGVyU2VjIjpbIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiXSwicGxhbmtHZW5lcmF0b3JzTXVsdCI6WyIxIiwiMSIsIjEiLCIxIiwiMSIsIjEiLCIxIiwiMSIsIjEiLCIxIl0sInBsYW5rR2VuZXJhdG9yc0Nvc3QiOlsiMTAiLCIxMDAiLCIxMDAwIiwiMTAwMDAwIiwiMTAwMDAwMDAwIiwiMTAwMDAwMDAwMDAwMDAiLCIxZTIxIiwiMWUzNCIsIjFlNTUiLCIxZTg5Il0sInBsYW5rR2VuZXJhdG9yc1N0YXJ0aW5nQ29zdCI6WyIxMCIsIjEwMCIsIjEwMDAiLCIxMDAwMDAiLCIxMDAwMDAwMDAiLCIxMDAwMDAwMDAwMDAwMCIsIjFlMjEiLCIxZTM0IiwiMWU1NSIsIjFlODkiXSwic2FjcmlmaWNlTXVsdGlwbGllciI6IjEiLCJzYWNyaWZpY2VSZXF1aXJlIjoiMTAwMDAwMDAwMDAwMDAifQ==";
function formatTime(t){
    var ms = t % 1000;
    var s = Math.floor(t % 60000 / 1000);
    var m = Math.floor(t % 3600000 / 60000);
    var h = Math.floor(t % 86400000 / 3600000);
    var d = Math.floor(t / 86400000);
    return d.toString() + " d, "
         + h.toString() + " h, "
         + m.toString() + " m, "
         + s.toString() + " s, "
         + ms.toString() + " ms";
}
function update(){
    setInterval(function(){
        plankGeneratorsEffect();
        plankGeneratorsValues();
        game.playedTime += 10;
},10)};
function updateCSS(){
    setInterval(function(){
        var btnCSSText = "font-family:\"MonospaceTypewriter\";font-size:16px;";
        document.getElementById("a3").innerHTML=notation(game.planks);
        document.getElementById("c1a").innerHTML="You have "+notation(game.planks)+" planck planks. You are getting "+notation(game.planksPerSec)+" planck planks per second.";
        for(n=0;n<10;n++){
            document.getElementById("c2"+"abcdefghij"[n]+"2a").innerHTML=notation(game.plankGenerators[n]);
            document.getElementById("c2"+"abcdefghij"[n]+"3a").innerHTML=notation(game.plankGeneratorsPerSec[n])+"/s";
            document.getElementById("c2"+"abcdefghij"[n]+"4a").innerHTML=notation(game.plankGeneratorsMult[n])+"x";
            document.getElementById("c2"+"abcdefghij"[n]+"5a1").innerHTML="Cost: "+notation(game.plankGeneratorsCost[n])+" Planks";
            document.getElementById("c2"+"abcdefghij"[n]+"5a").style.cssText=btnCSSText;
            document.getElementById("c2"+"abcdefghij"[n]+"6a").style.cssText=btnCSSText;
            document.getElementById("c2"+"abcdefghij"[n]+"7a").style.cssText=btnCSSText;
            document.getElementById("c2"+"abcdefghij"[n]+"7").style.display="none";
        };
        for (n = 1;n <= 7;n++) {
            document.getElementById("b"+n).style.cssText = btnCSSText + "background-color:" + ["", "red", "yellow", "lime", "cyan", "blue", "magenta", "gray"][n];
        };
        document.getElementById("c1b1").style.cssText = btnCSSText;
        document.getElementById("c3b").style.cssText = btnCSSText + "background-color:black;color:white;text-align:center;";
        document.getElementById("c3a").innerHTML = "You need " + notation(game.sacrificeRequire) + " planck planks to sacrifice."
        document.getElementById("c3b1").innerHTML = "Sacrifice<br>" + notation(game.sacrificeMultiplier) + "x -&gt; " + notation(game.planks.log10().sub(new Decimal(3)).div(new Decimal(10))) + "x";
        document.getElementById("c3a").style.display = game.planks.gte(game.sacrificeRequire) ? "none" : "block";
        document.getElementById("c3b").style.display = game.planks.gte(game.sacrificeRequire) ? "block" : "none";
        document.getElementById("c").style.display = game.tab == "plank" ? "block" : "none";
        document.getElementById("d").style.display = game.tab == "settings" ? "block" : "none";
        document.getElementById("d1a").style.cssText = btnCSSText + "background-color:gray;";
        document.getElementById("d1b").style.cssText = btnCSSText + "background-color:gray;";
        document.getElementById("d1c").style.cssText = btnCSSText + "background-color:gray;";
        document.getElementById("d2a").innerHTML = "You have played for " + formatTime(game.playedTime) + ".";
        document.getElementById("d2").style.display = game.subtab == "stats" ? "block" : "none";
        document.getElementById("d3").style.display = game.subtab == "saves" ? "block" : "none";
        document.getElementById("d4").style.display = game.subtab == "infos" ? "block" : "none";
        document.getElementById("d3a").style.cssText = btnCSSText + "background-color:gray;";
        document.getElementById("d3b").style.cssText = btnCSSText + "background-color:gray;";
        document.getElementById("d3c").style.cssText = btnCSSText + "background-color:gray;";
},10)};
function notation(amount) {
    var string = "";
    if (amount.sign == -1) {
        string = string + "-";
        amount.sign = 1;
    }else if (amount.sign == 0) {
        return "0.00000";
    };
    let power = Decimal.floor(Decimal.log10(amount));
    let mantissa = amount.div(Decimal.pow(10, power));
    let power2 = Decimal.floor(Decimal.log10(power));
    let mantissa2 = power.div(Decimal.pow(10, power2));
    let power3 = Decimal.floor(Decimal.log10(power2));
    let mantissa3 = power2.div(Decimal.pow(10, power3));
    if (amount == 0) {return "0";}
    else if (power < -4) {return mantissa.toFixed(5) + "e" + power;}
    else if (power < 6) {return amount.toFixed(5);}
    else if (power < 1000000) {return mantissa.toFixed(5) + "e" + power;}
    else if (power2 < 1000000) {return "e" + mantissa2.toFixed(5) + "e" + power2;}
    else if (power3 < 1000000) {return "ee" + mantissa3.toFixed(5) + "e" + power3;}
    else {return amount.mag.toFixed(6) + "f" + amount.layer.toFixed(0);};
};
update();
updateCSS();
