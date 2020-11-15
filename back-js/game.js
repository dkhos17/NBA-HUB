function CreateGameRecordItem() {
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
    
    abbreviation.innerHTML = "BOS:CHA"
    score.innerHTML = "126:94"
    period.innerHTML = "Period - 4"
    season_status.innerHTML = "2018 Final"

    figure.appendChild(abbreviation)
    figure.appendChild(score)
    figure.appendChild(period)
    figure.appendChild(season_status)
    article.appendChild(figure)
    games.appendChild(article)
    return games
}

const container = document.getElementById("container");

function createGameGrid(rows, cols) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (c = 0; c < (rows * cols); c++) {
    let cell = CreateGameRecordItem()
    container.appendChild(cell)
  };
};

createGameGrid(25, 2);