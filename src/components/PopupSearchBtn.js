import React, { Component, Fragment } from 'react'
import { X } from 'react-feather'
import { navigate } from 'gatsby'

import './PopupSearchBtn.css'
import SVGIcon from './SVGIcon'
import { CSSTransition } from 'react-transition-group'

class PopupSearchBtn extends Component {
  constructor(props) {
    super(props)
    this.state = { showDom: false, showCss: false, searchWord: '' }
  }

  togglePopup() {
    const delayState = () => this.setState({ showDom: !this.state.showDom })
    this.setState({ showCss: !this.state.showCss })
    Boolean(this.state.showDom) ? setTimeout(delayState, 300) : delayState()
  }

  toggleAndSearch() {
    this.togglePopup()

    const url = window.location.href
      .replace(window.location.origin, '')
      .split('?')[0]
    navigate(`${url}?s=${this.state.searchWord}`)
  }

  setSearchWord(word) {
    this.setState({
      searchWord: word
    })
  }

  componentDidMount(){
  }

  render() {
    return (
      <Fragment>
        <div className="taCenter" onClick={this.togglePopup.bind(this)}>
          <SVGIcon src='/images/icon-search.svg' size={3} />
        </div>

        <CSSTransition in={this.state.showCss} timeout={300} classNames="Popup--transition">
          {this.state.showDom ? (
            <div className="Popup-Overlay">
              <div
                className="Popup-Background"
                onClick={this.togglePopup.bind(this)}
              />
              <div className="Popup-Inner">
                <X className="Popup-Close" stroke="white" onClick={this.togglePopup.bind(this)} />
                <div style={{display: 'inline-flex'}}>
                  <input type="text"
                         ref={(input) => { this.nameInput = input; }}
                         value={this.state.searchWord}
                         placeholder="記事を検索する"
                         onChange={e => this.setSearchWord(e.target.value)}
                         onKeyDown={e => {
                           if (e.keyCode === 13) {
                             this.toggleAndSearch()
                           }
                         }}
                  />
                  <SVGIcon src='/images/icon-search.svg' size={3} onClick={this.toggleAndSearch.bind(this)} />
                </div>
              </div>
            </div>
          ) : <div/>}
        </CSSTransition>
      </Fragment>
    )
  }
}
export default PopupSearchBtn
