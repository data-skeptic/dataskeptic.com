import React from "react"
import styled from "styled-components"

export default ({ preview, renderRemove = () => {} }) => (
  <Container>
    <Preview src={preview} />
    {renderRemove(preview)}
  </Container>
)

const Container = styled.div`
  height: 100%;
  max-width: 100%;
  text-align: center;
  position: relative
`

const Preview = styled.img`
  max-width: 100%;
  max-height: 100%;
  background: #fff;
  box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.15), 0 -10px 0 -5px #eee,
    0 -10px 1px -4px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
`
