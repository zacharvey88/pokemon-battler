class Pokemon {
  constructor(name, hitPoints, atkDmg, move = 'tackle') {
    this.name = name
    this.hitPoints = hitPoints
    this.atkDmg = atkDmg
    this.move = move
    this.type = null
  }

  takeDmg(dmg) {
    this.hitPoints -= dmg
  }

  useMove() {
    console.log(`${this.name} used ${this.move}`);
    return this.atkDmg
  }

  hasFainted() {
    if (this.hitPoints <= 0) {
      return true
    } else {
      return false
    }

  }
}

class Normal extends Pokemon {
  constructor(name, hitPoints, atkDmg, move, type) {
    super(name, hitPoints, atkDmg, move, type)
    this.type = 'Normal'
  }
}

class Fire extends Pokemon {
  constructor(name, hitPoints, atkDmg, move, type) {
    super(name, hitPoints, atkDmg, move, type)
    this.type = 'Fire'
  }

  isEffectiveAgainst(opponent) {
    if (opponent.type === 'Grass') {
      return true
    } else {
      return false
    }
  }

  isWeakTo(opponent) {
    if (opponent.type === 'Water') {
      return true
    } else {
      return false
    }
  }
}

class Grass extends Pokemon {
  constructor(name, hitPoints, atkDmg, move, type) {
    super(name, hitPoints, atkDmg, move, type)
    this.type = 'Grass'
  }

  isEffectiveAgainst(opponent) {
    if (opponent.type === 'Water') {
      return true
    } else {
      return false
    }
  }

  isWeakTo(opponent) {
    if (opponent.type === 'Fire') {
      return true
    } else {
      return false
    }
  }
}

class Water extends Pokemon {
  constructor(name, hitPoints, atkDmg, move, type) {
    super(name, hitPoints, atkDmg, move, type)
    this.type = 'Water'
  }

  isEffectiveAgainst(opponent) {
    if (opponent.type === 'Fire') {
      return true
    } else {
      return false
    }
  }

  isWeakTo(opponent) {
    if (opponent.type === 'Grass') {
      return true
    } else {
      return false
    }
  }
}

class Charmander extends Fire {
  constructor(name, hitPoints, atkDmg, move, type) {
    super(name, hitPoints, atkDmg, 'ember', type)
  }
}

class Squirtle extends Water {
  constructor(name, hitPoints, atkDmg, move, type) {
    super(name, hitPoints, atkDmg, 'water gun', type)
  }
}

class Bulbasaur extends Grass {
  constructor(name, hitPoints, atkDmg, move, type) {
    super(name, hitPoints, atkDmg, 'vine whip', type)
  }
}

class Rattata extends Normal {
  constructor(name, hitPoints, atkDmg, move, type) {
    super(name, hitPoints, atkDmg, move, type)
  }
}

class Pokeball {
  constructor() {
    this.stored = null
  }

  throw(newPokemon) {

    if (!newPokemon) {
      if (this.stored === null) {
        return 'This Pokeball is empty!'
      } else {
        console.log(`GO ${this.stored.name}!!`);
        return this.stored;
      }
    } else {
      if (this.stored === null) {
        this.stored = newPokemon;
        console.log(`you caught ${this.stored.name}`)
        return this.stored;
      }
    }
  }

  contains() {
    if (this.stored === null) {
      return 'empty ...'
    } else { return this.stored.name }
  }

  isEmpty() {
    if (this.stored === null) {
      return true;
    } else { return false; }
  }
}

class Trainer {
  constructor() {
    this.belt = [new Pokeball(), new Pokeball(), new Pokeball(), new Pokeball(), new Pokeball(), new Pokeball()]
  }

  catch(pokemon) {
    for (let i = 0; i < this.belt.length; i++) {
      if (this.belt[i].stored === null) {
        this.belt[i].throw(pokemon);
        this.belt[i].stored = pokemon;
        break;
      } else { return 'No more Pokeballs :(' }
    }
  }

  getPokemon(pokemonName) {
    for (let ball of this.belt) {
      if (ball.stored.name === pokemonName)
        return ball.throw()
    }
  }
}


module.exports = { Pokemon, Normal, Fire, Water, Grass, Charmander, Squirtle, Bulbasaur, Rattata, Pokeball, Trainer }