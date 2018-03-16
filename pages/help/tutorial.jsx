// import Link from 'next/link';
import React from 'react';
// import glamorous from 'glamorous';
// import { shape, string } from 'prop-types';
import Layout from '../../components/my-layout';
// import Button from '../components/button';

const Tutorial = () => (
  <Layout>
    <section className="section">
      <div className="columns is-centered">
        <div className="column is-8-desktop">
          <h2 className="is-size-2" id="metabolite-preprocessing">
            I. Metabolite Preprocessing (Optional)
          </h2>
          <p>
            To start using MetaBridge, you need to upload a list of compounds of interest as
            metabolite IDs. If you are starting with raw metabolomics data, you will need to
            preprocess your metabolites with your method of choice to obtain compounds of interest
            and their corresponding metabolite IDs. We recommend
            <a href="http://www.metaboanalyst.ca">MetaboAnalyst</a> for metabolite preprocessing.
          </p>
          <p>
            <a href="http://www.metaboanalyst.ca">
              <img src="/static/serve/metaboanalyst.png" alt="MetaboAnalyst" />
            </a>
          </p>
          <hr />
          <h2 className="is-size-2" id="metabridge-mapping">
            II. <a href="https://www.metabridge.org">MetaBridge</a> Mapping
          </h2>
          <h3 className="is-size-3" id="1uploadmetabolites">
            1. Upload Metabolites
          </h3>
          <p>
            Upload your metabolites to <a href="https://www.metabridge.org">MetaBridge</a> and
            select your metabolites for mapping.
          </p>
          <p>
            <a href="https://www.metabridge.org">
              <img src="/static/serve/upload.png" alt="Upload Metabolites" />
            </a>
          </p>
          <h3 className="is-size-3" id="2mapmetabolites">
            2. Map Metabolites
          </h3>
          <p>Choose a database to map against and view your mapping results.</p>
          <p>
            <a href="https://www.metabridge.org">
              <img src="/static/serve/mapping.png" alt="Map Via MetaCyc" />
            </a>
          </p>
          <h3 className="is-size-3" id="3downloadresults">
            3. Download Results
          </h3>
          <p>Download your full mapping results (example table below).</p>
          <table className="table">
            <thead className="thead">
              <tr>
                <th>KEGG</th>
                <th>Compound</th>
                <th>Enzyme</th>
                <th>Enzyme Name</th>
                <th>Gene Name</th>
                <th>Entrez</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>C00086</td>
                <td>Urea</td>
                <td>3.5.3.1</td>
                <td>arginase</td>
                <td>ARG1</td>
                <td>383</td>
              </tr>
              <tr>
                <td>C00086</td>
                <td>Urea</td>
                <td>3.5.3.1</td>
                <td>arginase</td>
                <td>ARG2</td>
                <td>384</td>
              </tr>
              <tr>
                <td>C00086</td>
                <td>Urea</td>
                <td>3.5.3.4</td>
                <td>allantoicase</td>
                <td>ALLC</td>
                <td>55821</td>
              </tr>
              <tr>
                <td>C00086</td>
                <td>Urea</td>
                <td>3.5.3.11</td>
                <td>agmatinase</td>
                <td>AGMAT</td>
                <td>79814</td>
              </tr>
              <tr>
                <td>C00022</td>
                <td>Pyruvate</td>
                <td>1.1.1.27</td>
                <td>L-lactate dehydrogenase</td>
                <td>LDHAL6A</td>
                <td>160287</td>
              </tr>
            </tbody>
          </table>
          <hr />
          <h2 className="is-size-2" id="networkanalyst">
            III. <a href="http://www.networkanalyst.ca">NetworkAnalyst</a>
          </h2>
          <h3 className="is-size-3" id="1uploadmappedgenes">
            1. Upload Mapped Genes
          </h3>
          <p>
            Visit <a href="http://www.networkanalyst.ca">NetworkAnalyst</a> and start with
            <a href="http://www.networkanalyst.ca/faces/Secure/network/SignatureView.xhtml">
              A list of genes or proteins
            </a>
            input.
          </p>
          <p>
            <a href="http://www.networkanalyst.ca">
              <img src="/static/serve/select_list.png" alt="Select A list of genes or proteins" />
            </a>
          </p>
          <ul>
            <li>
              Upload the genes that you mapped via MetaBridge, providing an appropriate data label.
            </li>
            <li>Repeat this for each gene or protein list you wish to integrate.</li>
            <li>
              Then, paste into the box BOTH lists you wish to combine to create one COMBINED list.
              NetworkAnalyst will filter out duplicates for you.
            </li>
          </ul>
          <p>
            <a href="http://www.networkanalyst.ca/faces/Secure/network/SignatureView.xhtml">
              <img src="/static/serve/copy_paste.png" alt="Upload Genes to NetworkAnalyst" />
            </a>
          </p>
          <p>
            <br />
          </p>
          <p>
            Once you have uploaded all of your gene/protein lists, check the dropdown menu to check
            that everything was properly uploaded, and select a dataset to start with.
          </p>
          <ul>
            <li>
              Example of uploaded lists below:
              <ul>
                <li>MetaBridge-mapped Metabolites (54 unique genes)</li>
                <li>Gene Expression Data (99 unique genes)</li>
                <li>Combined Gene Lists (153 unique genes)</li>
              </ul>
            </li>
          </ul>
          <p>
            <img src="/static/serve/upload_lists.png" alt="Select Gene List" />
          </p>
          <p>
            Next, choose [Network Analysis &rarr; Protein-protein interactions] and choose the
            literature-curated IMEX Interactome as your protein-protein interaction database.
          </p>
          <p>
            <img
              src="/static/serve/select_ppis.png"
              alt="Choose Protein-Protein Interactions and IMEX Interactome"
            />
          </p>
          <h3 className="is-size-3" id="2createnetworks">
            2. Create Networks
          </h3>
          <p>
            Now, a protein-protein interaction network will be generated based on the data you have
            uploaded. Depending on the size of the dataset you have uploaded, you may wish to choose
            from the network sizes on the lefthand size. Generally, we recommend using a
            minimum-connected protein-protein interaction network. However, if your data are
            particularly sparse, you may need to use first-order interaction networks, whereas if
            your dataset is particularly large, you may wish to use a zero-order interaction
            network. Typically, we aim for a network containing a few hundred nodes.
          </p>
          <p>
            Also if importance here is the [Batch Exclusion] tool. This tool is quite helpful in
            filtering out proteins that you know to be highly connected in the cell, but not if
            interest to the condition you are studying. One of the most common proteins we filter
            out is UBC (uniprot ID P0CG48).
          </p>
          <p>
            <img src="/static/serve/minimum_connected.png" alt="Create Minimum-Connected Network" />
          </p>
          <p>Below, you will find an example of each minimum-connected network generated</p>
          <p>
            <img
              src="/static/serve/metab_network.png"
              alt="Metabolomic Minimum-Connected Network"
            />
          </p>
          <ol>
            <li>
              Minimum-connected protein-protein interaction network from MetaBridge-mapped
              metabolites.
            </li>
          </ol>
          <hr />
          <p>
            <img
              src="/static/serve/trans_network.png"
              alt="Transcriptomic Minimum-Connected Network"
            />
          </p>
          <ol>
            <li>
              Minimum-connected protein-protein interaction network from gene expression data.
            </li>
          </ol>
          <hr />
          <p>
            <img
              src="/static/serve/combined_network.png"
              alt="Integrated Minimum-Connected Network"
            />
          </p>
          <ol>
            <li>Minimum-connected protein-protein interaction network from combined gene list.</li>
          </ol>
          <hr />
          <h3 className="is-size-3" id="3networkanalystanalyses">
            3. NetworkAnalyst Analyses
          </h3>
          <p>
            For each network you create, you can extract various information from the network. For
            example, you can use the [Function Explorer] panel on the righthand side to view pathway
            enrichment analyses of the networks. On the lefthand side, you can use the [Node
            Explorer] to view information about individual nodes of the network and [Save] the
            entire node list as a CSV file for further analysis.
          </p>
          <p>
            You can also tweak the network appearance as you would like. For example, you can paste
            in your original lists to the [Batch Selection] panel and color-code each node of the
            network corresponding to its original data source. Then, you can download image files of
            the networks you have created.
          </p>
          <p>
            <img src="/static/serve/batch_select.png" alt="Batch Selection of Nodes" />
          </p>
          <h3 className="is-size-3" id="4furthernetworkanalysttools">
            4. Further NetworkAnalyst Tools
          </h3>

          <p>
            In addition to network creation, you can use NetworkAnalyst&apos;s extensive suite of
            tools, such as the [Venn Diagram] or [Chord Diagram] tools to examine overlap of your
            datasets. For example, you can examine the overlap of your MetaBridge-mapped genes with
            your other datasets.
          </p>
          <p>
            To examine overlap of your protein-protein interaction networks, you can upload the
            genes contained in your networks (from the downloaded node tables) and use the Venn
            Diagram function to explore network overlap.
          </p>
          <p>
            <img src="/static/serve/venn_diagram.png" alt="Venn Diagram Tool" />
          </p>
        </div>
      </div>
    </section>
  </Layout>
);

export default Tutorial;
