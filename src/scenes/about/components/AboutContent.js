import React, {Component} from 'react';
import Table from 'antd/es/table';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ReactHtmlParser from 'react-html-parser';

import injectSheet from "react-jss";
import { pageContainer } from '../../../helpers/style';
import { checkProtocol } from '../../../helpers/utils';

import DownloadIcon from '../../../icons/download';
import * as actions from '../../../services/actions/index';
import connect from "react-redux/es/connect/connect";
import get from "lodash/get";
import Spin from "antd/es/spin";
import Trans from '../../../locales/Trans';
import {injectIntl, intlShape} from "react-intl";

class AboutContent extends Component  {
  componentDidMount() {
    const { dispatch, aboutRequestSlug } = this.props;
    if (dispatch) {
      dispatch(actions.organisationDocumentLinksRequest());
        dispatch(actions.aboutMediaContentRequest(aboutRequestSlug));
    } else {
      dispatch(actions.organisationDocumentLinksInitial());
        dispatch(actions.aboutMediaContentInitial());
    }
  }

  addKey(dataSource) {
    let data = [];
    dataSource.forEach(function(item) {
      item.key = get(item, 'id');
      data.push(item);
    });
    return data;
  }

  getTrans(id, text){
      return this.props.intl.formatMessage({id: id, defaultMessage: text});
  }

  render() {
    const { classes, organisationDocumentLinks } = this.props;
    const data = get(organisationDocumentLinks, 'data.results');
    const columns = [{
      title: 'Title',
      dataIndex: 'title.narratives[0].text',
      key: 'document',
      width: '95%',
      render: text => <span>{text}</span>,
    }, {
      title: '',
      dataIndex: 'url',
      key: 'link',
      render: (text, record) => (
        <span>
        <a href={`${checkProtocol(text)}`} target="_blank" className="ant-dropdown-link">
          <DownloadIcon className='download-icon'/>
        </a>
      </span>
      ),
    }];
    const dataTemp = [{
      key: '1',
      document: 'Document 1',
      link: 'link'
    }];
    const aboutImage = this.props.simpleContentHost.concat(get(this.props.aboutMediaContent, 'data.image', ''));
    return (
      <Spin spinning={organisationDocumentLinks.request} >
        <Grid className={classes.aboutContent} style={pageContainer}>
          <Row center="xs">
            <Col xs={12} md={8} lg={8}>
              <h2 className="title"><Trans id='about.title' text='About IOM Transparency portal' /></h2>
            </Col>
          </Row>
              <div>
                  <Row center="xs">
                      <Col xs={12} md={8} lg={8} style={{ textAlign: 'start' }}>
                          {ReactHtmlParser(this.getTrans('about.content.one', 'content one'))}
                      </Col>
                  </Row>
                  <Row center="xs">
                      <Col xs={12} md={8} lg={8}>
                          <img src={aboutImage} width="100%" alt="IOM"/>
                      </Col>
                  </Row>
                  <Row center="xs">
                      <Col xs={12} md={8} lg={8} style={{ textAlign: 'start' }}>
                          {ReactHtmlParser(this.getTrans('about.content.two', 'content two'))}
                      </Col>
                  </Row>
              </div>
          <Row center="xs" className="document-table">
            <Col xs={12} md={8} lg={8}>
              <h3 className={classes.tableHeading}>DOCUMENTS</h3>
              <Table columns={columns} dataSource={data ? this.addKey(data) : dataTemp} pagination={false}/>
            </Col>
          </Row>
        </Grid>
      </Spin>
    )
  }
};

const styles = {
  aboutContent: {
    fontSize: 22,
    width: '85vw !important',
      maxWidth: 'none !important',
    '@media (max-width: 776px)': {
        width: '100vw !important',
      padding: '0 18px',
    },
    color: '#262626',
    '& .title': {
      fontSize: 42,
      fontWeight: 300,
      marginTop: 20,
      '@media (max-width: 776px)': {
        fontSize: 36,
      },
    },
    '& img': {
      margin: '30px 0 40px 0',
    },
    '& .document-table': {
      marginBottom: 80,
    },
    '& thead': {
      background: '#efefef',
        '& tr': {
            '& th': {
                '& span': {
                    fontWeight: '600',
                }
            }
        }
    },
    '& th, td': {
      color: '#262626 !important',
      fontSize: '20px !important',
    },
  },
  tableHeading: {
    color: '#0033a1',
    fontSize: 26,
    fontWeight: 600,
    textAlign: 'start',
    margin: '50px 0 20px 0',
    '@media (max-width: 767px)': {
      fontSize: 22,
    },
  }
};

AboutContent.propTypes = {
    intl: intlShape.isRequired,
};

AboutContent.defaultProps = {
    aboutRequestSlug: 'aboutcontentpic',
    simpleContentHost: process.env.REACT_APP_SIMPLECONTENT_HOST
};

const mapStateToProps = (state, ) => {
  return {
    organisationDocumentLinks: state.organisationDocumentLinks,
      aboutMediaContent: state.aboutMediaContent,
  }
};

export default injectIntl(connect(mapStateToProps)(injectSheet(styles)(AboutContent)));