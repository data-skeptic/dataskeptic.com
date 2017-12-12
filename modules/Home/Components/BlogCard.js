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

export default ({name, img, title, description, author, avatar, date}) => (
    <Wrapper>
        <Label>{name}</Label>
        <Card>
            <Media><img src={img} alt=""/></Media>
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
