import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    document.getElementsByTagName('BODY')[0].className = 'hold-transition register-page ';
  }
  render() {
    return (
      <div className="register-box">
        <div className="register-logo">
          <a href="/"><b>Admin</b>SCBS</a>
        </div>
        <div className="register-box-body">
          <p className="login-box-msg">Register a new membership</p>
          <form action="../../index.html" method="post">
            <div className="form-group has-feedback">
              <input type="text" className="form-control" placeholder="Orchestration server URL" />
              <span className="glyphicon glyphicon-globe form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input type="text" className="form-control" placeholder="Full name" />
              <span className="glyphicon glyphicon-user form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input type="email" className="form-control" placeholder="Email" />
              <span className="glyphicon glyphicon-envelope form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input type="password" className="form-control" placeholder="Password" />
              <span className="glyphicon glyphicon-lock form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input type="password" className="form-control" placeholder="Retype password" />
              <span className="glyphicon glyphicon-log-in form-control-feedback" />
            </div>
            <div className="row">
              <div className="col-xs-8">
                <div className="checkbox icheck">
                  <label htmlFor="rememberme" />
                  <input style={{ marginLeft: 0, position: 'static' }} id="rememberme" type="checkbox" /> Remember Me
                </div>
              </div>
              <div className="col-xs-4">
                <button type="submit" className="btn btn-primary btn-block btn-flat">Register</button>
              </div>
            </div>
          </form>
          <div className="social-auth-links text-center">
            <p>- OR -</p>
            <a href="" className="btn btn-block btn-social btn-facebook btn-flat"><i className="fa fa-facebook" /> Sign up using
              Facebook</a>
            <a href="" className="btn btn-block btn-social btn-google btn-flat"><i className="fa fa-google-plus" /> Sign up using
              Google+</a>
          </div>
          <a href="login.html" className="text-center">I already have a membership</a>
        </div>
      </div>
    );
  }
}

export default Register;
