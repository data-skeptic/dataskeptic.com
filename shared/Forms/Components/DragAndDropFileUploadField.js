import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import _ from 'lodash'
import styled, { css, keyframes } from 'styled-components'
import Request from '../../Request'
import FilePreview from './FilePreview'

const Icon = ({ name, ...rest }) => (
  <StateIcon {...rest} className={`glyphicon glyphicon-${name}`} />
)

const DefaultIcon = () => <Icon name="file" />
const UploadedIcon = () => <Icon name="ok-sign" />
const UploadingIcon = () => <Icon name="refresh" rotate />
const ErrorIcon = () => <Icon name="remove-sign" />
const RemoveIcon = () => <Icon name="trash" />

const formatAccept = accept => {
  return accept
    .split(',')
    .map(rule => '*.' + rule.split('/')[1])
    .join(', ')
}

export default class DragAndDropFileUploadField extends Component {
  static defaultProps = {
    accept: null,
    bucket: null,
    multi: false,
    prefix: '',
    empty: {
      title: `Drop or Upload files here`,
      icon: DefaultIcon
    },
    uploading: {
      title: `Uploading...`,
      icon: UploadingIcon
    },
    uploaded: {
      title: `Uploaded`,
      icon: UploadedIcon
    },
    error: {
      title: `Error`,
      icon: ErrorIcon
    }
  }

  state = {
    files: this.parseValue(this.props.input.value),
    rejectedFiles: [],
    error: null,
    uploading: false
  }

  handleDrop = async (acceptedFiles = [], uploadRejectedFiles = []) => {
    const { rejectedFiles } = this.state
    uploadRejectedFiles = uploadRejectedFiles.concat(rejectedFiles)

    if (this.props.onDrop) {
      const checkResult = await this.props.onDrop(acceptedFiles)
      acceptedFiles = checkResult.acceptedFiles
      uploadRejectedFiles = uploadRejectedFiles.concat(
        checkResult.rejectedFiles
      )
    }

    this.setRejectedFiles(uploadRejectedFiles)

    if (acceptedFiles.length === 0) return

    this.setError(null)
    this.setUploading(true)

    if (!this.props.multi) {
      this.reset()
    }

    return this.upload(acceptedFiles)
      .then(files => {
        const nextFiles = this.props.multi
          ? this.state.files.concat(files)
          : files

        this.setFiles(nextFiles)
        this.setUploading(false)
      })
      .catch(err => {
        console.dir(err.data)
        this.setError(
          `Server error, please contact kyle@dataskeptic.com for support`
        )
        this.setUploading(false)
      })
  }

  setFiles = (files, notify = true) => {
    this.setState({ files })

    if (notify) {
      this.handleFilesChange(files)
    }
  }

  handleFilesChange = files => {
    const { multi } = this.props
    this.props.input.onChange(multi ? files : files[0])
  }

  removeFile = index => {
    this.setFiles(this.state.files.filter((f, i) => i !== index))
  }

  setUploading = uploading => this.setState({ uploading })

  reset = () => {
    this.setFiles([])
    this.setRejectedFiles([])
  }
  setRejectedFiles = rejectedFiles => this.setState({ rejectedFiles })
  setError = error => this.setState({ error })
  isFileUploaded = () => this.state.files.length > 0

  parseValue(val) {
    if (this.props.multi) {
      return _.isEmpty(val) ? [] : val
    }

    return val
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.input.value !== nextProps.input.value) {
      const files = this.parseValue(nextProps.input.value)
      this.setFiles(files, false)
    }

    if (this.props.error !== nextProps.error) {
      this.setError(nextProps.error)
    }
  }

  upload(files) {
    const { bucket, prefix, saveOrigin } = this.props
    const url = `/api/v1/files/upload?bucket=${bucket}&prefix=${prefix}&saveOrigin=${saveOrigin}`

    return Request.upload(url, files).then(res => res.data.files)
  }

  renderAccepted() {
    const { accept } = this.props
    return <span>Accept {accept ? formatAccept(accept) : 'Any'}</span>
  }

  renderUploaded() {
    const { multi } = this.props
    return (
      <div>
        <ReUpload>{multi ? `Upload more` : `Re-upload`}</ReUpload>
        <Reset
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            this.reset()
          }}
        >
          <span>Reset</span>
        </Reset>
      </div>
    )
  }

  getStateValues(isFilesUploaded) {
    const { empty, error, uploading, uploaded } = this.props

    if (this.state.uploading) {
      return uploading
    } else if (this.state.error) {
      return error
    } else if (isFilesUploaded) {
      return uploaded
    }

    return empty
  }

  renderPreview(file, index = 1, renderRemove) {
    return (
      <FilePreview preview={file} renderRemove={renderRemove} key={index} />
    )
  }

  renderFilesPreview(files = []) {
    return files.map((file, index) =>
      this.renderPreview(file, index, f => (
        <RemoveButton
          onClick={e => {
            e.preventDefault()
            this.removeFile(index)
          }}
        >
          <RemoveIcon />
        </RemoveButton>
      ))
    )
  }

  renderRejectedErrors() {
    const { rejectedFiles } = this.state
    return rejectedFiles.map((rejectedFile, index) => {
      const {
        file: { name },
        reason
      } = rejectedFile

      return (
        <RejectedError key={index}>
          <RejectedFile>{name}</RejectedFile>{' '}
          <RejectedReason>{reason}</RejectedReason>
        </RejectedError>
      )
    })
  }

  render() {
    const { files, rejectedFiles, loading, uploading, error } = this.state
    const { multi, accept, disabled } = this.props
    const uploaded = this.isFileUploaded()

    const { title, icon } = this.getStateValues(uploaded)
    const IconComponent = icon
    const hasRejectedFiles = rejectedFiles.length > 0
    const showSinglePreview = !loading && uploaded && !multi
    return (
      <Container>
        <Wrapper
          activeClassName="active"
          accept={accept}
          onDrop={this.handleDrop}
          uploading={uploading}
          uploaded={uploaded}
          disabled={disabled}
          error={error}
        >
          <Inner>
            <IconArea>
              {showSinglePreview ? (
                this.renderPreview(files)
              ) : (
                <IconComponent />
              )}
            </IconArea>
            <Details>
              <Title>{title}</Title>
              {!error && (
                <SubTitle>
                  {!uploading && uploaded
                    ? this.renderUploaded()
                    : this.renderAccepted()}
                </SubTitle>
              )}
              {error && <Error>{error}</Error>}
            </Details>
          </Inner>
        </Wrapper>
        {hasRejectedFiles && (
          <RejectedErrors>{this.renderRejectedErrors()}</RejectedErrors>
        )}
        {multi && uploaded && <Files>{this.renderFilesPreview(files)}</Files>}
      </Container>
    )
  }
}

const active = css`
  background-color: #f4faee;
  border-color: #5fb402;
  border-style: dotted;
  color: #5fb402;
`

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Container = styled.div``

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

  ${props =>
    props.error &&
    `
    background-color: #fff0f0;
    color: #ff1820;
  `};

  ${props =>
    props.disabled &&
    `
    color: #d7d9d9;
  `};
`

const Files = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 18px;

  height: 120px;
  padding: 0px 2px;

  > * {
    margin-right: 1.3em;
  }
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

  > * {
    max-width: 100%;
    max-height: 100%;
  }
`

const StateIcon = styled.i`
  ${props =>
    props.rotate &&
    `
    animation: ${rotate360} 2s linear infinite;
  `};
`

const Details = styled.div`
  ${center};
`

const Title = styled.div`
  font-size: 22px;
  font-weight: 400;
`

const Error = styled.div`
  color: #ff1820;
`

const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
`

const ReUpload = styled.span`
  border-bottom: 1px dotted;
`

const Reset = styled.button`
  border: none;
  padding: 0px;
  background: transparent;
  margin-left: 1em;
  color: #333;

  span {
    border-bottom: 1px dotted;
  }
`

const RemoveButton = styled.button`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  position: absolute;
  border: none;
  right: -8px;
  cursor: pointer;
  color: #fff;

  font-size: 10px;
  padding: 4px 0px;
  box-shadow: 0 0px 1px rgba(0, 0, 0, 0.15);
  background-color: #ff1820;

  &:hover {
    background-color: #f04b51;
  }
`

const RejectedErrors = Error.extend`
  padding-top: 0.3em;
`

const RejectedError = styled.div``

const RejectedFile = styled.span`
  font-weight: bold;
`

const RejectedReason = styled.span``
