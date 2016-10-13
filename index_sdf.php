<?php
/* Serve per aprire la sessione. Prima di questa istruzione, non va stampato niente, neanche i commenti html */
session_start();
/*Qui controlliamo se siamo gia loggati oppure no, con la stessa modalita usata nella pagina controllo.php
Nel caso si è loggati, compare un link per la pagina di logout, in caso contrario appare il form per l'inserimento dei dati */
if($_SESSION['authorized'] == 0){
    header("location: login.php");
} else { ?>

<!-- Passing the username expressed in the login -->
<script> var user = '<?php echo $_SESSION["user"]; ?>'</script>
<script> var save = '<?php echo $_SESSION["save"]; ?>'</script>

<html lang="en" ng-app="app" ng-controller="mainController">
<head>
  <meta name="Game" content="content" charset="UTF-8">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">  <!-- Importing Google Icons -->
  <!-- Angular Material style sheet -->
  <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/angular_material/1.0.4/angular-material.min.css">
  <link rel="stylesheet" href="css/style.css">
  <!-- load MUI just for Tables, not yet implemented in md-ajs -->
  <link href="//cdn.muicss.com/mui-0.4.6/css/mui.min.css" rel="stylesheet" type="text/css" />
  <script src="//cdn.muicss.com/mui-0.4.6/js/mui.min.js"></script>
</head>
<body layout="row" ng-controller="navController" ng-cloak>

<!-- ------------------------------------------ Sidenav ---------------------------------------------- -->

  <header>

    <md-sidenav  layout="column" class="md-sidenav-left" md-component-id="left" md-is-locked-open="$mdMedia('(min-width: 769px)')" layout-fill>
      <md-toolbar layout="row">
        <div class="md-toolbar-tools md-hue-2">
          <h2>  </h2>
          <span flex></span>
        </div>
      </md-toolbar> 


      <md-content layout-padding="">
        <md-list>
         
          <span ng-repeat="item in strings.menu">

            <md-list-item md-ink-ripple ng-click="changeSelectedMenu(item.index)">
              <md-icon class="md-default-theme" class="material-icons">{{item.icon}}</md-icon>
              <p>{{item.title}}</p>
            </md-list-item>
          </span>

          <md-divider></md-divider>
          <md-subheader>Others</md-subheader>

          <span ng-repeat="item in strings.menuOther">

            <md-list-item md-ink-ripple ng-click="changeSelectedMenu(item.index)">
              <md-icon class="md-default-theme" class="material-icons">{{item.icon}}</md-icon>
              <p>{{item.title}}</p>
            </md-list-item>
          </span>
        </md-list>

      </md-content> 

    </md-sidenav>

  </header>


<!-- ------------------------------------------ Main ---------------------------------------------- -->  

<div layout="column" class="relative" layout-fill role="main">
  <md-toolbar>  
    <div layout="column" layout-align="start end" class="md-toolbar-tools">
      <md-button class="md-icon-button" aria-label="Settings" ng-click="openSideNavPanel()" ng-hide="$mdMedia('(min-width: 769px)')">
        <md-icon> <i class="material-icons">menu</i></md-icon>
      </md-button>
        <h2> {{title}} </h2>
      <span flex></span>
      <span> {{currency}}  {{moneyText}} </span> &nbsp;&nbsp;&nbsp; <span flex="10" class="smallText"> {{currency}} {{income}} /s</span>
      
      <md-button class="md-icon-button" aria-label="More" ng-click="showSettings($event)">
        <md-icon> <i class="material-icons">settings</i></md-icon>
      </md-button>
    </div>
  </md-toolbar>

  <md-content flex md-scroll-y>

      <ui-view layout="column" layout-fill layout-padding>
        <ng-switch on="selectedMenu" class="tabpanel-container">
          <div ng-switch-when="0">
            <div>
              <ng-include src="'view/game.view.html'" class="slide-animate" ></ng-include>

            </div>


          </div>
          <div ng-switch-when="1">
            
            <ng-include src="'view/office.view.html'"></ng-include>

          </div>

          <div ng-switch-when="2">
            
            <ng-include src="'view/bank.view.html'"></ng-include>

          </div>

          <div ng-switch-when="3">

            <ng-include src="'view/hackers.view.html'"></ng-include>

          </div>

          <div ng-switch-when="4">
            <h2> No Achievements! </h2>
            <p> No achievements have been added yet, come back another time </p>
          </div>
          

          <div ng-switch-when="5">
            <h2> No secrets! </h2>
            <p> No secrets have been unlocked yet, come back another time </p>
          </div>
        </ng-switch>
        
      </ui-view>

  </md-content>
</div>








<!-- ------------------------------------------ Imports ------------------------------------------------>

  
  <!-- Angular Material requires Angular.js Libraries -->
 


  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-animate.min.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-aria.min.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-messages.min.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-route.min.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-resource.min.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.min.js"></script>
  <script src="https://cdn.jsdelivr.net/angular-material-icons/0.6.0/angular-material-icons.min.js"></script>

  <!-- Angular Material Library -->
  <script src="http://ajax.googleapis.com/ajax/libs/angular_material/1.0.4/angular-material.min.js"></script>

  <!-- External Dependencies -->
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.2.2/Chart.bundle.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.2.2/Chart.js"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/angular.chartjs/latest/angular-chart.min.js"></script>

  <!-- Loads the Module and the Controllers -->
  <script src="data/gameInfo.js"></script>
  <script src="modules/app.js"></script> 


  
</body>
</html>
<?php } ?>