import React from "react";
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

export default ({name, media, title, description, author, avatar, date}) => (
    <Wrapper>
        <Label>{name}</Label>
        <Card>
            <Media>{media}</Media>
            <Inner>
                <Title>{title}</Title>
                <Description>{description}</Description>
                <Author>
                    <Avatar src={author && author.img}/>
                    <Info>
                        <Name>{author && author.prettyname}</Name>
                        <Date>{date}</Date>
                    </Info>
                </Author>
            </Inner>
        </Card>
    </Wrapper>
)
