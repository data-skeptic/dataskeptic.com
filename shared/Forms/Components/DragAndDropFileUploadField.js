import React, { Component } from "react"
import Dropzone from "react-dropzone"
import styled, { css } from "styled-components"

const Icon = name => <i className={`glyphicon glyphicon-${name}`} />

const DefaultIcon = () => <Icon name="file" />
const UploadedIcon = () => <Icon name="ok-sign" />
const ErrorIcon = () => <Icon name="remove-sign" />

const formatAccept = accept => {
  return accept
    .split(",")
    .map(rule => "." + rule.split("/")[1])
    .join(",")
}

export default class DragAndDropFileUploadField extends Component {
  static defaultProps = {
    title: `Drop or Upload files here`,
    uploadedTitle: `Uploaded`,
    single: false,
    accept: "",
    icon: DefaultIcon,
    uploadedIcon: UploadedIcon,
    errorIcon: ErrorIcon,
    bucket: null
  }
  state = {
    files: this.props.input.value || [],
    error: null
  }
  handleDrop = files => {
    let accept = true,
      error = null

    if (this.props.onDrop) {
      const checkResult = this.props.onDrop(files)
      accept = checkResult.accept
      error = checkResult.error
    }

    if (accept) {
      this.setFiles(files)
    } else {
      this.setError(error)
    }
  }
  setFiles = files => this.setState({ files })
  setError = error => this.setState({ error })
  isFileUploaded = () => this.state.files.length > 0

  componentWillRecieveProps(nextProps) {
    if (this.props.files !== nextProps.files) {
      this.setFiles(nextProps.files)
    }
  }

  renderAccepted() {
    const { accept } = this.props
    return <span>Accept {formatAccept(accept)}</span>
  }

  renderUploaded() {
    return <span>Uploaded</span>
  }

  render() {
    const { error } = this.state
    const {
      title,
      uploadedTitle,
      single,
      accept,
      icon,
      uploadedIcon,
      errorIcon
    } = this.props
    const uploaded = this.isFileUploaded()

    const IconComponent = icon
    let stateTitle = uploaded ? uploadedTitle : title
    return (
      <Wrapper
        activeClassName="active"
        accept={accept}
        onDrop={this.handleDrop}
        error={error}
        upload={uploaded}
      >
        <Inner>
          <IconArea>
            <IconComponent />
          </IconArea>
          <Details>
            <Title>{error ? error : stateTitle}</Title>
            <SubTitle>
              {uploaded ? this.renderUploaded() : this.renderAccepted()}
            </SubTitle>
          </Details>
        </Inner>
      </Wrapper>
    )
  }
}

const active = css`
  background-color: #f4faee;
  border-color: #5fb402;
  border-style: dotted;
  color: #5fb402;
`

const Wrapper = styled(Dropzone)`
  display: flex;
  min-height: 120px;
  background-color: #fff;
  border: 1px dashed #d7d9d9;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &.active {
    ${active};
  }
  
  ${props => props.uploaded && `
    ${active}
  `};

  ${props => props.error && `
    color: #ff2730;
    background-color: #fff0f0;
  `} 
`

const Inner = styled.div`
  display: flex;
  padding: 0px 4%;
  align-items: center;
  flex-grow: 1;
`

const center = css`
  height: 60px;
  justify-content: center;
  align-items: center;
`

const IconArea = styled.div`
  ${center} width: 60px;
  font-size: 44px;
  display: flex;
  margin-right: 8px;

  * {
    max-width: 100%;
    max-height: 100%;
  }
`

const Details = styled.div`
  ${center};
`

const Title = styled.div`
  font-size: 22px;
  font-weight: 400;
`

const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
`
