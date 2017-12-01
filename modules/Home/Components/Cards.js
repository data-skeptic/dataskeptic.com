import React from "react";
import PodcastCard from './PodcastCard';
import BlogCard from './BlogCard'
import SponsorCard from './SponsorCard'
import styled from 'styled-components'

export default ({ latestPost, latestEpisode, sponsor,setEpisodeDescription}) => (
    <Cards>
        <PodcastCard
            {...latestPost}
            setEpisodeDescription={setEpisodeDescription}

        />

        <BlogCard

            {...latestEpisode}
        />

        <SponsorCard
            {...sponsor}
        />
    </Cards>
);

const Cards = styled.div`
    display: flex;
    justify-content: space-between;
`