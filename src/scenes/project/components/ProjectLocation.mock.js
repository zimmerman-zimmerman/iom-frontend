const data = {
    countryParams: {
        aggregations: 'activity_count,value',
        group_by: 'recipient_country',
        hierarchy: 1,
        reporting_organisation_identifier: process.env.REACT_APP_REPORTING_ORGANISATION_IDENTIFIER,
    },
};

export default data;