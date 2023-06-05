export class PremiereLeagueApi {

  static options(){

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'sua chave api',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    };

    return options

  }

  static async leagueStandings(){
    const endpoint = `https://api-football-v1.p.rapidapi.com/v3/standings?season=2022&league=39`;
    
    const standings = await fetch(endpoint, this.options())
    .then(data => data.json())
    .then(({response}) => ({
      response: response.map(a =>  a.league.standings)
    }))
  
    
    return standings.response
    
  }

 
  static async topAssists(){
    const endpoint = `https://api-football-v1.p.rapidapi.com/v3/players/topassists?league=39&season=2022`;

   
    const assists = await fetch(endpoint, this.options())
    .then(data => data.json())
    .then(({response}) => ({
      response
    }))

    return assists.response
  }

  static async topScores(){
    const endpoint = 'https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=39&season=2022';
    
    const scores = await fetch(endpoint, this.options())
    .then(data => data.json())
    .then(({response}) => ({
      response
    }))
  
    
    return scores.response
  }

  
}