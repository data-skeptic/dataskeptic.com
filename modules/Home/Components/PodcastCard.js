import React from 'react'
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

export default ({ desc,setEpisodeDescription}) => (
    <Wrapper>
        <Label>{}</Label>
        <Card>
            <Media>{}</Media>
            <Inner>
                <Title>{}</Title>
                <Description dangerouslySetInnerHTML={setEpisodeDescription(desc)}/>
                <Author>
                    {/*<Avatar src={}/>*/}
                    <Info>
                        <Name>{}</Name>
                        <Date>{}</Date>
                    </Info>
                </Author>
            </Inner>
        </Card>
    </Wrapper>
);


