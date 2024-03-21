class Pokemon {
  constructor(name,hitPoints, atkDmg, move = 'tackle') {
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
      this.type = 'normal'
    }
  }

class Fire extends Pokemon {
  constructor(name, hitPoints, atkDmg, move, type) {
    super(name, hitPoints, atkDmg, move, type)
    this.type = 'fire'
  }

  isEffectiveAgainst(opponent) {
    if (opponent.type === 'grass') {
      return true
    } else {
      return false
    }
  }

  isWeakTo(opponent) {
    if (opponent.type === 'water') {
      return true
    } else {
      return false
    }
  }
}



module.exports = {Pokemon, Normal, Fire, Water, Grass}