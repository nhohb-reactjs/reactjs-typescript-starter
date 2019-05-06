import * as React from "react";

export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
  render() {
    return (
      <div>
        <img alt="header" src="images/header.jpg" className="app-header" />

        <p>
          We are a most promising species, Mr. Spock, as predators go. Did you know that? I frequently
          have my doubts. I dont. Not any more. And maybe in a thousand years or so, we will be able
          to prove it.
        </p>
        <p>- Captain Kirk</p>
      </div>
    );
  }
}