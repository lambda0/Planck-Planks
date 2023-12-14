function buyBoosters(n){
    c = game.boostersCost
        .mul(new Decimal("1e10")
            .pow(n)
            .sub(new Decimal(1)))
        .div(new Decimal("1e10")
            .sub(new Decimal(1)));
    if (game.planks.gte(c)) {
        game.planks = game.planks.sub(c);
        game.boosters = game.boosters.add(n);
    };
};
function maxBoosters(){
    n = game.planks
        .mul(new Decimal("1e10")
            .sub(new Decimal(1)))
        .div(game.boostersCost)
        .add(new Decimal(1))
        .log(new Decimal("1e10"))
        .floor();
    buyBoosters(n);
};
function BoostersValues(){
    game.boostersCost = new Decimal("1e25")
        .mul(new Decimal("1e10")
            .pow(game.boosters));
    game.boostersMult = new Decimal(2).pow(game.boosters);
};