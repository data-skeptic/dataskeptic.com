import React, {Component} from "react";
import styled, {withTheme} from "styled-components";
import Link from "../../../components/Link";
import moment from 'moment'
import Ionicon from 'react-ionicons'
import ParamRouter from "../../../components/Router";

const formatLink = (link) => link.indexOf('/') === 0 ? link : `/podcasts/${link}`

export default class EpisodeListItem extends Component {
    handlePlay = () => {
        const {post} = this.props;
        this.props.play(post)
    }

    render() {
        const {post} = this.props;
        return (
            <Wrapper>
                <Date>
                    {moment(post.pubDate).format('MMMM D, YYYY')}{" "}
                </Date>
                <Post>
                    <Avatar href={formatLink(post.link)}>
                        <img src={post.img}/>
                    </Avatar>
                    <Body>
                    <TitleWrap>
                        <PostLink href={formatLink(post.link)}>
                            <Title>
                                {post.title}
                            </Title>
                        </PostLink>
                        <ButtonsWrapper>
                            <Button onClick={this.handlePlay}>
                                <Ionicon icon={'md-play'}/> Play {post.duration}
                            </Button>
                            <Button>
                                <Ionicon icon={'md-download'}/> Download
                            </Button>
                        </ButtonsWrapper>
                    </TitleWrap>
                    {" "}
                    <div dangerouslySetInnerHTML={{__html: post.desc.replace(/Â/g, '')}}/>
                    <More href={formatLink(post.link)}>View More</More>{" "}
                    </Body>
                </Post>
            </Wrapper>
        );
    }
}

const More = styled(Link)`
  color: #000;
  letter-spacing: 0;
  font-weight: 700;
  font-size: 14px;
`;

const Post = styled.div`
  padding-bottom: 50px;
  border-width: 0 0 1px;
  border-color: #979797;
  border-style: solid;
  margin-right: 100px;
  display: flex;
`;
const Date = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: #7d8080;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 15px;
`;
const Body = styled.div`
  text-align: justify;
  & > a {
    border-bottom: 1px dotted;
    text-decoration: none;
    color: black;
  }
  color: #575959;
  letter-spacing: 0;
  line-height: 24px;
  font-size: 15px;
  font-weight: 500;
  padding: 0;
`;
const Avatar = styled(Link)`  
  > img {
    width: 200px;
    height: 200px;
    margin-right: 20px;
  }
`;
const PostLink = styled(Link)`text-decoration: none;`;
const Author = styled.div`
  padding-top: 6px;
`;
const TitleWrap = styled.div`  display: flex;
  flex-direction: column;`;

const Wrapper = styled.div`margin-bottom: 20px;`;

const Title = styled.span`
  font-size: 28px;
  line-height: 34px;
  color: #3a3b3b;
  letter-spacing: 0;
  margin-top: 8px;
  text-decoration: none;
  border-bottom: 1px dotted;
`;

const ButtonsWrapper = styled.div`

    margin-top: 10px;
`

const Button = styled.button`
    background: #fff;
    display: flex;
    align-items: center;
    height: 35px;
        padding: 0;
        color: ${({theme}) => theme.colors.dark};
    padding-left: 14px;
    padding-right: 14px;
    float: left;
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 5px;
    outline: none;
    cursor: pointer;
     svg {
       fill:  ${({theme}) => theme.colors.dark};
      }
    &:hover {
      color: #fff;
      background-color:${props => props.theme.colors.primary}; 
      svg {
       fill:  #fff;
      }
    }
    
    min-width: 120px;
    margin-right: 10px;
`