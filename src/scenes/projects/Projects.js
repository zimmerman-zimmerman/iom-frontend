import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";

import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      layouts: {}
    };
  }

  static get defaultProps() {
    return {
      className: "layout",
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 30
    };
  }

  render() {
    return (
      <div>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          layouts={this.state.layouts}
        >
          <div key="1" data-grid={{ w: 1, h: 1, x: 0, y: 0 }}>
            <span className="text">1</span>
          </div>
          <div key="2" data-grid={{ w: 1, h: 1, x: 1, y: 0 }}>
            <span className="text">2</span>
          </div>
          <div key="3" data-grid={{ w: 1, h: 1, x: 2, y: 0 }}>
            <span className="text">3</span>
          </div>
          <div key="4" data-grid={{ w: 1, h: 1, x: 3, y: 0 }}>
            <span className="text">4</span>
          </div>
          <div key="5" data-grid={{ w: 1, h: 1, x: 4, y: 0 }}>
            <span className="text">5</span>
          </div>
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

export default Projects;
