const pokedex = require("./pokedex.js");
const inquirer = require('inquirer')

// ---------- Pokemon Class ---------- //

class Pokemon {
  constructor(pokemonName) {
    const pokemonData = pokedex.find((pokemon) => pokemon.name === pokemonName);
    if (!pokemonData) {
      console.log(`Pokemon '${pokemonName}' not found in the Pokedex.`);
    }
    this.name = pokemonData.name;
    this.hp = pokemonData.hp;
    this.atk = pokemonData.atk;
    this.move = pokemonData.move;
    this.type = pokemonData.type;
    this.rarity = pokemonData.rarity;
  }

  isEffectiveAgainst(opponent) {
    switch (this.type) {
      case "Fire":
        return ["Grass", "Ice", "Bug"].includes(opponent.type);
      case "Water":
        return ["Fire", "Ground", "Rock"].includes(opponent.type);
      case "Grass":
        return ["Water", "Ground", "Rock"].includes(opponent.type);
      case "Psychic":
        return ["Fighting", "Poison"].includes(opponent.type);
      case "Bug":
        return ["Grass", "Poison", "Psychic"].includes(opponent.type);
      case "Ghost":
        return ["Ghost"].includes(opponent.type);
      case "Rock":
        return ["Fire", "Ice", "Flying", "Bug"].includes(opponent.type);
      case "Electric":
        return ["Water", "Flying"].includes(opponent.type);
      case "Fighting":
        return ["Normal", "Ice", "Rock"].includes(opponent.type);
      case "Ground":
        return ["Fire", "Electric", "Poison", "Rock"].includes(opponent.type);
      case "Poison":
        return ["Grass", "Bug"].includes(opponent.type);
      case "Ice":
        return ["Dragon","Flying", "Grass"].includes(opponent.type);
      case "Dragon":
        return ["Dragon"].includes(opponent.type);

      default:
        return false;
    }
  }

  isWeakTo(opponent) {
    switch (this.type) {
      case "Normal":
        return ["Rock"].includes(opponent.type);
      case "Fire":
        return ["Dragon", "Water", "Rock"].includes(opponent.type);
      case "Water":
        return ["Water", "Grass", "Dragon"].includes(opponent.type);
      case "Grass":
        return ["Fire", "Posion", "Bug", "Flying", "Dragon"].includes(opponent.type);
      case "Psychic":
        return ["Psychic"].includes(opponent.type);
      case "Bug":
        return ["Fire", "Fighting", "Flying", "Ghost"].includes(opponent.type);
      case "Rock":
        return ["Fighting", "Ground"].includes(opponent.type);
      case "Electric":
        return ["Grass", "Electric", "Dragon"].includes(opponent.type);
      case "Fighting":
        return ["Poison", "Flying", "Psychic", "Bug"].includes(opponent.type);
      case "Ground":
        return ["Grass", "Bug"].includes(opponent.type);
      case "Poison":
        return ["Poison", "Ground", "Rock", "Ghost"].includes(opponent.type);
      case "Ice":
        return ["Fire", "Ice"].includes(opponent.type);

      default:
        return false;
    }
  }


  attack(opponent) {
    let adjustedDmg = this.atk
    let attackMsg = `${this.name} used ${this.move}. `
    if(this.isEffectiveAgainst(opponent)) {
      adjustedDmg = this.atk * 2
      attackMsg += `It was super effective! `
    }
    if(this.isWeakTo(opponent)) {
      adjustedDmg = this.atk / 2
      attackMsg += `It wasn't very effective. `
    }
    if (opponent.hp - adjustedDmg < 0) {
      opponent.hp = 0
    }
    else {
      opponent.hp -= adjustedDmg
    }
    attackMsg += `${opponent.name} took ${adjustedDmg} damage`
    console.log(attackMsg);
    if(opponent.hp === 0) {
      console.log(`${opponent.name} fainted.`)
      return `${opponent.name} fainted`
    };
  }

}

// ---------- Pokeball Class ---------- //

class Pokeball {
  constructor(type = "Pokeball") {
    this.type = type;
    this.stored = null;
  }

  throw(wildPokemon) {
    if (!wildPokemon) {
      if (this.stored === null) {
        return "Pokeball empty";
      } else {
        console.log(`Go ${this.stored.name}!`);
        return this.stored.name
      }
    } 
    else {
      if (this.stored === null) {
            this.stored = new Pokemon(wildPokemon);
            console.log(`You caught ${this.stored.name}!`);
        } else {
         console.log(`${this.stored.name} is already stored in this ball`); 
         return this.stored.name
        }
      }
    }

  contains() {
    return this.stored === null ? "This Pokeball is empty!" : this.stored.name
  }

  isEmpty() {
    return this.stored === null
  }

}
  

class Greatball extends Pokeball {
  constructor() {
    super("Greatball");
  }
}

class Ultraball extends Pokeball {
  constructor() {
    super("Ultraball");
  }
}

class Masterball extends Pokeball {
  constructor() {
    super("Masterball");
  }
}

// ---------- Trainer Class ---------- //


class Trainer {
  constructor(name = 'Trainer', coins = 0) {
    this.name = name
    this.belt = [];
    this.coins = coins
    this.beltSize = 6
    this.badges = []
  }

  buy(itemToBuy, qty = 1) {
    if (qty + this.belt.length <= this.beltSize ) {

      const total = shop.find((item) => item.name === itemToBuy).cost * qty

      if (total <= this.coins) {
        this.coins -= total
        for (let i=0; i<qty; i++) {
          switch (itemToBuy) {
            case "Pokeball":
              this.belt.push(new Pokeball());
              break;
            case "Greatball":
              this.belt.push(new Greatball());
              break;
            case "Ultraball":
              this.belt.push(new Ultraball());
              break;
            case "Masterball":
              this.belt.push(new Masterball());
              break;
          }
        } 
        console.log(`You bought ${qty} ${itemToBuy}s. You have ${this.coins} coins left.`)
  
      } else {
        console.log(`Not enough coins. You need ${total} but only have ${this.coins}.`);
      }
    }
    else 
    console.log(`You can't buy that many balls. You only have ${this.beltSize - this.belt.length} empty slots.`);
    //showMenu()
  }
  
  catchPokemon(wildPokemon) {

    if (this.belt.length === 0) {
      console.log("You have no Pokeballs")
      return "No Pokeballs"
    }

    if(this.belt.every(ball => ball.stored !== null )) {
      console.log("All your Pokeballs are full"); 
      return "No empty balls"
    } 
    
    else {
      for (let i = 0; i < this.belt.length; i++) {
        if (this.belt[i].stored === null) {
          this.belt[i].throw(wildPokemon);
          break
        }
      }
    }
  }

//   catchRandom() {
//     for (let i = 0; i < this.belt.length; i++) {
//         if (this.belt[i].stored === null) {
//             let wildPokemon;
//             switch (this.belt[i].type) {
//                 case 'Masterball':
//                     // Only legendary Pokémon can be caught with Masterballs
//                     if (Math.random() < 0.02) { // 1/50 chance for legendary
//                         const legendaryPokemon = pokedex.filter(pokemon => pokemon.rarity === 'Legendary');
//                         const legendaryIndex = Math.floor(Math.random() * legendaryPokemon.length);
//                         wildPokemon = legendaryPokemon[legendaryIndex];
//                     } else {
//                         wildPokemon = null; // Failed to catch
//                     }
//                     break;
//                 case 'Ultraball':
//                     // Can catch rare, uncommon, and common Pokémon
//                     const catchChanceUltra = Math.random();
//                     if (catchChanceUltra < 0.02) { // 1/50 chance for rare
//                         const rarePokemon = pokedex.filter(pokemon => pokemon.rarity === 'Rare');
//                         const rareIndex = Math.floor(Math.random() * rarePokemon.length);
//                         wildPokemon = rarePokemon[rareIndex];
//                     } else if (catchChanceUltra < 0.2) { // 1/10 chance for uncommon
//                         const uncommonPokemon = pokedex.filter(pokemon => pokemon.rarity === 'Uncommon');
//                         const uncommonIndex = Math.floor(Math.random() * uncommonPokemon.length);
//                         wildPokemon = uncommonPokemon[uncommonIndex];
//                     } else { // Common Pokémon
//                         const commonPokemon = pokedex.filter(pokemon => pokemon.rarity === 'Common');
//                         const commonIndex = Math.floor(Math.random() * commonPokemon.length);
//                         wildPokemon = commonPokemon[commonIndex];
//                     }
//                     break;
//                 case 'Greatball':
//                     // Can catch uncommon and common Pokémon
//                     const catchChanceGreat = Math.random();
//                     if (catchChanceGreat < 0.1) { // 1/10 chance for uncommon
//                         const uncommonPokemon = pokedex.filter(pokemon => pokemon.rarity === 'Uncommon');
//                         const uncommonIndex = Math.floor(Math.random() * uncommonPokemon.length);
//                         wildPokemon = uncommonPokemon[uncommonIndex];
//                     } else { // Common Pokémon
//                         const commonPokemon = pokedex.filter(pokemon => pokemon.rarity === 'Common');
//                         const commonIndex = Math.floor(Math.random() * commonPokemon.length);
//                         wildPokemon = commonPokemon[commonIndex];
//                     }
//                     break;
//                 case 'Pokeball':
//                 default:
//                     // Can only catch common Pokémon
//                     const commonPokemon = pokedex.filter(pokemon => pokemon.rarity === 'Common');
//                     const commonIndex = Math.floor(Math.random() * commonPokemon.length);
//                     wildPokemon = commonPokemon[commonIndex];
//                     break;
//             }
//             this.belt[i].throw(wildPokemon);
//         } else {
//             return "All your Pokeballs are full";
//         }
//     }
// }


  catchRandom() {
    for (let i = 0; i < this.belt.length; i++) {
      if (this.belt[i].stored === null) {
        if (this.belt[i].type === 'Masterball') {
          const num = Math.floor(Math.random() * 151);
          let wildPokemon = pokedex[num]
          this.belt[i].throw(wildPokemon.name);
        } else {
          if (this.belt[i].type === 'Ultraball') {
            const limitedDex = pokedex.filter((pokemon) => 
              pokemon.rarity === 'Rare' ||
              pokemon.rarity === 'Uncommon' ||
              pokemon.rarity === 'Common')
            const num = Math.floor(Math.random() * limitedDex.length);
            let wildPokemon = limitedDex[num]
            this.belt[i].throw(wildPokemon.name);
        } else {
          if (this.belt[i].type === 'Greatball') {
            const limitedDex = pokedex.filter((pokemon) => 
              pokemon.rarity === 'Uncommon' ||
              pokemon.rarity === 'Common')
            const num = Math.floor(Math.random() * limitedDex.length);
            let wildPokemon = limitedDex[num]
            this.belt[i].throw(wildPokemon.name);
        } else {
          if (this.belt[i].type === 'Pokeball') {
            const limitedDex = pokedex.filter((pokemon) => 
              pokemon.rarity === 'Common')
            const num = Math.floor(Math.random() * limitedDex.length);
            let wildPokemon = limitedDex[num]
            this.belt[i].throw(wildPokemon.name);
        }}}}
      } else {
        return "All your Pokeballs are full";
      }
    }
  }

  createTeam() {
    for (let i = 0; i < this.belt.length; i++) {
      if (this.belt[i].stored === null) {
        this.catchRandom()
      }
    }
    let teamMsg = "Your new team:";
    this.belt.forEach((ball) => {
        teamMsg += ` ${ball.stored.name} |`;
    });
    console.log(teamMsg);
  }

  choosePokemon(pokemon) {
    if (this.belt.every((ball) => ball.stored === null)) {
      console.log("You haven't caught any Pokemon")
      return "No Pokemon"
    }
    
    for(let i=0; i<this.belt.length; i++) {
      if (this.belt[i].stored === null) {
        continue
      } else {
        if (this.belt[i].stored.name === pokemon) {
          return this.belt[i].throw()
        } else {
          return "You don't own this Pokemon";
        }
      }
    }
  }


  release(ball) {
    if (!this.belt[ball].stored === null) {
      console.log(`You released ${this.belt[ball].stored.name}. ${this.belt[ball].type} is now empty.`);
    } else console.log(`${this.belt[ball].type} is already.`);
  }

}



class GymLeader extends Trainer {
  constructor(name, badge) {
    super(name)
    this.badges.push(badge)
    this.belt = [new Masterball(), new Masterball(), new Masterball(), new Masterball(), new Masterball(), new Masterball()];
    this.defeated = false
  }
}


// ---------- Battle Class ---------- //

class Battle {
  constructor(player, opponent) {
    this.player = player
    this.opponent = opponent
    this.winner = null
    this.player.ready = null
    this.opponent.ready = null
  }

  prepare() {
    if (this.player.belt.every((ball) => ball.stored === null)) {
      this.player.ready = false
    } else {
      if (this.player.belt.every((ball) => ball.stored.hp === 0)) {
        this.player.ready = false
      } else {
        this.player.ready = true
      }
    }  

    if (this.opponent.belt.every((ball) => ball.stored === null)) {
      this.opponent.ready = false
    } else {
      if (this.opponent.belt.every((ball) => ball.stored.hp === 0)) {
        this.opponent.ready = false
      } else {
        this.opponent.ready = true
      }
    }  
  }

//   fight() {
//     this.prepare()
//     if (this.player.ready === false) {
//       console.log(`Unable to battle. ${this.player.name} either has no Pokemon or all have fainted.`);
//       return "Player unable to fight"
//     } else {
//       if (this.opponent.ready === false) {
//       console.log(`Unable to battle. ${this.opponent.name} either has no Pokemon or all have fainted.`);
//       return "Opponent unable to fight"
//       } else {
//         this.player.belt[0].stored.useMove()
//         this.opponent.belt[0].stored.takeDmg(this.player.belt[0].stored.atk)
//       }
//     }
//   }
}


// get the first pokemon of eacher player
// player attacks opponent first
// if opponent survives, attack player
// and so on until one is fainted
// then move to next pokemon
// repeat until one player has no pokemon



// ---------- NPC's ---------- //


const Brock = new GymLeader("Brock", "Boulder")
Brock.belt[0].stored = new Pokemon("Geodude")
Brock.belt[1].stored = new Pokemon("Onix")

const Misty = new GymLeader("Misty", "Cascade")
Misty.belt[0].stored = new Pokemon("Starmie")
Misty.belt[1].stored = new Pokemon("Staryu")

const Surge = new GymLeader("Lt Surge", "Thunder")
Surge.belt[0].stored = new Pokemon("Voltorb")
Surge.belt[1].stored = new Pokemon("Pikachu")
Surge.belt[2].stored = new Pokemon("Raichu")

const Erika = new GymLeader("Erika", "Rainbow")
Erika.belt[0].stored = new Pokemon("Victreebel")
Erika.belt[1].stored = new Pokemon("Tangela")
Erika.belt[2].stored = new Pokemon("Vileplume")

const Koga = new GymLeader("Koga", "Soul")
Koga.belt[0].stored = new Pokemon("Koffing")
Koga.belt[1].stored = new Pokemon("Koffing")
Koga.belt[2].stored = new Pokemon("Muk")
Koga.belt[3].stored = new Pokemon("Weezing")

const Sabrina = new GymLeader("Sabrina", "Marsh")
Sabrina.belt[0].stored = new Pokemon("Kadabra")
Sabrina.belt[1].stored = new Pokemon("Mr. Mime")
Sabrina.belt[2].stored = new Pokemon("Venomoth")
Sabrina.belt[3].stored = new Pokemon("Alakazam")

const Blaine = new GymLeader("Blaine", "Volcano")
Blaine.belt[0].stored = new Pokemon("Growlithe")
Blaine.belt[1].stored = new Pokemon("Ponyta")
Blaine.belt[2].stored = new Pokemon("Rapidash")
Blaine.belt[3].stored = new Pokemon("Arcanine")

const Giovanni  = new GymLeader("Giovanni", "Earth")
Giovanni.belt[0].stored = new Pokemon("Rhyhorn")
Giovanni.belt[1].stored = new Pokemon("Dugtrio")
Giovanni.belt[2].stored = new Pokemon("Rhydon")
Giovanni.belt[3].stored = new Pokemon("Nidoqueen")
Giovanni.belt[4].stored = new Pokemon("Nidoking")

const gymLeaders = [Brock, Misty, Surge, Erika, Koga, Sabrina, Blaine, Giovanni]
const availableGymLeaders = [Brock]


const shop = [
  {name:"Pokeball", cost:20},
  {name:"Greatball", cost:60},
  {name:"Ultraball", cost:100},
  {name:"Masterball", cost:200},
]

function showMenu() {

  inquirer
  .prompt([
    {
    type: 'list',
    name: 'action',
    message: "What would you like to do now?",
    choices: ['Visit Shop','Challenge Random Trainer','Challenge Gym Leader']
    }
  ])
  .then((response) => {
    switch(response.action) {
      case 'Visit Shop':
        inquirer
        .prompt([
          {
          type: 'list',
          name: 'item',
          message: "What would you like to buy?",
          choices: ["Pokeball","Greatball","Ultraball","Masterball"]
          },
          {
          type: 'input',
          name: 'qty',
          message: "How many?"
          }
        ])
        .then((response) => {
          player.buy([response.item], [response.qty])
        })
        break
      case 'Challenge Random Trainer':
      
        break
      case 'Challenge Gym Leader':

        for(i=0; i<gymLeaders.length; i++) {
          if(gymLeaders[i].defeated === true) {
            availableGymLeaders.push(gymLeaders[i+1])
          }
        }

        inquirer
        .prompt([
          {
          type: 'list',
          name: 'trainer',
          message: "Who will you challenge?",
          choices: availableGymLeaders
          }
        ]).then(() => {

        })
        break

    }
  })
}


// ---------- Game Initialisation ---------- //

let player

function newGame(playerName, starterChoice) {

  player = new Trainer(playerName, 100)
  player.belt.push(new Pokeball())
  player.belt[0].throw(pokedex.find((pokemon) => pokemon.name === starterChoice).name)
  console.log(`Congratulations ${player.name}! You're now the proud owner of a ${player.belt[0].stored.name}. Take good care of them.`);
  console.log(`Also, here's ${player.coins} coins to help you get started. You'll need coins to buy better Pokeballs, so that you can catch more powerful Pokemon. You can earn coins by defeating other trainers.`);
  showMenu()

}


inquirer
  .prompt([
    {
    type: 'input',
    name: 'name',
    message: "Welcome Trainer, what's your name?"
    },
    {
    type: 'list',
    name: 'pokemonChoice',
    message: "Choose a starting Pokemon:",
    choices: ['Charmander','Squirtle','Bulbasaur']
    },

  ])
  .then((response) => {
    newGame(response.name, response.pokemonChoice)
  })


module.exports = {Pokemon, Trainer, GymLeader, Battle, Pokeball, Greatball, Ultraball, Masterball};
