function sacrifice() {
    if (game.planks.gte(game.sacrificeRequire)) {
        game.sacrificeRequire = game.planks;
        game.sacrificeMultiplier = game.planks.log10().sub(new Decimal(3)).div(new Decimal(10));
        game.planks = new Decimal(10);
        game.plankGenerators = [
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0)];
        game.plankGeneratorsBought = [
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0),
            new Decimal(0)];
        game.plankGeneratorsMult = [
            new Decimal(1),
            new Decimal(1),
            new Decimal(1),
            new Decimal(1),
            new Decimal(1),
            new Decimal(1),
            new Decimal(1),
            new Decimal(1),
            new Decimal(1),
            new Decimal(1)];
        game.plankGeneratorsCost = [
            new Decimal(10),
            new Decimal(100),
            new Decimal(1000),
            new Decimal(100000),
            new Decimal("1e8"),
            new Decimal("1e13"),
            new Decimal("1e21"),
            new Decimal("1e34"),
            new Decimal("1e55"),
            new Decimal("1e89")];
    }
}