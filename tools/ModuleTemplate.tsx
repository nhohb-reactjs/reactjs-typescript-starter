import * as React from "react";

import './ModuleTemplate.scss';

interface Props { }
interface State { }

export class ModuleTemplate extends React.Component<Props, State> {
  render() {
    return (
      <div className="#className">
        ModuleTemplate
      </div>
    );
  }
}
