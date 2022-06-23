function solution(cmd){
    if (cmd == 'upvote'){
        this.upvotes++;
    } else if (cmd == 'downvote'){
        this.downvotes++;
    }else {
        let addedAmount = 0;
        let rating = "new";
        const totalVotes = this.upvotes + this.downvotes;
        if (totalVotes > 50){
            if (this.upvotes - this.downvotes >= 0){
                addedAmount = 0.25 * this.upvotes;
            }
            else{
                addedAmount = 0.25 * this.downvotes;
            }
            addedAmount = Math.ceil(addedAmount);
        }

        if (totalVotes < 10){
            rating = 'new';
        } else if (this.upvotes / totalVotes > 0.66){
            rating = 'hot';
        }  else if (this.upvotes - this.downvotes < 0){
            rating = 'unpopular';
        } else if(totalVotes > 100){
            rating = 'controversial';
        } 

        return [this.upvotes + addedAmount, this.downvotes + addedAmount, this.upvotes - this.downvotes, rating];
    }
}


let post = {
    id: '3',
    author: 'emil',
    content: 'wazaaaaa',
    upvotes: 100,
    downvotes: 100
};
solution.call(post, 'upvote');
solution.call(post, 'downvote');
let score = solution.call(post, 'score');
console.log(score); // [127, 127, 0, 'controversial']
for(let i = 0; i < 50; i++){
    solution.call(post, 'downvote');
}         // (executed 50 times)
score = solution.call(post, 'score');
console.log(score)
     
