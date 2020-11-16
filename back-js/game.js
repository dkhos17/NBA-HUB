function CreateGameRecordItem(game) {
    var games = document.createElement('data')
    var article = document.createElement('article')
    var figure = document.createElement('figure')

    var abbreviation = document.createElement('h1')
    var score = document.createElement('h1')
    var period = document.createElement('h2')
    var season_status = document.createElement('h2')

    article.setAttribute('class', 'game-box')
    figure.setAttribute('class', 'result')
    abbreviation.setAttribute('class', 'abbreviation')
    score.setAttribute('class', 'score')
    period.setAttribute('class', 'abbrperiodeviation')
    season_status.setAttribute('class', 'season_status')
    
    abbreviation.innerHTML = game.home_team.abbreviation + ":" + game.visitor_team.abbreviation
    score.innerHTML = game.home_team_score + ":" + game.visitor_team_score
    period.innerHTML = "Period - " + game.period
    season_status.innerHTML = game.season + " " + game.status

    figure.appendChild(abbreviation)
    figure.appendChild(score)
    figure.appendChild(period)
    figure.appendChild(season_status)
    article.appendChild(figure)
    games.appendChild(article)
    return games
}

const container = document.getElementById("container");

function createGameGrid(games) {
  container.innerHTML = ""
  rows = games.data.length/2; cols = 2;
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (c = 0; c < rows*cols; c++) {
    let cell = CreateGameRecordItem(games.data[c])
    container.appendChild(cell)
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

var CURR_PAGE = 0;
var MAX_PAGES = 3;
var PER_PAGE = 24;
loadAllGames(CURR_PAGE, PER_PAGE)

var next_butt = document.getElementById("nextButton");
next_butt.addEventListener("click", function() {
    CURR_PAGE += 1; CURR_PAGE %= MAX_PAGES;
    loadAllGames(CURR_PAGE, PER_PAGE);
});

var prev_butt = document.getElementById("prevButton");
prev_butt.addEventListener("click", function() {
    CURR_PAGE -= 1; CURR_PAGE += MAX_PAGES; CURR_PAGE %= MAX_PAGES;
    loadAllGames(CURR_PAGE, PER_PAGE);
});



