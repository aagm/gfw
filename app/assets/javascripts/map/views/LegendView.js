/**
 * Legend module.
 *
 * @return singleton instance of the legend class (extends Widget).
 */
define([
  'underscore',
  'handlebars',
  'views/Widget',
  'presenters/LegendPresenter',
  'text!templates/legend/legend.handlebars',
  'text!templates/legend/loss.handlebars'
], function(_, Handlebars, Widget, Presenter, tpl, lossTpl) {

  'use strict';

  var LegendView = Widget.extend({

    className: 'widget widget-legend',

    template: Handlebars.compile(tpl),

    /**
     * Optional layers detail templates.
     */
    detailTemplates: {
      umd_tree_loss_gain : _.template(lossTpl)
    },

    options: {
      hidden: true
    },

    events: function(){
      return _.extend({}, LegendView.__super__.events, {
        'click .widget-closed': '_toggleBoxClosed',
      });
    },

    initialize: function() {
      _.bindAll(this, 'update');
      this.presenter = new Presenter(this);
      LegendView.__super__.initialize.apply(this);
    },

    _setHidden: function() {
      LegendView.__super__._setHidden.apply(this);
    },

    /**
     * Render legends.
     *
     * @param  {array} layers
     */
    _renderLegend: function(layers) {
      var layersLength = 0;

      for (var i = 0; i < layers.length; i++) {
        layersLength += _.keys(layers[i]).length;
      }

      layers = _.map(layers, function(layer) {
        layer.sublayer = (layer.sublayer !== '') ? layer.sublayer : null;
        return layer;
      }, this);

      var html = this.template({
        layers: layers,
        layersLength: layersLength,
        detailTemplates: this.detailTemplates
      });

      this._update(html);
    },

    /**
     * Set widget from layers object.
     *
     * @param  {array} layers
     */
    update: function(layers) {
      if (layers.length === 0) {
        this.model.set('hidden', true);
      } else {
        this.model.set({'hidden': false, 'boxClosed': false});
        this._renderLegend(layers);
      }
    }

  });

  return LegendView;
});