function showPlayerProfile(player_data) {

    var helper = function(id, delimiter, new_text) {
        var element = document.getElementById(id);
        var old_text = element.innerHTML;
        element.innerHTML = old_text.split(delimiter)[0] + delimiter + '&nbsp' + new_text
    }

    var img = document.getElementById("profile_img");
    img.setAttribute('src', 'https://nba-players.herokuapp.com/players/' + player_data.name.split(' ')[1].toLowerCase() + '/' + player_data.name.split(' ')[0].toLowerCase());
    img.setAttribute('onerror', "src='resources/inco_player.png'");

    var a = document.getElementById("profile_wiki");
    a.setAttribute('href', 'https://en.wikipedia.org/wiki/' + player_data.name);

    helper("player_profile_name", '-', player_data.name);
    helper("name", ':', player_data.name);
    helper("team_acronym", ':', player_data.team_acronym.toUpperCase());
    helper("team_name", ':', player_data.team_name);
    helper("games_played", ':', player_data.games_played);
    helper("minutes_per_game", ':', player_data.minutes_per_game);
    helper("field_goals_attempted_per_game", ':', player_data.field_goals_attempted_per_game);
    helper("field_goals_made_per_game", ':', player_data.field_goals_made_per_game);
    helper("field_goal_percentage", ':', player_data.field_goal_percentage);
    helper("free_throw_percentage", ':', player_data.free_throw_percentage);
    helper("three_point_attempted_per_game", ':', player_data.three_point_attempted_per_game);
    helper("three_point_made_per_game", ':', player_data.three_point_made_per_game);
    helper("three_point_percentage", ':', player_data.three_point_percentage);
    helper("points_per_game", ':', player_data.points_per_game);
    helper("offensive_rebounds_per_game", ':', player_data.offensive_rebounds_per_game);
    helper("defensive_rebounds_per_game", ':', player_data.defensive_rebounds_per_game);
    helper("rebounds_per_game", ':', player_data.rebounds_per_game);
    helper("assists_per_game", ':', player_data.assists_per_game);
    helper("steals_per_game", ':', player_data.steals_per_game);
    helper("blocks_per_game", ':', player_data.blocks_per_game);
    helper("turnovers_per_game", ':', player_data.turnovers_per_game);
    helper("player_efficiency_rating", ':', player_data.player_efficiency_rating);
}

function CreatePlayerRecordItem(player_data) {
    var player = document.createElement('div');
    var figure = document.createElement('figure');
    var player_name_header = document.createElement('h1');
    var a = document.createElement('a');
    var prof_img = document.createElement('img');
    
    player.setAttribute('class', 'player-cell');
    prof_img.setAttribute('src', 'https://nba-players.herokuapp.com/players/' + player_data.name.split(' ')[1].toLowerCase() + '/' + player_data.name.split(' ')[0].toLowerCase());
    prof_img.setAttribute('onerror', "src='resources/inco_player.png'");

    a.addEventListener('click', function() {
        showPlayerProfile(player_data);
    });

    player_name_header.innerHTML = '---&nbsp' + player_data.name + '&nbsp---';
    a.appendChild(player_name_header);
    figure.appendChild(a);
    player.appendChild(prof_img);
    player.appendChild(figure);
    return player;
}

const players_container = document.getElementById("players_container");

function createPlayerGrid(players) {
  players_container.innerHTML = ""
  rows = players.length/3; cols = 3;
  players_container.style.setProperty('--grid-rows', rows);
  players_container.style.setProperty('--grid-cols', cols);
  for (c = 0; c < rows*cols; c++) {
    let cell = CreatePlayerRecordItem(players[c]);
    players_container.appendChild(cell);
  };
};

function loadPlayerProfile() {
  const data = null;
  const xhr = new XMLHttpRequest();
  
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      var player = JSON.parse(this.response);
      showPlayerProfile(player);
    }
  });
  
  xhr.open("GET", "https://nba-players.herokuapp.com/players-stats/james/lebron");
  xhr.send(data);
}

loadPlayerProfile();

function loadAllPlayers() {
  const data = null;
  const xhr = new XMLHttpRequest();
  
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      var players = JSON.parse(this.response);
      createPlayerGrid(players);
    }
  });
  
  xhr.open("GET", "https://nba-players.herokuapp.com/players-stats");
  xhr.send(data);
}

loadAllPlayers();
