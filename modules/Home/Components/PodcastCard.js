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

export default ({ pubDate,title,desc,setEpisodeDescription, img}) => (
    <Wrapper>
        <Label>{}</Label>
        <Card>
            <Media><img src={img} alt=""/></Media>
            <Inner>
                <Title>{title}</Title>
                <Description>{desc}</Description>
                <Author>
                    {/*<Avatar src={}/>*/}
                    <Info>
                        <Name>{}</Name>
                        <Date>{moment(pubDate).format("MM-DD-YYYY")}</Date>
                    </Info>
                </Author>
            </Inner>
        </Card>
    </Wrapper>
);


const Inner = styled.div`
    padding: 0px 16px;
    display: flex;
    flex-direction: column;
`