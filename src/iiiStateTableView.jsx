




module.exports=React.createClass({
  getDefaultProps: function () {
    return {
      className: 'iii-state-table',
      type: 'text'
    };
  },

  getInitialState: function () {
    return {
      value: normalize(this.props.value)
    };
  },

  componentDidMount: function () {
    this.element = this.refs.input.getDOMNode();
    this.shadow = shadow(this.element);
    this.element.style.width = this.getWidth();
  },

  componentWillUnmount: function () {
    document.body.removeChild(this.shadow);
  },

  componentWillReceiveProps: function (props) {
    this.setState({ value: normalize(props.value) });
  },

  render: function () {
    var settings = {
      ref: 'input',
      style: { width: this.getWidth() },
      value: this.state.value,
      onKeyUp: this.onKeyUp,
      onChange: this.onChange
    };

    return <input {...this.props} {...settings} />;

  },

  onChange: function (event) {
    this.setState({ value: event.target.value });

    if ('function' == typeof this.props.onChange)
      this.props.onChange(event.target.value);
    },

    getWidth: function () {
      if (!this.shadow) return 0;
      var string = this.state.value;

      if (string === '' && this.props.placeholder)
        string = this.props.placeholder;

        // use non breaking space
        this.shadow.textContent = string.replace(/ /g, '\xA0');
        // add 1px for caret width
        return this.shadow.clientWidth + 1 + 'px';
      },

      focus: function () {
        this.element.focus();
      }
    });




<table>
<tr>
<th>Joe </th>
<th>Smith</th>
<th>50</th>
<th>50</th>
<th>50</th>
<th>LOL</th>
<th>Smith</th>
<th>50</th>
<th>50</th>
<th>50</th>
</tr>
<tr class="evenrow">
<td>Eve</td>
<td>Smith</td>
<td>50</td>
<td>50</td>
<td>50</td>
<td>Eve</td>
<td>Smith</td>
<td>50</td>
<td>50</td>
<td>50</td>
</tr>
<tr>
<td style="background-color:#ffbdbd">∅</td>
<td>Jackson</td>
<td>94</td>
<td>True</td>
<td>False</td>
<td>Eve</td>
<td>Smith</td>
<td>50</td>
<td>50</td>
<td>50</td>
</tr>
<tr class="evenrow">
<td style="background-color:#ffbdbd">∅</td>
<td>Smith</td>
<td>50</td>
<td>50</td>
<td>50</td>
<td style="background-color:#ffbdbd">∅</td>
<td>Smith</td>
<td>50</td>
<td>50</td>
<td>50</td>
</tr>
<tr>
<td>Eve</td>
<td>Jackson</td>
<td>94</td>
<td>True</td>
<td>False</td>
<td style="background-color:#ffbdbd">∅</td>
<td>Smith</td>
<td>50</td>
<td>50</td>
<td>50</td>
</tr>
<tr class="evenrow">
<td style="background-color:#ffbdbd">∅</td>
<td>Smith</td>
<td>Eve</td>
<td>Jackson</td>
<td>94</td>
<td>True</td>
<td>False</td>
<td>50</td>
<td>50</td>
<td>50</td>
</tr>
<tr>
<td>Eve</td>
<td>Jackson</td>
<td>94</td>
<td>Eve</td>
<td>Jackson</td>
<td>94</td>
<td>True</td>
<td>False</td>
<td>True</td>
<td>False</td>
</tr>
<tr class="evenrow">
<td>Eve</td>
<td>Smith</td>
<td>50</td>
<td>50</td>
<td>50</td>
<td>Eve</td>
<td>Smith</td>
<td>50</td>
<td>50</td>
<td>50</td>
</tr>
<tr>
<td style="background-color:#ffbdbd">∅</td>
<td>Jackson</td>
<td>94</td>
<td>True</td>
<td>False</td>
<td>Eve</td>
<td>Smith</td>
<td>50</td>
<td>50</td>
<td>50</td>
</tr>
<tr class="evenrow">
<td style="background-color:#ffbdbd">∅</td>
<td>Smith</td>
<td>50</td>
<td>50</td>
<td>50</td>
<td style="background-color:#ffbdbd">∅</td>
<td>Smith</td>
<td>50</td>
<td>50</td>
<td>50</td>
</tr>
<tr>
<td>Eve</td>
<td>Jackson</td>
<td>94</td>
<td>True</td>
<td>False</td>
<td style="background-color:#ffbdbd">∅</td>
<td>Smith</td>
<td>50</td>
<td>50</td>
<td>50</td>
</tr>
<tr class="evenrow">
<td style="background-color:#ffbdbd">∅</td>
<td>Smith</td>
<td>Eve</td>
<td>Jackson</td>
<td>94</td>
<td>True</td>
<td>False</td>
<td>50</td>
<td>50</td>
<td>50</td>
</tr>
<tr>
<td>Eve</td>
<td>Jackson</td>
<td>94</td>
<td>Eve</td>
<td>Jackson</td>
<td>94</td>
<td>True</td>
<td>False</td>
<td>True</td>
<td>False</td>
</tr>
</table>
