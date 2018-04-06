import React, { Component } from 'react'
import styled from 'styled-components'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'

import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

export default class RichTextarea extends Component {
  defaultProps = {
    markdown: false
  }

  state = {
    editorState: EditorState.createEmpty(),
    value: this.props.input.value
  }

  encode = rawObject => {
    return draftToHtml(rawObject)
  }

  decode = val => {
    return htmlToDraft(val)
  }

  onChange = editorState => {
    this.setState({ editorState })

    const value = this.encode(convertToRaw(editorState.getCurrentContent()))

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
      ContentState.createFromBlockArray(this.decode(value))
    )

    this.setState({ value, editorState })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.input.value !== nextProps.input.value) {
      const editorState = EditorState.createWithContent(
        ContentState.createFromBlockArray(this.decode(nextProps.input.value))
      )

      this.setState({ value: nextProps.input.value, editorState })
    }
  }

  render() {
    const { editorState } = this.state
    return (
      <Wrapper>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="richEditor"
          onEditorStateChange={this.onChange}
          onBlur={this.onBlur}
          suppressContentEditableWarning={true}
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
