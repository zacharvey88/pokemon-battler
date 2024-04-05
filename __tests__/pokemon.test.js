const { Pokemon, Trainer, Battle, Pokeball, Greatball, Ultraball, Masterball} = require("../pokemon.js");

describe("Pokemon Constructor", () => {
  test("Invoking Pokemon constructor with a name arg should create a new instance of the naemd Pokemon", () => {
    expect(new Pokemon("Eevee")).toEqual({
      name: "Eevee", 
      hp: 55, 
      atk: 55, 
      move: "Tackle", 
      type: "Normal", 
      rarity: "Uncommon"
    });
  });


});

describe('Pokemon Methods', () => {

  test("isEffectiveAgainst() - should return a boolean based on the invoking Pokemon's effectiveness against the passed in Pokemon", () => {
    const Flareon = new Pokemon("Flareon");
    const Ivysaur = new Pokemon("Ivysaur");
    const Vaporeon = new Pokemon("Vaporeon");
    expect(Flareon.isEffectiveAgainst(Ivysaur)).toBe(true);
    expect(Vaporeon.isEffectiveAgainst(Flareon)).toBe(true);
    expect(Flareon.isEffectiveAgainst(Vaporeon)).toBe(false);
  });

  test("isWeakTo() - should return a boolean based on the invoking Pokemon's weakness against the passed in Pokemon", () => {
    const Flareon = new Pokemon("Flareon");
    const Ivysaur = new Pokemon("Ivysaur");
    const Vaporeon = new Pokemon("Vaporeon");
    expect(Flareon.isWeakTo(Ivysaur)).toBe(false);
    expect(Vaporeon.isWeakTo(Flareon)).toBe(false);
    expect(Flareon.isWeakTo(Vaporeon)).toBe(true);
  });

  test("attack() - should reuce the opponents hp by the attakers atk value", () => {
    const Pikachu = new Pokemon("Pikachu")
    const Golem = new Pokemon("Golem")
    Pikachu.attack(Golem)
    expect(Golem.hp).toBe(25)
  })

  test("attack() - if opponents hp will reach 0 or below, should be set at 0 and return 'x fainted' ", () => {
    const Pikachu = new Pokemon("Pikachu")
    const Geodude = new Pokemon("Geodude")
    expect(Pikachu.attack(Geodude)).toBe("Geodude fainted")
    expect(Geodude.hp).toBe(0)
  })

  test("attack() - against a Pokemon that you're effective against, should take double damage", () => {
    const Pikachu = new Pokemon("Pikachu")
    const Vaporeon = new Pokemon("Vaporeon")
    Pikachu.attack(Vaporeon)
    expect(Vaporeon.hp).toBe(20)
  })

  test("attack() - against a Pokemon that you're weak to, should take half damage", () => {
    const Pikachu = new Pokemon("Pikachu")
    const Bulbasaur = new Pokemon("Bulbasaur")
    Pikachu.attack(Bulbasaur)
    expect(Bulbasaur.hp).toBe(17.5)
  })

});

describe('Pokeball Constructor', () => {
  test("Invoking the Pokeball constructor should create a new instance of Pokeball with default properties", () => {
    const ball = new Pokeball();
    expect(ball instanceof Pokeball).toBe(true);
    expect(ball).toEqual({type: "Pokeball", stored: null})
  });
  
});


describe('Pokeball Methods', () => {

  test("Calling isEmpty() should return true if new Pokeball's stored value is null, else false", () => {
    const ball = new Pokeball();
    const actual = ball.isEmpty();
    expect(actual).toBe(true);
  });

  test("Calling contains() should return 'This Pokeball is empty!' if stored value is null", () => {
    const ball = new Pokeball();
    expect(ball.contains()).toBe("This Pokeball is empty!");
  });

  test("Calling contains() should return the Pokemon's name assigned to stored", () => {
    const ball = new Pokeball();
    ball.throw("Eevee");
    expect(ball.contains()).toBe("Eevee");
  });

  test("throw() - When ball contains a Pokemon and no arg is provided, will log 'Go x !' and return the Pokemon name", () => {
    const ball = new Pokeball();
    ball.throw("Eevee")
    expect(ball.throw()).toBe("Eevee");
  });

  test("throw() - When ball contains a Pokemon and arg is provided, will log 'x already stored' and return the Pokemon name", () => {
    const ball = new Pokeball();
    ball.throw("Eevee")
    expect(ball.throw("Sandshrew")).toBe("Eevee");
  });

  test("throw() - When no arg is provided and the ball is empty, return 'Pokeball empty' ", () => {
    const ball = new Pokeball();
    expect(ball.throw()).toBe("Pokeball empty");
  });

  test("throw() - When an arg is provided and the ball is empty, assign the Pokemon to stored and log 'You caught x' ", () => {
    const ball = new Pokeball();
    ball.throw("Eevee")
    expect(ball.stored).toEqual({
      name: "Eevee", 
      hp: 55, 
      atk: 55, 
      move: "Tackle", 
      type: "Normal", 
      rarity: "Uncommon"
    });
  });

});


describe('catchPokemon', () => {

  test("When invoked on a Trainer with no Pokeballs, should log 'You have no Pokeballs'", () => {
    const ash = new Trainer('Ash');
    expect(ash.catchPokemon("Bulbasaur")).toBe("No Pokeballs")
  });


  test("When invoked on a Trainer with an emppty Pokeball, should push the Pokemon object to the belt array ", () => {
    const ash = new Trainer('Ash', 100);
    ash.buy("Pokeball", 1)
    ash.catchPokemon("Eevee");
    expect(ash.belt[0].stored).toEqual({
      name: "Eevee", 
      hp: 55, 
      atk: 55, 
      move: "Tackle", 
      type: "Normal", 
      rarity: "Uncommon"
    });
  });

  test("When the all Trainers Pokeballs are full, log 'All your Pokeballs are full' ", () => {
    const EeveeTrainer = new Trainer("Eevee Trainer", 80);
    EeveeTrainer.buy("Pokeball",3)
    EeveeTrainer.catchPokemon("Vaporeon");
    EeveeTrainer.catchPokemon("Jolteon");
    EeveeTrainer.catchPokemon("Flareon");
    expect(EeveeTrainer.belt.every(ball => ball.stored != null)).toBe(true)
    expect(EeveeTrainer.catchPokemon("Eevee")).toBe("No empty balls");
  });
});

describe('choosePokemon', () => {

  test("If all Pokeballs are empty when invoked, return 'You haven't caught any Pokemon' ", () => {
    const trainer = new Trainer();
    expect(trainer.choosePokemon("Eevee")).toBe("No Pokemon");
  });

  test("If there is no matching Pokemon return string 'You don't own this Pokemon' ", () => {
    const trainer = new Trainer("Trainer", 100);
    trainer.buy("Pokeball", 1)
    trainer.catchPokemon("Bulbasaur");
    expect(trainer.choosePokemon("Eevee")).toBe("You don't own this Pokemon");
  });

  test("If a matching Pokemon is found, invoke throw method on the instance of Pokeball to return the pokemon object ", () => {
    const trainer = new Trainer("Trainer", 20);
    trainer.buy("Pokeball", 1)
    trainer.catchPokemon("Eevee");
    expect(trainer.choosePokemon("Eevee")).toEqual("Eevee");
  });

});

describe('Trainer Methods', () => {

  test("catchRandom() - Should assign a random Pokemon from the Pokedex to an empty ball", () => {
    const ash = new Trainer('Ash', 20);
    ash.buy("Pokeball")
    ash.catchRandom();
    expect(ash.belt[0].stored instanceof Pokemon).toBe(true);
  });

  test("catchRandom() - Should only assign a Pokemon of common rarity to Pokeball type", () => {
    const ash = new Trainer('Ash', 120);
    ash.buy("Pokeball", 6)
    ash.catchRandom();
    ash.catchRandom();
    ash.catchRandom();
    ash.catchRandom();
    ash.catchRandom();
    ash.catchRandom();
    expect(ash.belt[0].stored.rarity).toBe('Common');
    expect(ash.belt[1].stored.rarity).toBe('Common');
    expect(ash.belt[2].stored.rarity).toBe('Common');
    expect(ash.belt[3].stored.rarity).toBe('Common');
    expect(ash.belt[4].stored.rarity).toBe('Common');
    expect(ash.belt[5].stored.rarity).toBe('Common');
  });

  test('createTeam() - should call catchRandom for the number of empty balls the trainer has', () => {
    const ash = new Trainer('Ash', 120)
    ash.buy('Pokeball', 6)
    ash.createTeam()
    expect(ash.belt.length).toBe(6)
    expect(ash.belt.every((ball) => ball.stored != null)).toEqual(true)
  })

  test("buy() - if trainer has enough coins, should push new instance of ball to the this.belt and subtract the cost from this.coins", () => {
    const ash = new Trainer('Ash', 200);
    ash.buy("Masterball")
    expect(ash.belt.length).toBe(1);
    expect(ash.belt[0].type).toBe("Masterball");
    expect(ash.coins).toBe(0);
  });

  test("buy() - if trainer doesn't have enough coins, inform the player", () => {
    const ash = new Trainer('Ash');
    ash.buy("Masterball")
    expect(ash.belt.length).toBe(0);
    expect(ash.belt[0]).toBe(undefined);
  });

  test('buy () - If qty to buy is greater that max slots on belt, inform the player and cancel transaction', () => {
    const ash = new Trainer('Ash', 140)
    ash.buy('Pokeball', 7)
    expect(ash.belt.length).toEqual(0)
    expect(ash.coins).toBe(140)
  })

});

describe.skip("Battle Class", () => {

  test("Battle() - should create a new instance of Battle with two trainers", () => {
    const ash = new Trainer('Ash');
    const brock = new Trainer('Brock');
    const testBattle = new Battle('ash','brock')
    expect(testBattle).toEqual({player: 'ash', opponent: 'brock'});
  });

  test("fight() - If either Trainer has no pokemon or all their pokemon have fainted, cancel the fight and inform the player.", () => {
    const ash = new Trainer('Ash', 100);
    ash.buy("Pokeball", 5)
    ash.createTeam()
    const brock = new Trainer('Brock');
    const testBattle = new Battle(ash,brock)
    const output = testBattle.fight()
    expect(output).toBe("Opponent unable to fight");
  });

  test("fight() - should begin the battle, calling attack method on the players first pokemon.", () => {
    const ash = new Trainer('Ash', 100);
    ash.buy("Pokeball", 5)
    ash.createTeam()
    const brock = new Trainer('Brock', 100);
    brock.buy("Pokeball", 5)
    brock.createTeam()
    const testBattle = new Battle(ash,brock)
    testBattle.fight()
    expect().toEqual();
  });


})
