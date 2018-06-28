import React, { Component, Fragment } from 'react';
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
        <Row className={props.className} key={props.key}>
          <Col xs={12}>
            {props.children}
          </Col>
        </Row>
      )
    };

    const Field = (props) => {
      return (
        <Fragment>
          <strong><Trans id={props.name[0]} defaultMessage={props.name[1]} /></strong>
          <span className="value">{get(data, props.value, '-')}</span>
        </Fragment>
      )
    };

    const items = [
      <h2 className="Title"><Trans id="project.location.contact.title" defaultMessage="Contact info" /></h2>,
      <Field name={['project.location.contact.organisation', 'Organisation:']}
             value="contact_info[0].organisation.narratives[0].text"
      />,
      <Field name={['project.location.contact.phone', 'Phone number:']} value="contact_info[0].telephone" />,
      <Field name={['project.location.contact.email', 'Email:']} value="contact_info[0].email" />
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
    '& .value': {
      marginLeft: 10
    },
    marginBottom: 20
  }
};


export default injectSheet(styles)(connect(mapStateToProps)(ContactProject));