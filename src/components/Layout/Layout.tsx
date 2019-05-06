import * as React from "react";

import './Layout.scss';

interface Props {
  className?: string;
}
interface State { }

export class Layout extends React.Component<Props, State> {
  render() {
    const {
      children,
      className = '',
    } = this.props;

    return (
      <div className={['Layout', className].join(' ')}>
        Layout

        {children}
      </div>
    );
  }
}
