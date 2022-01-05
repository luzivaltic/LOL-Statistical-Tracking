const csCanvas = document.getElementById('cs-chart').getContext('2d');

var csGradient = csCanvas.createLinearGradient(0 , 0 , 0 , 200);
csGradient.addColorStop(0 , "rgba(58,123,213,1)");
csGradient.addColorStop(1 , 'rgba(0,210,255,1)' );

var riskReduce = {
    csCounter : [
        238 / 32,
        213 / 26,
        127 / 16,
        233 / 33,
        248 / 32,
        216 / 29,
        169 / 25,
        248 / 36,
        210 / 32,
        166 / 21,
        183 / 24,
        284 / 30,
        208 / 29,
        185 / 27,
        235 / 29,
        261 / 31,
        218 / 30,
        181 / 31,
        250 / 29,
        243 / 40,
        266 / 33,
        219 / 37,
        237 / 29,
    ],

    deathCounter : [
        9,
        3,
        2,
        10,
        3,
        8,
        7,
        10,
        8,
        3,
        4,
        6,
        6,
        6,
        5,
        4,
        7,
        8,
        1,
        14,
        5,
        11,
        3
    ],
    macroCounter: [
        [0 , 0 , 1, 1, 0 ,1 , 0],   
        [0 , 0 , 1 , 1, 0 ,1 , 0],
        [0 , 0 , 0 , 1, 0, 1 , 0],
        [0 , 0 , 0 , 1 , 1, 1 , 0],
        [0 , 0 , 1, 1 ,1 ,1 , 1],
        [0 , 1, 0, 1, 0, 0 , 1],
        [0 , 0 , 0 , 1 , 0 , 1 , 1],
        [0 , 1 , 0 , 1 , 1 , 0 , 1 ],
        [0 , 1 , 1 , 1 , 0 , 1 , 1 ],
        [0 , 1 , 0 , 1 , 0 , 0 ,  1],
        [0 , 1 , 0 , 1 , 0 , 1 ,  1 ],
        [0 , 1 , 1 , 1, 1 , 1, 1],
        [0 , 1, 0 , 1 , 0 , 1 , 1],
        [1 , 0 , 1, 1 , 1 , 0 ],
        [1 , 1 , 1 , 1 , 1 , 0],
        [0 , 0 , 1 , 1 , 1 , 1],
        [1 , 1 , 1 , 1 , 1 ,  0],
        [0 , 1 , 0 , 1 , 1 , 0 ],
        [0 , 0 , 1 , 0 , 1 , 1 ],
        [1 , 0 , 0 , 1 , 0 , 0],
        [0 , 1 , 1 , 1 , 0 , 1],
        [1 , 0 , 1 , 1 , 1 , 0],
        [1  , 0 , 1 , 1 , 1 , 1],
    ]
    ,
    gameWon: [
        1, 
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        1,
        0,
        1,
        1,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        0,
        1,
        1,
        1,
    ]
}

var gameData = [];
var csChart;
var deathChart;

// localStorage.clear();
// localStorage.setItem( "gameData" , JSON.stringify(gameData) );


gameData = localStorage.getItem("gameData");

if( gameData == null ){
    gameData = {
        csCounter: [],
        deathCounter: [],
        macroCounter : [],
        gameWon : [],
    }
}
else {
    gameData = JSON.parse(gameData);
}

// console.log( gameData.macroCounter );

function displayData()
{

    var labels = [];
    var curLength = gameData.csCounter.length;
    for(let i = 0 ; i < Math.max( curLength , 7 ); i++)
        labels.push("");

    const csData = {
        labels : labels,
        datasets: [
            {
                label : "CS every game",
                data : gameData.csCounter,
                
                fill : true,
                backgroundColor : csGradient,
                pointBackgroundColor: 'rgba(58,123,213,1)',
                pointBorderColor : 'rgba(255,255,255,1)',
            }
        ]
    }

    var csAverage = 0;
    for(let i = 0; i < gameData.csCounter.length; i++)
        csAverage += gameData.csCounter[i];

    csAverage = Math.floor( csAverage / gameData.csCounter.length * 10 ) / 10;

    const csConfig = {
        type: 'line',
        data : csData,
        options : {
            responsive : true,
            scales: {
                y : {
                    type: 'linear',
                    min : 0,
                    max : 10,
                    ticks: {
                        callback: function(val) {
                            return val + ' cs/m';
                        },
                    },
                }
            },
            plugins : {
                title : {
                    display : true,
                    text : 'CS Average: ' + csAverage,
                }
            }
        },
    }

    const deathCanvas = document.getElementById('death-chart').getContext('2d');
    var deathGradient = deathCanvas.createLinearGradient(0 , 0 , 0 , 285);
    deathGradient.addColorStop(0 , "#1abc9c");
    deathGradient.addColorStop(1 , '#8e44ad' );


    const deathData = {
        labels : labels,
        datasets: [
            {
                label : "Death every game",
                data: gameData.deathCounter,
                fill : true,
                backgroundColor : deathGradient,

                pointBorderColor : '#fff',
            }
        ]
    }

    var deathAverage = 0;
    for(let i = 0; i < gameData.deathCounter.length; i++)
        deathAverage += gameData.deathCounter[i];

    deathAverage = Math.floor( deathAverage / gameData.deathCounter.length * 10 ) / 10;

    const deathConfig = {
        type: 'line',
        data : deathData,
        options: {
            responsive : true,
            scales: {
                y: {
                    type : 'linear',
                    min : 0 , 
                    max : 16, 
                    ticks: {
                        callback: function(val) {
                            return val + '/g';
                        }
                    }
                }
            },
            plugins : {
                title : {
                    display: true,
                    text : "Death average: " + deathAverage + '/g',
                }
            }
        }
    }

    csChart = new Chart(
        csCanvas,
        csConfig
    )

    deathChart = new Chart(
        deathCanvas,
        deathConfig
    )

    const gamePlayed = document.querySelector(".game-played .num");
    const winRate = document.querySelector(".win-rate .num");

    gamePlayed.textContent = gameData.csCounter.length;

    const total = gameData.csCounter.length;
    var wonGame = 0;
    gameData.gameWon.forEach( (num) => {
        wonGame += num;
    })

    winRate.textContent = Math.floor( wonGame/total * 100 ) + '%';

    const macroRes = document.querySelectorAll(".macro-ques .result");

    for(let i = 0 ; i < macroRes.length; i++){
        let gameCount = 0;
        let winCount = 0;
        for(let j = 0 ; j < gameData.csCounter.length; j++){
            gameCount += gameData.macroCounter[j][i];
            if( gameData.macroCounter[j][i] == 1 && gameData.gameWon[j] == 1 )
                winCount++;
        }

        macroRes[i].querySelector(".match-count").textContent = gameCount + ' / ' + gameData.csCounter.length;
        macroRes[i].querySelector("span").textContent = Math.floor( winCount / gameCount * 100 ) + '%';
    }
}

function updateData()
{
    const inputs = document.querySelectorAll(".input-box .one-box input");
    var CSNum = inputs[0].value;
    var gameTime = inputs[1].value;
    var Death = inputs[2].value;
    let condition = true;

    inputs.forEach( (input) => {
        if( input.value == "" )
            condition = false;
        else input.value = "";    
    })

    if( parseInt(gameTime) == 0 ) return;
    if( !condition ) return;
    CSNum = parseInt(CSNum);
    gameTime = parseInt(gameTime);
    Death = parseInt(Death);

    if( CSNum / gameTime > 10 ) return;

    const curRes = document.querySelectorAll(".ques-check-box .res");
    var macroCheck = [];

    curRes.forEach( (res) => {
        const innerBoxs = res.querySelectorAll(".res-box"); 
        if( innerBoxs[0].classList.contains("active") ){
            macroCheck.push(1);
            innerBoxs[0].classList.remove("active");
            innerBoxs[1].classList.add("active");
        }
        else
            macroCheck.push(0);
    })  

    gameData.csCounter.push( CSNum / gameTime );
    gameData.deathCounter.push( Death );
    gameData.gameWon.push( macroCheck[0] );
    macroCheck.shift();
    console.log( macroCheck );
    gameData.macroCounter.push( macroCheck );
    
    localStorage.removeItem("gameData");
    localStorage.setItem( "gameData" , JSON.stringify(gameData) );

    csChart.destroy();
    deathChart.destroy();

    displayData();

    // csChart.data.datasets[0].data = gameData.csCounter;
    // deathChart.data.datasets[0].data = gameData.deathCounter;

    // csChart.update();
    // deathChart.update();
}

displayData();


// add a new game

const allForm = document.querySelectorAll("form");

allForm.forEach( (Form) => {
    Form.addEventListener("submit" , (val) => {
        val.preventDefault();
    })
})

const CSForm = document.querySelector(".CS-number");
const gameTimeForm = document.querySelector(".game-time");

const addGameBox = document.querySelector(".add-game-box");
const changeBox = document.querySelector(".change-box");
const addBox = document.querySelector(".add-box");

changeBox.addEventListener("click" , () => {
    addBox.classList.toggle("active");
})

addGameBox.addEventListener("click" , () => {
    addBox.classList.toggle("active");
    updateData();
})

const allRes = document.querySelectorAll(".ques-check-box .res");

allRes.forEach( (res) => {
    const resBoxs = res.querySelectorAll(".res-box");
    resBoxs[1].classList.add("active");

    for(let i = 0 ; i < 2; i++){
        resBoxs[i].addEventListener("click" , () => {
            resBoxs[0].classList.remove("active");
            resBoxs[1].classList.remove("active");
            resBoxs[i].classList.add("active");
        })
    }
})
