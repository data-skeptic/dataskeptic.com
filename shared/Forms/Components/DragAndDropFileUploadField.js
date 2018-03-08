import React, { Component } from "react"
import Dropzone from "react-dropzone"
import styled, { css } from "styled-components"
import Request from "../../Request";

const Icon = ({ name }) => <i className={`glyphicon glyphicon-${name}`} />

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
    accept: null,
    icon: DefaultIcon,
    uploadedIcon: UploadedIcon,
    errorIcon: ErrorIcon,
    bucket: null
  }

  state = {
    files: this.props.input.value || [],
    rejectedFiles: [],
    error: false
  }
  
  upload = (files) => {
    const {bucket} = this.props.bucket
    const url = `/api/v1/files/upload?bucket=${bucket}`
    
    this.setError(null)
    return Request.upload(url, files)
  }
  
  handleDrop = (acceptedFiles = [], rejectedFiles = []) => {
    if (this.props.onDrop) {
      const checkResult = this.props.onDrop(acceptedFiles)
      acceptedFiles = checkResult.acceptedFiles
      rejectedFiles.concat(checkResult.rejectedFiles)
    }
  
    this.setRejectedFiles(rejectedFiles)
    
    this.upload(acceptedFiles)
      .then(() => this.setFiles(acceptedFiles))
      .catch((err) => this.setError(err))
  }

  setFiles = files => this.setState({ files })

  setRejectedFiles = rejectedFiles => this.setState({ rejectedFiles })
  
  setError = error => this.setState({ error })

  isFileUploaded = () => this.state.files.length > 0

  componentWillReceiveProps(nextProps) {
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
    const { files, rejectedFiles, error } = this.state
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

    const IconComponent = error ? errorIcon : uploaded ? uploadedIcon : icon
    return (
      <Wrapper
        activeClassName="active"
        accept={accept}
        onDrop={this.handleDrop}
        upload={uploaded}
      >
        <Inner>
          <IconArea>
            <IconComponent />
          </IconArea>
          <Details>
            <Title>{uploaded ? uploadedTitle : title}</Title>
            <SubTitle>
              {uploaded ? this.renderUploaded() : this.renderAccepted()}
            </SubTitle>
            <Error>
              <code>{JSON.stringify(files)}</code>
              <code>{JSON.stringify(rejectedFiles)}</code>
            </Error>
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

  ${props =>
    props.uploaded &&
    `
    ${active}
  `};
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

const Error = styled.div`
  color: #ff2730;
`

const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
`
