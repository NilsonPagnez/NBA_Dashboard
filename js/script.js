const teamChoice = document.querySelector('.teamChoise')

const ulStatsNumbers = document.querySelector('.statsInfo')


let chosenTeam 

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

//fazer maius uma chamada agora com Team Game Logs By Season

const renderStatistics = async ()=>{
    const dataPlayers = await  fetchNBAapiPlayers()
    const dataTeams = await  fetchNBAapiAllTeams()


    dataTeams.forEach(team => {
        const teamImage = document.createElement('img')
        teamChoice.appendChild(teamImage)
        teamImage.src = team.WikipediaLogoUrl
        teamImage.addEventListener('click',async  ()=>{
        chosenTeam = team.Key

        const dataPlayerByteam = await fetchNBAapiPlayerByTeam(chosenTeam) 
        console.log(dataPlayerByteam)
        
        })
    });


    console.log(dataTeams)
    
    const playerTeam = dataPlayers.map(player => player.Team)

    console.log(playerTeam)
    
    playerTeam.forEach((element, index) => {
        
    
    });
}
renderStatistics()