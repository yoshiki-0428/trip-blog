import React, { Component, Fragment } from 'react'
import { X } from 'react-feather'
import { navigate } from 'gatsby'

import './PopupSearchBtn.css'
import SVGIcon from './SVGIcon'

class PopupSearchBtn extends Component {
  constructor(props) {
    super(props)
    this.state = { showPopup: false, searchWord: '' }
    this.nameInput.focus();
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    })
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
    this.nameInput.focus();
  }

  render() {
    return (
      <Fragment>
        <div className="taCenter" onClick={this.togglePopup.bind(this)}>
          <SVGIcon src='/images/icon-search.svg' size={3} />
        </div>

        {this.state.showPopup ? (
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
        ) : null}
      </Fragment>
    )
  }
}
export default PopupSearchBtn
