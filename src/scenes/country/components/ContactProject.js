import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import get from 'lodash/get';
import injectSheet from 'react-jss';

import * as actions from '../../../services/actions';
import Trans from '../../../locales/Trans';

class ContactProject extends Component {
  componentDidMount() {
    const { dispatch, id } = this.props;
    if (dispatch && id) {
      dispatch(actions.projectRequest(id));
    } else {
      dispatch(actions.projectInitial());
    }
  }

  render() {
    const data = get(this.props.project, 'data', null);

    const Line = (props) => {
      return (
        <Row className="line" key={props.key}>
          <Col xs={12}>
            {props.children}
          </Col>
        </Row>
      )
    };

    const Field = (props) => {
      return (
        <div className="field">
          <strong className="label"><Trans id={props.name[0]} defaultMessage={props.name[1]} /></strong>
            {props.name[1] === 'Website' &&
            <span className="value">
                <a href={get(data, 'contact_info[0].website','-').includes('http') ?
                      get(data, 'contact_info[0].website','-') :
                      'https://' + get(data, 'contact_info[0].website','-')}>
                    {get(data, props.value, '-')}
                </a>
            </span>}
            {props.name[1] !== 'Website' && <span className="value">{get(data, props.value, '-')}</span>}
        </div>
      )
    };

    const items = [
      <h2 className="Title"><Trans id="project.location.contact.title" defaultMessage="Contact info" /></h2>,
      <Field name={['project.location.contact.email', 'Email:']} value="contact_info[0].email" />,
      // <Field name={['project.location.contact.organisation', 'Organisation:']}
      //        value="contact_info[0].organisation.narratives[0].text"
      // />,
      // <Field name={['project.location.contact.phone', 'Phone number:']} value="contact_info[0].telephone" />,
      <Field name={['project.location.contact.address', 'Address:']} value="contact_info[0].mailing_address.narratives[0].text" />,
      <div className="field">
        <strong className="label"><Trans id='project.location.contact.website' defaultMessage='Website:' /></strong>
        <span className="value">
          <a href={`https://www.iom.int/countries/${this.props.code}`} target="_blank">
            https://www.iom.int/countries/{this.props.code}
          </a>
        </span>
      </div>
    ];

    return (
      <div className={this.props.classes.contactProject}>
        {items.map((item, index) => {
          return (
            <Line key={index}>
              {item}
            </Line>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (state, ) => {
  return {
    project: state.project,
  }
};

const styles = {
  contactProject: {
    '& .line': {
      marginBottom: 10,
    },
    '& .Title': {
      color: '#1f4283',
      fontSize: 26,
      fontWeight: 600,
      '@media (maxWidth: 767px)': {
        fontSize: 22,
      }
    },
    '& .field': {
      width: '100%',
      overflow: 'hidden',
      wordWrap: 'break-word',
    },
    '& .label': {
      fontSize: 22,
      fontWeight: 600,
      '@media (maxWidth: 776px)': {
        fontSize: 18,
      },
    },
    '& .value': {
      marginLeft: 10,
      fontSize: 22,
      '@media (maxWidth: 776px)': {
        fontSize: 18,
      },
    },
    marginBottom: 60
  }
};


export default injectSheet(styles)(connect(mapStateToProps)(ContactProject));