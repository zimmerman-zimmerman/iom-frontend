import React from 'react';
import PropsType from 'prop-types';
import injectSheet from 'react-jss';
import {injectIntl} from "react-intl";
import { Collapse } from 'antd';
import { Row, Col } from 'react-flexbox-grid';

const Panel = Collapse.Panel;

const AccordionFilter = (props) => {
    const { classes, panels } = props;
    return (
        <Row className={classes.accordionFilter}>
            <Col xs={12}>
                <Collapse bordered={false} className={classes.accordionFilter}>
                    {panels.map((item, index) =>
                        <Panel header={item.headerString} key={index}>
                            {item.component}
                        </Panel>
                    )}
                </Collapse>
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

        },
        '& .ant-collapse-item': {
            borderTop: 'solid 1px #eaeaea',
            borderBottom: '0 !important',
            '& .ant-collapse-header': {
                fontFamily: 'Open Sans',
                fontSize: '20px',
                fontWeight: 'bold',
                fontStyle: 'normal',
                fontStretch: 'normal',
                lineHeight: '1.35',
                letterSpacing: 'normal',
                textAlign: 'left',
                color: '#262626',
                '& .arrow': {
                  marginLeft: '88%',
                    transform: 'rotate(90deg)',
                    color: '#418fde',
                    marginTop: '4px',
                },
            },
            '& .ant-collapse-header[aria-expanded="true"]': {
                '& .arrow': {
                    transform: 'rotate(270deg)',
                },
            },
        },
    }
};

export default injectSheet(styles)(injectIntl(AccordionFilter));