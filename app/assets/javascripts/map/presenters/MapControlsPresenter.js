/**
 * The MapControlsPresenter class for the MapControlsPresenter view.
 *º
 * @return MapControlsPresenter class.
 */
define([
  'underscore',
  'mps',
  'map/presenters/PresenterClass'
], function(_, mps, PresenterClass) {

  'use strict';

  var MapControlsPresenter = PresenterClass.extend({

    init: function(view) {
      this.view = view;
      this._super();
    },

    // /**
    //  * Application subscriptions.
    //  */
    _subscriptions: [{
      'Map/set-zoom': function(zoom) {
        this.view.setZoom(zoom);
      }
    }],

    // *
    //  * Used by ToggleWidgets view to handle a fitbounds.
    //  *
    //  * @return {object} Map bounds

    // fitBounds: function(bounds) {
    //   mps.publish('Map/fit-bounds', [bounds]);
    // },

    // setCenter: function(lat, lng) {
    //   mps.publish('Map/set-center', [lat, lng]);
    // }

    /**
     * Used by MapView to delegate zoom change UI events. Results in the
     * Map/zoom-change event getting published with the new zoom.
     *
     * @param  {integer} zoom the new map zoom
     */
    onZoomChange: function(zoom) {
      mps.publish('Map/zoom-change', [zoom]);
      mps.publish('Place/update', [{go: false}]);
    },



  });

  return MapControlsPresenter;
});