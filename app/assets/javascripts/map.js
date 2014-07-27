/**
 * Application entry point.
 */
require([
  'utils',
  'backbone',
  'router',
  'services/AnalysisService',
  'mps',
  'services/CountryService',
  'services/DataService',
  '_string'
], function (utils, Backbone, router, as, mps, cs, ds) {
  'use strict';

  // CARTODB Hack
  cdb.core.Template.compilers = _.extend(cdb.core.Template.compilers, {
    handlebars: typeof(Handlebars) === 'undefined' ? null : Handlebars.compile
  });

  if (!Backbone.History.started) {
    Backbone.history.start({pushState: true});
  }

  // For dev
  window.analysis = as;
  window.countryService = cs;
  window.mps = mps;
  window.router = router;
  window.ds = ds;
});