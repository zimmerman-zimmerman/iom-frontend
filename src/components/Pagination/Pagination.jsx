import React from 'react';
import injectSheet from "react-jss";
import ReactPaginate from 'react-paginate';
import ArrowRight from '../../icons/ArrowRight';


const Pagination = (props) => (
        <ReactPaginate
            containerClassName={props.componentClass ? props.componentClass : props.classes.component}
            pageCount={props.pageCount}
            pageRangeDisplayed={5}
            onPageChange={props.onPageChange}
            marginPagesDisplayed={1}
            nextLabel={<ArrowRight className={props.classes.arrowRight} />}
            previousLabel={<ArrowRight className={props.classes.arrowLeft} />}
            pageClassName={props.classes.page}
            activeClassName={props.classes.activePage}
            nextClassName={props.classes.nextClassName}
            previousClassName={props.classes.previousClassName}
            disabledClassName={props.classes.disabledClassName}
            forcePage={props.forcePage}
            breakLabel={<div className={props.classes.elipsis}>...</div>}
            style={{margin: 0}}/>
);

const styles = {
  component: {
      margin: '46px auto 80px auto',
      width: 'fit-content',
      display: 'flex',
      listStyleType: 'none',
  },
    page: {
        color: '#444444',
        fontSize: 20,
        lineHeight: '24px',
        marginLeft: 6,
        marginRight: 6,
        '& a': {
            color: '#444444',
        },
    },
    activePage: {
        '& a': {
            color: '#ffffff',
        },
        marginLeft: 6,
        marginRight: 6,
        backgroundColor: '#173d8e',
        borderRadius: '1px',
        padding: '0 6px',
    },
    nextClassName: {
        fontSize: 14,
        marginTop: 'auto',
        marginLeft: 10,
    },
    previousClassName: {
        fontSize: 14,
        marginTop: 'auto',
        marginRight: 10,
    },
    arrowRight: {
        height: 15,
        width: 15,
        marginTop: 4,
    },
    arrowLeft: {
      transform: 'rotate(180deg)',
        marginTop: 4,
        height: 16,
        width: 16,
    },
    disabledClassName: {
      '& :hover':{
          cursor: 'not-allowed',
      },
      '& a': {
          '& svg': {
              fill: 'lightgray',
          },
      },
    },
    elipsis: {
        fontSize: 14,
      marginTop: 2,
    }
};

export default injectSheet(styles)(Pagination);