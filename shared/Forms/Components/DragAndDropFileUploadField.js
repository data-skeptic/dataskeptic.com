import React from "react"
import styled from "styled-components"

const imageFormats = ["png", "jpg", "jpeg", "bmp", "gif"]

const Icon = ({ name, extension = ".pdf" }) => (
  <FileIcon className={`glyphicon glyphicon-file`}>
    <Ext>{extension}</Ext>
  </FileIcon>
)

const getExtension = file =>
  file.slice((Math.max(0, file.lastIndexOf(".")) || Infinity) + 1)

const isImage = ext => imageFormats.indexOf(ext) > -1

export default ({ preview, renderRemove = () => {} }) => {
  const extension = getExtension(preview)
  const displayPreview = isImage(extension)

  return (
    <Container>
      {displayPreview ? (
        <Preview src={preview} />
      ) : (
        <Icon extension={extension} name={preview} />
      )}
      {renderRemove(preview)}
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  max-width: 100%;
  text-align: center;
  position: relative;
`

const Preview = styled.img`
  max-width: 100%;
  max-height: 100%;
  background: #fff;
  box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.15), 0 -10px 0 -5px #eee,
    0 -10px 1px -4px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
`

const FileIcon = styled.i``

const Ext = styled.span`
  background: #f4faef;
  position: absolute;
  transform: translateX(-47px) translateY(27px);
  font-size: 12px;
  border: 2px solid #5eb404;
  text-transform: uppercase;
  font-family: tahoma;
  padding: 0px 4px;
  font-weight: bold;
`
