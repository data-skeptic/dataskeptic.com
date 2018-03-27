import React, { Component } from 'react'
import styled from 'styled-components'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'

import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

export default class RichTextarea extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    value: this.props.input.value
  }
  onChange = editorState => {
    this.setState({ editorState }, this.updateVal)
  }
  updateVal = () => {
    const value = draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    )

    this.setState({
      value
    })
  }

  componentDidMount() {
    const { input: {value }} = this.props

    const editorState = EditorState.createWithContent(
      ContentState.createFromBlockArray(htmlToDraft(value))
    )

    this.setState({ value, editorState })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.input.value !== nextProps.input.value) {
      const editorState = EditorState.createWithContent(
        ContentState.createFromBlockArray(htmlToDraft(nextProps.input.value))
      )

      this.setState({ value: nextProps.input.value, editorState })
    }
  }

  render() {
    const { editorState } = this.state
    return (
      <Wrapper suppressContentEditableWarning={true}>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="richEditor"
          onEditorStateChange={this.onChange}
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
