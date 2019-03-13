import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { CardHeader } from 'components';
import theme from '../../config/theme';

const Container = styled.div`
  width: 100%;
  margin: 0;
  font-size: 14px;
  @media (max-width: ${props => props.theme.breakpoints.l}) {
    margin: 0rem 0rem 10px 0rem;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
  justify-content: space-between;
  @media (max-width:  ${props => props.theme.breakpoints.l}) {
    margin: 0;
  }
`;


const Wrapper = styled.article`
  margin: 0 0 10px 0;
  position: relative;
  z-index: 100;
  border-radius: ${props => props.theme.borderRadius.default};
  border: ${props => props.theme.border.lowlight};
  box-shadow: ${props => props.theme.shadow.feature.small.l_little};
  transition: ${props => props.theme.transitions.boom.transition};
  width:100%;
  height: 15rem;
  flex-basis: calc(99.9% * 1 / 4 - 7px);
  max-width: calc(99.9% * 1 / 4 - 7px);
  width: calc(99.9% * 1 / 4 - 7px);

  &:hover {
    box-shadow: ${props => props.theme.shadow.feature.small.little};
    transform: scale(1.04);
  }

  @media (max-width:  ${props => props.theme.breakpoints.vl}) {
    flex-basis: calc(99.9% * 1 / 3 - 7px);
    max-width: calc(99.9% * 1 / 3 - 7px);
    width: calc(99.9% * 1 / 3 - 7px);
    height: 14rem;
  }

  @media (max-width:  ${props => props.theme.breakpoints.l}) {
    flex-basis: calc(99.9% * 1 / 2 - 7px);
    max-width: calc(99.9% * 1 / 2 - 7px);
    width: calc(99.9% * 1 / 2 - 7px);
    height: 17rem;
    margin: 10px 0 0 0;
  }

  @media (max-width:  ${props => props.theme.breakpoints.m}) {
    flex-basis: 100%;
    max-width: 100%;
    width: 100%;
    height: 15rem;
  }
`;

const StyledLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  z-index: 3;
  border-radius: ${props => props.theme.borderRadius.default};
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0.7) 80%,
      rgba(0, 0, 0, 0.8) 100%
    );
    z-index: -10;
    color: ${props => props.theme.colors.white.grey};
    border-radius: ${theme.borderRadius.default};
    transition: opacity ${theme.transitions.default.duration};
  }
`;

const Image = styled.div`
  position: absolute;
  top: 0;
  overflow: hidden;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.default};
  box-shadow: ${props => props.theme.shadow.feature.small.default};
  img {
    box-shadow: ${props => props.theme.shadow.feature.small.hover};
  }
  > div {
    position: static !important;
  }
  > div > div {
    position: static !important;
  }
`;

const Info = styled.div`
  font-size: 14px;
  padding: 1rem;
  position: absolute;
  display: block;
  bottom: 0;
  left: 0;
  color: ${props => props.theme.colors.white.grey};
  h1,h2,h3,h4,h5,h6{
    color: ${props => props.theme.colors.white.grey};
  }
`;

const Title = styled.h4`
  line-height:1.5rem;
`;

const Specials = ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  const postsBySpecial = {};
  // create tags page
  edges.forEach(({ node }) => {
    if (node.frontmatter.special) {
        if (!postsBySpecial[node.frontmatter.special]) {
          postsBySpecial[node.frontmatter.special] = [];
        }
        postsBySpecial[node.frontmatter.special].push(node);
    }
  });
  const subtitles = Object.keys(postsBySpecial);
  
  
  return (
  <Container>
    <CardHeader title="专题" other="更多" path="/specials"></CardHeader>
    <Content>
    {subtitles.map((subtitle, index) => {
      return (
        <Wrapper key={index}>
          <Image>
            <Img fluid={postsBySpecial[subtitle][0].frontmatter.cover.childImageSharp.fluid} />
          </Image>
          <StyledLink to={`/specials/${subtitle}`}>
            <Info>
              <Title>{subtitle}</Title>
              <span>{postsBySpecial[subtitle][0].excerpt}</span>
            </Info>
          </StyledLink>
        </Wrapper>  
      )}
    )}
    </Content>    
  </Container>
)};

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
        ) {
          edges {
            node {
              id
              excerpt(pruneLength: 50)
              html
              frontmatter {
                title
                subtitle
                type
                typeID
                typeTitle
                path
                tags
                categores
                special
                date(formatString: "YYYY-MM-DD")
                cover {
                  childImageSharp {
                    fluid(
                      maxWidth: 1000
                      quality: 90
                      traceSVG: { color: "#2B2B2F" }
                    ) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Specials data={data} {...props} />}
  />
)

Specials.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            excerpt: PropTypes.string,
            frontmatter: PropTypes.shape({
              cover: PropTypes.object.isRequired,
              path: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
              subtitle: PropTypes.string,
              type: PropTypes.string.isRequired,
              typeID: PropTypes.string.isRequired,
              typeTitle: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
              categores: PropTypes.string.isRequired,
              special: PropTypes.string.isRequired,
              tags: PropTypes.array,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
};
