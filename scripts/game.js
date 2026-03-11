const healths = document.querySelectorAll(".health");
const msg = document.getElementById("msg");
const messages = ["It's a tie!<br>Refresh page to play again","You Win!<br>Refresh page to play again","You Lose!<br>Refresh page to play again"]

/*------ PLAYER ------*/

const player_hp = healths[0];

player_hp.min = 0;//least health
player_hp.max = 100;//max health

player_hp.low = 30;//red line(low health)
player_hp.high = 60;//yellow line(medium health)
player_hp.optimum = 100;//green line(high health)

player_hp.value = 100;//actual health bar

/*------ ENEMY ------*/
const enemy_hp = healths[1];

enemy_hp.min = 0;//least health
enemy_hp.max = 100;//max health

enemy_hp.low = 30;//red line(low health)
enemy_hp.high = 60;//yellow line(medium health)
enemy_hp.optimum = 100;//green line(high health)

enemy_hp.value = 100;//actual health bar


/*------ RANDOM FUNCTION FOR FUTURE USE ------*/

function random_num(min,max){
    let num = Math.floor(Math.random() * (max-min+1) + min);
    return num;
}

/*------ BASIC INTERACTIONS ------*/

function attack(character_hp){//for attack
    let critical_shot = random_num(1,5);
    if(critical_shot == 5){
        character_hp.value -= 15;//reducing health
    }
    else{
        character_hp.value -= 5;//reducing health
    }
    if(character_hp.value < 0){
        character_hp.value = 0;
    }
}

function heal(character_hp){//for healing
    
    let healing_hp = random_num(10,25);//random hp
    if(character_hp.value != 100){//checking health value
        character_hp.value += healing_hp;
        if(character_hp.value > 100){//if hp increases more than 100
            character_hp.value = 100;
        }
    }
}

/*------ ENEMY ACTIONS ------*/

function enemy_turn(){
    if(player_hp.value <= 0 || enemy_hp.value <= 0){
        return;
    }
    let enemy_choice = random_num(1,8);
    
    if(enemy_choice <= 4){
        heal(enemy_hp);
    }
    else{
        attack(player_hp);
    }
}

/*------ DECIDING WINNER ------*/

function decide_winner(){

    if(enemy_hp.value <= 0 && player_hp.value <= 0){
        msg.innerHTML = messages[0];
    }
    else if(enemy_hp.value <= 0){
        msg.innerHTML = messages[1];
    }
    else{
    msg.innerHTML = messages[2];
    }
}
/*------ GAME LOOP ------*/

let loop_id = setInterval(game_loop, 1000);

function game_loop(){

    if(player_hp.value <= 0 || enemy_hp.value <= 0){
        decide_winner();
        clearInterval(loop_id);
        return;
    }

    enemy_turn();
}