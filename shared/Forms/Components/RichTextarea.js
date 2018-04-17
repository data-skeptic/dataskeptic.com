import React, { Component } from 'react'
import styled from 'styled-components'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'

import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

const DEFAULT_TOOLBAR = {
  options: [
    'inline',
    'blockType',
    'fontSize',
    'fontFamily',
    'list',
    'textAlign',
    'colorPicker',
    'link'
  ]
}

export default class RichTextarea extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    value: this.props.input.value
  }

  onChange = editorState => {
    this.setState({ editorState })

    const value = draftToHtml(convertToRaw(editorState.getCurrentContent()))

    this.setState({
      value
    })
  }

  onBlur = () => {
    let { value, editorState } = this.state
    value = editorState.getCurrentContent().hasText() ? value : null
    this.props.input.onChange(value)
  }

  componentDidMount() {
    const { input: { value } } = this.props

    const editorState = EditorState.createWithContent(
      ContentState.createFromBlockArray(htmlToDraft(value))
    )

    this.setState({ value, editorState }, this.updateVal)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.input.value !== nextProps.input.value) {
      const editorState = EditorState.createWithContent(
        ContentState.createFromBlockArray(htmlToDraft(nextProps.input.value))
      )

      this.setState(
        { value: nextProps.input.value, editorState },
        this.updateVal
      )
    }
  }

  render() {
    const { toolbar = DEFAULT_TOOLBAR } = this.props
    const { editorState } = this.state
    return (
      <Wrapper suppressContentEditableWarning={true}>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="richEditor"
          onEditorStateChange={this.onChange}
          onBlur={this.onBlur}
          toolbar={toolbar}
        />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  .richEditor {
    padding: 6px 5px 0;
    border-radius: 2px;
    border: 1px solid #f1f1f1;
  }
`
