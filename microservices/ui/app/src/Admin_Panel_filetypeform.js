import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  customWidth: {
    width: 150,
  },
};


export default class SelectTheField extends Component {
  state = {
    value: 1,
  };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div>
        <SelectField
          floatingLabelText="File Type"
          value={this.state.value}
          onChange={this.handleChange}
        >
          <MenuItem value={1} primaryText="Text" />
          <MenuItem value={2} primaryText="Audio" />
          <MenuItem value={3} primaryText="Video" />
          <MenuItem value={4} primaryText="Image" />
        </SelectField>
      </div>
    )
  }
}