import React from 'react';

const ListPreloader = () => {
    return (
        <div className="timeline-wrapper">
            <div className="timeline-item">
                <div className="animated-background facebook">

                    <div className="background-masker content-top"/>
                    <div className="background-masker content-first-end"/>
                    <div className="background-masker content-second-line"/>
                    <div className="background-masker content-second-end"/>
                    <div className="background-masker content-third-line"/>
                    <div className="background-masker content-third-end"/>
                </div>
            </div>
        </div>
    )
}

export default ListPreloader
