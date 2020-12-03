function CreateGameRecordItem(game_data) {
    var game = document.createElement('data');
    var article = document.createElement('article');
    var figure = document.createElement('figure');

    var abbreviation = document.createElement('div');
    var abbreviation_content = document.createElement('div');
    var team1_img = document.createElement('img');
    var team2_img = document.createElement('img');
    var team1_h1 = document.createElement('h1');
    var double_point = document.createElement('h1');
    var team2_h1 = document.createElement('h1');
    
    var score = document.createElement('h1');
    var period = document.createElement('h2');
    var season_status = document.createElement('h2');

    article.setAttribute('class', 'game-box');
    figure.setAttribute('class', 'result');
    
    abbreviation.setAttribute('class', 'abbreviation');
    abbreviation_content.setAttribute('class', 'abbreviation_content');
    team1_img.setAttribute('class', 'team_img');
    team2_img.setAttribute('class', 'team_img');
    team1_h1.setAttribute('class', 'team_abbreviation');
    double_point.setAttribute('class', 'team_abbreviation');
    team2_h1.setAttribute('class', 'team_abbreviation');
    
    score.setAttribute('class', 'score');
    period.setAttribute('class', 'period');
    season_status.setAttribute('class', 'season_status');
    
    team1_img.setAttribute('src', 'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/'+game_data.home_team.abbreviation.toLowerCase()+'.png');
    team2_img.setAttribute('src', 'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/'+game_data.visitor_team.abbreviation.toLowerCase()+'.png');

    team1_h1.innerHTML = game_data.home_team.abbreviation;
    double_point.innerHTML = '&nbsp:&nbsp';
    team2_h1.innerHTML = game_data.visitor_team.abbreviation;

    score.innerHTML = game_data.home_team_score + "&nbsp:&nbsp" + game_data.visitor_team_score;
    period.innerHTML = "Period - " + game_data.period;
    season_status.innerHTML = game_data.season + " " + game_data.status;

    abbreviation_content.appendChild(team1_img);
    abbreviation_content.appendChild(team1_h1);
    abbreviation_content.appendChild(double_point);
    abbreviation_content.appendChild(team2_h1);
    abbreviation_content.appendChild(team2_img);
    abbreviation.appendChild(abbreviation_content);

    figure.appendChild(abbreviation);
    figure.appendChild(score);
    figure.appendChild(period);
    figure.appendChild(season_status);
    article.appendChild(figure);
    game.appendChild(article);
    console.log(game);
    return game;
}

const games_container = document.getElementById("games_container");

function createGameGrid(games) {
  games_container.innerHTML = ""
  rows = games.data.length/2; cols = 2;
  games_container.style.setProperty('--grid-rows', rows);
  games_container.style.setProperty('--grid-cols', cols);
  for (c = 0; c < rows*cols; c++) {
    let cell = CreateGameRecordItem(games.data[c]);
    games_container.appendChild(cell);
  };
};

function loadAllGames(page, per_page) {
  const data = null;
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      var games = JSON.parse(this.response);
      createGameGrid(games);
    }
  });
  
  xhr.open("GET", "https://free-nba.p.rapidapi.com/games?page="+page+"&per_page="+per_page);
  xhr.setRequestHeader("x-rapidapi-key", "0bfb131022mshdfb44f698b8dae2p1ca3bajsne4fa8745db09");
  xhr.setRequestHeader("x-rapidapi-host", "free-nba.p.rapidapi.com");
  xhr.send(data);
}

var GAMES_CURR_PAGE = 0;
var GAMES_MAX_PAGES = 3;
var GAMES_PER_PAGE = 24;
loadAllGames(GAMES_CURR_PAGE, GAMES_PER_PAGE);

var games_next_butt = document.getElementById("gamesNextButton");
games_next_butt.addEventListener("click", function() {
    GAMES_CURR_PAGE += 1; GAMES_CURR_PAGE %= GAMES_MAX_PAGES;
    loadAllGames(GAMES_CURR_PAGE, GAMES_PER_PAGE);
});

var games_prev_butt = document.getElementById("gamesPrevButton");
games_prev_butt.addEventListener("click", function() {
    GAMES_CURR_PAGE -= 1; GAMES_CURR_PAGE += GAMES_MAX_PAGES;GAMES_CURR_PAGE %= GAMES_MAX_PAGES;
    loadAllGames(GAMES_CURR_PAGE, GAMES_PER_PAGE);
});

