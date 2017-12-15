import React from "react"
import styled from 'styled-components'
import Link from '../../../components/Link'

const RelatedContent = ({items}) =>
    <Content>
        {items.map(({uri, title, desc}) =>
            <RelatedLink key={uri} href={uri}>{title}</RelatedLink> - <Description>{desc}</Description>
        )}
    </Content>

const Content = styled.div``
const RelatedLink = styled(Link)``
const Description = styled.span``

export default RelatedContent