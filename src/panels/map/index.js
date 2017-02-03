"use strict";

var Panel = require('lens/reader').Panel;
var MapController = require('./map_controller');

var panel = new Panel({
  name: "map",
  type: 'resource',
  title: 'Mapa',
  icon: '',
});

panel.createController = function(doc) {
  return new MapController(doc, this.config);
};

module.exports = panel;
