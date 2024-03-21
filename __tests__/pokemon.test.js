const { Pokemon, Normal, Fire, Water, Grass, Charmander, Squirtle, Bulbasaur, Rattata, Pokeball, Trainer } = require('../pokemon.js')

describe('catchPokemon', () => {

  test('When Pokemon constructor is used, returns an object with properties', () => {
    // Arrange
    // Act
    const Eevee = new Pokemon('Eevee', 55, 18, 'headbutt')
    const actualOutput = (Eevee)
    // Assert
    expect(actualOutput).toEqual({ name: 'Eevee', hitPoints: 55, atkDmg: 18, move: 'headbutt', type: null })
  })

  test('When takeDmg method is invoked, reduces hitPoints by arg amount', () => {
    // Arrange
    // Act
    const Eevee = new Pokemon('Eevee', 55, 18, 'headbutt')
    Eevee.takeDmg(10)
    const actualOutput = (Eevee.hitPoints)
    // Assert
    expect(actualOutput).toBe(45)
  })

  test('When useMove method is invoked, conslose logs and returns atkDmg', () => {
    // Arrange
    // Act
    const Eevee = new Pokemon('Eevee', 55, 18, 'headbutt')
    const actualOutput = (Eevee.useMove())
    // Assert
    expect(actualOutput).toBe(18)
  })

  test('When hasFainted method is invoked, returns correct boolean depending on pokemons hitPoints', () => {
    // Arrange
    // Act
    const Eevee = new Pokemon('Eevee', 55, 18, 'headbutt')
    // Assert
    expect(Eevee.hasFainted()).toBe(false)
    Eevee.takeDmg(55)
    expect(Eevee.hasFainted()).toBe(true)
  })

  test('When a new pokemon class is created using a the type constructor, add all properties of parent constructor plus type (normal)', () => {
    // Arrange
    const expected = { name: 'Eevee', hitPoints: 55, atkDmg: 18, move: 'headbutt', type: 'Normal' }
    // Act
    const Eevee = new Normal('Eevee', 55, 18, 'headbutt')
    // Assert
    expect(Eevee).toEqual(expected)
  })

  test('test isEffectiveAgainst by passing in a new pokemon', () => {
    const Flareon = new Fire('Flareon', 65, 20, 'Fire blast')
    const Leafeon = new Grass('Leafeon', 65, 17, 'Giga drain')

    const actual = Flareon.isEffectiveAgainst(Leafeon);

    expect(actual).toBe(true);
  })

  test('charmander class extends from fire class', () => {
    const CharChar = new Charmander('CharChar', 44, 17, 'Flamethrower')

    expect(CharChar instanceof Fire).toBe(true);
  })

  test('new charmander class should overwrite move to ember ', () => {
    const CharChar = new Charmander('CharChar', 44, 17)

    expect(CharChar.move).toBe('ember');
  })

  test('new Rattata class extends from normal class ', () => {
    const Ratta = new Rattata('Ratta', 30, 15)

    expect(Ratta instanceof Normal).toBe(true);
    expect(Ratta.move).toBe('tackle');
  })

  test('creates a new instance of Pokeball', () => {
    const testPokeball = new Pokeball

    expect(testPokeball instanceof Pokeball).toBe(true);
  })

  test('if new Pokeball is empty, should return true ', () => {
    const testPokeball = new Pokeball
    const actual = testPokeball.isEmpty()

    expect(actual).toBe(true);
  })

  test('new Pokeball contains should return empty', () => {
    const testPokeball = new Pokeball
    const actual = testPokeball.contains()

    expect(actual).toBe('empty ...');
  })

  test('when throw invoke, but store is empty, will return passed pokemon', () => {
    const testPokeball = new Pokeball
    const Eevee = new Normal('Eevee', 55, 18, 'headbutt')
    testPokeball.throw(Eevee)

    expect(testPokeball.stored).toEqual({ name: 'Eevee', hitPoints: 55, atkDmg: 18, move: 'headbutt', type: 'Normal' });
  })

  test('Pokeball contains should return pokemon name when passed pokemon', () => {
    const testPokeball = new Pokeball
    const Eevee = new Normal('Eevee', 55, 18, 'headbutt')
    testPokeball.throw(Eevee)

    expect(testPokeball.contains()).toBe('Eevee');
  })

  test('if no argument is pass in throw, and stored is null, should inform pokeball is empty ', () => {
    const testPokeball = new Pokeball

    expect(testPokeball.throw()).toBe('This Pokeball is empty!');
  })

  test('when argument is pass in and is empty, it catched the pokemon ', () => {
    const testPokeball = new Pokeball
    const Eevee = new Normal('Eevee', 55, 18, 'headbutt')
    testPokeball.throw(Eevee)

    expect(testPokeball.stored).toEqual(Eevee)
  })

  test('if no argument is pass in throw, but has a pokemon, should inform user ', () => {
    const testPokeball = new Pokeball
    const Eevee = new Normal('Eevee', 55, 18, 'headbutt')
    testPokeball.throw(Eevee)
    const actual = testPokeball.throw()

    expect(actual).toEqual(Eevee);
  })

  test('Trainer got up to 6 balls to catch Pokemons', () => {
    const Ash = new Trainer()
    const Eevee = new Normal('Eevee', 55, 18, 'headbutt')
    Ash.catch(Eevee)
    console.log(Eevee)
    const actual = Ash.belt[0].stored

    expect(actual).toEqual(Eevee);
  })

  test('When belt is full, should inform user', () => {
    const EeveeTrainer = new Trainer()
    const Eevee = new Normal('Eevee', 55, 18, 'headbutt')
    EeveeTrainer.catch(Eevee)
    EeveeTrainer.catch(Eevee)
    EeveeTrainer.catch(Eevee)
    EeveeTrainer.catch(Eevee)
    EeveeTrainer.catch(Eevee)
    EeveeTrainer.catch(Eevee)
    const actual = EeveeTrainer.catch(Eevee)

    expect(actual).toEqual('No more Pokeballs :(');
  })

  test('invoke getPokemon and should return via throw pokemon', () => {
    const EeveeTrainer = new Trainer()
    const Eevee = new Normal('Eevee', 55, 18, 'headbutt')
    EeveeTrainer.catch(Eevee)
    const actual = EeveeTrainer.getPokemon('Eevee')

    expect(actual).toEqual(Eevee);
  })
});