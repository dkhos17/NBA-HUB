var search = document.getElementById('search-li');
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
                    element.style.color = "#00fd4c";
                    left_element.style.color = "red";
                } else if(left_val > new_val) {
                    element.style.color = "red";
                    left_element.style.color = "#00fd4c";
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
        if(idx == players.length-1 && corner == 'left_') {
            if(document.getElementById('right_team_result').style.display == 'block') {
                var right_element = document.getElementById(id.replace('left','right'));
                var right_text = right_element.innerHTML;
                var right_val = parseFloat(right_text.split(delimiter)[1].split(';')[1]);
                if(right_val < new_val) {
                    element.style.color = "#00fd4c";
                    right_element.style.color = "red";
                } else if(right_val > new_val) {
                    element.style.color = "red";
                    right_element.style.color = "#00fd4c";
                }
                if(id.includes('efficiency')) {
                    element.style.color = "white";
                    element.style.fontSize = "17px";
                    right_element.style.color = "white";
                    right_element.style.fontSize = "17px";
                    winnerTeam(new_val, right_val);
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
        helper(corner+"player_efficiency_rating", ':', players[i].player_efficiency_rating, i);
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
    var leftTeam = document.getElementById('leftTeamInput');
    var rightTeam = document.getElementById('rightTeamInput');
    loadTeamStats(leftTeam.value.toLowerCase(), 'left_');
    loadTeamStats(rightTeam.value.toLowerCase(), 'right_');
});