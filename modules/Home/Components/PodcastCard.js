import React from 'react'
import moment from 'moment'
import {
    Wrapper,
    Label,
    Card,
    Media,
    Inner,
    Title,
    Description,
    Author,
    Avatar,
    Info,
    Name,
    Date
    } from "../../../shared/styles";

export default ({ pubDate,title,desc,setEpisodeDescription}) => (
    <Wrapper>
        <Label>{}</Label>
        <Card>
            <Media>{}</Media>
            <Inner>
                <Title>{title}</Title>
                <Description dangerouslySetInnerHTML={setEpisodeDescription(desc)}/>
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


