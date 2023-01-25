

const headerTeamName = document.querySelector('#headerTeamName')
const totalGames = document.querySelector('.js-stats-totalGames')
const totalPlayers = document.querySelector('.js-stats-totalPlayers')
const teamChoice = document.querySelector('.teamChoise')

const ulStatsNumbers = document.querySelector('.statsInfo')
const ulStatsGraph = document.querySelector('.statsGraph')
const winLooseGraph =document.querySelector('.winLooseGraph')
const BarGraph = document.querySelector('.BarGraph')



let chosenTeam 
let chosenTeamID 

let season =2022


const fetchNBAapiPlayers = async ()=>{
    const responseApi = await fetch(`https://api.sportsdata.io/v3/nba/scores/json/Players?key=8d779eeb586d49658068b833108dbee0`)

    
    const data = await responseApi.json();
 
    if(responseApi.status == 200){
        return data
    }else{
        console.log('Não encontrado')
    }
}
const fetchNBAapiAllTeams = async ()=>{
    const responseApi = await fetch(`https://api.sportsdata.io/v3/nba/scores/json/teams?key=8d779eeb586d49658068b833108dbee0`)

    
    const data = await responseApi.json();
 
    if(responseApi.status == 200){
        return data
    }else{
        console.log('Não encontrado')
    }
}
const fetchNBAapiPlayerByTeam = async (team)=>{
    const responseApi = await fetch(`https://api.sportsdata.io/v3/nba/scores/json/Players/${team}?key=8d779eeb586d49658068b833108dbee0`)

    
    const data = await responseApi.json();
 
    if(responseApi.status == 200){
        return data
    }else{
        console.log('Não encontrado')
    }
}
const fetchNBAapiTeamGameLogs = async (season, teamID)=>{
    const responseApi = await fetch(`https://api.sportsdata.io/v3/nba/scores/json/TeamGameStatsBySeason/${season}/${teamID}/all?key=8d779eeb586d49658068b833108dbee0`)

    
    const data = await responseApi.json();
 
    if(responseApi.status == 200){
        return data
    }else{
        console.log('Não encontrado')
    }
}


const renderStatistics = async ()=>{
    const dataPlayers = await  fetchNBAapiPlayers()
    const dataTeams = await  fetchNBAapiAllTeams()

    

    dataTeams.forEach(team => {
        const teamImage = document.createElement('img')
        teamChoice.appendChild(teamImage)
        teamImage.src = team.WikipediaLogoUrl


        teamImage.addEventListener('click',async  ()=>{

            ulStatsNumbers.style.display = 'flex'

        chosenTeam = team.Key
        chosenTeamId = team.TeamID

        const dataPlayerByteam = await fetchNBAapiPlayerByTeam(chosenTeam) 
        
      
        const dataGameLogs2022 = await fetchNBAapiTeamGameLogs(2022, chosenTeamId )
        const dataGameLogs2023 = await fetchNBAapiTeamGameLogs(2023, chosenTeamId )
       
        console.log(dataGameLogs2023)

        const mapGameLogs =(e) =>{
            return [e.Wins, e.Losses, e.Points, e.BlockedShots , e.Rebounds, e.Assists]
        }

        const mapGameLogs2022 = dataGameLogs2022.map(mapGameLogs)
        const mapGameLogs2023 = dataGameLogs2023.map(mapGameLogs)

        
      

        function calcMediaArray(arrays) {
            return arrays.reduce((acc, array) => acc.map((sum, i) => sum + array[i]), new Array(arrays[0].length).fill(0));
        }

        const gameLogMedia2022 = calcMediaArray(mapGameLogs2022)
        const gameLogMedia2023 = calcMediaArray(mapGameLogs2023)

        console.log(gameLogMedia2023)
        
        const gameLogMediaFixed2022 = gameLogMedia2022.map((e) =>{
       
                return e.toFixed()
        
        })
       
        const gameLogMediaFixed2023 = gameLogMedia2023.map((e) =>{
       
            return e.toFixed()
    
    })


        headerTeamName.innerHTML = team.Name
        totalGames.innerHTML = ` 2022: ${dataGameLogs2022.length} <br> 2023: ${dataGameLogs2023.length}`
        totalPlayers.innerHTML = `PLAYERS: ${dataPlayerByteam.length}`


        google.charts.load('current', {packages: ['corechart']});
        google.charts.setOnLoadCallback(drawChart);
        
    console.log(+gameLogMediaFixed2023[3])
        
        function drawChart(){
            const dataPie = new google.visualization.arrayToDataTable([
                ['WIN', 'LOOSE'],
                ['WIN', gameLogMedia2022[0] ],
                ['LOOSE',gameLogMedia2022[1]],
            ])
            var dataBar = google.visualization.arrayToDataTable([
                ['Numeros', '2022', '2023'],
                ['Points', +gameLogMediaFixed2022[2], +gameLogMediaFixed2023[2]],
                ['Blocked Shots', +gameLogMediaFixed2022[3], +gameLogMediaFixed2023[3]],
                ['Rebounds', +gameLogMediaFixed2022[4], +gameLogMediaFixed2023[4]],
                ['Assists', +gameLogMediaFixed2022[5], +gameLogMediaFixed2023[5]]
              ]);
            var options = {
               
                
                backgroundColor: 'none',    
                width: 600,
                height: 600,

               
                titleTextStyle: {
                    color: 'aliceblue'
                },
                hAxis: {
                    textStyle: {
                        color: 'aliceblue'
                    },
                    titleTextStyle: {
                        color: 'aliceblue'
                    }
                },
                vAxis: {
                    textStyle: {
                        color: 'aliceblue'
                    },
                    titleTextStyle: {
                        color: 'aliceblue'
                    }
                },
                legend: {
                    textStyle: {
                        color: 'aliceblue'
                    }
                }
                
            };

            
            const Piechart = new  google.visualization.PieChart(winLooseGraph)
            const Barchart = new  google.visualization.ColumnChart(BarGraph)
            Piechart.draw(dataPie, options)
            Barchart.draw(dataBar, options)
        }


        })
    });


 
    
   
}
renderStatistics()