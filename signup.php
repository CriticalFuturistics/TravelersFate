

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
 
<!-- ------------------------------------------ Main ---------------------------------------------- -->  

<div layout="column" class="relative" layout-fill role="main">
  <md-toolbar>  
    <div layout="column" layout-align="start end" class="md-toolbar-tools">
      <h2> Material Money </h2>
      <span flex></span>      
      <md-button class="md-icon-button" aria-label="More">
        <md-icon> <i class="material-icons">settings</i></md-icon>
      </md-button>
    </div>
  </md-toolbar>

  <md-content flex md-scroll-y>

    <md-content layout="row" layout-align="center center">
          <md-card flex="30">
            <md-toolbar>
                <h2 style="padding-left:10px">Sign Up</h2>
                <span flex></span>
              </md-toolbar>
            <md-card-content>
              <form name="signup">

                <md-input-container class="md-form-input">
                  <label>Email</label>
                  <input type="email" required>
                </md-input-container>

                <md-input-container class="md-form-input">
                  <label>Username</label>
                  <input type="text" required>
                </md-input-container>
              
                <md-input-container class="md-form-input">
                  <label>Password</label>
                  <input type="password" required>
                </md-input-container>

                <md-input-container>
                  <md-button class="md-raised md-primary" type="submit" name="submit" value="">Sign Up</md-button>
                </md-input-container>

              </form>
              
            </md-card-content>
           
            <div class="md-actions" layout="row|column" layout-align="start|end|center start|end|center">
               <md-button href="login.php">Login</md-button>
                              
             </div>
          </md-card>
          
    </md-content>



  </md-content>
</div>




<!-- ------------------------------------------ Imports ------------------------------------------------>

  
  <!-- Angular Material requires Angular.js Libraries -->
 


  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-animate.min.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-aria.min.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-messages.min.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-route.min.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.min.js"></script>
  <script src="https://cdn.jsdelivr.net/angular-material-icons/0.6.0/angular-material-icons.min.js"></script>

  <!-- Angular Material Library -->
  <script src="http://ajax.googleapis.com/ajax/libs/angular_material/1.0.4/angular-material.min.js"></script>

  <!-- Loads the Module and the Controllers -->
  <script src="data/gameInfo.js"></script>
  <script src="modules/app.js"></script> 

  
</body>
</html>