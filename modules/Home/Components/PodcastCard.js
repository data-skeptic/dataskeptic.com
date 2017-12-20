import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import {
    Wrapper,
    Label,
    Card,
    Media,
    Title,
    Description,
    Author,
    Avatar,
    Info,
    Name,
    Date
} from "../../../shared/styles";
import Link from "../../../components/Link";

export default ({link, pubDate, title, desc, img}) => (
    <Wrapper>
        <Block href={`/podcasts/${link}`}>
            <Label>{}</Label>
            <Card>
                <Media><img src={img} alt=""/></Media>
                <Inner>
                    <Title>{title}</Title>
                    {/*<Description dangerouslySetInnerHTML={{__html: desc}}/>*/}
                    <Author>
                        {/*<Avatar src={}/>*/}
                        <Info>
                            <Name>{}</Name>
                            <Date>{moment(pubDate).fromNow()}</Date>
                        </Info>
                    </Author>
                </Inner>
            </Card>
        </Block>
    </Wrapper>
);

const Block = styled(Link)``

const Inner = styled.div`
    padding: 0px 16px;
    display: flex;
    flex-direction: column;
`