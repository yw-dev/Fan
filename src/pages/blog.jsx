import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import { Layout, Container } from 'layouts';
import config from '../../config/site';
import { 
  Header, 
  Archive, 
  GuessLike, 
  BlogList, 
  ContentNav,
} from 'components';

const ContentWrapper = styled.div`
margin: 2rem 8rem 2rem 8rem;
  width: auto;
  @media (max-width: ${props => props.theme.breakpoints.l}) {
    margin: 1rem 6rem 1rem 6rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.hd}) {
    margin: 1rem 4rem 1rem 4rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    margin: 1rem 2rem 1rem 2rem;
  }
  @media (max-width:  ${props => props.theme.breakpoints.s}) {
    margin:  1rem;
  }
`;

const ContentContainer = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    flex-wrap: wrap;
  }
`; 

const ContentPost = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-right: 1rem;
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    padding-right: 0rem;
  }
  .list{
    margin:0;
    padding:0;
    @media (max-width: ${props => props.theme.breakpoints.m}) {
      margin: 0 0 1rem 0;
    }
  }
`;

const AsideWrapper = styled.div`
  width: calc(99.9% * 1 / 3 - 1rem);
  display: flex;
  flex-direction: column;
  @media (max-width: ${props => props.theme.breakpoints.vl}) {
    width: calc(99.9% * 1 / 2 - 1rem);
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    width: 100%;
  }
`;


const Blog = ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  var keyword = [..."全部文章"];
  return (
    <Layout>
      <Helmet title={`文章 | ${config.siteTitle}`} />
      <Header title={`${config.siteTitle}`}></Header>
      <ContentWrapper>
        <ContentContainer>
          <ContentPost>
            <Container className="list">
              <ContentNav path="blog" title="文章" keyword={keyword}></ContentNav>
              {edges.map(({ node }) => (
                <BlogList
                  key={node.id}
                  cover={node.frontmatter.cover.childImageSharp.fluid}
                  stype={node.frontmatter.type}
                  path={node.frontmatter.path}
                  title={node.frontmatter.title}
                  date={node.frontmatter.date}
                  tags={node.frontmatter.tags}
                  excerpt={node.excerpt}
                />
              ))}
            </Container>
          </ContentPost>
          <AsideWrapper>
            <Archive />
            <GuessLike />
          </AsideWrapper>
        </ContentContainer>      
      </ContentWrapper>
    </Layout>
  );
};

export default Blog;

Blog.propTypes = {
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
              date: PropTypes.string.isRequired,
              tags: PropTypes.array,
              categores: PropTypes.string.isRequired,
              type: PropTypes.string.isRequired,
              typeID: PropTypes.string.isRequired,
              typeTitle: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
};

export const query = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 200)
          frontmatter {
            title
            path
            tags
            type
            typeID
            typeTitle
            categores
            date(formatString: "MM.DD.YYYY")
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
`;