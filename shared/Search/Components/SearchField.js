import React, { Component } from 'react'

class SearchField extends Component {
  initRef = ref => (this.input = ref)
  handleChange = e => {
    const { immediate, onChange } = this.props
    const value = e.target.value
    this.setState({ value })

    if (immediate) {
      onChange(value)
    }
  }
  handleKeyDown = e => {
    const { onChange } = this.props
    if (e.keyCode === 13) {
      onChange(this.state.value)
    }
  }
  renderLoader = () => (
    <div className="search-field-container__input-loader">
      <img
        src={`/img/${
          this.props.transparent ? 'spinner' : 'search-spinner'
        }.gif`}
      />
    </div>
  )

  constructor() {
    super()

    this.state = {
      value: ''
    }
  }

  onFocus() {
    this.input.focus()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value })
    }
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.props.autoFocus && this.onFocus()
    }

    this.state.value = this.props.value
  }

  render() {
    const { value } = this.state
    const { loading, placeholder = 'Search' } = this.props

    return (
      <div className="search-field-container-input-wrapper">
        <input
          ref={this.initRef}
          value={value}
          placeholder={placeholder}
          type="text"
          className="search-field-container__input"
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        {loading && this.renderLoader()}
      </div>
    )
  }
}

export default SearchField
