import { PremiereLeagueApi } from './api/PremiereLeagueApi.js'

export class StandingsDetails {

  constructor(root){
    this.root = document.querySelector(root)
    this.tbody = this.root.querySelector('table tbody')
    this.thead = this.root.querySelector('table thead')

   
  }

  createForms(a, row){
    
    if(a == 'L'){
      const span =  document.createElement('span')
      span.className = 'form'
      span.classList.add('lost')
      row.querySelector('.games').appendChild(span)
    }

    if(a == 'W'){
      const span =  document.createElement('span')
      span.className = 'form'
      span.classList.add('won')
      row.querySelector('.games').appendChild(span)
      
    }

    if(a == 'D'){
      const span =  document.createElement('span')
      span.className = 'form'
      span.classList.add('tied')
      row.querySelector('.games').appendChild(span)
    }
  }

  
  createRow(){
    const tr = document.createElement('tr');

    tr.innerHTML = `
    <td class="position">
    <p></p>
    </td>
    <td class="team">
      <img src="" alt="">
        <p></p>
    </td>
    <td class="mp">
      <p></p>
    </td>
    <td class="win">
      <p></p>
    </td>
    <td class="lose">
      <p></p>
    </td>
    <td class="draw">
      <p></p>
    </td>
    <td class="goalsf">
      <p></p>
    </td>
    <td class="goalsa">
      <p></p>
    </td>
    <td class="goalsDiff">
      <p></p>
    </td>
    <td class="points">
      <p></p>
    </td>
    <td class="games">
      
    </td>
    `;

    return tr;
  }

  createRowBests(){
    const tr = document.createElement('tr');

    tr.innerHTML = `
    <td class="rank">
    <p></p>
    </td>
    <td class="name">
      <img src="" alt="">
        <p></p>
    </td>
    <td class="nationality">
      <p></p>
    </td>
    <td class="appearances">
      <p></p>
    </td>
    <td class="goals">
      <p></p>
    </td>
    <td class="wins">
      <p></p>
    </td>
    <td class="losses">
      <p></p>
    </td>
    <td class="club">
      <img src="" alt="">
      <p></p>
    </td>
    `;

    return tr;
  }

}

export class StandingsScoresAssists extends StandingsDetails {
  constructor(root){
    super(root)

    this.competitions = this.root.querySelector('.championships')
    this.tbody = this.root.querySelector('table tbody')

    this.loadStandings();

    this.standings();
    this.scores();
    this.assists();
    
  }

  async loadScores(){

    this.bestScoresAndAssistsHeader();
   
    try {
      const topScores = await PremiereLeagueApi.topScores();
      let i = 0;
      topScores.forEach(score => {
        const row = this.createRowBests();
        
        row.querySelector('.rank p').textContent = `${++i}`;
        row.querySelector('.name img').src = `${score.player.photo}`;
        row.querySelector('.name p').textContent = `${score.player.name}`;
        row.querySelector('.nationality p').textContent = `${score.player.nationality}`;
        row.querySelector('.appearances p').textContent = `${score.statistics[0].games.appearences}`;
        row.querySelector('.goals p').textContent = `${score.statistics[0].goals.total}`;
        row.querySelector('.club img').src = `${score.statistics[0].team.logo}`;
        row.querySelector('.club p').textContent = `${score.statistics[0].team.name}`;

        this.tbody.append(row);
        
      })

    } catch (error) {
      
    }
    
  }

  async loadAssists(){
    this.bestScoresAndAssistsHeader();

    try {
      const assists = await PremiereLeagueApi.topAssists();
      let i = 0;

      assists.forEach(assist => {
        const row = this.createRowBests();

        row.querySelector('.rank p').textContent = `${++i}`;
        row.querySelector('.name img').src = `${assist.player.photo}`;
        row.querySelector('.name p').textContent = `${assist.player.name}`;
        row.querySelector('.nationality p').textContent = `${assist.player.nationality}`;
        row.querySelector('.appearances p').textContent = `${assist.statistics[0].games.appearences}`;
        row.querySelector('.goals p').textContent = `${assist.statistics[0].goals.assists}`;
        row.querySelector('.club img').src = `${assist.statistics[0].team.logo}`;
        row.querySelector('.club p').textContent = `${assist.statistics[0].team.name}`;

        this.tbody.append(row);

      })
      
    } catch (error) {
      
    }
  }


  async loadStandings(){

    try {
      const standings = await PremiereLeagueApi.leagueStandings();
      
      const tr = document.createElement('tr')

      tr.innerHTML = `
      
      <tr>
        <th>POS</th>
        <th>TEAM</th>
        <th>MP</th>
        <th>W</th>
        <th>L</th>
        <th>D</th>
        <th>GF</th>
        <th>GA</th>
        <th>GD</th>
        <th>POINTS</th>
        <th>LASTS</th>
      </tr>
  
      `;

      this.thead.append(tr)
      
      standings.forEach(standing => {
        standing[0].forEach((team) => {
          const row = this.createRow()
          let latestResults = team.form.split('')

          
         
          row.querySelector('.position p').textContent = `${team.rank}`;
          row.querySelector('.team img').src = `${team.team.logo}`;
          row.querySelector('.team p').textContent = `${team.team.name}`;
          row.querySelector('.mp p').textContent = `${team.all.played}`;
          row.querySelector('.win p').textContent = `${team.all.win}`;
          row.querySelector('.lose p').textContent = `${team.all.lose}`;
          row.querySelector('.draw p').textContent = `${team.all.draw}`;
          row.querySelector('.goalsf p').textContent = `${team.all.goals.for}`;
          row.querySelector('.goalsa p').textContent = `${team.all.goals.against}`;
          row.querySelector('.goalsDiff p').textContent = `${team.goalsDiff}`;
          row.querySelector('.points p').textContent = `${team.points}`;
          

          latestResults.map((a) => {
            this.createForms(a, row)
          })
         

          this.tbody.append(row)
        })
      })

    } catch (error) {
      
    }
  }
  
  standings(){
    const standing  = this.root.querySelector('a .standings')

    standing.onclick = () => {
      this.competitions.classList.remove('hide')
      const title = this.root.querySelector('.title-head')
      title.classList.add('hide')

      this.removeAllTr();
      this.loadStandings()
    }
  }

  scores(){
    
    const score = this.root.querySelector('a .ball')
    
    score.onclick = () => {
      this.competitions.classList.add('hide')
      this.updateTitle('Best Scores 2022-2023')

      this.removeAllTr()
      this.loadScores()
    }

  }

  assists(){

    const assist = this.root.querySelector('a .assist')

    assist.onclick = () => {
      this.competitions.classList.add('hide')
      this.updateTitle('Best Assists 2022-2023')
      
      this.removeAllTr();
      this.loadAssists();
    }

  }

  updateTitle(texto){
    const title = this.root.querySelector('.title-head')
    title.innerText = texto
    title.classList.remove('hide')

  }

  bestScoresAndAssistsHeader(){
    const tr = document.createElement('tr')

    tr.innerHTML = `
    
    <tr>
      <th>Rank</th>
      <th>Name</th>
      <th>Nationality</th>
      <th>Appearances</th>
      <th>Goals</th>
      <th></th>
      <th></th>
      <th>Club</th>
    </tr>

    `;

    this.thead.append(tr)

    return tr;
  }

  removeAllTr() {

    this.thead.querySelectorAll('tr')
        .forEach(tr => {
          tr.remove()
        })
    
    this.tbody.querySelectorAll('tr')
        .forEach(tr => {
          tr.remove()
        });
  }

 
}

