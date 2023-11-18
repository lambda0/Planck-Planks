function buyPlankGenerators(x, n){
    c = game.plankGeneratorsCost[x]
        .mul(new Decimal(3 ** (x + 1))
            .pow(n)
            .sub(new Decimal(1)))
        .div(new Decimal(3 ** (x + 1) - 1));
    if (game.planks.gte(c)) {
        game.planks = game.planks.sub(c);
        game.plankGenerators[x] = game.plankGenerators[x].add(n);
        game.plankGeneratorsBought[x] = game.plankGeneratorsBought[x].add(n);
    };
};
function maxPlankGenerators(x){
    n = game.planks
        .mul(new Decimal(3 ** (x + 1) - 1))
        .div(game.plankGeneratorsCost[x])
        .add(new Decimal(1))
        .log(new Decimal(3 ** (x + 1)))
        .floor();
    buyPlankGenerators(x, n);
};
function maxAllPlankGenerators(){
    for (var n = 0;n < 10;n++) {
        maxPlankGenerators(n);
    };
};
function plankGeneratorsEffect(){
    game.planksPerSec = game.plankGenerators[0].mul(game.plankGeneratorsMult[0]);
    game.planks = game.planks
        .add(game.planksPerSec
            .mul(new Decimal(0.01)));
    for (var n = 0;n < 9;n++){
        game.plankGeneratorsPerSec[n] = 
            game.plankGenerators[n + 1].mul(
                game.plankGeneratorsMult[n + 1]
            );
        game.plankGenerators[n] = 
            game.plankGenerators[n].add(
                game.plankGeneratorsPerSec[n].mul(
                    new Decimal(0.01)
                )
            );
    };
};
function plankGeneratorsValues(){
    for (var n = 0;n < 10;n++) {
        game.plankGeneratorsCost[n] = 
        game.plankGeneratorsStartingCost[n]
            .mul(new Decimal(3 ** (n + 1))
            .pow(game.plankGeneratorsBought[n]));
        game.plankGeneratorsMult[n] = 
            n == 0 ? 
            game.sacrificeMultiplier.mul(new Decimal(1.05).pow(game.plankGeneratorsBought[0])) : 
            new Decimal(1.05).pow(game.plankGeneratorsBought[n]);
    };
};