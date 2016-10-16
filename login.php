

<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>
  <title>Traverlers' Fate</title>

  <!-- CSS  -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection"/>
  <link href="css/style.css" type="text/css" rel="stylesheet" media="screen,projection"/>
</head>
<body>
  <nav class="light-blue lighten-1" role="navigation">
    <div class="nav-wrapper container"><a id="logo-container" href="#" class="brand-logo">Logo</a>
      <ul class="right hide-on-med-and-down">
        <li><a href="logout.php">Logout</a></li>
      </ul>

      <ul id="nav-mobile" class="side-nav">
        <li><a href="logout.php">Logout</a></li>
      </ul>
      <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">menu</i></a>
    </div>
  </nav>

  <!-- <div class="col s12 m7"> 
    <h2 class="header">Horizontal Card</h2>
    <div class="card horizontal">
      <div class="card-image">
        <img src="http://lorempixel.com/100/190/nature/6">
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <p>
            <form name="login" action="checkLogin.php" method="post">
              <input type="text" name="User" placeholder="User" required>
              <input type="password" name="Password" placeholder="Password" required>
              <checkbox aria-label="Remember Me" >
                Remember Me
              </checkbox>                 
              <button class="btn waves-effect waves-light" type="submit" name="action">Login
                <i class="material-icons right">send</i>
              </button>
             
            </form>
            </md-card-content>
              <a class="waves-effect waves-teal btn-flat">Sign Up</a>
              <a class="waves-effect waves-teal btn-flat">Forgot Password</a>
            </div>
          </p>
        </div>
        <div class="card-action">
          <a href="#"></a>
         
        </div>
      </div>
    </div>
  </div> -->
  <main>
    <center>
      <div class="section"></div>

      <h5 class="indigo-text">Please, login into your account</h5>
      <div class="section"></div>

      <div class="container">
        <div class="z-depth-1 grey lighten-4 row" style="display: inline-block; padding: 32px 48px 0px 48px; border: 1px solid #EEE;">

          <form class="col s12" name="login" action="checkLogin.php" method="post">
            <div class='row'>
              <div class='col s12'>
              </div>
            </div>

            <div class='row'>
              <div class='input-field col s12 special-left'>
                <input type='text' name='User' id='user' required/>
                <label for='user'>Enter your username</label>
              </div>
            </div>

            <div class='row'>
              <div class='input-field col s12 special-left'>
                <input type='password' name='Password' id='password' required/>
                <label for='password'>Enter your password</label>
              </div>
              <label style='float: right;'>
                <a class='secondary-text-color' href='resetPassword.php'><b>Forgot Password?</b></a>
              </label>
            </div>

            <br />
            <center>
              <?php echo "<p>".$_REQUEST['err']."</p>" ?>
              <div class='row'>
                <button type='submit' name='btn_login' class='col s12 btn btn-large waves-effect default-primary-color'>Login</button>
              </div>
            </center>
          </form>
        </div>
      </div>
      <a class="waves-effect waves-cyan btn-flat" href="signup.php">CREATE ACCOUNT</a>

    </center>
  </main>

  <footer class="page-footer orange">
    <div class="container">
      <div class="row">
        <div class="col l6 s12">
          <h5 class="white-text">Company Bio</h5>
          
        </div>
        <div class="col l3 s12">
          <h5 class="white-text">Settings</h5>
          <ul>
            <li><a class="white-text" href="#!">Link 1</a></li>
            <li><a class="white-text" href="#!">Link 2</a></li>
            <li><a class="white-text" href="#!">Link 3</a></li>
            <li><a class="white-text" href="#!">Link 4</a></li>
          </ul>
        </div>
        <div class="col l3 s12">
          <h5 class="white-text">Connect</h5>
          <ul>
            <li><a class="white-text" href="#!">Link 1</a></li>
            <li><a class="white-text" href="#!">Link 2</a></li>
            <li><a class="white-text" href="#!">Link 3</a></li>
            <li><a class="white-text" href="#!">Link 4</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <div class="container">
      Made by <a class="orange-text text-lighten-3" href="http://materializecss.com">Materialize</a>
      </div>
    </div>
  </footer>


  <!--  Scripts-->
  <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
  <script src="js/materialize.js"></script>
  <script src="js/init.js"></script>

  </body>
</html>