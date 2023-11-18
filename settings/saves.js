function importSave(save) {
    game = JSON.parse(atob(save));
    decimalNum = [
        "planks",
        "planksPerSec",
        "sacrificeMultiplier",
        "sacrificeRequire"
    ]
    decimalList = [
        "plankGenerators",
        "plankGeneratorsBought",
        "plankGeneratorsPerSec",
        "plankGeneratorsMult",
        "plankGeneratorsCost",
        "plankGeneratorsStartingCost",
    ];
    for (i = 0;i < decimalNum.length;i++){
        game[decimalNum[i]] = new Decimal(game[decimalNum[i]])
    }
    for (i = 0;i < decimalList.length;i++){
        for (j = 0;j < game[decimalList[i]].length;j++){
            game[decimalList[i]][j] = new Decimal(game[decimalList[i]][j])
        }
    }
};
function exportSave() {
    prompt("Here\'s your save",btoa(JSON.stringify(game)));
};
function hardReset() {
    sure = confirm("Are you sure?")
    if (sure) {
        game = {
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
    }
}
