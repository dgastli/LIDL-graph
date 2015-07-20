var React = require('react');


function shadow (element) {
  var node = document.createElement('span');
  var style = window.getComputedStyle(element);

  // set style
  node.style.fontFamily    = style.fontFamily;
  node.style.fontSize      = style.fontSize;
  node.style.fontStyle     = style.fontStyle;
  node.style.fontWeight    = style.fontWeight;
  node.style.fontKering    = style.fontKering;
  node.style.fontStretch   = style.fontStretch;
  node.style.letterSpacing = style.letterSpacing;
  node.style.textTransform = style.textTransform;

  node.style.position = 'absolute';
  node.style.top = '-100%';
  node.style.display = 'inline-block';
  node.style.padding = 0;
  node.style.whiteSpace = 'nowrap';

  node.style.width = 'auto';

  document.body.appendChild(node);

  return node;
}


// normalize input value
function normalize (value) {
  return (null === value ? '' : value + '');
}


module.exports=React.createClass({
  getDefaultProps: function () {
    return {
        className: 'react-input-autoresize',
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
