import React, {Component} from 'react';
import Table from 'antd/es/table';
import { Grid, Row, Col } from 'react-flexbox-grid';

import aboutOMG from '../../../assets/images/AboutIOM.jpg';
import injectSheet from "react-jss";
import { pageContainer } from '../../../helpers/style';

import DownloadIcon from '../../../icons/download';
import * as actions from '../../../services/actions/index';
import connect from "react-redux/es/connect/connect";
import get from "lodash/get";
import Spin from "antd/es/spin";

class AboutContent extends Component  {
  componentDidMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch(actions.orgsanisationDocumentLinksRequest());
    } else {
      dispatch(actions.orgsanisationDocumentLinksInitial());
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

  render() {
    const { classes, organisationDocumentLinks } = this.props;
    const data = get(organisationDocumentLinks, 'data.results');
    console.log(data);
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
        <a href={`${text}`} target="_blank" className="ant-dropdown-link">
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
    return (
      <Spin spinning={organisationDocumentLinks.request} >
        <Grid className={classes.aboutContent} style={pageContainer}>
          <Row center="xs">
            <Col xs={12} md={8} lg={8}>
              <h2 className="title">About IOM Transparency portal</h2>
              <p style={{fontWeight: 600}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Integer ut mi neque. Nulla consectetur laoreet orci.
                Etiam consequat quam et magna consectetur pulvinar.
                Suspendisse bibendum nisi ex, nec finibus tortor ultricies quis.
                Curabitur lobortis augue velit, vel faucibus odio elementum et.
                Cras placerat consectetur libero, eu vestibulum magna posuere sed.
                Integer enim turpis, efficitur eget dignissim vel, lacinia eu magna.
              </p>
              <p>
                Ut placerat magna id diam hendrerit, a scelerisque massa rutrum.
                Pellentesque aliquet erat ut placerat tempor.
                Nulla quis leo consectetur, venenatis neque et, sodales arcu.
                Nullam at orci turpis. Etiam pulvinar nulla leo, ut tincidunt lacus suscipit at.
                Vestibulum elementum massa in laoreet tincidunt. Mauris et placerat erat.
              </p>
              <p>
                Curabitur quis felis finibus, vestibulum justo a, gravida magna.
                Aliquam id libero vitae dui elementum convallis. In at eros quam.
                Phasellus rhoncus, velit at aliquet convallis, quam ipsum sagittis orci,
                non pretium eros dui sit amet augue.
                Integer id lectus ac magna venenatis mollis.
                Integer sed massa venenatis, accumsan ligula id, mollis dolor.
                Fusce convallis at lacus vel tristique. Proin eu nibh euismod, semper erat lobortis, volutpat dolor.
                Praesent venenatis ipsum ut velit lacinia convallis.
                Aliquam elementum lorem eget ex iaculis vehicula ac nec libero.
                Aliquam euismod dolor at ipsum gravida feugiat.
              </p>
            </Col>
          </Row>
          <Row center="xs">
            <Col xs={12} md={8} lg={8}>
              <img src={aboutOMG} width="100%" alt="IOM"/>
            </Col>
          </Row>
          <Row center="xs">
            <Col xs={12} md={8} lg={8}>
              <p>
                Ut placerat magna id diam hendrerit, a scelerisque massa rutrum.
                Pellentesque aliquet erat ut placerat tempor. Nulla quis leo consectetur, venenatis neque et,
                sodales arcu. Nullam at orci turpis.
                Etiam pulvinar nulla leo, ut tincidunt lacus suscipit at.
                Vestibulum elementum massa in laoreet tincidunt. Mauris et placerat erat.
              </p>
              <p>
                Curabitur quis felis finibus, vestibulum justo a, gravida magna.
                Aliquam id libero vitae dui elementum convallis. In at eros quam.
                Phasellus rhoncus, velit at aliquet convallis, quam ipsum sagittis orci,
                non pretium eros dui sit amet augue. Integer id lectus ac magna venenatis mollis.
                Integer sed massa venenatis, accumsan ligula id, mollis dolor.
                Fusce convallis at lacus vel tristique.
                Proin eu nibh euismod, semper erat lobortis, volutpat dolor.
                Praesent venenatis ipsum ut velit lacinia convallis.
                Aliquam elementum lorem eget ex iaculis vehicula ac nec libero.
                Aliquam euismod dolor at ipsum gravida feugiat.
              </p>
            </Col>
          </Row>
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
    '& p, & h2': {
      textAlign: 'left',
    },
    '& p': {
      fontSize: 22,
      fontWeight: 300,
      padding: '8px 0',
      '@media (max-width: 776px)': {
        fontSize: 18,
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

const mapStateToProps = (state, ) => {
  return {
    organisationDocumentLinks: state.organisationDocumentLinks
  }
};

export default connect(mapStateToProps)(injectSheet(styles)(AboutContent));