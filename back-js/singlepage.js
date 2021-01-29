let mainElement = document.getElementById('singlepage');

function activate_currentpage(idx) {
    var pages = document.getElementsByClassName('currentpages');
    for (var i = 0; i < pages.length; i++) {
        pages[i].className = pages[i].className.replace(" current", "");
    }
    pages[idx].className += ' current';
}

let routes = {
  'Home': (page, args) => {
    loadHomePage().then(loadJSandCSS(page));
  },

  'Games': (page, args) => {
    loadGamesPage().then(loadJSandCSS(page));
  },

  'Teams': (page, args) => {
    loadTeamsPage().then(loadJSandCSS(page));
  },

  'Players': (page, args) => {
    loadPlayersPage().then(loadJSandCSS(page));
  },

  'Stats': (page, args) => {
    loadStatsPage().then(loadJSandCSS(page));
  }
};

let defaultRoute = 'Home';

let handleRouting = () => {
    let currentUri = window.location.hash || false;
    if (currentUri !== false) {
      currentUri = currentUri.substring(1);
    } else {
      currentUri = defaultRoute;
    }
    var args = currentUri.split('?');
    var page = args[0] || defaultRoute
    routes[page](page.toLowerCase(), args);
};

window.addEventListener('load', handleRouting);
window.addEventListener('hashchange', handleRouting);

function loadCSS(cssURL) {
    var link = document.getElementById('singlepageCSS');
    link.href = cssURL;
}

function loadJS(jsURL) {
    var script = document.createElement('script');
    // var script = document.getElementById('singlepageJS');
    script.src = jsURL;
    document.getElementsByTagName('head')[0].appendChild(script);
}

function loadJSandCSS(page) {
    loadJS('back-js/' + page + '.js');
    loadCSS('styles/' + page + '.css');
}

function loadHomePage() {
    activate_currentpage(0);
    return new Promise(function(resolve, reject) {
        mainElement.innerHTML = `
        <div id="main_container" class="clear">
            <section class="title">
            <h1 id="title_text">Welcome to NBA Basketball corner</h1>
            </section>
            <section id="slideshow">
                <div class="slideshow-container">
        
                <div class="slides fade" style="display: block;">
                    <img src="resources/slide1.jpg">
                </div>
        
                <div class="slides fade">
                    <img src="resources/slide2.jpg">
                </div>
        
                <div class="slides fade">
                    <img src="resources/slide6.jpg">
                </div>
        
                <a class="prev" id="prevSlide">&#10094;</a>
                <a class="next" id="nextSlide">&#10095;</a>
                </div>
                <br>
        
                <div style="text-align: center;">
                <span class="dots" id="dot1"></span>
                <span class="dots" id="dot2"></span>
                <span class="dots" id="dot3"></span>
                </div>
        
            </a></section>
            <div id="mainpage">
            <section>
            <h1>Services We Offer</h1>
                <div class="serivces-container">
                <div id="games">
                    <h2>NBA Games</h2>
                    <p> Find a Specific Game or Look through All Games </p>
                </div>
        
                <div id="teams">
                    <h2>NBA Teams</h2>
                    <p> Find All NBA Teams or Find a Specific Team </p>
                </div>
        
                <div id="players">
                    <h2>NBA Players</h2>
                    <p> Find Specific Player or See All Players </p>
                </div>
        
                <div id="stats">
                    <h2>NBA Stats</h2>
                    <p> Compare Teams or Players according to their stats</p>
                </div>
                </div>
            </section>
        
            <section>
                <h1>Things you need to know about the 2020-21 NBA season</h1>
                <article>
                <span>
                    The NBA and the National Basketball Players Association announced on Nov.
                    9 that they’ve struck a deal on rules for the 2020-21 season, which will start on Dec. 22. On November 10, the NBA’s Board of Governors
                    approved the amended Collective Bargaining Agreement for 2020-21 by a unanimous vote, allowing the 2020-21 season to begin.
                    The NBA announced the structure and format of the 2020-21 season, including a playoff Play-In Tournament on Nov. 17.
                </span>
                <p> In anticipation of the new NBA season, here are some common questions and answers about the 2020-21 NBA season.</p>
                <p>* NBA announces structure and format for 2020-21 season</p>
                <p>* First half of 2020-21 schedule unveiled / Key dates for 2020-21 season</p>
                <p>* NBA, NBPA agree on 2020-21 season start and CBA adjustments</p>
                <p>* NBA Board of Governors approves changes to Collective Bargaining Agreement</p>
                </article>
            </section>
            
            <section id="gallery">
                <h1>Time Best Players</h1>
                <article class="gallery_img">
                <figure><a href="#Players?page=0&player=LeBron-James"><img src="resources/lebron-james.jpg"></a>
                    <figcaption><a href="https://en.wikipedia.org/wiki/LeBron_James">Lebron James</a></figcaption>
                </figure>
                </article>
                <article class="gallery_img">
                <figure><a href="#Players?page=0&player=Kevin-Durant"><img src="resources/kevin-durant.jpg"></a>
                    <figcaption><a href="https://en.wikipedia.org/wiki/Kevin_Durant">Kevin Durant</a></figcaption>
                </figure>
                </article>
                <article class="gallery_img">
                <figure><a href="#Players?page=0&player=James-Harden"><img src="resources/james-harden.jpg"></a>
                    <figcaption><a href="https://en.wikipedia.org/wiki/James_Harden">James Harden</a></figcaption>
                </figure>
                </article>
                <article class="gallery_img">
                <figure><a href=#Players?page=0&player=Stephen-Curry"><img src="resources/stephen-curry.jpg"></a>
                    <figcaption><a href="https://en.wikipedia.org/wiki/Stephen_Curry"> Stephen Curry </a></figcaption>
                </figure>
                </article>
            </section>
            </div>
        </div>
        <script src="back-js/home.js"></script>
        `;
        resolve();
    }); 
}

function loadGamesPage() {
    activate_currentpage(1);
    return new Promise(function(resolve, reject) {
        mainElement.innerHTML = `
        <section class="title">
        <h1>See All Match Histories here</h1>
    </section>
    <div class="idk">
        <div style="float: left;">
        <img src="resources/slide5.jpg">
        </div>
        <div id="games_text">
        <h1>NBA Announces Officials For The NBA Finals 2020</h1>
        <h1>September 30, 2020</h1>
        <h2><br/>NEW YORK, Sept. 30, 2020 – The NBA today announced the list of 12 referees who will officiate the NBA Finals 2020 presented by YouTube TV. The championship series between the Miami Heat and Los Angeles Lakers tips off on Wednesday, Sept. 30 at 9 p.m. ET on ABC.
            “Congratulations to this outstanding group on a well-deserved honor. A Finals assignment is the pinnacle of the prfession for our officials,” said Byron Spruell, NBA President, League Operations. “We are grateful for their dedication to the game and the sacrifices they have made during an unprecedented season.”
            Finals officials were selected by the NBA Referee Operations management team based on their performance throughout the first three rounds of the 2020 playoffs. Officials were evaluated after each round to determine advancement in this year’s postseason. <br/> <br/>
            Three of the 12 have officiated at least 10 Finals games: Foster (19), Davis (12) and Capers (10).
            The officiating roster also includes three first-time Finals referees, Tony Brown, Pat Fraher and Josh Tiven.
            NBA officials Courtney Kirkland and Kevin Scott have been assigned as Replay Center officials for The Finals 2020.
            Individual game assignments for referees are posted at NBA.com/official at approximately 9 a.m. ET each game day.</h2>
        </div>
    </div>
    <section class="title">
        <h1 id="games_list">Looking For All Games...</h1>
    </section>
    <div class="container" id="games_container"></div>
    <div class="pages">
        <a class="prev round" id="gamesPrevButton"> &#8249; </a>
        <a class="next round" id="gamesNextButton"> &#8250; </a>
    </div>
    <script src="back-js/games.js"></script>
        `;
        resolve();
    }); 
}

function loadTeamsPage() {
    activate_currentpage(2);
    return new Promise(function(resolve, reject) {
        mainElement.innerHTML = `
    <section class="title">
    <h1 id="team_profile_name"> PLAYER PROFILE - TEAM </h1>
  </section>
  <div class="team-profile">
    <article class="team-box" id="team_profile_box">
      <figure class="">
          <img id="team_profile_img" src="resources/team_default.png">
          <div class="player-info">
              <h1 id="team_details"> NBA </h1>
              <div id="team_details_div">
                <h2 id="team_city"> City:  </h2>
                <h2 id="team_conference"> Conference:  </h2>
                <h2 id="team_division"> Division:  </h2>
                <h2 id="team_full_name"> Full Name:  </h2>
                <h2 id="team_name"> Name:  </h2>
              </div>
          </div>

      </figure>

      <figure>
         <h1 id="team_players"> TEAM PLAYERS</h1>
         <div class="container" id="team_players_container"  style="display: none;"></div>
      </figure>
  
  </article>
  </div>


  <section class="title">
    <h1>See All Teams here</h1>
  </section>
 
  <div class="container" id="team_container"></div>
        `;
        resolve();
    }); 
}

function loadPlayersPage() {
    activate_currentpage(3);
    return new Promise(function(resolve, reject) {
        mainElement.innerHTML = `
        <section class="title">
        <h1 id="player_profile_name">PLAYER PROFILE - </h1>
    </section>

    <div class="player-profile" id="player_profile">
        <article class="player-box">
            <figure class="player-info-figure" style="background-color: #B0C4DE; color: black;">
                <div style="float: left;">
                <a id="profile_wiki">  <!-- href="https://en.wikipedia.org/wiki/LeBron_James">  -->
                    <img id="profile_img" src="resources/player_default.png"> <!-- src="https://nba-players.herokuapp.com/players/james/lebron">  -->
                </a>
                </div>
        
                <div class="player-info">
                    <p id="per_game"> PLAYER BASIC INFO: </p>
                    <h1 id="name"> Name: </h1>
                    <h1 id="team_acronym"> Team acronym: </h1>
                    <h1 id="team_name"> Team Full Name: </h1>
                    <h1 id="games_played"> Games Played: </h1>
                </div>
            </figure>
        
            <figure style="background-color: #B0C4DE; color: black;">
                <p class="player-per-game-h"> PLAYER PER GAME STATS: </p>
                <div class="player-per-game">
                    <div class="per-game">
                        <h1 id="minutes_per_game"> Minutes: </h1>
                        <h1 id="field_goals_attempted_per_game"> Goals attempted:</h1>
                        <h1 id="field_goals_made_per_game"> Goals made:  </h1>
                        <h1 id="field_goal_percentage"> Goals percentage: </h1>
                    </div>
            
                    <div class="per-game">
                        <h1 id="free_throw_percentage"> Throw percentage: </h1>
                        <h1 id="three_point_attempted_per_game"> Three point attempted: </h1>
                        <h1 id="three_point_made_per_game"> Three point made: </h1>
                        <h1 id="three_point_percentage"> Three point percentage: </h1>
                    </div>
            
                    <div class="per-game">
                        <h1 id="points_per_game"> Points: </h1>
                        <h1 id="offensive_rebounds_per_game"> Offensive Rebounds: </h1>
                        <h1 id="defensive_rebounds_per_game"> Defensive Rebounds: </h1>
                        <h1 id="rebounds_per_game"> Rebounds: </h1>
                    </div>
            
                    <div class="per-game">
                        <h1 id="assists_per_game"> Assists: </h1>
                        <h1 id="steals_per_game"> Steals: </h1>
                        <h1 id="blocks_per_game"> Blocks: </h1>
                        <h1 id="turnovers_per_game"> Turnovers: </h1>
                        <h1 id="player_efficiency_rating" style="font-size: 17px; font-style: oblique; color: #FF851B;"> Player efficiency rating: </h1>
                    </div>
                </div>
        
            </figure>
        
        </article>
    </div>

    <section class="title">
    <h1>See All Players here</h1>
    </section>

    <div class="container" id="players_container"></div>

    <div class="pages">
    <a class="prev round" id="playersPrevButton"> &#8249; </a>
    <a class="next round" id="playersNextButton"> &#8250; </a>
    </div>
            
        `;
        resolve();
    }); 
}

function loadStatsPage() {
    activate_currentpage(4);
    return new Promise(function(resolve, reject) {
        mainElement.innerHTML = `
        <div class="compare">
        <div class="title">
            <h1 id="compare_teams">NBA Stats - Compare Teams</h1>
            <div id="compare_teams_figure">
                <div class="cmpr_div">
                    <div id="left_corner_team"> 
                        <input class="search_input" id="leftTeamInput"type="text" placeholder="Left Corner...">
                    </div>
                    <div>
                    <button class="comapre_button" id="compareTeamsButton"> VS </button>
                    </div>
                    <div id="right_corner_team"> 
                        <input class="search_input" id="rightTeamInput"type="text" placeholder="Right Corner...">
                    </div>
                </div>
                <h2 class="compare_result">THE WINNER</h2>
                <h2 class="compare_result">IS</h2>
                <h1 class="compare_result" id="winner_team"> ... </h1>

                <div id="team_results">
                    <div id="left_team_result" class="team_result">
                    <img id="left_team_profile_img" style="border: 3px solid red;">
                    <h1 id="left_team_abv" style="color: red;"> </h1>
                    <h2 id="left_field_goals_attempted_per_game"> Goals attempted:</h2>
                    <h2 id="left_field_goals_made_per_game"> Goals made:  </h2>
                    <h2 id="left_field_goal_percentage"> Goals percentage: </h2>
        
                    <h2 id="left_free_throw_percentage"> Throw percentage: </h2>
                    <h2 id="left_three_point_attempted_per_game"> Three point attempted: </h2>
                    <h2 id="left_three_point_made_per_game"> Three point made: </h2>
                    <h2 id="left_three_point_percentage"> Three point percentage: </h2>
        
                    <h2 id="left_points_per_game"> Points: </h2>
                    <h2 id="left_offensive_rebounds_per_game"> Offensive Rebounds: </h2>
                    <h2 id="left_defensive_rebounds_per_game"> Defensive Rebounds: </h2>
                    <h2 id="left_rebounds_per_game"> Rebounds: </h2>
        
                    <h2 id="left_assists_per_game"> Assists: </h2>
                    <h2 id="left_steals_per_game"> Steals: </h2>
                    <h2 id="left_blocks_per_game"> Blocks: </h2>
                    <h2 id="left_turnovers_per_game"> Turnovers: </h2>
                    <h2 id="left_team_efficiency_rating" style="font-style: oblique"> Team efficiency rating: </h2>
                </div>
                
                <div id="right_team_result" class="team_result">
                    <img id="right_team_profile_img"  style="border: 3px solid blue;">
                    <h1 id="right_team_abv" style="color: blue;"> </h1>
                    <h2 id="right_field_goals_attempted_per_game"> Goals attempted:</h2>
                    <h2 id="right_field_goals_made_per_game"> Goals made:  </h2>
                    <h2 id="right_field_goal_percentage"> Goals percentage: </h2>
        
                    <h2 id="right_free_throw_percentage"> Throw percentage: </h2>
                    <h2 id="right_three_point_attempted_per_game"> Three point attempted: </h2>
                    <h2 id="right_three_point_made_per_game"> Three point made: </h2>
                    <h2 id="right_three_point_percentage"> Three point percentage: </h2>
        
                    <h2 id="right_points_per_game"> Points: </h2>
                    <h2 id="right_offensive_rebounds_per_game"> Offensive Rebounds: </h2>
                    <h2 id="right_defensive_rebounds_per_game"> Defensive Rebounds: </h2>
                    <h2 id="right_rebounds_per_game"> Rebounds: </h2>
        
                    <h2 id="right_assists_per_game"> Assists: </h2>
                    <h2 id="right_steals_per_game"> Steals: </h2>
                    <h2 id="right_blocks_per_game"> Blocks: </h2>
                    <h2 id="right_turnovers_per_game"> Turnovers: </h2>
                    <h2 id="right_team_efficiency_rating" style="font-style: oblique;"> Team efficiency rating: </h2>
                </div>
                </div>
                
            </div>
        </div>

        <div class="title">
            <h1 id="compare_players">NBA Stats - Compare Players</h1>
            <div id="compare_players_figure">
                <div class="cmpr_div">
                <div id="left_corner_player"> 
                    <input class="search_input" id="leftPlayerInput"type="text" placeholder="Left Corner...">
                </div>
                <div>
                    <button class="comapre_button" id="comparePlayersButton"> VS </button>
                </div>
                <div id="right_corner_player"> 
                    <input class="search_input" id="rightPlayerInput"type="text" placeholder="Right Corner...">
                </div>
                </div>
                <h2 class="compare_result">THE WINNER</h2>
                <h2 class="compare_result">IS</h2>
                <h1 class="compare_result" id="winner_player"> ... </h1>

                <div id="player_results">
                <div id="left_player_result" class="player_result">
                    <img id="left_player_profile_img">
                    <h1 id="left_player_abv" style="color: red;"> </h1>
                    <h2 id="left_player_field_goals_attempted_per_game"> Goals attempted:</h2>
                    <h2 id="left_player_field_goals_made_per_game"> Goals made:  </h2>
                    <h2 id="left_player_field_goal_percentage"> Goals percentage: </h2>
        
                    <h2 id="left_player_free_throw_percentage"> Throw percentage: </h2>
                    <h2 id="left_player_three_point_attempted_per_game"> Three point attempted: </h2>
                    <h2 id="left_player_three_point_made_per_game"> Three point made: </h2>
                    <h2 id="left_player_three_point_percentage"> Three point percentage: </h2>
        
                    <h2 id="left_player_points_per_game"> Points: </h2>
                    <h2 id="left_player_offensive_rebounds_per_game"> Offensive Rebounds: </h2>
                    <h2 id="left_player_defensive_rebounds_per_game"> Defensive Rebounds: </h2>
                    <h2 id="left_player_rebounds_per_game"> Rebounds: </h2>
        
                    <h2 id="left_player_assists_per_game"> Assists: </h2>
                    <h2 id="left_player_steals_per_game"> Steals: </h2>
                    <h2 id="left_player_blocks_per_game"> Blocks: </h2>
                    <h2 id="left_player_turnovers_per_game"> Turnovers: </h2>
                    <h2 id="left_player_efficiency_rating" style="font-style: oblique"> Team efficiency rating: </h2>
                </div>
                
                <div id="right_player_result" class="player_result">
                    <img id="right_player_profile_img" >
                    <h1 id="right_player_abv" style="color: blue;"> </h1>
                    <h2 id="right_player_field_goals_attempted_per_game"> Goals attempted:</h2>
                    <h2 id="right_player_field_goals_made_per_game"> Goals made:  </h2>
                    <h2 id="right_player_field_goal_percentage"> Goals percentage: </h2>
        
                    <h2 id="right_player_free_throw_percentage"> Throw percentage: </h2>
                    <h2 id="right_player_three_point_attempted_per_game"> Three point attempted: </h2>
                    <h2 id="right_player_three_point_made_per_game"> Three point made: </h2>
                    <h2 id="right_player_three_point_percentage"> Three point percentage: </h2>
        
                    <h2 id="right_player_points_per_game"> Points: </h2>
                    <h2 id="right_player_offensive_rebounds_per_game"> Offensive Rebounds: </h2>
                    <h2 id="right_player_defensive_rebounds_per_game"> Defensive Rebounds: </h2>
                    <h2 id="right_player_rebounds_per_game"> Rebounds: </h2>
        
                    <h2 id="right_player_assists_per_game"> Assists: </h2>
                    <h2 id="right_player_steals_per_game"> Steals: </h2>
                    <h2 id="right_player_blocks_per_game"> Blocks: </h2>
                    <h2 id="right_player_turnovers_per_game"> Turnovers: </h2>
                    <h2 id="right_player_efficiency_rating" style="font-style: oblique;"> Team efficiency rating: </h2>
                </div>
            </div>
            </div>
        </div>
    </div>

    <div class="title">
    <h1> All Teams </h1>
    <div id="all_teams_container"></div>
    <h1> All Players </h1>
    <div id="all_players_container"></div>
    </div>
        `;
        resolve();
    }); 
}

function responsive() {
    var nav = document.getElementById("headerNavBar");
    if (nav.className === "headernav") {
      nav.className += " responsive";
    } else {
      nav.className = "headernav";
    }
};

document.getElementById('responsive_icon').addEventListener('click', responsive);
