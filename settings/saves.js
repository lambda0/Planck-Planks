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
        importSave(originalSave)
    }
}
