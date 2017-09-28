import React from "react";
import {
    Wrapper,
    Label,
    Card,
    SponsorTitle,
    SponsorMedia,
    SponsorPromo

} from "../../../shared/styles";

export default ({name, media, title, promo}) => (
    <Wrapper>
        <Label>{name}</Label>
        <Card>
            <SponsorTitle>{title}</SponsorTitle>
            <SponsorMedia>
                <img src={media} alt="sponsor"/>
            </SponsorMedia>
            <SponsorPromo>
                {promo}
            </SponsorPromo>
        </Card>
    </Wrapper>

);


