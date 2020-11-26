function CreateTeamRecordItem(team_data) {
    var team = document.createElement('data')
    var article = document.createElement('article')
    var figure = document.createElement('figure')
    var a = document.createElement('a')
    var img = document.createElement('img')

    var abbreviation = document.createElement('h1')
    var city = document.createElement('h2')
    var conference = document.createElement('h2')
    var division = document.createElement('h2')
    var full_name = document.createElement('h2')
    var name = document.createElement('h2')

    a.setAttribute('href', 'https://en.wikipedia.org/wiki/' + team_data.full_name)
    img.setAttribute('src', 'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/'+team_data.abbreviation.toLowerCase()+'.png')
    
    article.setAttribute('class', 'team-box')
    figure.setAttribute('class', 'result')
    abbreviation.setAttribute('class', 'abbreviation')
    city.setAttribute('class', 'city')
    conference.setAttribute('class', 'conference')
    division.setAttribute('class', 'division')
    full_name.setAttribute('class', 'full_name')
    name.setAttribute('class', 'name')
    
    abbreviation.innerHTML = team_data.abbreviation
    city.innerHTML = "City: " + team_data.city
    conference.innerHTML = "Conference: " + team_data.conference
    division.innerHTML = "Division: " + team_data.division
    full_name.innerHTML = "Full Name: " + team_data.full_name
    name.innerHTML = "Name: " + team_data.name
     
    a.appendChild(img)
    figure.appendChild(a)
    figure.appendChild(abbreviation)
    figure.appendChild(city)
    figure.appendChild(conference)
    figure.appendChild(division)
    figure.appendChild(full_name)
    figure.appendChild(name)
    article.appendChild(figure)
    team.appendChild(article)
    return team;
}

const container = document.getElementById("container");

function createTeamGrid(teams) {
  container.innerHTML = ""
  rows = teams.data.length/2; cols = 2;
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (c = 0; c < rows*cols; c++) {
    let cell = CreateTeamRecordItem(teams.data[c])
    container.appendChild(cell)
  };
};

function loadAllTeams() {
  const data = null;
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      var teams = JSON.parse(this.response);
      createTeamGrid(teams);
    }
  });
  
  xhr.open("GET", "https://free-nba.p.rapidapi.com/teams?page=0");
  xhr.setRequestHeader("x-rapidapi-key", "0bfb131022mshdfb44f698b8dae2p1ca3bajsne4fa8745db09");
  xhr.setRequestHeader("x-rapidapi-host", "free-nba.p.rapidapi.com");
  xhr.send(data);
}

loadAllTeams()