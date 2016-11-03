<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>
  <title>Travelers' Fate</title>

  <!-- CSS  -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection"/>
  <link href="css/style.css" type="text/css" rel="stylesheet" media="screen,projection"/>
</head>
<body>
  <nav class="light-blue lighten-1--" role="navigation">
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

  <main>
    <center>
      <div class="section"></div>
      <div class="section"></div>

      <div class="container">
        <div class="z-depth-1 grey lighten-4 row" style="display: inline-block; padding: 32px 48px 0px 48px; border: 1px solid #EEE;">

          <form class="col s12" name="login" action="checkLogin.php" method="post">
            <div class='row'>
              <div class='col s12'>
                 <h5 class="primary-text-color">Please, login into your account</h5>
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
                <a class='accent-text-color' href='resetPassword.php'><b>Forgot Password</b></a>
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
      <a class="waves-effect btn-flat" href="signup.php">CREATE ACCOUNT</a>

    </center>
  </main>

  <footer class="page-footer orange">
    <div class="footer-copyright">
      <div class="container">
      Copyright <a href="www.criticalfuturistics.com">Critical Futuristics</a> 2016
      </div>
    </div>
  </footer>


  <!--  Scripts-->
  <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
  <script src="js/materialize.js"></script>
  <script src="js/init.js"></script>

  </body>
</html>