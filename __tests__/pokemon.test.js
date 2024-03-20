const Pokemon = require('../pokemon.js')
const Normal = require('../pokemon.js')

describe('catchPokemon', () => {

  test('When Pokemon constructor is used, returns an object with properties', () => {
    // Arrange
    // Act
    const Eevee = new Pokemon('Eevee', 55, 18, 'headbutt')
    const actualOutput = (Eevee)
    // Assert
    expect(actualOutput).toEqual({name:'Eevee', hitPoints:55, atkDmg:18, move:'headbutt'})
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

  test.only('When a new pokemon class is created using Fire, add all properties of parent constructor plus type (normal)', () => {
    // Arrange
    // Act
    const Eevee = new Normal('Eevee', 55, 18, 'headbutt')
    console.log(Eevee);
    // Assert
    expect(Eevee.type).toBe('normal')
  })
});