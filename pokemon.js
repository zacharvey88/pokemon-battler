class Pokemon {
  constructor(name,hitPoints, atkDmg, move = 'tackle') {
    this.name = name
    this.hitPoints = hitPoints
    this.atkDmg = atkDmg
    this.move = move
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
      super(name, hitPoints, atkDmg, move, 'normal')
      this.type = type
    }
  }


module.exports = Pokemon, Normal