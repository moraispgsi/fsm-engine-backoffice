import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    document.getElementsByTagName('BODY')[0].className = 'hold-transition lockscreen';
  }
  render() {
    return (
      <div className="lockscreen-wrapper">
        <div className="lockscreen-logo">
          <a href="/"><b>Admin</b>SBCS</a>
        </div>
        <div className="lockscreen-name">Ricardo Morais</div>
        <div className="lockscreen-item">
          <div className="lockscreen-image">
            <img src="public/dist/img/user1-128x128.jpg" alt="User profile" />
          </div>
          <form className="lockscreen-credentials">
            <div className="input-group">
              <input type="password" className="form-control" placeholder="password" />
              <div className="input-group-btn">
                <button type="button" className="btn"><i className="fa fa-arrow-right text-muted" /></button>
              </div>
            </div>
          </form>
        </div>
        <div className="help-block text-center">
          Enter your password to retrieve your session
        </div>
        <div className="text-center">
          <a href="login.html">Or sign in as a different user</a>
        </div>
        <div className="lockscreen-footer text-center">
          Copyright &copy; 2014-2016 <b><a href="https://adminlte.io" className="text-black">Almsaeed Studio</a></b><br />
          All rights reserved
        </div>
      </div>
    );
  }
}

export default Login;
