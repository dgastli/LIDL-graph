/**
* @jsx React.DOM
*/

var React = require('react');
var mui = require('material-ui');
var PaperButton = mui.PaperButton;
var Paper = mui.Paper;
var IconButton = mui.IconButton;
var Toolbar = mui.Toolbar;
var Icon = mui.Icon;
var DropDownMenu=mui.DropDownMenu;
var DropDownIcon = mui.DropDownIcon;
var ToolbarGroup=mui.ToolbarGroup;

var SomeAwesomeComponent = React.createClass({

  render: function() {
    return (
      <Toolbar>
        <ToolbarGroup key={0} float="left">
          <Icon icon='av-play-arrow' />
          <Icon icon='av-pause' />
          <Icon icon='av-skip-next'  disabled={true}/>
          <Icon icon='social-share'/>
        </ToolbarGroup>
        <ToolbarGroup key={1} float="right">
          <Icon icon='mui-icon-pie' />
          <Icon icon='mui-icon-sort' />
          <DropDownIcon icon="navigation-expand-more" menuItems={[
            { payload: '1', text: 'Download' },
            { payload: '2', text: 'More Info' }
            ]}  />
          <span className="mui-toolbar-separator">&nbsp;</span>
          <PaperButton type={PaperButton.Types.RAISED} label="Compile"  primary={true} />
        </ToolbarGroup>
      </Toolbar>

    );
  }

});

module.exports = SomeAwesomeComponent;
