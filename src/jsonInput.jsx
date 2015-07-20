var React = require('react');
var Input = require('./fitInput.js');

module.exports = React.createClass({
    getInitialState: function() {
        return {data:this.props.data };
    },
    textChange: function(event) {
      console.log(event);
        this.setState({data: event});
    },
    booleanChange: function(event) {
        this.setState({data: event.target.checked});

    },
    numberChange: function(event) {
        this.setState({data: parseFloat(event)});

    },
    render: function() {
        if(typeof(this.state.data)=="string") {
            return <span>&quot;<Input type='text' value={this.state.data} onChange={this.textChange}></Input>&quot;</span>;
        } else if (typeof(this.state.data)=="boolean") {
            return <input type="checkbox" onClick={this.booleanChange} defaultChecked={this.state.data}></input>
        } else if ( typeof(this.state.data)=="number") {
            return <Input type='text' value={this.state.data} onChange={this.numberChange}></Input>;
        } else if (this.state.data instanceof Array) {
            var res=[];
            if(this.state.data.length>0) {
              res.push(<span key={0}><JSONInput data={this.state.data[0]} /></span>);
              for(var i=1;i< this.state.data.length;i++) {
                  res.push(<span key={i}>, <JSONInput data={this.state.data[i]} /></span>);
              }
            }
            return <span className="table">&#91; {res} &#93;</span>;
        } else if (this.state.data instanceof Object) {
            var res=[];
            var k=Object.keys(this.state.data);
            if(k.length>0) {
              key=k[0];
              res.push(<span key={key}>{key}:<JSONInput data={this.state.data[key]} /></span>);
              for(var i=1;i< k.length;i++) {
                  key=k[i];
                  res.push(<span key={key}>, {key}:<JSONInput data={this.state.data[key]} /></span>);
              }
            }
            return <span className="table">&#123; {res} &#125;</span>;
        } else {
            return <span>error</span>;
        }
    }
});
