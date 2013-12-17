// Generated by CoffeeScript 1.6.3
(function() {
  var EventEmitter, InventoryToolbar,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  EventEmitter = (require('events')).EventEmitter;

  module.exports = function(game, opts) {
    return new InventoryToolbar(game, opts);
  };

  InventoryToolbar = (function(_super) {
    __extends(InventoryToolbar, _super);

    function InventoryToolbar(game, opts) {
      var _ref, _ref1, _ref2;
      this.game = game;
      if (opts == null) {
        opts = {};
      }
      this.toolbar = (function() {
        if ((_ref = opts.toolbar) != null) {
          return _ref;
        } else {
          throw 'voxel-inventory-toolbar requires "toolbar" option set to toolbar instance';
        }
      })();
      this.inventory = (function() {
        if ((_ref1 = opts.inventory) != null) {
          return _ref1;
        } else {
          throw 'voxel-inventory-toolbar requires "inventory" option set to inventory instance';
        }
      })();
      this.registry = (function() {
        if ((_ref2 = opts.registry) != null) {
          return _ref2;
        } else {
          throw 'voxel-inventory-toolbar requires "registry" option set to voxel-registry instance';
        }
      })();
      this.currentSlot = 0;
      this.enable();
    }

    InventoryToolbar.prototype.enable = function() {
      var _this = this;
      this.toolbar.on('select', this.select = function(slot) {
        return _this.currentSlot = slot;
      });
      this.refresh();
      return this.toolbar.el.style.visibility = '';
    };

    InventoryToolbar.prototype.disable = function() {
      this.toolbar.removeListener('select', this.select);
      return this.toolbar.el.style.visibility = 'hidden';
    };

    InventoryToolbar.prototype.give = function(itemPile) {
      var ret;
      ret = this.inventory.give(itemPile);
      this.refresh();
      return ret;
    };

    InventoryToolbar.prototype.take = function(itemPile) {
      var ret;
      ret = this.inventory.take(itemPile);
      this.refresh();
      return ret;
    };

    InventoryToolbar.prototype.takeHeld = function(count) {
      var ret;
      if (count == null) {
        count = 1;
      }
      ret = this.inventory.takeAt(this.currentSlot, count);
      this.refresh();
      return ret;
    };

    InventoryToolbar.prototype.held = function() {
      return this.inventory.slot(this.currentSlot);
    };

    InventoryToolbar.prototype.refresh = function() {
      var content, i, itemTexture, label, slot, _i, _len, _ref;
      content = [];
      _ref = this.inventory.array;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        slot = _ref[i];
        if (slot != null) {
          itemTexture = this.registry.getBlockProps(slot.item).itemTexture;
          if (slot.count === Infinity) {
            label = slot.item;
          } else {
            label = '' + slot.count;
          }
          content.push({
            icon: this.game.materials.texturePath + itemTexture + '.png',
            label: label,
            id: i
          });
        } else {
          content.push({
            id: i
          });
        }
      }
      return this.toolbar.updateContent(content);
    };

    return InventoryToolbar;

  })(EventEmitter);

}).call(this);
