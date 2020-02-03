import React from 'react';

export default class IframlyComponent extends React.Component {
  // 記事ページから古い記事に遷移したときにもロードされるようにする
  componentDidMount () {
    if (window.iframely) {
      window.iframely.load();
    }
  }

  render() {
    return (
      <div/>
    );
  }
}
