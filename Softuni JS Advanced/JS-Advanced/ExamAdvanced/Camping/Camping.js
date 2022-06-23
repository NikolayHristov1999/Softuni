class SummerCamp{
    constructor(organizer, location){
        this.organizer = organizer;
        this.location = location;
        this.priceForTheCamp = {
            child: 150,
            student: 300,
            collegian: 500
        };
        this.listOfParticipants = [];
    }

    registerParticipant(name, condition, money){
        if (!Object.keys(this.priceForTheCamp).some(x => x == condition)){
            throw new Error("Unsuccessful registration at the camp.");
        }

        if (this.listOfParticipants.some(x => x.name == name)){
            return `The ${name} is already registered at the camp.`
        }

        if(money < this.priceForTheCamp[condition]){
            return `The money is not enough to pay the stay at the camp.`
        }

        this.listOfParticipants.push({
            name,
            condition,
            power: 100,
            wins: 0
        })

        return `The ${name} was successfully registered.`;
    }

    unregisterParticipant(name){
        const participant = this.listOfParticipants.find(x => x.name == name)

        if (participant == undefined){
            throw new Error(`The ${name} is not registered in the camp.`);
        }

        this.listOfParticipants.splice(this.listOfParticipants.indexOf(participant), 1);

        return `The ${name} removed successfully.`
    }

    timeToPlay(typeOfGame, participant1, participant2){
        const player1 = this.listOfParticipants.find(x => x.name == participant1);
        if (player1 == undefined){
            throw new Error(`Invalid entered name/s.`);
        }

        if (typeOfGame == 'WaterBalloonFights'){
            const player2 = this.listOfParticipants.find(x => x.name == participant2);
            if (player2 == undefined){
                throw new Error(`Invalid entered name/s.`);
            }

            if (player2.condition != player1.condition){
                throw new Error(`Choose players with equal condition.`);
            }
            if (player2.power > player1.power){
                player2.wins++;
                return `The ${participant2} is winner in the game ${typeOfGame}.`
            } else if(player2.power < player1.power){
                player1.wins++;
                return `The ${participant1} is winner in the game ${typeOfGame}.`
            } else{
                return `There is no winner.`;
            }   

        } else if(typeOfGame == 'Battleship'){
            player1.power += 20;
            return `The ${participant1} successfully completed the game ${typeOfGame}.`
        }
    }

    toString(){
        let result = `${this.organizer} will take ${this.listOfParticipants.length} participants on camping to ${this.location}`;
        this.listOfParticipants.sort((a,b) => b.wins - a.wins);
        for (const participant of this.listOfParticipants){
            result += `\n${participant.name} - ${participant.condition} - ${participant.power} - ${participant.wins}`;
        }
        return result;
    }

    
}

const summerCamp = new SummerCamp("Jane Austen", "Pancharevo Sofia 1137, Bulgaria");
console.log(summerCamp.registerParticipant("Petar Petarson", "student", 300));
console.log(summerCamp.timeToPlay("Battleship", "Petar Petarson"));
console.log(summerCamp.registerParticipant("Sara Dickinson", "child", 200));
console.log(summerCamp.registerParticipant("Dimitur Kostov", "student", 300));
console.log(summerCamp.timeToPlay("WaterBalloonFights", "Petar Petarson", "Dimitur Kostov"));

console.log(summerCamp.toString());


