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
import styled from 'styled-components'
import Link from '../../../components/Link'

export default ({prettyname, name, img, title, desc, author, avatar, date}) => (
    <Wrapper>
        <Block href={`/blog${prettyname}`}>
            <Label>{name}</Label>
            <Card>
                <Inner>
                    <Title>{title}</Title>
                    <Description>{desc}</Description>
                    <Author>
                        <Avatar src={author && author.img}/>
                        <Info>
                            <Name>{author && author.prettyname}</Name>
                            <Date>{date}</Date>
                        </Info>
                    </Author>
                </Inner>
            </Card>
        </Block>
    </Wrapper>
)

const Block = styled(Link)``
