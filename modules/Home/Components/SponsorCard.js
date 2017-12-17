import React from "react";
import {
    Wrapper,
    Label,
    Card
} from "../../../shared/styles";

export default ({content, name=''}) => (
    <Wrapper>
        <Label>{name}</Label>
        <Card>
            <div dangerouslySetInnerHTML={{__html: content}}/>
        </Card>
    </Wrapper>
);


