import React from "react"
import styled from 'styled-components'

const ProposeButton = ({editUrl='#'}) =>
    <Button>
        <Link href={editUrl}  target="_blank">
            <Propose>
                Propose Edit
                <Icon src="/static/pencil.svg"/>
            </Propose>
        </Link>
        <Text>Have a word to say? Propose a specific change to the blog post.</Text>
    </Button>

const Button = styled.div`
    padding-top: 21px;
    padding-bottom: 21px;
    border: 0;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    
    line-height: 39px;
`

const Propose = styled.div`
    float: left;
    width: 20%;
    border-radius: 2px;
    text-align: center;
    
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-evenly;
`

const Icon = styled.img`
    width: 24px;
`

const Link = styled.a`
`

const Text = styled.p`
    padding: 0;
    margin: 0;
    margin-left: 22%;
    font-size: 14px;
    font-style: italic;
    color: #aaa;
`

export default ProposeButton