import * as React from "react";
import { Link } from 'react-router-dom';

import Redux from 'src/redux';

import './Login.scss';
import { PropsBase, ReduxPropKeys } from 'src/types/PropsBase';

export interface Props extends PropsBase {

}

class Login extends React.Component<Props, {}> {
  render() {
    console.log('this.props', this.props)

    return (
      <div className="login">
        <h1>Login</h1>
        <Link to="/sign-up">Sign Up</Link>
      </div>
    );
  }
}

const mapStateToProps = Redux.getStates([ReduxPropKeys.REQUEST_REDUCERS]);
console.log('mapStateToProps', mapStateToProps)
export default Redux.connect(mapStateToProps, null)(Login);