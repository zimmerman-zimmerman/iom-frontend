import React from 'react';
import { Menu, Dropdown } from 'antd';
import MdSort from 'react-icons/lib/md/sort';

class SortBy extends React.Component {
  state = {
    visible: false,
  };

  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  }

  render() {
    const { options, selectedKey, handleChange } = this.props;
    const menu = (
      <Menu onClick={e => handleChange(e.key)} selectedKeys={[selectedKey]}>
        {options.map(o => {
          return (
            <Menu.Item
              key={o.value}
            >
              {o.label}
            </Menu.Item>            
          );
        })}
      </Menu>
    );
    return (
      <Dropdown 
        overlay={menu}
        onVisibleChange={this.handleVisibleChange}
        visible={this.state.visible}
      >
        <MdSort color="#757575" />
      </Dropdown>
    );
  }
}

export default SortBy;