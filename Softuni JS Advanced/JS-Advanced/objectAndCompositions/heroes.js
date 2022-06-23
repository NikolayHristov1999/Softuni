function solve(){
    const obj = {
        mage: function(name){
            const mage = {
                name,
                health: 100,
                mana: 100,
                cast: function(spell){
                    console.log(`${mage.name} cast ${spell}`);
                    mage.mana--;
                }
            }
            return mage;
        },
        fighter: function(name){
            const fighter = {
                name,
                health: 100,
                stamina: 100,
                fight: function(){
                    console.log(`${fighter.name} slashes at the foe!`);
                    fighter.stamina--;
                }
            }
            return fighter;
        }
    };
    return obj;
}


let create = solve();
const scorcher = create.mage("Scorcher");
scorcher.cast("fireball")
scorcher.cast("thunder")
scorcher.cast("light")

const scorcher2 = create.fighter("Scorcher 2");
scorcher2.fight()

console.log(scorcher2.stamina);
console.log(scorcher.mana);


