// Source:
// https://github.com/open-austin/austingreenmap/blob/master/client/js/components/GeoJsonUpdatable.jsx
// License: public domain. Thanks!

import PropTypes from "prop-types";
import { GeoJSON } from "react-leaflet";

class GeoJsonUpdatable extends GeoJSON {
  componentWillUpdate(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.leafletElement.clearLayers();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.leafletElement.addData(this.props.data);
    }
  }
}

GeoJsonUpdatable.displayName = "GeoJsonUpdatable";

GeoJsonUpdatable.propTypes = {
  data: PropTypes.object.isRequired
};
// GeoJsonUpdatable.defaultProps = {};

export default GeoJsonUpdatable;
