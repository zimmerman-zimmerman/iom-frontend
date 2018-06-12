import React from 'react';
import { injectIntl, intlShape } from "react-intl";

const Trans = (props) => {
  const { intl, id, text } = props;
  return intl.formatMessage({id: id, defaultMessage: text});
};

Trans.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(Trans);