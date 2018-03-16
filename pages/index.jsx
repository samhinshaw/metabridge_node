import Link from 'next/link';
import React from 'react';
import glamorous from 'glamorous';
// import { shape, string } from 'prop-types';
import NavBar from '../components/navbar';
import Layout from '../components/my-layout';
import Button from '../components/button';

const HeroContainer = glamorous.div({
  background: 'url(/static/logo_background.svg) no-repeat right',
  backgroundSize: 'auto'
});

const HeroLink = glamorous.span({
  textDecoration: 'underline'
});

const HeroButtonContainer = glamorous.div({
  marginTop: '25px'
});

const FooterText = glamorous.div({
  padding: '0.75rem'
});

const HomePage = () => (
  <Layout>
    <section className="hero is-light is-fullheight" id="welcomeHero">
      <div className="hero-head">
        <NavBar />
      </div>
      <div className="hero-body">
        <HeroContainer className="container">
          <h1 className="title is-size-1">MetaBridge</h1>
          <div className="hero-text is-size-4">
            <p>
              Welcome to MetaBridge, a web tool for network-based integrative analysis of
              metabolomics data. Here you can upload a set of metabolites and identify the directly
              interacting enzymes for network integration.
            </p>
            <p>
              To start, you&apos;ll want a set of metabolites as HMDB, KEGG, PubChem, or CAS IDs. We
              recommend&nbsp;
              <Link href="http://www.metaboanalyst.ca">
                <a>
                  <HeroLink>MetaboAnalyst</HeroLink>
                </a>
              </Link>
              &nbsp;for metabolomics data processing and ID conversion.
            </p>
            <p>
              With the output of MetaBridge, you can create a protein-protein interaction network
              representative of your metabolomics data. We recommend&nbsp;
              <Link href="http://www.networkanalyst.ca">
                <a>
                  <HeroLink>NetworkAnalyst</HeroLink>
                </a>
              </Link>
              &nbsp;for generation of these networks and for network-based integration with
              protein-protein interaction networks created from other omics types.
            </p>
          </div>
          <HeroButtonContainer className="field is-grouped has-addons">
            <Button className="button is-large" title="Get Started" link="/upload" />
            <Button className="button is-large is-link" title="Tutorial" link="/help/tutorial" />
          </HeroButtonContainer>
        </HeroContainer>
      </div>
      <div className="hero-foot">
        <FooterText className="is-pulled-right field is-grouped">
          {/* <div className="control">
            <div className="tags has-addons">
              <span className="tag is-dark">MetaBridge</span>
              <span className="tag is-info">1.0</span>
            </div>
          </div> */}
          <div className="control">
            <div className="tags has-addons">
              <span className="tag is-dark">Pathway Tools</span>
              <span className="tag is-success">21.5</span>
            </div>
          </div>
          <div className="control">
            <div className="tags has-addons">
              <span className="tag is-dark">KEGG</span>
              <span className="tag is-link">2018-03-14</span>
            </div>
          </div>
        </FooterText>
      </div>
    </section>
  </Layout>
);

export default HomePage;
