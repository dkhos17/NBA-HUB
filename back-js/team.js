function showTeamProfile(team_data) {

  var helper = function(id, delimiter, new_text) {
      var element = document.getElementById(id);
      var old_text = element.innerHTML;
      if(old_text.includes(delimiter)) {
        element.innerHTML = old_text.split(delimiter)[0] + delimiter + '&nbsp' + new_text
      } else {
        element.innerHTML = '---&nbsp' + new_text.toUpperCase() + '&nbsp---';
      }
  }

  var img = document.getElementById("team_profile_img");
  img.setAttribute('src', 'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/' + team_data.abbreviation.toLowerCase() + '.png');

  helper("team_details", ':', team_data.abbreviation);
  helper("team_city", ':', team_data.city);
  helper("team_conference", ':', team_data.conference);
  helper("team_division", ':', team_data.division);
  helper("team_full_name", ':', team_data.full_name);
  helper("team_name", ':', team_data.name);
}

function CreateTeamRecordItem(team_data) {
    var team = document.createElement('div');
    var article = document.createElement('article');
    var figure = document.createElement('figure');
    var a = document.createElement('a');
    var img = document.createElement('img');

    var abbreviation = document.createElement('h1');
    var city = document.createElement('h2');
    var conference = document.createElement('h2');
    var division = document.createElement('h2');
    var full_name = document.createElement('h2');
    var name = document.createElement('h2');

    a.setAttribute('href', 'https://en.wikipedia.org/wiki/' + team_data.full_name);
    img.setAttribute('src', 'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/'+team_data.abbreviation.toLowerCase()+'.png');
    
    article.setAttribute('class', 'team-box');
    figure.setAttribute('class', 'result');
    abbreviation.setAttribute('class', 'abbreviation');
    city.setAttribute('class', 'city');
    conference.setAttribute('class', 'conference');
    division.setAttribute('class', 'division');
    full_name.setAttribute('class', 'full_name');
    name.setAttribute('class', 'name');
    
    abbreviation.innerHTML = team_data.abbreviation;
    city.innerHTML = "City: " + team_data.city;
    conference.innerHTML = "Conference: " + team_data.conference;
    division.innerHTML = "Division: " + team_data.division;
    full_name.innerHTML = "Full Name: " + team_data.full_name;
    name.innerHTML = "Name: " + team_data.name;
     
    abbreviation.addEventListener('click', function() {
      showTeamProfile(team_data);
      loadTeamPlayers(team_data.abbreviation.toLowerCase());
    });

    a.appendChild(img);
    figure.appendChild(a);
    figure.appendChild(abbreviation);
    figure.appendChild(city);
    figure.appendChild(conference);
    figure.appendChild(division);
    figure.appendChild(full_name);
    figure.appendChild(name);
    article.appendChild(figure);
    team.appendChild(article);

    

    return team;
}

const team_container = document.getElementById("team_container");

function createTeamGrid(teams) {
  team_container.innerHTML = ""
  rows = teams.data.length/2; cols = 2;
  team_container.style.setProperty('--grid-rows', rows);
  team_container.style.setProperty('--grid-cols', cols);
  for (c = 0; c < rows*cols; c++) {
    let cell = CreateTeamRecordItem(teams.data[c]);
    team_container.appendChild(cell);
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

loadAllTeams();


function CreateTeamPlayerRecordItem(player_data, idx) {
  var player = document.createElement('div');
  var a = document.createElement('a');
  var player_name = document.createElement('h2');

  player_name.innerHTML = idx.toString() + ")&nbsp&nbsp" + player_data.name;
  a.appendChild(player_name);
  player.appendChild(a);
  return player;
}

const team_players_container = document.getElementById("team_players_container");

function createTeamPlayersGrid(players) {
  team_players_container.innerHTML = ""
  rows = players.length; cols = 1;
  team_players_container.style.setProperty('--grid-rows', rows);
  team_players_container.style.setProperty('--grid-cols', cols);
  for (c = 0; c < rows*cols; c++) {
    let cell = CreateTeamPlayerRecordItem(players[c], c+1);
    team_players_container.appendChild(cell);
  };
};

function loadTeamPlayers(team_abv) {
  const data = null;
  const xhr = new XMLHttpRequest();
  
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      var players = JSON.parse(this.response);
      createTeamPlayersGrid(players);
    }
  });
  
  xhr.open("GET", "https://nba-players.herokuapp.com/players-stats-teams/" + team_abv);
  xhr.send(data);

  var changeDisplay = function(elem) {
    if(elem.style.display == 'none') {
      elem.style.display = 'block';
    } else {
      elem.style.display = 'none';
    }
  };

  var team_details = document.getElementById("team_details");
  var team_players = document.getElementById("team_players");
  team_details.addEventListener('click', function() {
    changeDisplay(document.getElementById("team_details_div"));
  });
  team_players.addEventListener('click', function() {
    changeDisplay(team_players_container);
  });
}

loadTeamPlayers('mia');