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
    sacrificeMult:new Decimal(1),
    sacrificeRequire:new Decimal("1e13"),
    boosters:new Decimal(0),
    boostersCost:new Decimal("1e25"),
    boostersMult:new Decimal(1)
};
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
        BoostersValues();
        game.playedTime += 10;
},10)};
function updateCSS(){
    setInterval(function(){
        document.getElementById("a3").innerHTML=notation(game.planks);
        document.getElementById("c1a").innerHTML="You have "+notation(game.planks)+" planck planks. You are getting "+notation(game.planksPerSec)+" planck planks per second.";
        for(n = 0;n < 10;n++){
            document.getElementById("c2"+"abcdefghij"[n]+"2a").innerHTML=notation(game.plankGenerators[n]);
            document.getElementById("c2"+"abcdefghij"[n]+"3a").innerHTML=notation(game.plankGeneratorsPerSec[n])+"/s";
            document.getElementById("c2"+"abcdefghij"[n]+"4a").innerHTML=notation(game.plankGeneratorsMult[n])+"x";
            document.getElementById("c2"+"abcdefghij"[n]+"5a1").innerHTML="Cost: "+notation(game.plankGeneratorsCost[n])+" Planks";
            document.getElementById("c2"+"abcdefghij"[n]+"7").style.display="none";
        };
        document.getElementById("c2k2a").innerHTML=notation(game.boosters);
        document.getElementById("c2k4a").innerHTML=notation(game.boostersMult)+"x";
        document.getElementById("c2k5a1").innerHTML="Cost: "+notation(game.boostersCost)+" Planks";
        document.getElementById("c2k7").style.display="none";
        document.getElementById("c3a").innerHTML = "You need " + notation(game.sacrificeRequire) + " planck planks to sacrifice."
        document.getElementById("c3b1").innerHTML = "Sacrifice<br>"
            + notation(game.sacrificeMult)
            + "x -&gt; "
            + notation(game.planks.log10().sub(new Decimal(3)).div(new Decimal(10)))
            + "x<br>+"
            + notation(game.planks.log10().sub(new Decimal(3)).div(new Decimal(10)).sub(game.sacrificeMult))
            + ", x"
            + notation(game.planks.log10().sub(new Decimal(3)).div(new Decimal(10)).div(game.sacrificeMult));
        document.getElementById("c3a").style.display = game.planks.gte(game.sacrificeRequire) ? "none" : "block";
        document.getElementById("c3b").style.display = game.planks.gte(game.sacrificeRequire) ? "block" : "none";
        document.getElementById("c").style.display = game.tab == "plank" ? "block" : "none";
        document.getElementById("d").style.display = game.tab == "settings" ? "block" : "none";
        document.getElementById("d2a").innerHTML = "You have played for " + formatTime(game.playedTime) + ".";
        document.getElementById("d2").style.display = game.subtab == "stats" ? "block" : "none";
        document.getElementById("d3").style.display = game.subtab == "saves" ? "block" : "none";
        document.getElementById("d4").style.display = game.subtab == "infos" ? "block" : "none";
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