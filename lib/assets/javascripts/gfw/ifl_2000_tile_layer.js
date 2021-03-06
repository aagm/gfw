function Ifl_2000TileLayer(canvas_setup, filter) {
  this.tileSize = new google.maps.Size(256, 256);
  this.maxZoom = 19;
  this.name = "ifl_2000";
  this.alt = "Canvas ifl_2000 tile layer";
  this.tiles = {};
  this.canvas_setup = canvas_setup;
  this.filter = filter;
}

// create a tile with a canvas element
Ifl_2000TileLayer.prototype.create_tile_canvas = function(coord, zoom, ownerDocument) {
  // create canvas and reset style
  var canvas = ownerDocument.createElement('canvas');
  canvas.style.border  = "none";
  canvas.style.margin  = "0";
  canvas.style.padding = "0";

  // prepare canvas and context sizes
  var ctx = canvas.getContext('2d');
  ctx.width = canvas.width = this.tileSize.width;
  ctx.height = canvas.height = this.tileSize.height;

  //set unique id
  var tile_id = coord.x + '_' + coord.y + '_' + zoom;
  canvas.setAttribute('id', tile_id);
  if (tile_id in this.tiles) {
    delete this.tiles[tile_id];
  }

  this.tiles[tile_id] = canvas;

  // custom setup
  if (this.canvas_setup) {
    this.canvas_setup(canvas, coord, zoom);
  }

  return canvas;
}

Ifl_2000TileLayer.prototype.filter_tile = function(canvas) {
  var ctx = canvas.getContext('2d');
  ctx.drawImage(canvas.image, 0, 0);

  var I = ctx.getImageData(0, 0, canvas.width, canvas.height);
  this.filter.apply(this, [I.data, ctx.width, ctx.height]);
  ctx.putImageData(I,0,0);
}

// render visible tiles on a canvas, return a canvas object
// map: map where tiles are rendering
Ifl_2000TileLayer.prototype.composed = function(map, w, h) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  ctx.width = canvas.width = w || $(map).width();
  ctx.height = canvas.height = h || $(map).height();

  for(var i in this.tiles) {
    var t = this.tiles[i];
    var mpos = $(map).offset();
    var pos = $(t).offset();
    ctx.drawImage(t, pos.left - mpos.left, pos.top - mpos.top);
  }

  return canvas;
}

Ifl_2000TileLayer.prototype.filter_tiles = function() {
  var args = Array.prototype.slice.call(arguments);
  for(var c in this.tiles) {
    this.filter_tile(this.tiles[c], args);
  }
}
Ifl_2000TileLayer.prototype.getTile = function(coord, zoom, ownerDocument) {
  // could be called directly...
  return this.create_tile_canvas(coord, zoom, ownerDocument);
};

Ifl_2000TileLayer.prototype.releaseTile = function(tile) {
  var id = tile.getAttribute('id');
  delete this.tiles[id];
};

// optimized version for threshold rendering
function Ifl_2000TileLayerThreshold (canvas_setup, filter) {
  Ifl_2000TileLayer.call(this, canvas_setup, filter);
  this.threshold = 0;
  this.start_threshold = 0;
}


Ifl_2000TileLayerThreshold.prototype = new Ifl_2000TileLayer();

Ifl_2000TileLayerThreshold.prototype.filter_tiles = function() {
  var new_threshold = arguments[0];
  Ifl_2000TileLayer.prototype.filter_tiles.apply(this, arguments)
  this.threshold = new_threshold;
}

Ifl_2000TileLayerThreshold.prototype.filter_tile = function(canvas) {
  var ctx = canvas.getContext('2d');
  var coord = canvas.coord;

  if (canvas.coord) {
    var zsteps = coord.z - 11;

    if (zsteps > 0) {
      ctx['imageSmoothingEnabled'] = false;
      ctx['mozImageSmoothingEnabled'] = false;
      ctx['webkitImageSmoothingEnabled'] = false;

      var srcX = 256 / Math.pow(2, zsteps) * (coord.x % Math.pow(2, zsteps));
      var srcY = 256 / Math.pow(2, zsteps) * (coord.y % Math.pow(2, zsteps));
      var srcW = 256 / Math.pow(2, zsteps);
      var srcH = 256 / Math.pow(2, zsteps);
      ctx.clearRect(0, 0, 256, 256);
      ctx.drawImage(canvas.image, srcX, srcY, srcW, srcH, 0, 0, 256, 256);
    } else {
      try {
        ctx.drawImage(canvas.image, 0, 0);
      } catch(err) { }
    }

    var I = ctx.getImageData(0, 0, canvas.width, canvas.height);
    this.filter.apply(this, [I.data, ctx.width, ctx.height]);
    ctx.putImageData(I,0,0);
  }
}

var Ifl_2000 = function() {
  var me = { };

  function filter(image_data, w, h, year_start, year_end) {
    var components = 4;
    for(var i = 0; i < w; ++i) {
        for(var j = 0; j < h; ++j) {
          var pixelPos = (j * w + i) * components;
          var band = image_data[pixelPos];

              if(band===1 || band===10 ||  band===11 || band===12 ){
                  //degraded
                  image_data[pixelPos] = 151;
                  image_data[pixelPos + 1]  = 189;
                  image_data[pixelPos + 2] = 61;
                  image_data[pixelPos + 3] = 200;
              }else if(band===2 || band===4 || band===5 || band===6 || band===7 || band===8 || band===9 || band>12){
                  //intact
                  image_data[pixelPos] = 0;
                  image_data[pixelPos + 1]  = 122;
                  image_data[pixelPos + 2] = 77;
                  image_data[pixelPos + 3] = 200;

              }else{
                image_data[pixelPos + 3] = 0;
              }
            }
          }

  };

  function canvas_setup(canvas, coord, zoom) {
    var xhr = new XMLHttpRequest();

    var ctx = canvas.getContext('2d');

    var x = coord.x;
    var y = coord.y;
    var z = zoom;

    if (zoom > 11) {
      x = Math.floor(coord.x/(Math.pow(2, zoom - 11)));
      y = Math.floor(coord.y/(Math.pow(2, zoom - 11)));
      z = 11;
      } else {
        y = (y > Math.pow(2,z) ? y % Math.pow(2,z) : y);
        if (x >= Math.pow(2,z)) {
          x = x % Math.pow(2,z);
        } else if (x < 0) {
          x = Math.pow(2,z) - Math.abs(x);
        }
      }

    var url = 'https://wri-01.cartodb.com/tiles/ifl_2000/%z/%x/%y.png';
    var url = url.replace('%z', z).replace('%x', x).replace('%y', y);
    
    xhr.onload = function () {
      var url = URL.createObjectURL(this.response),
          image = new Image();

      image.onload = function () {
        image.crossOrigin = '';

        canvas.image = image;
        canvas.coord = coord;
        canvas.coord.z = zoom;

        ctx.drawImage(image, 0, 0);
        Ifl_2000.heightLayer.filter_tile(canvas);

        URL.revokeObjectURL(url);
      };

      image.src = url;
    };

    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.send();
  }

  me.init = function(map, callback) {
    this.map = map;
    this.heightLayer = new Ifl_2000TileLayerThreshold(canvas_setup, filter);
    this.map.overlayMapTypes.insertAt(0, this.heightLayer);

    if (typeof cover_extent !== 'undefined' && cover_extent.attributes['visible']) callback && callback();

    return me;
    //this.setup_ui();
  }

  me.show = function() {
    this.heightLayer = new Ifl_2000TileLayerThreshold(canvas_setup, filter);
    this.map.overlayMapTypes.insertAt(0, this.heightLayer);
  }

  me.hide = function() {
    var overlays_length = this.map.overlayMapTypes.getLength();

    if (overlays_length > 0) {
      for (var i = 0; i< overlays_length; i++) {
        var layer = this.map.overlayMapTypes.getAt(i);
        if (layer && layer.name == 'ifl_2000') this.map.overlayMapTypes.removeAt(i);
      }
    }
  }

  me.stop = function() {
    var overlays_length = this.map.overlayMapTypes.getLength();

    if (overlays_length > 0) {
      for (var i = 0; i< overlays_length; i++) {
        var layer = this.map.overlayMapTypes.getAt(i);
        if (layer && layer.name == 'ifl_2000') this.map.overlayMapTypes.removeAt(i);
      }
    }
  }

  return me;
}();