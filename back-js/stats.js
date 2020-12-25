var search = document.getElementById('search');
search.style.display = 'none';

function changeDisplay(elem, dsp) {
    if(elem.style.display == 'none') {
      elem.style.display = dsp;
    } else {
      elem.style.display = 'none';
    }
};

var compare_teams = document.getElementById('compare_teams');
compare_teams.addEventListener('click', function() {
    var compare_teams_figure = document.getElementById('compare_teams_figure');
    changeDisplay(compare_teams_figure, 'flex');
});

var compare_players = document.getElementById('compare_players');
compare_players.addEventListener('click', function() {
    var compare_players_figure = document.getElementById('compare_players_figure');
    changeDisplay(compare_players_figure, 'flex');
});


function showTeamStats(team_abv, players, corner) {
    if(players.length == 0) {return}
    var helper = function(id, delimiter, new_text, idx) {
        var element = document.getElementById(id);
        if(idx == 0) {
            element.innerHTML = element.innerHTML.split(delimiter)[0] + delimiter + '&nbsp0';
        }
        var old_text = element.innerHTML;
        var old_val = parseFloat(old_text.split(delimiter)[1].split(';')[1]);
        if(Number.isNaN(old_val)) {old_val = 0.0;}

        var new_val = parseFloat(new_text);
        if(Number.isNaN(new_val)) {new_val = 0.0;}
        if(id.includes('percentage') || id.includes('efficiency')) {
            new_val = new_val / players.length;
        }

        new_val = Math.round((new_val+old_val) * 100) / 100;
        element.innerHTML = old_text.split(delimiter)[0] + delimiter + '&nbsp' + new_val;

        var winnerTeam = function(left_score, right_score) {
            var winner = document.getElementById('winner_team');
            var teamL = document.getElementById('left_team_abv');
            var teamR = document.getElementById('right_team_abv');
            if(left_score < right_score) {
                winner.innerHTML = teamR.innerHTML;
            } else {
                winner.innerHTML = teamL.innerHTML;
            }
            winner.style.display = 'block';
        }

        if(idx == players.length-1 && corner == 'right_') {
            if(document.getElementById('left_team_result').style.display == 'block') {
                var left_element = document.getElementById(id.replace('right','left'));
                var left_text = left_element.innerHTML;
                var left_val = parseFloat(left_text.split(delimiter)[1].split(';')[1]);
                if(left_val < new_val) {
                    element.style.color = "blue";
                    left_element.style.color = "red";
                } else if(left_val > new_val) {
                    element.style.color = "red";
                    left_element.style.color = "blue";
                } else {
                    element.style.color = "#1F2833";
                    left_element.style.color = "#1F2833";
                }
                if(id.includes('efficiency')) {
                    element.style.color = "white";
                    element.style.fontSize = "17px";
                    left_element.style.color = "white";
                    left_element.style.fontSize = "17px";
                    winnerTeam(left_val, new_val);
                }
            }
        }
    }
    document.getElementById(corner+"team_abv").innerHTML = team_abv.toUpperCase();
    var img = document.getElementById(corner+"team_profile_img");
    img.setAttribute('src', 'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/' + team_abv + '.png');
    
    for(var i = 0; i < players.length; i++) {
        helper(corner+"field_goals_attempted_per_game", ':', players[i].field_goals_attempted_per_game, i);
        helper(corner+"field_goals_made_per_game", ':', players[i].field_goals_made_per_game, i);
        helper(corner+"field_goal_percentage", ':', players[i].field_goal_percentage, i);
        helper(corner+"free_throw_percentage", ':', players[i].free_throw_percentage, i);
        helper(corner+"three_point_attempted_per_game", ':', players[i].three_point_attempted_per_game, i);
        helper(corner+"three_point_made_per_game", ':', players[i].three_point_made_per_game, i);
        helper(corner+"three_point_percentage", ':', players[i].three_point_percentage, i);
        helper(corner+"points_per_game", ':', players[i].points_per_game, i);
        helper(corner+"offensive_rebounds_per_game", ':', players[i].offensive_rebounds_per_game, i);
        helper(corner+"defensive_rebounds_per_game", ':', players[i].defensive_rebounds_per_game, i);
        helper(corner+"rebounds_per_game", ':', players[i].rebounds_per_game, i);
        helper(corner+"assists_per_game", ':', players[i].assists_per_game, i);
        helper(corner+"steals_per_game", ':', players[i].steals_per_game, i);
        helper(corner+"blocks_per_game", ':', players[i].blocks_per_game, i);
        helper(corner+"turnovers_per_game", ':', players[i].turnovers_per_game, i);
        helper(corner+"team_efficiency_rating", ':', players[i].player_efficiency_rating, i);
    }
    document.getElementById(corner+'team_result').style.display = 'block';
}

function loadTeamStats(team_abv, corner) {
    const data = null;
    const xhr = new XMLHttpRequest();
    document.getElementById(corner+'team_result').style.display = 'none';
    document.getElementById('winner_team').style.display = 'none';
    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        var players = JSON.parse(this.response);
        showTeamStats(team_abv, players, corner);
      }
    });
    
    xhr.open("GET", "https://nba-players.herokuapp.com/players-stats-teams/" + team_abv);
    xhr.send(data);
}

var compare_teams = document.getElementById('compareTeamsButton');
compare_teams.addEventListener('click', function() {
    var leftTeamABV = document.getElementById('leftTeamInput').value.toLowerCase();
    var rightTeamABV = document.getElementById('rightTeamInput').value.toLowerCase();
    Promise.all([
        fetch("https://nba-players.herokuapp.com/players-stats-teams/" + leftTeamABV).then(response => response.json())
        .catch((err) => {document.getElementById('leftTeamInput').value = "Wrong ABV...";}),
        fetch("https://nba-players.herokuapp.com/players-stats-teams/" + rightTeamABV).then(response => response.json())
        .catch((err) => {document.getElementById('rightTeamInput').value = "Wrong ABV...";}),
      ]).then(team_players =>  {
        showTeamStats(leftTeamABV, team_players[0], 'left_');
        showTeamStats(rightTeamABV, team_players[1], 'right_');
      }).catch((err) => {
        console.log(err);
      });
});

function showPlayerStats(player_abv, player, corner) {
    document.getElementById(corner+'player_result').style.display = 'none';
    var helper = function(id, delimiter, new_text) {
        var element = document.getElementById(id);
        var new_val = parseFloat(new_text);
        if(Number.isNaN(new_val)) {new_val = 0.0;}

        new_val = Math.round(new_val * 100) / 100;
        element.innerHTML = element.innerHTML.split(delimiter)[0] + delimiter + '&nbsp' + new_val;

        var winnerPlayer = function(left_score, right_score) {
            var winner = document.getElementById('winner_player');
            var teamL = document.getElementById('left_player_abv');
            var teamR = document.getElementById('right_player_abv');
            if(left_score < right_score) {
                winner.innerHTML = teamR.innerHTML;
            } else {
                winner.innerHTML = teamL.innerHTML;
            }
            winner.style.display = 'block';
        }

        if(corner == 'right_') {
            if(document.getElementById('left_player_result').style.display == 'block') {
                var left_element = document.getElementById(id.replace('right','left'));
                var left_text = left_element.innerHTML;
                var left_val = parseFloat(left_text.split(delimiter)[1].split(';')[1]);
                if(left_val < new_val) {
                    element.style.color = "blue";
                    left_element.style.color = "red";
                } else if(left_val > new_val) {
                    element.style.color = "red";
                    left_element.style.color = "blue";
                } else if(left_val < new_val){
                    element.style.color = "#1F2833";
                    left_element.style.color = "#1F2833";
                } else {
                    element.style.color = "#1F2833";
                    left_element.style.color = "#1F2833";
                }
                if(id.includes('efficiency')) {
                    element.style.color = "white";
                    element.style.fontSize = "17px";
                    left_element.style.color = "white";
                    left_element.style.fontSize = "17px";
                    winnerPlayer(left_val, new_val);
                }
            }
        }
    }
    document.getElementById(corner+"player_abv").innerHTML = player_abv.toUpperCase();
    var img = document.getElementById(corner+"player_profile_img");
    img.setAttribute('src', 'https://nba-players.herokuapp.com/players/' + player_abv.split(' ')[1].toLowerCase() + '/' + player_abv.split(' ')[0].toLowerCase());
    img.setAttribute('onerror', "src='resources/player_default.png'");
    
    helper(corner+"player_field_goals_attempted_per_game", ':', player.field_goals_attempted_per_game);
    helper(corner+"player_field_goals_made_per_game", ':', player.field_goals_made_per_game);
    helper(corner+"player_field_goal_percentage", ':', player.field_goal_percentage);
    helper(corner+"player_free_throw_percentage", ':', player.free_throw_percentage);
    helper(corner+"player_three_point_attempted_per_game", ':',player.three_point_attempted_per_game);
    helper(corner+"player_three_point_made_per_game", ':', player.three_point_made_per_game);
    helper(corner+"player_three_point_percentage", ':', player.three_point_percentage);
    helper(corner+"player_points_per_game", ':', player.points_per_game);
    helper(corner+"player_offensive_rebounds_per_game", ':', player.offensive_rebounds_per_game);
    helper(corner+"player_defensive_rebounds_per_game", ':', player.defensive_rebounds_per_game);
    helper(corner+"player_rebounds_per_game", ':', player.rebounds_per_game);
    helper(corner+"player_assists_per_game", ':', player.assists_per_game);
    helper(corner+"player_steals_per_game", ':', player.steals_per_game);
    helper(corner+"player_blocks_per_game", ':', player.blocks_per_game);
    helper(corner+"player_turnovers_per_game", ':', player.turnovers_per_game);
    helper(corner+"player_efficiency_rating", ':', player.player_efficiency_rating);
    document.getElementById(corner+'player_result').style.display = 'block';
}

var compare_players = document.getElementById('comparePlayersButton');
compare_players.addEventListener('click', function() {
    document.getElementById('winner_player').style.display = 'none';

    var leftPlayer = document.getElementById('leftPlayerInput').value.toLowerCase();
    var rightPlayer = document.getElementById('rightPlayerInput').value.toLowerCase();

    var left_first_name = leftPlayer.split(' ')[0];
    var left_last_name = leftPlayer.split(' ')[1];

    var right_first_name = rightPlayer.split(' ')[0];
    var right_last_name = rightPlayer.split(' ')[1];

    Promise.all([
      fetch("https://nba-players.herokuapp.com/players-stats/"+left_last_name+'/'+left_first_name).then(response => response.json())
      .catch((err) => {document.getElementById('leftPlayerInput').value = "Wrong Player...";}),
      fetch("https://nba-players.herokuapp.com/players-stats/"+right_last_name+'/'+right_first_name).then(response => response.json())
      .catch((err) => {document.getElementById('rightPlayerInput').value = "Wrong Player...";}),
    ]).then(players =>  {
      showPlayerStats(leftPlayer, players[0], 'left_');
      showPlayerStats(rightPlayer, players[1], 'right_');
    }).catch((err) => {
      console.log(err);
    });
});

function CreateTeamRecordItem(team_abv) {
    var team = document.createElement('div');
    var team_name_header = document.createElement('a');
    
    team.setAttribute('class', 'all-team-cell');
    team_name_header.innerHTML = '&nbsp' + team_abv + '&nbsp';
    team_name_header.setAttribute('href', '#Teams?team=' + team_abv);

    team.appendChild(team_name_header);
    return team;
}

const all_teams_container = document.getElementById("all_teams_container");

function createTeamsList(teams) {
    all_teams_container.innerHTML = ""
    rows = teams.length; cols = 1;
    all_teams_container.style.setProperty('--grid-rows', rows);
    all_teams_container.style.setProperty('--grid-cols', cols);
  
    for (c = 0; c < rows*cols; c++) {
      let cell = CreateTeamRecordItem(teams[c]);
      all_teams_container.appendChild(cell);
    };
};

fetch("https://nba-players.herokuapp.com/teams")
.then(response => response.json())
.then(teams => {
  createTeamsList(teams);})
.catch((err) => {
  console.log(err, "can't load teams");
});

function CreatePlayerRecordItem(player_data) {
    var player = document.createElement('div');
    var player_name_header = document.createElement('a');

    player.setAttribute('class', 'all-player-cell');
    player_name_header.setAttribute('href', '#Players?page=0&player=' + player_data.name.split(' ')[0] +'-' + player_data.name.split(' ')[1]);
    player_name_header.innerHTML = '&nbsp' + player_data.name + '&nbsp';

    // player_name_header.appendChild(a);
    player.appendChild(player_name_header);
    return player;
}

const all_players_container = document.getElementById("all_players_container");

function createPlayersList(players) {
    all_players_container.innerHTML = ""
    rows = players.length; cols = 1;
    all_players_container.style.setProperty('--grid-rows', rows);
    all_players_container.style.setProperty('--grid-cols', cols);
    for (c = 0; c < rows*cols; c++) {
      let cell = CreatePlayerRecordItem(players[c]);
      all_players_container.appendChild(cell);
    };
};

  
fetch("https://nba-players.herokuapp.com/players-stats")
.then(response => response.json())
.then(players => {
  createPlayersList(players);})
.catch((err) => {
  console.log(err, "can't load players");
});