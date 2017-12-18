import React from "react";
import PodcastCard from './PodcastCard';
import BlogCard from './BlogCard'
import SponsorCard from './SponsorCard'
import styled from 'styled-components'

export default ({ latestPost, latestEpisode, sponsor, setEpisodeDescription}) => (
    <Cards>
        <PodcastCard
            {...latestEpisode}
            setEpisodeDescription={setEpisodeDescription}
        />

        <BlogCard
            {...latestPost}
        />

        <SponsorCard
            content={sponsor}
        />
    </Cards>
);

const Cards = styled.div`
    display: flex;
    justify-content: space-between;
`