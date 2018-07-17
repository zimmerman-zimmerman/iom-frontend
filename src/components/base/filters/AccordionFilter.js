import React from 'react';
import PropsType from 'prop-types';
import injectSheet from 'react-jss';
import {injectIntl} from "react-intl";
import Accordion from 'antd-mobile/es/accordion';
import { Row, Col } from 'react-flexbox-grid';

const AccordionFilter = (props) => {
  const { classes, panels } = props;
  return (
    <Row className={classes.accordionFilter}>
      <Col xs={12}>
        <Accordion className={classes.accordionFilter}>
          {panels.map((item, index) =>
            <Accordion.Panel header={item.headerString} key={index}>
              {item.component}
            </Accordion.Panel>
          )}
        </Accordion>
      </Col>
    </Row>
  )
};

AccordionFilter.propTypes = {
  rootComponent: PropsType.object,
  panels: PropsType.array,
};

const styles = {
  accordionFilter: {
    marginTop: 5,
    '& .am-accordion': {
      borderTop: 'none',
    },
    '& .am-accordion .am-accordion-item .am-accordion-header': {
      paddingLeft: 0,
      fontWeight: 'bold',
    },
    '& .am-accordion-header': {
      padding: '5px 0',
      '& i': {
        marginTop: 5,
      }
    },
    '& .am-accordion-content-box': {
      padding: '10px 0',
      borderBottom: '0 !important',

    }
  }
};

export default injectSheet(styles)(injectIntl(AccordionFilter));