function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function ($) {
  var $ = jQuery = $;
  var cc = {
    sections: []
  };
  theme.Shopify = {
    formatMoney: function formatMoney(t, r) {
      function e(t, r) {
        return void 0 === t ? r : t;
      }

      function a(t, r, a, o) {
        if (r = e(r, 2), a = e(a, ","), o = e(o, "."), isNaN(t) || null == t) return 0;
        t = (t / 100).toFixed(r);
        var n = t.split(".");
        return n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + a) + (n[1] ? o + n[1] : "");
      }

      "string" == typeof t && (t = t.replace(".", ""));
      var o = "",
          n = /\{\{\s*(\w+)\s*\}\}/,
          i = r || this.money_format;

      switch (i.match(n)[1]) {
        case "amount":
          o = a(t, 2);
          break;

        case "amount_no_decimals":
          o = a(t, 0);
          break;

        case "amount_with_comma_separator":
          o = a(t, 2, ".", ",");
          break;

        case "amount_with_space_separator":
          o = a(t, 2, " ", ",");
          break;

        case "amount_with_period_and_space_separator":
          o = a(t, 2, " ", ".");
          break;

        case "amount_no_decimals_with_comma_separator":
          o = a(t, 0, ".", ",");
          break;

        case "amount_no_decimals_with_space_separator":
          o = a(t, 0, " ", "");
          break;

        case "amount_with_apostrophe_separator":
          o = a(t, 2, "'", ".");
      }

      return i.replace(n, o);
    },
    formatImage: function formatImage(originalImageUrl, format) {
      return originalImageUrl.replace(/^(.*)\.([^\.]*)$/g, '$1_' + format + '.$2');
    },
    Image: {
      imageSize: function imageSize(t) {
        var e = t.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/);
        return null !== e ? e[1] : null;
      },
      getSizedImageUrl: function getSizedImageUrl(t, e) {
        if (null == e) return t;
        if ("master" == e) return this.removeProtocol(t);
        var o = t.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);

        if (null != o) {
          var i = t.split(o[0]),
              r = o[0];
          return this.removeProtocol(i[0] + "_" + e + r);
        }

        return null;
      },
      removeProtocol: function removeProtocol(t) {
        return t.replace(/http(s)?:/, "");
      }
    }
  };
  theme.Sections = new function () {
    var _ = this;

    _._instances = [];
    _._sections = [];

    _.init = function () {
      $(document).on('shopify:section:load', function (e) {
        // load a new section
        var target = _._themeSectionTargetFromShopifySectionTarget(e.target);

        if (target) {
          _.sectionLoad(target);
        }
      }).on('shopify:section:unload', function (e) {
        // unload existing section
        var target = _._themeSectionTargetFromShopifySectionTarget(e.target);

        if (target) {
          _.sectionUnload(target);
        }
      });
    }; // register a type of section


    _.register = function (type, section, afterSectionLoadCallback, afterSectionUnloadCallback) {
      _._sections.push({
        type: type,
        section: section,
        afterSectionLoadCallback: afterSectionLoadCallback,
        afterSectionUnloadCallback: afterSectionUnloadCallback
      });

      $('[data-section-type="' + type + '"]').each(function () {
        _.sectionLoad(this);
      });
    }; // load in a section


    _.sectionLoad = function (target) {
      var target = target;

      var sectionObj = _._sectionForTarget(target);

      if (sectionObj.section) {
        var section = sectionObj.section;
      } else {
        var section = sectionObj;
      }

      if (section !== false) {
        _._instances.push({
          target: target,
          section: section
        });

        section.onSectionLoad(target);
        $(target).on('shopify:block:select', function (e) {
          _._callWith(section, 'onBlockSelect', e.target);
        }).on('shopify:block:deselect', function (e) {
          _._callWith(section, 'onBlockDeselect', e.target);
        });

        if (sectionObj.afterSectionLoadCallback) {
          sectionObj.afterSectionLoadCallback(target);
        }
      }
    }; // unload a section


    _.sectionUnload = function (target) {
      var sectionObj = _._sectionForTarget(target);

      var instanceIndex = -1;

      for (var i = 0; i < _._instances.length; i++) {
        if (_._instances[i].target == target) {
          instanceIndex = i;
        }
      }

      if (instanceIndex > -1) {
        $(target).off('shopify:block:select shopify:block:deselect');

        _._callWith(_._instances[instanceIndex].section, 'onSectionUnload', target);

        _._instances.splice(instanceIndex);

        if (sectionObj.afterSectionUnloadCallback) {
          sectionObj.afterSectionUnloadCallback(target);
        }
      }
    }; // helpers


    _._callWith = function (object, method, param) {
      if (typeof object[method] === 'function') {
        object[method](param);
      }
    };

    _._themeSectionTargetFromShopifySectionTarget = function (target) {
      var $target = $('[data-section-type]:first', target);

      if ($target.length > 0) {
        return $target[0];
      } else {
        return false;
      }
    };

    _._sectionForTarget = function (target) {
      var type = $(target).attr('data-section-type');

      for (var i = 0; i < _._sections.length; i++) {
        if (_._sections[i].type == type) {
          return _._sections[i];
        }
      }

      return false;
    };

    _._sectionAlreadyRegistered = function (type) {
      for (var i = 0; i < _._sections.length; i++) {
        if (_._sections[i].type == type) {
          return true;
        }
      }

      return false;
    };
  }(); // Loading third party scripts

  theme.scriptsLoaded = {};

  theme.loadScriptOnce = function (src, callback, beforeRun, sync) {
    if (typeof theme.scriptsLoaded[src] === 'undefined') {
      theme.scriptsLoaded[src] = [];
      var tag = document.createElement('script');
      tag.src = src;

      if (sync || beforeRun) {
        tag.async = false;
      }

      if (beforeRun) {
        beforeRun();
      }

      if (typeof callback === 'function') {
        theme.scriptsLoaded[src].push(callback);

        if (tag.readyState) {
          // IE, incl. IE9
          tag.onreadystatechange = function () {
            if (tag.readyState == "loaded" || tag.readyState == "complete") {
              tag.onreadystatechange = null;

              for (var i = 0; i < theme.scriptsLoaded[this].length; i++) {
                theme.scriptsLoaded[this][i]();
              }

              theme.scriptsLoaded[this] = true;
            }
          }.bind(src);
        } else {
          tag.onload = function () {
            // Other browsers
            for (var i = 0; i < theme.scriptsLoaded[this].length; i++) {
              theme.scriptsLoaded[this][i]();
            }

            theme.scriptsLoaded[this] = true;
          }.bind(src);
        }
      }

      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      return true;
    } else if (_typeof(theme.scriptsLoaded[src]) === 'object' && typeof callback === 'function') {
      theme.scriptsLoaded[src].push(callback);
    } else {
      if (typeof callback === 'function') {
        callback();
      }

      return false;
    }
  };

  theme.loadStyleOnce = function (src) {
    var srcWithoutProtocol = src.replace(/^https?:/, '');

    if (!document.querySelector('link[href="' + encodeURI(srcWithoutProtocol) + '"]')) {
      var tag = document.createElement('link');
      tag.href = srcWithoutProtocol;
      tag.rel = 'stylesheet';
      tag.type = 'text/css';
      var firstTag = document.getElementsByTagName('link')[0];
      firstTag.parentNode.insertBefore(tag, firstTag);
    }
  };

  theme.Disclosure = function () {
    var selectors = {
      disclosureList: '[data-disclosure-list]',
      disclosureToggle: '[data-disclosure-toggle]',
      disclosureInput: '[data-disclosure-input]',
      disclosureOptions: '[data-disclosure-option]'
    };
    var classes = {
      listVisible: 'disclosure-list--visible'
    };

    function Disclosure($disclosure) {
      this.$container = $disclosure;
      this.cache = {};

      this._cacheSelectors();

      this._connectOptions();

      this._connectToggle();

      this._onFocusOut();
    }

    Disclosure.prototype = $.extend({}, Disclosure.prototype, {
      _cacheSelectors: function _cacheSelectors() {
        this.cache = {
          $disclosureList: this.$container.find(selectors.disclosureList),
          $disclosureToggle: this.$container.find(selectors.disclosureToggle),
          $disclosureInput: this.$container.find(selectors.disclosureInput),
          $disclosureOptions: this.$container.find(selectors.disclosureOptions)
        };
      },
      _connectToggle: function _connectToggle() {
        this.cache.$disclosureToggle.on('click', function (evt) {
          var ariaExpanded = $(evt.currentTarget).attr('aria-expanded') === 'true';
          $(evt.currentTarget).attr('aria-expanded', !ariaExpanded);
          this.cache.$disclosureList.toggleClass(classes.listVisible);
        }.bind(this));
      },
      _connectOptions: function _connectOptions() {
        this.cache.$disclosureOptions.on('click', function (evt) {
          evt.preventDefault();

          this._submitForm($(evt.currentTarget).data('value'));
        }.bind(this));
      },
      _onFocusOut: function _onFocusOut() {
        this.cache.$disclosureToggle.on('focusout', function (evt) {
          var disclosureLostFocus = this.$container.has(evt.relatedTarget).length === 0;

          if (disclosureLostFocus) {
            this._hideList();
          }
        }.bind(this));
        this.cache.$disclosureList.on('focusout', function (evt) {
          var childInFocus = $(evt.currentTarget).has(evt.relatedTarget).length > 0;
          var isVisible = this.cache.$disclosureList.hasClass(classes.listVisible);

          if (isVisible && !childInFocus) {
            this._hideList();
          }
        }.bind(this));
        this.$container.on('keyup', function (evt) {
          if (evt.which !== 27) return; // escape

          this._hideList();

          this.cache.$disclosureToggle.focus();
        }.bind(this));

        this.bodyOnClick = function (evt) {
          var isOption = this.$container.has(evt.target).length > 0;
          var isVisible = this.cache.$disclosureList.hasClass(classes.listVisible);

          if (isVisible && !isOption) {
            this._hideList();
          }
        }.bind(this);

        $('body').on('click', this.bodyOnClick);
      },
      _submitForm: function _submitForm(value) {
        this.cache.$disclosureInput.val(value);
        this.$container.parents('form').submit();
      },
      _hideList: function _hideList() {
        this.cache.$disclosureList.removeClass(classes.listVisible);
        this.cache.$disclosureToggle.attr('aria-expanded', false);
      },
      unload: function unload() {
        $('body').off('click', this.bodyOnClick);
        this.cache.$disclosureOptions.off();
        this.cache.$disclosureToggle.off();
        this.cache.$disclosureList.off();
        this.$container.off();
      }
    });
    return Disclosure;
  }(); /// Show a short-lived text popup above an element


  theme.showQuickPopup = function (message, $origin) {
    var $popup = $('<div class="simple-popup"/>');
    var offs = $origin.offset();
    $popup.html(message).css({
      'left': offs.left,
      'top': offs.top
    }).hide();
    $('body').append($popup);
    $popup.css({
      marginTop: -$popup.outerHeight() - 10,
      marginLeft: -($popup.outerWidth() - $origin.outerWidth()) / 2
    });
    $popup.fadeIn(200).delay(3500).fadeOut(400, function () {
      $(this).remove();
    });
  }; // v1.0
  // jQuery.naturalWidth / jQuery.naturalHeight plugin for (already-loaded) images
  // Triple-licensed: Public Domain, MIT and WTFPL license - share and enjoy!


  (function ($) {
    function img(url) {
      var i = new Image();
      i.src = url;
      return i;
    }

    if ('naturalWidth' in new Image()) {
      $.fn.naturalWidth = function () {
        return this[0].naturalWidth;
      };

      $.fn.naturalHeight = function () {
        return this[0].naturalHeight;
      };

      return;
    }

    $.fn.naturalWidth = function () {
      return img(this.src).width;
    };

    $.fn.naturalHeight = function () {
      return img(this.src).height;
    };
  })(jQuery); //v1.0


  $.fn.sort = [].sort; //v1.0

  $.fn.replaceImageWithOneOfNewSrc = function (newSrc) {
    //Avoids blank.gif breaking imagesLoaded with Firefox event bug
    var newTag = $(this).clone().wrap('<div />').parent().html();
    newTag = newTag.replace(/(src=")([^"]*)/gi, "$1" + newSrc);
    var $newTag = $(newTag);
    $(this).after($newTag).remove();
    return $newTag;
  }; // v1.0
  //Fade out image, replace src, fade back in when loaded


  $.fn.fadeToAnotherImage = function (newSrc, callback) {
    var $img = $(this);
    var oldHeight = $img.height();
    var doFade = !$img.parent().hasClass('heightkeeper') && $img.attr('src') != newSrc;

    if (doFade) {
      $img.wrap($('<div class="heightkeeper" />').css({
        height: oldHeight,
        overflow: 'hidden'
      })).stop(true, true).animate({
        opacity: 0
      }, 200, function () {
        $img = $img.replaceImageWithOneOfNewSrc(newSrc);
        $img.imagesLoaded(function () {
          $img.stop(true, true).animate({
            opacity: 1
          }, 200);
          $img.parent().stop(true, true).animate({
            height: $img.height()
          }, 500, function () {
            $img.unwrap();
            if (callback) callback($img);
          });
        });
      });
      return true;
    } else {
      return false;
    }
  }; // v1.0


  $.fn.fadeOutAndRemove = function (speed, callback) {
    $(this).fadeOut(speed, function () {
      $(this).remove();
      typeof callback == 'function' && callback();
    });
  }; // Turn a <select> tag into clicky boxes
  // Use with: $('select').clickyBoxes()


  $.fn.clickyBoxes = function (prefix) {
    if (prefix == 'destroy') {
      $(this).off('.clickyboxes');
      $(this).next('.clickyboxes').off('.clickyboxes');
    } else {
      return $(this).filter('select:not(.clickybox-replaced)').addClass('clickybox-replaced').each(function () {
        //Make sure rows are unique
        var prefix = prefix || $(this).attr('id'); //Create container

        var $optCont = $('<ul class="clickyboxes"/>').attr('id', 'clickyboxes-' + prefix).data('select', $(this)).insertAfter(this);
        var $label;

        if ($(this).is('[id]')) {
          $label = $('label[for="' + $(this).attr('id') + '"]'); // Grab real label
        } else {
          $label = $(this).siblings('label'); // Rough guess
        }

        if ($label.length > 0) {
          $optCont.addClass('options-' + removeDiacritics($label.text()).toLowerCase().replace(/'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/-*$/, ''));
        } //Add options to container


        $(this).find('option').each(function () {
          $('<li/>').appendTo($optCont).append($('<a href="#"/>').attr('data-value', $(this).val()).html($(this).html()).addClass('opt--' + removeDiacritics($(this).text()).toLowerCase().replace(/'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/-*$/, '')));
        }); //Select change event

        $(this).hide().addClass('replaced').on('change.clickyboxes keyup.clickyboxes', function () {
          //Choose the right option to show
          var val = $(this).val();
          $optCont.find('a').removeClass('active').filter(function () {
            return $(this).attr('data-value') == val;
          }).addClass('active');
        }).trigger('keyup'); //Initial value
        //Button click event

        $optCont.on('click.clickyboxes', 'a', function () {
          if (!$(this).hasClass('active')) {
            var $clicky = $(this).closest('.clickyboxes');
            $clicky.data('select').val($(this).data('value')).trigger('change');
            $clicky.trigger('change');
          }

          return false;
        });
      });
    }
  }; // v1.0
  //Find out how wide scrollbars are on this browser


  $.scrollBarWidth = function () {
    var $temp = $('<div/>').css({
      width: 100,
      height: 100,
      overflow: 'scroll',
      position: 'absolute',
      top: -9999
    }).prependTo('body');
    var w = $temp[0].offsetWidth - $temp[0].clientWidth;
    $temp.remove();
    return w;
  }; //Restyle all select dropdowns
  //NOTE: Only for us on showcase until this can be replaced with jquery.selectreplace.v1.0.js


  var chevronDownIcon = '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/><path d="M0-.75h24v24H0z" fill="none"/></svg>';

  $.fn.selectReplace = function (leaveLabel) {
    return $(this).filter('select:not(.replaced, .noreplace)').each(function () {
      //Add formatting containers
      var $opts = $(this).find('option');
      var initialText = $opts.filter(':selected').length > 0 ? $opts.filter(':selected').text() : $opts.first().text();
      var $cont = $(this).addClass('replaced').wrap('<div class="pretty-select">').parent().addClass('id-' + $(this).attr('id')).append('<span class="text"><span class="value">' + initialText + '</span></span>' + chevronDownIcon); //Label? Move inside

      if ($(this).attr('id')) {
        //Find label
        var $label = $('label[for="' + $(this).attr('id') + '"]'); //If table cells used for layout, do not move the label

        var $selectTD = $(this).closest('td');
        var $labelTD = $label.closest('td');

        if (!leaveLabel && ($selectTD.length == 0 || $labelTD.length == 0 || $selectTD[0] == $labelTD[0])) {
          //Add to dropdown
          var $labelSpan = $('<span class="label">').html($label.html()).prependTo($cont.find('.text')); //Add colon, if it doesn't exist

          if ($labelSpan.slice(-1) != ':') {
            $labelSpan.append(':');
          } // remove label element and use aria


          $cont.find('select').attr('aria-label', $label.text());
          $label.remove();
        }
      }
    }).on('change keyup', function () {
      $(this).siblings('.text').find('.value').html($(this).find(':selected').html());
    });
  }; // Manage videos


  theme.VideoManager = new function () {
    var _ = this; // Youtube


    _.youtubeVars = {
      incrementor: 0,
      apiReady: false,
      videoData: {},
      toProcessSelector: '.video-container[data-video-type="youtube"]:not(.video--init)'
    };

    _.youtubeApiReady = function () {
      _.youtubeVars.apiReady = true;

      _._loadYoutubeVideos();
    };

    _._loadYoutubeVideos = function (container) {
      if ($(_.youtubeVars.toProcessSelector, container).length) {
        if (_.youtubeVars.apiReady) {
          // play those videos
          $(_.youtubeVars.toProcessSelector, container).addClass('video--init').each(function () {
            _.youtubeVars.incrementor++;
            var containerId = 'theme-yt-video-' + _.youtubeVars.incrementor;
            var videoElement = $('<div>').attr('id', containerId).appendTo(this);
            var autoplay = $(this).data('video-autoplay');
            var player = new YT.Player(containerId, {
              height: '390',
              width: '640',
              videoId: $(this).data('video-id'),
              playerVars: {
                iv_load_policy: 3,
                modestbranding: 1,
                autoplay: autoplay ? 1 : 0,
                rel: 0,
                showinfo: 0
              },
              events: {
                onReady: _._onYoutubePlayerReady.bind({
                  autoplay: autoplay
                }),
                onStateChange: _._onYoutubePlayerStateChange
              }
            });
            _.youtubeVars.videoData[containerId] = {
              id: containerId,
              container: this,
              videoElement: videoElement,
              player: player
            };
          });
        } else {
          // load api
          theme.loadScriptOnce('https://www.youtube.com/iframe_api');
        }
      }
    };

    _._onYoutubePlayerReady = function (event) {
      event.target.setPlaybackQuality('hd1080');

      if (this.autoplay) {
        event.target.mute();
      }
    };

    _._onYoutubePlayerStateChange = function (event) {};

    _._getYoutubeVideoData = function (event) {
      return _.youtubeVars.videoData[event.target.h.id];
    };

    _._unloadYoutubeVideos = function (container) {
      for (var dataKey in _.youtubeVars.videoData) {
        var data = _.youtubeVars.videoData[dataKey];

        if ($(container).find(data.container).length) {
          data.player.destroy();
          delete _.youtubeVars.videoData[dataKey];
          return;
        }
      }
    }; // Vimeo


    _.vimeoVars = {
      incrementor: 0,
      apiReady: false,
      videoData: {},
      toProcessSelector: '.video-container[data-video-type="vimeo"]:not(.video--init)'
    };

    _.vimeoApiReady = function () {
      _.vimeoVars.apiReady = true;

      _._loadVimeoVideos();
    };

    _._loadVimeoVideos = function (container) {
      if ($(_.vimeoVars.toProcessSelector, container).length) {
        if (_.vimeoVars.apiReady) {
          // play those videos
          $(_.vimeoVars.toProcessSelector, container).addClass('video--init').each(function () {
            _.vimeoVars.incrementor++;
            var $this = $(this);
            var containerId = 'theme-vi-video-' + _.vimeoVars.incrementor;
            var videoElement = $('<div>').attr('id', containerId).appendTo(this);
            var autoplay = !!$(this).data('video-autoplay');
            var player = new Vimeo.Player(containerId, {
              url: $(this).data('video-url'),
              width: 640,
              loop: false,
              autoplay: autoplay
            });
            player.ready().then(function () {
              if (autoplay) {
                player.setVolume(0);
              }

              if (player.element && player.element.width && player.element.height) {
                var ratio = parseInt(player.element.height) / parseInt(player.element.width);
                $this.css('padding-bottom', ratio * 100 + '%');
              }
            });
            _.vimeoVars.videoData[containerId] = {
              id: containerId,
              container: this,
              videoElement: videoElement,
              player: player,
              autoPlay: autoplay
            };
          });
        } else {
          // load api
          if (window.define) {
            // workaround for third parties using RequireJS
            theme.loadScriptOnce('https://player.vimeo.com/api/player.js', function () {
              _.vimeoVars.apiReady = true;

              _._loadVimeoVideos();

              window.define = window.tempDefine;
            }, function () {
              window.tempDefine = window.define;
              window.define = null;
            });
          } else {
            theme.loadScriptOnce('https://player.vimeo.com/api/player.js', function () {
              _.vimeoVars.apiReady = true;

              _._loadVimeoVideos();
            });
          }
        }
      }
    };

    _._unloadVimeoVideos = function (container) {
      for (var dataKey in _.vimeoVars.videoData) {
        var data = _.vimeoVars.videoData[dataKey];

        if ($(container).find(data.container).length) {
          data.player.unload();
          delete _.vimeoVars.videoData[dataKey];
          return;
        }
      }
    }; // Compatibility with Sections


    this.onSectionLoad = function (container) {
      _._loadYoutubeVideos(container);

      _._loadVimeoVideos(container); // play button


      $('.video-container__play', container).on('click', function (evt) {
        evt.preventDefault(); // reveal

        var $cover = $(this).closest('.video-container__cover').addClass('video-container__cover--playing'); // play

        var id = $cover.next().attr('id');

        if (id.indexOf('theme-yt-video') === 0) {
          _.youtubeVars.videoData[id].player.playVideo();
        } else {
          _.vimeoVars.videoData[id].player.play();
        }
      });
    };

    this.onSectionUnload = function (container) {
      $('.video-container__play', container).off('click');

      _._unloadYoutubeVideos(container);

      _._unloadVimeoVideos(container);
    };
  }(); // Youtube API callback

  window.onYouTubeIframeAPIReady = function () {
    theme.VideoManager.youtubeApiReady();
  }; // Register the section


  cc.sections.push({
    name: 'video',
    section: theme.VideoManager
  });
  theme.MapSection = new function () {
    var _ = this;

    _.config = {
      zoom: 14,
      styles: {
        "default": [],
        silver: [{
          "elementType": "geometry",
          "stylers": [{
            "color": "#f5f5f5"
          }]
        }, {
          "elementType": "labels.icon",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#616161"
          }]
        }, {
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#f5f5f5"
          }]
        }, {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#bdbdbd"
          }]
        }, {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [{
            "color": "#eeeeee"
          }]
        }, {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#757575"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [{
            "color": "#e5e5e5"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#9e9e9e"
          }]
        }, {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{
            "color": "#ffffff"
          }]
        }, {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#757575"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{
            "color": "#dadada"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#616161"
          }]
        }, {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#9e9e9e"
          }]
        }, {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [{
            "color": "#e5e5e5"
          }]
        }, {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [{
            "color": "#eeeeee"
          }]
        }, {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{
            "color": "#c9c9c9"
          }]
        }, {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#9e9e9e"
          }]
        }],
        retro: [{
          "elementType": "geometry",
          "stylers": [{
            "color": "#ebe3cd"
          }]
        }, {
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#523735"
          }]
        }, {
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#f5f1e6"
          }]
        }, {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#c9b2a6"
          }]
        }, {
          "featureType": "administrative.land_parcel",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#dcd2be"
          }]
        }, {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#ae9e90"
          }]
        }, {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [{
            "color": "#dfd2ae"
          }]
        }, {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [{
            "color": "#dfd2ae"
          }]
        }, {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#93817c"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#a5b076"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#447530"
          }]
        }, {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{
            "color": "#f5f1e6"
          }]
        }, {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [{
            "color": "#fdfcf8"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{
            "color": "#f8c967"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#e9bc62"
          }]
        }, {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [{
            "color": "#e98d58"
          }]
        }, {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#db8555"
          }]
        }, {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#806b63"
          }]
        }, {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [{
            "color": "#dfd2ae"
          }]
        }, {
          "featureType": "transit.line",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#8f7d77"
          }]
        }, {
          "featureType": "transit.line",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#ebe3cd"
          }]
        }, {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [{
            "color": "#dfd2ae"
          }]
        }, {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#b9d3c2"
          }]
        }, {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#92998d"
          }]
        }],
        dark: [{
          "elementType": "geometry",
          "stylers": [{
            "color": "#212121"
          }]
        }, {
          "elementType": "labels.icon",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#757575"
          }]
        }, {
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#212121"
          }]
        }, {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [{
            "color": "#757575"
          }]
        }, {
          "featureType": "administrative.country",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#9e9e9e"
          }]
        }, {
          "featureType": "administrative.land_parcel",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#bdbdbd"
          }]
        }, {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#757575"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [{
            "color": "#181818"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#616161"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#1b1b1b"
          }]
        }, {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#2c2c2c"
          }]
        }, {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#8a8a8a"
          }]
        }, {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [{
            "color": "#373737"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{
            "color": "#3c3c3c"
          }]
        }, {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [{
            "color": "#4e4e4e"
          }]
        }, {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#616161"
          }]
        }, {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#757575"
          }]
        }, {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{
            "color": "#000000"
          }]
        }, {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#3d3d3d"
          }]
        }],
        night: [{
          "elementType": "geometry",
          "stylers": [{
            "color": "#242f3e"
          }]
        }, {
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#746855"
          }]
        }, {
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#242f3e"
          }]
        }, {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#d59563"
          }]
        }, {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#d59563"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [{
            "color": "#263c3f"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#6b9a76"
          }]
        }, {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{
            "color": "#38414e"
          }]
        }, {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#212a37"
          }]
        }, {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#9ca5b3"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{
            "color": "#746855"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#1f2835"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#f3d19c"
          }]
        }, {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [{
            "color": "#2f3948"
          }]
        }, {
          "featureType": "transit.station",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#d59563"
          }]
        }, {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{
            "color": "#17263c"
          }]
        }, {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#515c6d"
          }]
        }, {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#17263c"
          }]
        }],
        aubergine: [{
          "elementType": "geometry",
          "stylers": [{
            "color": "#1d2c4d"
          }]
        }, {
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#8ec3b9"
          }]
        }, {
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#1a3646"
          }]
        }, {
          "featureType": "administrative.country",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#4b6878"
          }]
        }, {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#64779e"
          }]
        }, {
          "featureType": "administrative.province",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#4b6878"
          }]
        }, {
          "featureType": "landscape.man_made",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#334e87"
          }]
        }, {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [{
            "color": "#023e58"
          }]
        }, {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [{
            "color": "#283d6a"
          }]
        }, {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#6f9ba5"
          }]
        }, {
          "featureType": "poi",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#1d2c4d"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#023e58"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#3C7680"
          }]
        }, {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{
            "color": "#304a7d"
          }]
        }, {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#98a5be"
          }]
        }, {
          "featureType": "road",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#1d2c4d"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{
            "color": "#2c6675"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#255763"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#b0d5ce"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#023e58"
          }]
        }, {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#98a5be"
          }]
        }, {
          "featureType": "transit",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#1d2c4d"
          }]
        }, {
          "featureType": "transit.line",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#283d6a"
          }]
        }, {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [{
            "color": "#3a4762"
          }]
        }, {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{
            "color": "#0e1626"
          }]
        }, {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#4e6d70"
          }]
        }]
      }
    };
    _.apiStatus = null;
    _.mapsToLoad = [];

    this.geolocate = function ($map) {
      var deferred = $.Deferred();
      var geocoder = new google.maps.Geocoder();
      var address = $map.data('address-setting');
      geocoder.geocode({
        address: address
      }, function (results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
          deferred.reject(status);
        }

        deferred.resolve(results);
      });
      return deferred;
    };

    this.createMap = function (container) {
      var $map = $('.map-section__map-container', container);
      return _.geolocate($map).then(function (results) {
        var mapOptions = {
          zoom: _.config.zoom,
          styles: _.config.styles[$(container).data('map-style')],
          center: results[0].geometry.location,
          scrollwheel: false,
          disableDoubleClickZoom: true,
          disableDefaultUI: true,
          zoomControl: true
        };
        _.map = new google.maps.Map($map[0], mapOptions);
        _.center = _.map.getCenter();
        var marker = new google.maps.Marker({
          map: _.map,
          position: _.center,
          clickable: false
        });
        google.maps.event.addDomListener(window, 'resize', function () {
          google.maps.event.trigger(_.map, 'resize');

          _.map.setCenter(_.center);
        });
      }.bind(this)).fail(function () {
        var errorMessage;

        switch (status) {
          case 'ZERO_RESULTS':
            errorMessage = theme.strings.addressNoResults;
            break;

          case 'OVER_QUERY_LIMIT':
            errorMessage = theme.strings.addressQueryLimit;
            break;

          default:
            errorMessage = theme.strings.addressError;
            break;
        } // Only show error in the theme editor


        if (Shopify.designMode) {
          var $mapContainer = $map.parents('.map-section');
          $mapContainer.addClass('page-width map-section--load-error');
          $mapContainer.find('.map-section__wrapper').html('<div class="errors text-center">' + errorMessage + '</div>');
        }
      });
    };

    this.onSectionLoad = function (target) {
      var $container = $(target); // Global function called by Google on auth errors

      window.gm_authFailure = function () {
        if (!Shopify.designMode) return;
        $container.addClass('page-width map-section--load-error');
        $container.find('.map-section__wrapper').html('<div class="errors text-center">' + theme.strings.authError + '</div>');
      }; // create maps


      var key = $container.data('api-key');

      if (typeof key !== 'string' || key === '') {
        return;
      } // add to list of maps to assess


      _.mapsToLoad.push($container); // set up watcher for lazy-loading maps


      $(window).off('.themeMapSection').on('scroll.themeMapSection load.themeMapSection checkMapSections.themeMapSection', function () {
        // if any are on-screen
        $.each(_.mapsToLoad, function (index, $mapContainer) {
          if ($mapContainer !== false && $mapContainer.offset().top < $(window).scrollTop() + $(window).height() && $mapContainer.offset().top + $mapContainer.outerHeight() > $(window).scrollTop()) {
            _.mapsToLoad[index] = false; // load map

            theme.loadScriptOnce('https://maps.googleapis.com/maps/api/js?key=' + key, function () {
              _.createMap($mapContainer);
            });
          }
        });
      });
      $(window).trigger('checkMapSections');
    };

    this.onSectionUnload = function (target) {
      $(window).off('.themeMapSection');

      if (typeof window.google !== 'undefined' && typeof google.maps !== 'undefined') {
        google.maps.event.clearListeners(this.map, 'resize');
      }
    };
  }(); // Register the section

  cc.sections.push({
    name: 'map',
    section: theme.MapSection
  }); // A section that contains other sections, e.g. story page

  theme.NestedSectionsSection = new function () {
    this.onSectionLoad = function (container) {
      // load child sections
      $('[data-nested-section-type]', container).each(function () {
        var type = $(this).attr('data-nested-section-type');
        var section = null;

        for (var i = 0; i < theme.Sections._sections.length; i++) {
          if (theme.Sections._sections[i].type == type) {
            section = theme.Sections._sections[i].section;
          }
        }

        if (section) {
          theme.Sections._instances.push({
            target: this,
            section: section
          });

          section.onSectionLoad(this);
        }
      });
    };

    this.onSectionUnload = function (container) {
      // unload child sections
      $('[data-nested-section-type]', container).each(function () {
        theme.Sections.sectionUnload(this);
      });
    };

    this.onBlockSelect = function (target) {
      // scroll to block
      $(window).scrollTop($(target).offset().top - 100);
    };
  }(); // Register the section

  cc.sections.push({
    name: 'nested-sections',
    section: theme.NestedSectionsSection
  }); // ensure root_url ends in a slash

  if (!/\/$/.test(theme.routes.root_url)) theme.routes.root_url += '/';
  theme.icons = {
    left: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',
    right: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>',
    close: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>',
    chevronLightLeft: '<svg fill="#000000" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M 14.51,6.51 14,6 8,12 14,18 14.51,17.49 9.03,12 Z"></path></svg>',
    chevronLightRight: '<svg fill="#000000" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M 10,6 9.49,6.51 14.97,12 9.49,17.49 10,18 16,12 Z"></path></svg>',
    chevronLeft: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/><path d="M0-.5h24v24H0z" fill="none"/></svg>',
    chevronRight: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/><path d="M0-.25h24v24H0z" fill="none"/></svg>',
    chevronDown: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/><path d="M0-.75h24v24H0z" fill="none"/></svg>',
    tick: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
    add: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'
  };
  theme.HeaderSection = new function () {
    this.onSectionLoad = function (target) {
      theme.addControlPaddingToModal();
      theme.assessAltLogo();
      $('body').toggleClass('modal-active', $('.theme-modal.reveal').length > 0);
      $('#faux-site-control a', target).attr('tabindex', '-1');
      $('#page-menu a', target).attr('tabindex', '-1');
      $('#page-menu .main-nav li:has(ul)', target).addClass('has-children');
      $('#page-menu.nav-uses-modal .main-nav li.has-children > a', target).append('<span class="arr">' + theme.icons.chevronRight + '</span>');
      $('.disclosure', target).each(function () {
        $(this).data('disclosure', new theme.Disclosure($(this)));
      });
    };

    this.onSectionUnload = function (target) {
      $('.disclosure', target).each(function () {
        $(this).data('disclosure').unload();
      });
    };
  }();
  theme.FooterSection = new function () {
    this.onSectionLoad = function (container) {
      $('.disclosure', container).each(function () {
        $(this).data('disclosure', new theme.Disclosure($(this)));
      });
    };

    this.onSectionUnload = function (container) {
      $('.disclosure', container).each(function () {
        $(this).data('disclosure').unload();
      });
    };
  }();
  theme.SlideshowSection = new function () {
    var _ = this;

    _.checkTextOverImageLayout = function () {
      $('[data-section-type="slideshow"]').each(function () {
        var h = ''; // add header onto spacing calculations

        var stickyHeaderOffset = 0;

        if ($(this).offset().top == 0) {
          var $fixedHeader = $('#site-control.fixed');

          if ($fixedHeader.length) {
            stickyHeaderOffset += $fixedHeader.height();
          }
        }

        $('.slide', this).each(function () {
          var $overlay = $('.overlay', this);
          var $imageContainer = $('.rimage-outer-wrapper', this);
          var imageHeight = $('.rimage-wrapper', this).outerHeight();
          var textVerticalPadding = parseInt($overlay.css('padding-top'));
          var textHeight = $('.overlay__content', this).height() + textVerticalPadding * 2 + stickyHeaderOffset * 1.5;

          if (textHeight > imageHeight + 2) {
            // +2 for rounding errors
            h = Math.max(h, textHeight);
          }
        });
        $('.rimage-outer-wrapper', this).css('min-height', h);
      });
    };

    this.onSectionLoad = function (target) {
      $('.slideshow', target).each(function () {
        $(this).on('init', function () {
          $('.lazyload--manual', this).removeClass('lazyload--manual').addClass('lazyload');
        }).slick({
          autoplay: $(this).hasClass('auto-play'),
          fade: $(this).data('slideshow-transition') == 'fade',
          infinite: true,
          useTransform: true,
          arrows: false,
          dots: true,
          prevArrow: '<button type="button" class="slick-prev" aria-label="' + theme.strings.previous + '">' + theme.icons.chevronLightLeft + '</button>',
          nextArrow: '<button type="button" class="slick-next" aria-label="' + theme.strings.next + '">' + theme.icons.chevronLightRight + '</button>',
          lazyLoad: $(this).find('[data-lazy]').length > 0 ? 'ondemand' : null,
          autoplaySpeed: 7000,
          // milliseconds to wait between slides
          pauseOnHover: false,
          responsive: [{
            breakpoint: 1024,
            settings: {
              fade: false
            }
          }, {
            breakpoint: 768,
            settings: {
              fade: false,
              arrows: false,
              dots: true,
              lazyLoad: $(this).find('[data-lazy]').length > 0 ? 'progressive' : null
            }
          }]
        });
      });
      $(window).off('.slideshowSection');

      if ($('.overlay__content', target).length) {
        _.checkTextOverImageLayout();

        $(window).on('load.slideshowSection', _.checkTextOverImageLayout);
        $(window).on('debouncedresize.slideshowSection', _.checkTextOverImageLayout);
      }

      $(window).trigger('slideshowfillheight');
      theme.checkViewportFillers();
      theme.assessAltLogo();
    };

    this.onSectionUnload = function (target) {
      $('.slick-slider', target).slick('unslick').off('init');
      $(window).off('.slideshowSection');
    };

    this.onBlockSelect = function (target) {
      $(target).closest('.slick-slider').slick('slickGoTo', $(target).data('slick-index')).slick('slickPause');
    };

    this.onBlockDeselect = function (target) {
      $(target).closest('.slick-slider').slick('slickPlay');
    };
  }();
  theme.FeaturedBlogSection = new function () {
    this.onSectionLoad = function (target) {
      $('.slideshow', target).each(function () {
        $(this).on('init', function () {
          $('.lazyload--manual', this).removeClass('lazyload--manual').addClass('lazyload');
        }).slick({
          autoplay: $(this).hasClass('auto-play'),
          fade: $(this).data('slideshow-transition') == 'fade',
          infinite: true,
          useTransform: true,
          arrows: false,
          dots: false,
          responsive: [{
            breakpoint: 768,
            settings: {
              fade: false
            }
          }]
        });
      });
      $('.featured-blog__prev', target).on('click', function () {
        $(this).closest('.featured-blog').find('.slideshow').slick('slickPrev');
        return false;
      });
      $('.featured-blog__next', target).on('click', function () {
        $(this).closest('.featured-blog').find('.slideshow').slick('slickNext');
        return false;
      });
      $(window).trigger('slideshowfillheight');
      theme.checkViewportFillers();
      theme.assessAltLogo();
    };

    this.onSectionUnload = function (target) {
      $('.slick-slider', target).slick('unslick').off('init');
      $('.featured-blog__prev, .featured-blog__next', target).off('click');
    };
  }();
  theme.TextBesideImageSection = new function () {
    this.onSectionLoad = function (target) {
      /// Ensure image-beside-text sections look right
      $('.text-beside-image').trigger('assessImageBesideText');
    };
  }();
  theme.TextOverImageSection = new function () {
    var _ = this;

    _.checkTextOverImageHeights = function () {
      $('[data-section-type="text-over-image"], [data-nested-section-type="text-over-image"]').each(function () {
        var $imageContainer = $('.rimage-outer-wrapper', this);
        var imageHeight = $('.rimage-wrapper', this).outerHeight();
        var textVerticalPadding = parseInt($('.overlay', this).css('padding-top'));
        var textHeight = $('.overlay__content', this).height() + textVerticalPadding * 2;

        if (textHeight > imageHeight + 2) {
          // +2 for rounding errors
          $imageContainer.css('height', textHeight);
        } else {
          $imageContainer.css('height', '');
        }
      });
    };

    this.onSectionLoad = function (target) {
      $(window).off('.textOverImageSection');

      if ($('.overlay__content', target).length) {
        _.checkTextOverImageHeights();

        $(window).on('load.textOverImageSection', _.checkTextOverImageHeights);
        $(window).on('debouncedresize.textOverImageSection', _.checkTextOverImageHeights);
      }

      theme.checkViewportFillers();
    };

    this.onSectionUnload = function (target) {
      $(window).off('.textOverImageSection');
    };
  }();
  theme.ImageBesideImageSection = new function () {
    var _ = this;

    _.checkTextOverImageHeights = function () {
      $('.image-beside-image__image').each(function () {
        var $imageContainer = $('.rimage-outer-wrapper', this);
        var imageHeight = $('.rimage-wrapper', this).outerHeight();
        var textVerticalPadding = parseInt($('.overlay', this).css('padding-top'));
        var textHeight = $('.overlay__content', this).height() + textVerticalPadding * 2;

        if (textHeight > imageHeight + 2) {
          // +2 for rounding errors
          $imageContainer.css('height', textHeight);
        } else {
          $imageContainer.css('height', '');
        }
      });
    };

    this.onSectionLoad = function (target) {
      $(window).off('.imageBesideImageSection');

      if ($('.overlay__content', target).length) {
        _.checkTextOverImageHeights();

        $(window).on('load.imageBesideImageSection', _.checkTextOverImageHeights);
        $(window).on('debouncedresize.imageBesideImageSection', _.checkTextOverImageHeights);
      }

      theme.checkViewportFillers();
    };

    this.onSectionUnload = function (target) {
      $(window).off('.imageBesideImageSection');
    };
  }();
  theme.swipers = {};

  theme.ProductMediaGallery = function ($gallery, $thumbs, isFeaturedProduct) {
    var _this = this;

    var currentMedia;
    var initialisedMedia = {};
    var $viewInSpaceButton = $gallery.find('.view-in-space');
    var $swiperCont = $gallery.find('.swiper-container');
    var swiperHeightSet = false;
    var swiper;
    var preventSizeRedraw = false;

    this.Image = function ($elem, autoplay) {
      this.show = function () {
        $elem.addClass('product-media--activated');
        $elem.show();
      };

      this.play = function () {
        $gallery.find('.product-media--current').removeClass('product-media--current');
        $elem.addClass('product-media--current');
      };

      this.destroy = function () {};

      this.pause = function () {
        $elem.removeClass('product-media--activated');
      };

      this.hide = function () {
        $elem.hide();
      }; //Init the image


      this.show();
    };

    this.Video = function ($elem, autoplay) {
      var _video = this;

      var playerObj = {
        play: function play() {},
        pause: function pause() {},
        destroy: function destroy() {}
      };
      var videoElement = $elem.find('video')[0];

      this.show = function () {
        $elem.addClass('product-media--activated');
        $elem.show();

        _this.slideshowTabFix();
      };

      this.play = function () {
        $gallery.find('.product-media--current').removeClass('product-media--current');
        $elem.addClass('product-media--current');

        _video.show();

        playerObj.play();
      };

      this.pause = function () {
        playerObj.pause();
        $elem.removeClass('product-media--activated');
      };

      this.hide = function () {
        playerObj.pause();
        $elem.hide();
      };

      this.destroy = function () {
        playerObj.destroy();
        $(videoElement).off('playing', handlePlay);
        $(document).off('fullscreenchange', delayedSwiperResize);
      }; //Init the video


      theme.loadStyleOnce('https://cdn.shopify.com/shopifycloud/shopify-plyr/v1.0/shopify-plyr.css'); // set up a controller for Plyr video

      window.Shopify.loadFeatures([{
        name: 'video-ui',
        version: '1.0',
        onLoad: function () {
          playerObj = {
            playerType: 'html5',
            element: videoElement,
            plyr: new Shopify.Plyr(videoElement, {
              controls: ['play', 'progress', 'mute', 'volume', 'play-large', 'fullscreen'],
              loop: {
                active: $elem.data('enable-video-looping')
              },
              autoplay: $(window).width() >= 768 && autoplay,
              hideControlsOnPause: true,
              iconUrl: '//cdn.shopify.com/shopifycloud/shopify-plyr/v1.0/shopify-plyr.svg',
              tooltips: {
                controls: false,
                seek: true
              }
            }),
            play: function play() {
              this.plyr.play();
            },
            pause: function pause() {
              this.plyr.pause();
            },
            destroy: function destroy() {
              this.plyr.destroy();
            }
          };
          $elem.addClass('product-media--video-loaded'); // Disable swipe on the model

          $elem.find('.plyr__controls').addClass('swiper-no-swiping');
          initialisedMedia[$elem.data('media-id')] = _video;
        }.bind(this)
      }]);

      function handlePlay() {
        _this.pauseAllMedia($elem.data('media-id'));
      }

      $(videoElement).on('playing', handlePlay);

      function delayedSwiperResize(event) {
        preventSizeRedraw = true; // If not fullscreen

        if (window.innerHeight !== screen.height) {
          setTimeout(function () {
            preventSizeRedraw = true;
          }, 200);
        }
      } //When fullscreen ends, trigger a delayed resize to ensure swiper resets correctly


      $(document).on('fullscreenchange', delayedSwiperResize);

      _video.show();
    };

    this.ExternalVideo = function ($elem, autoplay) {
      var isPlaying = false;

      var _video = this;

      var playerObj = {
        play: function play() {},
        pause: function pause() {},
        destroy: function destroy() {}
      };
      var iframeElement = $elem.find('iframe')[0];

      this.play = function () {
        $gallery.find('.product-media--current').removeClass('product-media--current');
        $elem.addClass('product-media--current');

        _video.show();

        playerObj.play();
      };

      this.togglePlayPause = function () {
        if (isPlaying) {
          _video.pause();
        } else {
          _video.play();
        }
      };

      this.pause = function () {
        playerObj.pause();
        $elem.removeClass('product-media--activated');
      };

      this.show = function () {
        $elem.addClass('product-media--activated');
        $elem.show();

        _this.slideshowTabFix();
      };

      this.hide = function () {
        playerObj.pause();
        $elem.hide();
      };

      this.destroy = function () {
        playerObj.destroy();
        $elem.off('click', '.product-media--video-mask', _video.togglePlayPause);
      }; //Init the external video


      if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(iframeElement.src)) {
        var loadYoutubeVideo = function loadYoutubeVideo() {
          playerObj = {
            playerType: 'youtube',
            element: iframeElement,
            player: new YT.Player(iframeElement, {
              videoId: $elem.data('video-id'),
              events: {
                onReady: function onReady() {
                  initialisedMedia[$elem.data('media-id')] = _video;
                  $elem.addClass('product-media--video-loaded');

                  if (autoplay && $(window).width() >= 768) {
                    _video.play();
                  }
                },
                onStateChange: function onStateChange(event) {
                  if (event.data === 1) {
                    _this.pauseAllMedia($elem.data('media-id'));
                  }

                  isPlaying = event.data === YT.PlayerState.PLAYING || event.data === YT.PlayerState.BUFFERING || event.data === YT.PlayerState.UNSTARTED;

                  if (event.data === 0 && $elem.data('enable-video-looping')) {
                    event.target.seekTo(0);
                  }
                }
              }
            }),
            play: function play() {
              this.player.playVideo();
            },
            pause: function pause() {
              this.player.pauseVideo();
            },
            destroy: function destroy() {
              this.player.destroy();
            }
          };
        };

        if (window.YT && window.YT.Player) {
          loadYoutubeVideo();
        } else {
          // set up a controller for YouTube video
          var temp = window.onYouTubeIframeAPIReady;

          window.onYouTubeIframeAPIReady = function () {
            temp();
            loadYoutubeVideo();
          };

          theme.loadScriptOnce('https://www.youtube.com/iframe_api');
        }
      }

      $elem.on('click', '.product-media--video-mask', _video.togglePlayPause);

      _video.show();
    };

    this.Model = function ($elem, autoplay) {
      var _model = this;

      var playerObj = {
        play: function play() {},
        pause: function pause() {},
        destroy: function destroy() {}
      };
      var modelElement = $elem.find('model-viewer')[0];

      this.show = function () {
        $elem.show();
        $elem.addClass('product-media--activated');

        _this.slideshowTabFix();

        _model.updateViewInSpaceButton();
      };

      this.updateViewInSpaceButton = function () {
        if (window.ShopifyXR && $viewInSpaceButton.length) {
          //Change the view in space button to launch this model
          $viewInSpaceButton.attr('data-shopify-model3d-id', $elem.data('media-id'));
          window.ShopifyXR.setupXRElements();
        }
      };

      this.play = function () {
        $gallery.find('.product-media--current').removeClass('product-media--current');
        $elem.addClass('product-media--current');

        _model.show();

        playerObj.play();
      };

      this.pause = function () {
        $elem.removeClass('product-media--activated');
        playerObj.pause();
      };

      this.hide = function () {
        playerObj.pause();
        $elem.hide();

        if (window.ShopifyXR && $viewInSpaceButton.length) {
          //Reset the view in space button to launch the first model
          $viewInSpaceButton.attr('data-shopify-model3d-id', $viewInSpaceButton.data('shopify-model3d-first-id'));
          $viewInSpaceButton.attr('data-shopify-title', $viewInSpaceButton.data('shopify-first-title'));
          window.ShopifyXR.setupXRElements();
        }
      };

      this.destroy = function () {//Nothing needed
      };

      this.initAugmentedReality = function () {
        if ($('.model-json', $gallery).length) {
          var doInit = function doInit() {
            if (!window.ShopifyXR) {
              document.addEventListener('shopify_xr_initialized', function shopifyXrEventListener(event) {
                doInit(); //Ensure this only fires once

                event.target.removeEventListener(event.type, shopifyXrEventListener);
              });
              return;
            }

            window.ShopifyXR.addModels(JSON.parse($('.model-json', $gallery).html()));
            window.ShopifyXR.setupXRElements();
          };

          window.Shopify.loadFeatures([{
            name: 'shopify-xr',
            version: '1.0',
            onLoad: doInit
          }]);
        }
      }; //Init the model


      theme.loadStyleOnce('https://cdn.shopify.com/shopifycloud/model-viewer-ui/assets/v1.0/model-viewer-ui.css');
      window.Shopify.loadFeatures([{
        name: 'model-viewer-ui',
        version: '1.0',
        onLoad: function () {
          playerObj = new Shopify.ModelViewerUI(modelElement);
          $elem.addClass('product-media--model-loaded');

          if (autoplay && $(window).width() >= 768) {
            _model.play();
          } // add mouseup event proxy to fix carousel swipe gestures


          $('<div class="theme-event-proxy">').on('mouseup', function (e) {
            e.stopPropagation();
            e.preventDefault();
            document.dispatchEvent(new MouseEvent('mouseup'));
          }).appendTo($(this).find('.shopify-model-viewer-ui__controls-overlay')); // Prevent the buttons from submitting the form

          $elem.find('button').attr('type', 'button'); // Disable swipe on the model

          $elem.find('.shopify-model-viewer-ui').addClass('swiper-no-swiping');
        }.bind(this)
      }]);
      $elem.find('model-viewer').on('shopify_model_viewer_ui_toggle_play', function () {
        _this.pauseAllMedia($elem.data('media-id'));

        $elem.addClass('product-media-model--playing');
        $gallery.on('click', '.product-media:not([data-media-type="model"])', _model.pause);
      });
      $elem.find('model-viewer').on('shopify_model_viewer_ui_toggle_pause', function () {
        $elem.removeClass('product-media-model--playing');
        $gallery.off('click', '.product-media:not([data-media-type="model"])', _model.pause);
      });
      $elem.on('click', '.product-media--model-mask', function () {
        if (isFeaturedProduct) {
          //If we're on a featured product, delay the initialisation of the model until the current slide has changed
          _this.swipeToSlideIfNotCurrent($elem);

          setTimeout(_model.play, 500);
        } else {
          _model.play();
        }
      });
      initialisedMedia[$elem.data('media-id')] = _model;

      _model.show();

      if (!window.ShopifyXR) {
        _model.initAugmentedReality();
      }
    };

    this.pauseAllMedia = function (ignoreKey) {
      for (var key in initialisedMedia) {
        if (initialisedMedia.hasOwnProperty(key) && (!ignoreKey || key != ignoreKey)) {
          initialisedMedia[key].pause();
        }
      }
    };

    this.showMedia = function ($mediaToShow, autoplay, preventHide) {
      //In with the new
      if ($mediaToShow.length) {
        //Out with the old
        if (currentMedia && !preventHide) {
          currentMedia.pause();
        } //Function to instantiate and return the relevant media


        var getMedia = function getMedia(MediaType) {
          var media;

          if (initialisedMedia.hasOwnProperty($mediaToShow.data('media-id'))) {
            media = initialisedMedia[$mediaToShow.data('media-id')];

            if (autoplay && $(window).width() >= 768) {
              media.show(); //Delay play so its easier for users to understand that it paused

              setTimeout(media.play, 250);
            } else {
              media.show();
            }
          } else {
            media = new MediaType($mediaToShow, autoplay);
          }

          return media;
        }; //Initialise the media


        if ($mediaToShow.data('media-type') === "image") {
          currentMedia = getMedia(_this.Image);
        } else if ($mediaToShow.data('media-type') === "video") {
          currentMedia = getMedia(_this.Video);
        } else if ($mediaToShow.data('media-type') === "external_video") {
          currentMedia = getMedia(_this.ExternalVideo);
        } else if ($mediaToShow.data('media-type') === "model") {
          currentMedia = getMedia(_this.Model);
        } else {
          console.warn('Media is unknown', $mediaToShow);
          $gallery.find('.product-media:visible').hide();
          $mediaToShow.show();
        }
      }
    };

    this.swipeToSlideIfNotCurrent = function ($elem) {
      var $slide = $elem.closest('.swiper-slide');
      swiper.slideTo($slide.index(), 500);
    };

    this.destroy = function () {
      for (var i = 0; i < initialisedMedia.length; i++) {
        initialisedMedia[i].destroy();
      }

      if (!isFeaturedProduct) {
        $(window).off('doThemeGalleryResizeCheck.productTemplateGallery resize.productTemplateGallery', setSwiperHeightOnceOnMobile);
        $(window).off('orientationchange.productTemplateGallery', setSwiperContainerHeight);
        $(window).off('load.productTemplateGallery scroll.productTemplateGallery', detectHeaderOverGallery);
      }

      $gallery.off('variantImageSelected', _this.pauseAllMedia);

      if ($thumbs && $thumbs.length) {
        $thumbs.off('click');
      }
    };

    this.slideshowTabFix = function () {
      if (swiper) {
        // which slide are we going to?
        var $activeMedia = $swiperCont.find('.product-media--current'),
            $activeSlide = null;

        if ($activeMedia.length) {
          $activeSlide = $activeMedia.closest('.swiper-slide');
        } else {
          $activeSlide = $swiperCont.find('.swiper-slide.swiper-slide-active');
        } // tabindex everything to prevent tabbing into hidden slides


        $activeSlide.find('a, input, button, select, iframe, video, model-viewer, [tabindex]').each(function () {
          if (typeof $(this).data('theme-slideshow-original-tabindex') !== 'undefined') {
            if ($(this).data('theme-slideshow-original-tabindex') === false) {
              $(this).removeAttr('tabindex');
            } else {
              $(this).attr('tabindex', $(this).data('theme-slideshow-original-tabindex'));
            }
          } else {
            $(this).removeAttr('tabindex');
          }
        });
        $($swiperCont.find('.swiper-slide')).not($activeSlide).find('a, input, button, select, iframe, video, model-viewer, [tabindex]').each(function () {
          if (typeof $(this).data('theme-slideshow-original-tabindex') === 'undefined') {
            $(this).data('theme-slideshow-original-tabindex', typeof $(this).attr('tabindex') !== 'undefined' ? $(this).attr('tabindex') : false);
          }

          $(this).attr('tabindex', '-1');
        });
      }
    };

    function detectHeaderOverGallery() {
      $('body').toggleClass('header-over-gallery', $(window).scrollTop() < $gallery.height() - $('#site-control').outerHeight());
    } //Init all media


    $gallery.find('.product-media').each(function (index) {
      _this.showMedia($(this), false, true);
    }); //Init swiper

    var $swiperImages = $swiperCont.find('img');
    var $swiperExternalVideos = $swiperCont.find('[data-media-type="external_video"]'); //Forcefully set container & image heights to fix plugin

    function setSwiperContainerHeight(doOnce) {
      if ((doOnce && !swiperHeightSet || !doOnce) && preventSizeRedraw === false) {
        var galleryHeight = 400;

        if ($(window).width() > 767) {
          galleryHeight = $(window).height() - $('.product-detail .product-detail__upper').outerHeight() - $swiperCont.offset().top;
        }

        $swiperCont.height(galleryHeight); // set image dimensions (and reveal them)

        $swiperImages.each(function () {
          $(this).height(galleryHeight).width(galleryHeight * $(this).data('aspectratio'));
        }); // set external video dimensions

        $swiperExternalVideos.each(function () {
          $(this).width(galleryHeight * $(this).data('aspectratio'));
        });
        swiperHeightSet = true;
      }
    }

    function setSwiperHeightOnceOnMobile() {
      setSwiperContainerHeight($(window).width() < 1025);
    } // Bind listeners


    if (!isFeaturedProduct) {
      $(window).on('doThemeGalleryResizeCheck.productTemplateGallery resize.productTemplateGallery', function (e) {
        setTimeout(setSwiperHeightOnceOnMobile, 100);
      }).trigger('doThemeGalleryResizeCheck');
      setSwiperHeightOnceOnMobile();

      if ($(window).width() < 1025) {
        $(window).on('orientationchange.productTemplateGallery', setSwiperContainerHeight);
      } // indicate if header over the gallery


      $(window).on('load.productTemplateGallery scroll.productTemplateGallery', detectHeaderOverGallery);
    } else {
      // set external video dimensions for featured products
      $swiperExternalVideos.each(function () {
        $(this).width($gallery.outerHeight() * $(this).data('aspectratio'));
      });
    }

    $gallery.on('variantImageSelected', _this.pauseAllMedia); //Init swiper

    var swiperOpts = {
      mode: 'horizontal',
      loop: false,
      slidesPerView: 'auto',
      resizeReInit: true,
      centeredSlides: $gallery.find('img').length == 1,
      autoHeight: false,
      freeMode: true,
      freeModeFluid: true,
      scrollContainer: true,
      grabCursor: true,
      createPagination: false,
      preventClicks: false,
      navigation: {
        nextEl: $swiperCont.find('.swiper-button-next')[0],
        prevEl: $swiperCont.find('.swiper-button-prev')[0]
      },
      on: {
        slideChangeTransitionEnd: function slideChangeTransitionEnd(e) {
          // Update the view in space button on swipe
          if ($(window).width() < 768) {
            var $activeMedia = $gallery.find('.swiper-slide-active .product-media');
            var activeMediaObj = initialisedMedia[$activeMedia.data('media-id')];

            if (activeMediaObj) {
              if ($activeMedia.data('media-type') === 'model') {
                activeMediaObj.updateViewInSpaceButton();
              } else if (window.ShopifyXR && $viewInSpaceButton.length) {
                //Reset the view in space button to launch the first model
                $viewInSpaceButton.attr('data-shopify-model3d-id', $viewInSpaceButton.data('shopify-model3d-first-id'));
                $viewInSpaceButton.attr('data-shopify-title', $viewInSpaceButton.data('shopify-first-title'));
                window.ShopifyXR.setupXRElements();
              }
            }
          }

          _this.slideshowTabFix();
        }
      }
    };

    if ($gallery.find('.swiper-scrollbar').length) {
      var sectionClass = ''; //If we're in a featured product

      if ($gallery.closest('.featured-product').length) {
        var classes = $gallery.closest('.featured-product')[0].className.split(/\s+/);

        for (var i = 0; i < classes.length; i++) {
          if (classes[i].indexOf('section-id-') > -1) {
            sectionClass = '.' + classes[i] + ' ';
          }
        }
      }

      $.extend(swiperOpts, {
        scrollbar: sectionClass + '.swiper-scrollbar',
        scrollbarDraggable: false,
        scrollbarHide: false,
        scrollbarSnapOnRelease: true
      });
    }

    swiper = new Swiper($swiperCont, swiperOpts);
    var randomId = new Date().getTime();
    theme.swipers[randomId] = swiper;
    $swiperCont.attr('data-swiper-id', randomId);
    var startIndex = $gallery.find('.current-img').index();

    if (startIndex > 0) {
      swiper.slideTo(startIndex, 0);
    }

    if ($thumbs && $thumbs.length) {
      $thumbs.on('click', 'a', function () {
        var $media = $gallery.find('.product-media[data-media-id="' + $(this).closest('.theme-gallery-thumb').data('media-id') + '"]');
        swiper.slideTo($media.parent().index(), 800);

        _this.pauseAllMedia();

        setTimeout(function () {
          _this.showMedia($media, $(window).width() > 767, true);

          $('.product-media--activated iframe').focus();
        }, 1000);
        return false;
      });
    } //Disable swipe on single products within the featured product slider


    if (isFeaturedProduct && $gallery.hasClass('featured-product__gallery--single')) {
      $swiperCont.addClass('swiper-no-swiping');
    } //Fixes bug where the last slide gets cut off if its a model


    $(document).ready(function () {
      setTimeout(function () {
        $(window).trigger('resize');
        swiper.update(); //Autoplay the active slide on desktop

        if ($(window).width() > 767 && !isFeaturedProduct) {
          _this.showMedia($swiperCont.find('.swiper-slide.swiper-slide-active .product-media'), false, true);
        }

        if (isFeaturedProduct) {
          _this.slideshowTabFix();
        }
      }, isFeaturedProduct ? 3000 : 1000);
    });
  };

  theme.ProductTemplateSection = new function () {
    var galleries = [];

    this.onSectionLoad = function (target) {
      // header assessment first (affects gallery height)
      theme.checkViewportFillers();
      theme.assessAltLogo(); /// Product page upper gallery

      $('.theme-gallery', target).each(function () {
        galleries.push(new theme.ProductMediaGallery($(this), $('.theme-gallery-thumb', target), false));
      }); /// Carousels

      $('.carousel-wrapper .carousel:not(.slick-initialized)', target).each(function ($slick) {
        $(this).on('init reInit setPosition', function () {
          var lastSlide = $(this).find('.slick-slide:last');

          if (lastSlide.length > 0) {
            var slideInnerWidth = lastSlide.position().left + lastSlide.outerWidth(true);
            var $carouselWrapper = $(this).parent();
            var carouselWidth = $carouselWrapper.outerWidth(true);
            $carouselWrapper.css('margin-left', Math.max(0, carouselWidth - slideInnerWidth));

            if (carouselWidth > slideInnerWidth) {
              $(this).find('.slick-next, .slick-prev').addClass('theme-unnecessary').attr('tabindex', '-1');
            } else {
              $(this).find('.slick-next, .slick-prev').removeClass('theme-unnecessary').attr('tabindex', '0');
            }
          }
        }).on('init reInit setPosition', function ($slick) {
          $('.lazyload--manual', this).removeClass('lazyload--manual').addClass('lazyload');
          setTimeout(function () {
            $($slick.target).find('.slick-slide a').attr('tabindex', '0');
          });
        }).slick({
          autoplay: false,
          fade: false,
          infinite: false,
          useTransform: true,
          arrows: true,
          dots: false,
          slidesToShow: 1,
          centerMode: false,
          variableWidth: true,
          prevArrow: '<button type="button" class="slick-prev" aria-label="' + theme.strings.previous + '">' + theme.icons.chevronLeft + '</button>',
          nextArrow: '<button type="button" class="slick-next" aria-label="' + theme.strings.next + '">' + theme.icons.chevronRight + '</button>'
        });
      }); /// Product options

      theme.OptionManager.initProductOptions($('[name="id"]', target)); /// Boxed-options

      theme.convertOptionsToBoxes(target); /// Visual style of dropdowns

      $('select:not(.original-selector)').selectReplace().closest('.selector-wrapper').addClass('has-pretty-select'); /// Size chart

      $('.size-chart-link', target).on('click', function () {
        $.colorbox({
          inline: true,
          href: '#size-chart-content > .size-chart'
        });
        return false;
      }); // Related product layout

      $('.jiggly-split', target).trigger('columnflow');
    };

    this.onSectionUnload = function (target) {
      $(window).off('.productTemplateGallery');
      $('.theme-gallery-thumb', target).off('click');
      $('.carousel-wrapper .carousel', target).off('init reInit setPosition');
      $('.slick-slider', target).slick('unslick');
      $('.size-chart-link', target).off('click');
      theme.OptionManager.unloadProductOptions($('[name="id"]', target));

      if (galleries.length) {
        for (var i = 0; i < galleries.length; i++) {
          galleries[i].destroy();
        }
      }
    };
  }();
  theme.CollectionTemplateSection = new function () {
    this.onSectionLoad = function (target) {
      // Product layout
      $('.jiggly-split', target).trigger('columnflow'); // Infinite scroll

      theme.loadInfiniteScroll(target); // Sorting

      var $sortBy = $('#sort-by', target);

      if ($sortBy.length > 0) {
        queryParams = {};

        if (location.search.length) {
          for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
            aKeyValue = aCouples[i].split('=');

            if (aKeyValue.length > 1) {
              queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
            }
          }
        }

        $sortBy.val($sortBy.data('initval')).trigger('change').on('change', function () {
          queryParams.sort_by = $(this).val();
          location.search = $.param(queryParams);
        });
      } // Visual style of dropdowns


      $('select').selectReplace();
    };

    this.onSectionUnload = function (target) {
      $('#sort-by', target).off('change');
      theme.unloadInfiniteScroll();
    };
  }();
  theme.ListCollectionsSection = new function () {
    this.onSectionLoad = function (target) {
      $('.jiggly-split', target).trigger('columnflow');
    };
  }();
  theme.SearchTemplateSection = new function () {
    this.onSectionLoad = function (target) {
      $('.jiggly-split', target).trigger('columnflow');
      theme.loadInfiniteScroll(target);
    };

    this.onSectionUnload = function (target) {
      theme.unloadInfiniteScroll();
    };
  }();
  theme.BlogTemplateSection = new function () {
    this.onSectionLoad = function (target) {
      /// Visual style of dropdowns
      $('select').selectReplace();
      theme.allowRTEFullWidthImages(target);
    };
  }();
  theme.ArticleTemplateSection = new function () {
    this.onSectionLoad = function (target) {
      theme.allowRTEFullWidthImages(target);
    };
  }();
  theme.CartTemplateSection = new function () {
    this.onSectionLoad = function (target) {
      // terms and conditions checkbox
      if ($('#cartform input#terms', target).length > 0) {
        $(document).on('click.cartTemplateSection', '#cartform [name="checkout"]:submit, .additional-checkout-buttons :submit, .additional-checkout-buttons input[type=image], a[href="/checkout"]', function () {
          if ($('#cartform input#terms:checked').length == 0) {
            alert(theme.strings.cartConfirmation);
            return false;
          }
        });
      }
    };

    this.onSectionUnload = function (target) {
      $(document).off('.cartTemplateSection');
    };
  }();
  theme.FeaturedCollectionsSection = new function () {
    this.onSectionLoad = function (target) {
      $('.jiggly-split', target).trigger('columnflow');
    };
  }();
  theme.FeaturedProductsSection = new function () {
    this.onSectionLoad = function (target) {
      $('.jiggly-split', target).trigger('columnflow');
    };
  }();
  theme.FeaturedProductSection = new function () {
    var galleries = [];

    this.onSectionLoad = function (target) {
      // Swiping gallery
      var $gallery = $('.theme-gallery', target);

      if ($gallery.length) {
        // For all of these galleries - forcefully set image sizes to fix plugin
        $(window).off('.featuredProductGallery');
        $('.theme-gallery', target).each(function () {
          galleries.push(new theme.ProductMediaGallery($(this), null, true));
        });
      } /// Product options


      theme.OptionManager.initProductOptions($('[name="id"]', target)); /// Boxed-options

      theme.convertOptionsToBoxes(target); /// Visual style of dropdowns

      $('select:not(.original-selector)', target).selectReplace().closest('.selector-wrapper').addClass('has-pretty-select');
    };

    this.onSectionUnload = function (target) {
      if ($('.featured-product--with-gallery .theme-gallery').length == 0) {
        $(window).off('.featuredProductGallery');
      }

      theme.OptionManager.unloadProductOptions($('[name="id"]', target));

      if (galleries.length) {
        for (var i = 0; i < galleries.length; i++) {
          galleries[i].destroy();
        }
      }
    };
  }();

  theme.convertOptionsToBoxes = function (container) {
    // show box-style options
    var $form = $('select[name="id"]:first', container).closest('form');
    var $clickies = $form.find('select[data-make-box]').each(function () {
      $(this).find('option[value=""]').remove(); //Remove 'Pick a' option, if exists
    }).clickyBoxes().parent().addClass('has-clickyboxes'); // If we have clicky boxes, add the disabled-state to options that have no valid variants

    if ($clickies.length > 0) {
      var productData = theme.OptionManager.getProductData($form); // each option

      for (var optionIndex = 0; optionIndex < productData.options.length; optionIndex++) {
        // list each value for this option
        var optionValues = {};

        for (var variantIndex = 0; variantIndex < productData.variants.length; variantIndex++) {
          var variant = productData.variants[variantIndex];

          if (typeof optionValues[variant.options[optionIndex]] === 'undefined') {
            optionValues[variant.options[optionIndex]] = false;
          } // mark true if an option is available


          if (variant.available) {
            optionValues[variant.options[optionIndex]] = true;
          }
        } // mark any completely unavailable options


        for (var key in optionValues) {
          if (!optionValues[key]) {
            $('.selector-wrapper:eq(' + optionIndex + ') .clickyboxes li a', $form).filter(function () {
              return $(this).attr('data-value') == key;
            }).addClass('unavailable');
          }
        }
      }
    }
  };

  theme.allowRTEFullWidthImages = function (container) {
    $('.rte--allow-full-width-images p > img, .rte--allow-full-width-images div > img', container).each(function () {
      if ($(this).siblings().length == 0) {
        $(this).unwrap().wrap('<div class="no-side-pad">');
      }
    });
    $('.rte--allow-full-width-images p > a > img, .rte--allow-full-width-images div > a > img', container).each(function () {
      if ($(this).siblings().length == 0 && $(this).parent().siblings().length == 0) {
        $(this).parent().unwrap().wrap('<div class="no-side-pad">');
      }
    });
  };

  theme.loadInfiniteScroll = function (container) {
    /// Pagination-replacement
    $('.pagination.infiniscroll:not(.infinit)', container).addClass('infinit').each(function () {
      var waitForTrigger = $(this).hasClass('wait-for-trigger');
      var $pager = $('<div class="pager-button"><a href="#" aria-label="' + theme.strings.loadMore + '">' + theme.icons.chevronDown + '</a></div>');
      $(this).replaceWith($pager);
      $pager.find('a').attr('href', $(this).find('.next a').attr('href'));
      $pager.on('click', 'a', function (e) {
        if ($(this).hasClass('loading')) {
          return false;
        } //Show spinner


        $(this).addClass('loading'); //Load next page

        var $link = $(this);
        $.get($(this).attr('href'), function (data) {
          var $data = $($.parseHTML(data)); //Grab products & insert into page

          var indexOffset = $('.product-list .product-block').length;
          var $newProducts = $data.find('.product-list .product-block').hide().appendTo('.product-list').filter('.product-block').each(function (index) {
            $(this).removeAttr('data-loop-index').data('loop-index', indexOffset + index);
          }); //Sort by offset from the top
          //Fix height

          $('.product-list').height($('.product-list').height()); //Prep entry transitions

          $newProducts.addClass('pre-trans').css('display', ''); //Put everything in new column layout

          $('.jiggly-split').trigger('forcecolumnflow'); //Find total height to slide to

          var newHeight = 0;
          $('.product-list').children().each(function () {
            var h = $(this).position().top + $(this).height();
            if (h > newHeight) newHeight = h;
          }); //Slide down, reveal & prep for more

          $('.product-list').animate({
            height: newHeight
          }, 500, function () {
            $(this).css('height', ''); //At this point, we're ready to transition in & load more

            $newProducts.removeClass('pre-trans'); //Spin no more

            var $next = $data.find('.pagination .next a');

            if ($next.length == 0) {
              //We are out of products
              $pager.html('<span class="no-more">' + theme.strings.infiniteScrollNoMore + '</span>').fadeOut(5000);
            } else {
              //More to show
              $link.attr('href', $next.attr('href')).removeClass('loading');
            }
          });
        });
        return false;
      });

      if (!waitForTrigger) {
        //Infiniscroll
        $(window).on('scroll.infiniscroll', function () {
          if ($(window).scrollTop() + $(window).height() > $pager.offset().top) {
            $pager.find('a').trigger('click');
          }
        });
      }
    });
  };

  theme.unloadInfiniteScroll = function () {
    $(window).off('.infiniscroll');
  };

  theme.applyAjaxToProductForm = function ($form_param) {
    var shopifyAjaxAddURL = theme.routes.cart_add_url + '.js';
    var shopifyAjaxStorePageURL = theme.routes.search_url;
    $form_param.filter('[data-ajax-add-to-cart="true"]:not(.feedback-go_to_cart)').on('submit', function (e) {
      e.preventDefault();
      var $form = $(this); //Disable add button

      var $btn = $(this).find('[type=submit]').attr('disabled', 'disabled').addClass('confirmation');
      $btn.data('originalHtml', $btn.html()).html(theme.strings.productAddingToCart); //Add to cart

      $.post(shopifyAjaxAddURL, $form.serialize(), function (itemData) {
        //Enable add button
        $btn.html(theme.icons.tick + ' ' + theme.strings.productAddedToCart);
        setTimeout(function () {
          $btn.removeAttr('disabled').removeClass('confirmation').html($btn.data('originalHtml'));
        }, 4000);

        if ($form.hasClass('feedback-add_in_modal')) {
          showThemeModal(['<div id="added-to-cart" class="theme-modal align-centre top-padded" tabindex="-1">', '<div class="inner">', '<div class="container">', '<h4>', $.parseJSON(itemData).title, '</h4>', '<p>' + theme.strings.popupWasAdded + '</p>', '<p class="content-row"><a class="circled-icon" href="' + theme.routes.cart_url + '" aria-label="' + theme.strings.popupCheckout + '">', theme.icons.tick, '</a></p>', '<p class="links"><a href="#" data-modal-close>' + theme.strings.popupContinueShopping + '</a> &middot; <a href="' + theme.routes.cart_url + '">' + theme.strings.popupCheckout + '</a></p>', '</div>', '</div>', '</div>'].join(''));
        } //Update header summary


        $.get(shopifyAjaxStorePageURL, function (data) {
          var cartSummarySelector = '#site-control .cart';
          var $newCartObj = $($.parseHTML('<div>' + data + '</div>')).find(cartSummarySelector);
          var $currCart = $(cartSummarySelector);
          $currCart.replaceWith($newCartObj);
        });
      }, 'text').error(function (data) {
        //Enable add button
        $btn.removeAttr('disabled').removeClass('confirmation').html($btn.data('originalHtml')); //Not added, show message

        if (typeof data != 'undefined' && typeof data.status != 'undefined') {
          var jsonRes = $.parseJSON(data.responseText);
          theme.showQuickPopup(jsonRes.description, $btn);
        } else {
          //Some unknown error? Disable ajax and submit the old-fashioned way.
          $form.attr('ajax-add-to-cart', 'false').submit();
        }
      });
    });
  };

  theme.removeAjaxFromProductForm = function ($form_param) {
    $form_param.off('submit');
  }; // Manage option dropdowns


  theme.productData = {};
  theme.OptionManager = new function () {
    var _ = this;

    _._getVariantOptionElement = function (variant, $container) {
      return $container.find('select[name="id"] option[value="' + variant.id + '"]');
    };

    _.selectors = {
      container: '.product-area',
      gallery: '.theme-gallery',
      priceArea: '.price-area',
      submitButton: '.product-detail__form input[type=submit], .product-detail__form button[type=submit]',
      multiOption: '.option-selectors'
    };
    _.strings = {
      priceNonExistent: theme.strings.priceNonExistent,
      buttonDefault: theme.strings.buttonDefault,
      buttonNoStock: theme.strings.buttonNoStock,
      buttonNoVariant: theme.strings.buttonNoVariant,
      unitPriceSeparator: theme.strings.unitPriceSeparator
    };

    _._getString = function (key, variant) {
      var string = _.strings[key];

      if (variant) {
        string = string.replace('[PRICE]', '<span class="theme-money">' + theme.Shopify.formatMoney(variant.price, theme.money_format) + '</span>');
      }

      return string;
    };

    _.getProductData = function ($form) {
      var productId = $form.data('product-id');
      var data = null;

      if (!theme.productData[productId]) {
        theme.productData[productId] = JSON.parse(document.getElementById('ProductJson-' + productId).innerHTML);
      }

      data = theme.productData[productId];

      if (!data) {
        console.log('Product data missing (id: ' + $form.data('product-id') + ')');
      }

      return data;
    };

    _.getBaseUnit = function (variant) {
      return variant.unit_price_measurement.reference_value === 1 ? variant.unit_price_measurement.reference_unit : variant.unit_price_measurement.reference_value + variant.unit_price_measurement.reference_unit;
    }, _.addVariantUrlToHistory = function (variant) {
      if (variant) {
        var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + variant.id;
        window.history.replaceState({
          path: newurl
        }, '', newurl);
      }
    };

    _.updateSku = function (variant, $container) {
      $container.find('.sku .sku__value').html(variant ? variant.sku : '');
      $container.find('.sku').toggleClass('sku--no-sku', !variant || !variant.sku);
    };

    _.updateBarcode = function (variant, $container) {
      $container.find('.barcode .barcode__value').html(variant ? variant.barcode : '');
      $container.find('.barcode').toggleClass('barcode--no-barcode', !variant || !variant.barcode);
    };

    _.updateBackorder = function (variant, $container) {
      var $backorder = $container.find('.backorder');

      if ($backorder.length) {
        if (variant && variant.available) {
          if (variant.inventory_management && _._getVariantOptionElement(variant, $container).data('stock') == 'out') {
            var productData = _.getProductData($backorder.closest('form'));

            $backorder.find('.selected-variant').html(productData.title + (variant.title.indexOf('Default') >= 0 ? '' : ' - ' + variant.title));
            $backorder.show();
          } else {
            $backorder.hide();
          }
        } else {
          $backorder.hide();
        }
      }
    };

    _.updatePrice = function (variant, $container) {
      var $priceArea = $container.find(_.selectors.priceArea);
      $priceArea.removeClass('on-sale');

      if (variant) {
        var $newPriceArea = $('<div>');
        $('<span class="current-price theme-money">').html(theme.Shopify.formatMoney(variant.price, theme.money_format)).appendTo($newPriceArea);

        if (variant.compare_at_price > variant.price) {
          $newPriceArea.append(' ');
          $('<span class="was-price theme-money">').html(theme.Shopify.formatMoney(variant.compare_at_price, theme.money_format)).appendTo($newPriceArea);
          $priceArea.addClass('on-sale');
        }

        if (variant.unit_price_measurement) {
          var $newUnitPriceArea = $('<div class="unit-price">').appendTo($newPriceArea);
          $('<span class="unit-price__price theme-money">').html(theme.Shopify.formatMoney(variant.unit_price, theme.money_format)).appendTo($newUnitPriceArea);
          $('<span class="unit-price__separator">').html(_._getString('unitPriceSeparator')).appendTo($newUnitPriceArea);
          $('<span class="unit-price__unit">').html(_.getBaseUnit(variant)).appendTo($newUnitPriceArea);
        }

        $priceArea.html($newPriceArea.html());
      } else {
        $priceArea.html(_._getString('priceNonExistent', variant));
      }
    };

    _._updateButtonText = function ($button, string, variant) {
      $button.each(function () {
        var newVal;
        newVal = _._getString('button' + string, variant);

        if (newVal !== false) {
          if ($(this).is('input')) {
            $(this).val(newVal);
          } else {
            $(this).html(newVal);
          }
        }
      });
    };

    _.updateButtons = function (variant, $container) {
      var $button = $container.find(_.selectors.submitButton);

      if (variant && variant.available == true) {
        $button.removeAttr('disabled');

        _._updateButtonText($button, 'Default', variant);
      } else {
        $button.attr('disabled', 'disabled');

        if (variant) {
          _._updateButtonText($button, 'NoStock', variant);
        } else {
          _._updateButtonText($button, 'NoVariant', variant);
        }
      }
    };

    _.updateContainerStatusClasses = function (variant, $container) {
      $container.toggleClass('variant-status--unavailable', !variant.available);
      $container.toggleClass('variant-status--backorder', variant.available && variant.inventory_management && _._getVariantOptionElement(variant, $container).data('stock') == 'out');
    };

    _.initProductOptions = function (originalInput) {
      $(originalInput).not('.theme-init').addClass('theme-init').each(function () {
        var $originalInput = $(this);

        if ($originalInput.is('select')) {
          var productData = _.getProductData($originalInput.closest('form')); // change state for original dropdown


          $originalInput.on('change.themeProductOptions firstrun.themeProductOptions', function (e, variant) {
            if ($(this).is('input[type=radio]:not(:checked)')) {
              return; // handle radios - only update for checked
            }

            var variant = variant;

            if (!variant && variant !== false) {
              for (var i = 0; i < productData.variants.length; i++) {
                if (productData.variants[i].id == $(this).val()) {
                  variant = productData.variants[i];
                }
              }
            }

            var $container = $(this).closest(_.selectors.container); // update price

            _.updatePrice(variant, $container); // update buttons


            _.updateButtons(variant, $container); // variant images


            if (variant && variant.featured_media) {
              $container.find(_.selectors.gallery).trigger('variantImageSelected', variant);
            } // extra details


            _.updateBarcode(variant, $container);

            _.updateSku(variant, $container);

            _.updateBackorder(variant, $container);

            _.updateContainerStatusClasses(variant, $container); // variant urls


            var $form = $(this).closest('form');

            if ($form.data('enable-history-state') && e.type == 'change') {
              _.addVariantUrlToHistory(variant);
            } // notify quickbuy of content change


            $container.find('.quickbuy-container').trigger('changedsize');
          }); // split-options wrapper

          $originalInput.closest(_.selectors.container).find(_.selectors.multiOption).on('change.themeProductOptions', 'select', function () {
            var selectedOptions = [];
            $(this).closest(_.selectors.multiOption).find('select').each(function () {
              selectedOptions.push($(this).val());
            }); // find variant

            var variant = false;

            for (var i = 0; i < productData.variants.length; i++) {
              var v = productData.variants[i];
              var matchCount = 0;

              for (var j = 0; j < selectedOptions.length; j++) {
                if (v.options[j] == selectedOptions[j]) {
                  matchCount++;
                }
              }

              if (matchCount == selectedOptions.length) {
                variant = v;
                break;
              }
            } // trigger change


            if (variant) {
              $originalInput.val(variant.id);
            }

            $originalInput.trigger('change', variant);
          }); // first-run

          $originalInput.trigger('firstrun');
        } // ajax


        theme.applyAjaxToProductForm($originalInput.closest('form'));
      });
    };

    _.unloadProductOptions = function (originalInput) {
      $(originalInput).removeClass('theme-init').each(function () {
        $(this).trigger('unloading').off('.themeProductOptions');
        $(this).closest(_.selectors.container).find(_.selectors.multiOption).off('.themeProductOptions');
        theme.removeAjaxFromProductForm($(this).closest('form'));
      });
    };
  }();

  theme.addControlPaddingToModal = function () {
    $('.theme-modal.reveal > .inner').css('padding-top', $('#site-control').outerHeight());
  };

  theme.browserHas3DTransforms = function () {
    var el = document.createElement('p'),
        has3d,
        transforms = {
      'webkitTransform': '-webkit-transform',
      'OTransform': '-o-transform',
      'msTransform': '-ms-transform',
      'MozTransform': '-moz-transform',
      'transform': 'transform'
    }; // Add it to the body to get the computed style.

    document.body.insertBefore(el, null);

    for (var t in transforms) {
      if (el.style[t] !== undefined) {
        el.style[t] = "translate3d(1px,1px,1px)";
        has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
      }
    }

    document.body.removeChild(el);
    return has3d !== undefined && has3d.length > 0 && has3d !== "none";
  };

  if (theme.browserHas3DTransforms()) {
    $('html').addClass('supports-transforms');
  }

  jQuery(function ($) {
    /// Gallery variant images
    $(document).on('variantImageSelected', '.theme-gallery', function (e, args) {
      var $swiperImgLinks = $('.swiper-container:first .swiper-slide .product-media', this);
      var swiperId = $('.swiper-container:first', this).data('swiper-id');
      var swiper = theme.swipers[swiperId];

      if (swiper) {
        var toMatch = args.featured_media.id;
        var $match = $swiperImgLinks.filter(function () {
          return $(this).data('media-id') == toMatch;
        }).first();

        if ($match.length) {
          setTimeout(function () {
            swiper.update();
            swiper.slideTo($match.parent().index(), 1000);
          }, args.eventType === 'firstrun' ? 1500 : 0); //Above: If its the first page load, wait 1.5s for media to load
        }
      }
    }); /// Product columns

    $(document).on('columnflow', '.jiggly-split:not(rows-)', function () {
      var $oldCols = $(this).children('.column');
      var $products = $(this).find('.product-block').sort(function (a, b) {
        return $(a).data('loop-index') - $(b).data('loop-index');
      });
      var numNewCols = 0;
      if ($(this).hasClass('dynamic-col-2')) numNewCols = 2;
      if ($(this).hasClass('dynamic-col-3')) numNewCols = 3;
      if ($(this).hasClass('dynamic-col-4')) numNewCols = 4; //Override with media query CSS

      if ($(this).css('min-height') == '1px') {
        numNewCols = 0;
      }

      if (numNewCols != $(this).data('prevColCount')) {
        if (numNewCols == 0) {
          $(this).append($products);
        } else {
          //Create each column
          var newCols = [];

          for (var i = 0; i < numNewCols; i++) {
            var widthClass;
            if (numNewCols == 2) widthClass = 'half';
            if (numNewCols == 3) widthClass = 'third';
            if (numNewCols == 4) widthClass = 'quarter';
            newCols.push($('<div class="column"/>').addClass(widthClass).addClass('col-' + (i + 1)).appendTo(this));
          } //Fill them up based on height of each col


          $products.each(function () {
            //Get shortest
            var $shortestCol = $(newCols[0]);
            var shortestHeight = $shortestCol.height();
            var it = 0;

            for (var j = 1; j < newCols.length; j++) {
              it = j;
              var thisHeight = $(newCols[j]).height();

              if (thisHeight < shortestHeight) {
                $shortestCol = $(newCols[j]);
                shortestHeight = thisHeight;
              }
            }

            $shortestCol.append(this);
          });
        }

        $oldCols.remove();
        $(this).data('prevColCount', numNewCols);
      }
    }).on('forcecolumnflow', '.jiggly-split:not(rows-)', function () {
      $(this).removeData('prevColCount').trigger('columnflow');
    });
    $('.jiggly-split').trigger('columnflow');
    $(window).on('debouncedresize', function () {
      $('.jiggly-split').trigger('columnflow');
    }); /// Visual style of dropdowns

    $('select:not(.original-selector)').selectReplace().closest('.selector-wrapper').addClass('has-pretty-select'); /// General-purpose lightbox

    $('a[rel=lightbox]').colorbox(); /// Galleries (only on large screens)

    if ($(window).width() >= 768) {
      $('a[rel="gallery"]').colorbox({
        rel: 'gallery'
      });
    } /// Translations for colorbox


    $.extend($.colorbox.settings, {
      previous: theme.strings.colorBoxPrevious,
      next: theme.strings.colorBoxNext,
      close: theme.strings.colorBoxClose
    }); /// Image-links

    $('.rte a img').closest('a').addClass('contains-img'); /// Check if using correct logo (would be nice to assess on section move/load/unload as well)

    theme.assessAltLogo(); /// On any section reload

    $(document).on('shopify:section:load', function (e) {
      /// Image-links inside any rte block
      $('.rte a img', e.target).closest('a').addClass('contains-img'); /// Feature-sized headers have a little fluff

      if ($('.feature-header', e.target).length) {
        $(window).trigger('assessFeatureHeaders');
      }
    }); // end of shopify:section:load
    /// Slideshow fills viewport

    theme.lastViewportWidth = 0;
    $(window).on('load debouncedresize slideshowfillheight', function (e) {
      // if only height changed, don't do anything, to avoid issue with viewport-size-change on mobile-scroll
      if (e.type == 'debouncedresize' && theme.lastViewportWidth == $(window).width()) {
        return;
      } // set height of slideshows


      var desiredHeight = $(window).height();
      var $announcement = $('.site-control .announcement:first');

      if ($announcement.length) {
        desiredHeight -= $announcement.outerHeight();
      }

      $('.slideshow.fill-viewport, .slideshow.fill-viewport .slide').css('min-height', desiredHeight); // check for content that must be contained

      $('.slideshow.fill-viewport').each(function () {
        var inner = 0;
        $(this).find('.slide').each(function () {
          var t = 0;
          $('.fill-viewport__contain', this).each(function () {
            t += $(this).outerHeight(true);
          });

          if (inner < t) {
            inner = t;
          }
        });

        if (inner > desiredHeight) {
          $(this).css('min-height', inner);
          $('.slide', this).css('min-height', inner);
        }
      });
      theme.lastViewportWidth = $(window).width(); // bump down any header-overlap areas to cater for announcements

      if ($('body.header-section-overlap').length && $announcement.length) {
        $('#page-content').css('margin-top', $announcement.outerHeight());
      } else {
        $('#page-content').css('margin-top', '');
      }
    }).trigger('slideshowfillheight'); /// Some states are dependent on scroll position

    $(window).on('scroll load assessFeatureHeaders', function () {
      var scrollTop = $(window).scrollTop();
      var appearenceBuffer = 60;
      var windowBottom = scrollTop + $(window).height() - appearenceBuffer;
      $('body').toggleClass('scrolled-down', scrollTop > 0);
      theme.assessAltLogo();
      $('.feature-header:not(.feature-header--visible)').filter(function () {
        var offset = $(this).offset().top;
        var height = $(this).outerHeight();
        return offset + height >= scrollTop && offset <= windowBottom;
      }).addClass('feature-header--visible');
    }); /// Nav
    //Drill down

    var drilldownTransSpeed = 250;
    $(document).on('click', '#page-menu.nav-uses-modal .main-nav li.has-children > a', function () {
      //Create new content
      var trimmedTitle = $(this).text().replace(/^\s\s*/, '').replace(/\s\s*$/, ''); //- Links

      var $content = $('<div class="container growth-area"/>').append($(this).siblings('ul').clone().wrap('<div class="main-nav growth-area"/>').parent()); //- Title, in its own menu row, using subnav style for the other links

      var $menuList = $content.find('.main-nav > ul').wrap('<li/>').parent().wrap('<ul/>').parent();
      $menuList.prepend('<li class="title">' + trimmedTitle + '</li>');

      if (theme.strings.back.length > 0) {
        $menuList.append('<li class="main-nav__back"><a href="#" data-revert-back><span class="arr arr--left arr--small">' + theme.icons.chevronLeft + '</span>' + theme.strings.back + '</a></li>');
      }

      if ($('#page-menu').data('show-breadcrumb')) {
        //- Breadcrumbs
        //Current crumbs...
        var $crumbs = $(this).closest('.container').find('.crumbs').clone(); //New crumbs

        if ($crumbs.length == 0) {
          $crumbs = $('<ul class="crumbs"><li><a href="#">' + theme.strings.navigateHome + '</a></li></ul>');
        }

        $crumbs.append('<li><a href="#">' + trimmedTitle + '</a></li>');
        $content.prepend($crumbs);
      } //Hide current & show new


      var $containers = $('#page-menu > .inner > .container:not(.inactive)');
      $containers.addClass('inactive').fadeOut(drilldownTransSpeed, function () {
        $content.hide().insertAfter($containers.last()).fadeIn(drilldownTransSpeed);
        $content.closest('.theme-modal').focus(); // add focus for keyboard scrolling
      });
      return false;
    }); //Drill back up

    $(document).on('click', '#page-menu.nav-uses-modal a[data-revert-back]', function () {
      $('#page-menu.nav-uses-modal > .inner > .container:not(.inactive)').fadeOutAndRemove(drilldownTransSpeed, function () {
        $('#page-menu.nav-uses-modal > .inner > .container.inactive:last').removeClass('inactive').fadeIn(drilldownTransSpeed);
      });
      return false;
    }); //Oh, crumbs

    $(document).on('click', '#page-menu.nav-uses-modal .crumbs a', function () {
      var desiredNumContainers = $(this).parent().index() + 1;
      var $containers = $('#page-menu.nav-uses-modal > .inner > .container');

      if (desiredNumContainers < $containers.length) {
        $containers.slice(desiredNumContainers).fadeOutAndRemove(drilldownTransSpeed, function () {
          $('#page-menu.nav-uses-modal > .inner > .container.inactive:last').removeClass('inactive').fadeIn(drilldownTransSpeed);
        });
      }

      return false;
    }); //Close and reset nav

    $(document).on('reset-modal', '#page-menu.nav-uses-modal', function () {
      closeThemeModal();
      setTimeout(function () {
        $('#page-menu.nav-uses-modal > .inner > .container').removeClass('inactive').show().slice(1).remove();
      }, 300); // Delay to match transition on .theme-modal.reveal

      return false;
    }).on('click', 'a[data-reset-and-close]', function () {
      $('#page-menu.nav-uses-modal').trigger('reset-modal');
      return false;
    });

    function isPageScrollin() {
      return $('#page-content').outerHeight() > $(window).height();
    } /// Modal windows


    var removeModalTimeoutID = -1;
    var closeModalDelay = 300;

    window.closeThemeModal = function (immediate) {
      $('a[data-modal-toggle].active').removeClass('active');
      var $modal = $('.theme-modal.reveal').removeClass('reveal').addClass('unreveal');

      if ($('html.supports-transforms').length && (typeof immediate == 'undefined' || !immediate)) {
        removeModalTimeoutID = setTimeout(function () {
          $('body').removeClass('modal-active');
          $('body, #page-content, #site-control').css('padding-right', '');
        }, closeModalDelay); // Delay to match transition on .theme-modal.reveal
      } else {
        $('body').removeClass('modal-active');
        $('body, #site-control').css('padding-right', '');
      } // tabindex


      $modal.find('a').attr('tabindex', '-1');
    }; //Show arbitrary content in modal window


    window.showThemeModal = function (el) {
      //Close current
      closeThemeModal(true); //Remove any existing temporary modals

      $('.theme-modal.temp').remove(); //Actually add to the page

      var $el = $(el);
      $el.appendTo('body').addClass('reveal');
      theme.addControlPaddingToModal(); //When body is under a modal & has scrollbar, it is not allowed to scroll,
      //so we overflow:hidden it and add a padding the same size as the scrollbar

      if (isPageScrollin()) {
        $('#page-content, #site-control').css('padding-right', $.scrollBarWidth());
      } //Set page state


      $('body').addClass('modal-active');
    }; //Show existing modal container hidden on page


    window.showInPageModal = function ($target) {
      $target.removeClass('unreveal').addClass('reveal');
      theme.addControlPaddingToModal();
      var $inputs = $target.find('.focus-me').focus(); //Any inputs to highlight?

      $(this).addClass('active'); //When body is under a modal, it is not allowed to scroll, so we need this to keep it the same width

      if (isPageScrollin()) {
        $('body, #site-control').css('padding-right', $.scrollBarWidth());
      }

      $('body').addClass('modal-active');
      $('a[tabindex]', $target).removeAttr('tabindex');

      if ($inputs.length == 0) {
        $target.closest('.theme-modal').focus(); // add focus for keyboard scrolling
      }
    };

    $(document).on('click', 'body:not(.modal-active) a[data-modal-toggle]', function (e) {
      e.preventDefault();
      window.showInPageModal($($(this).data('modal-toggle')));
    }); //Close modal on escape keypress

    $(document).on('keyup', function (e) {
      if (e.which == 27) {
        closeThemeModal();
      }
    }); //Close modal button

    $(document).on('click', 'body.modal-active a[data-modal-close]', function () {
      closeThemeModal();
      return false;
    }); //Click outside container to close modal

    $(document).on('click', '.theme-modal', function (e) {
      if (e.target == this) {
        closeThemeModal(); //Trigger any reset events (e.g. in drilldown nav)

        $(this).trigger('reset-modal');
        return false;
      }
    }); //Switch to a different modal

    $(document).on('click', 'body.modal-active a[data-modal-toggle]', function () {
      closeThemeModal(true);
      $(this).click();
      return false;
    });
    $(document).on('click', '.site-control a[data-modal-nav-toggle]', function () {
      if ($('body.modal-active').length) {
        closeThemeModal();
        setTimeout(function () {
          $('#page-menu .crumbs a:first').trigger('click');
        }, 305); // after modal fade-out
      } else {
        window.showInPageModal($('#page-menu'));
      }

      return false;
    }); //Open arbitrary page in a modal

    $(document).on('click', 'a[data-modal-target]', function (e) {
      e.preventDefault();
      showThemeModal($('<div class="theme-modal temp" tabindex="-1"/>').append($('<div class="inner"/>').html($($(this).data('modal-target')).wrapInner('<div class="container"/>').html())));
    }); //Immmediately select contents when focussing on some inputs

    $(document).on('focusin click', 'input.select-on-focus', function () {
      $(this).select();
    }).on('mouseup', 'input.select-on-focus', function (e) {
      e.preventDefault(); //Prevent mouseup killing select()
    }); //Textareas increase size as you type

    $('#template textarea').each(function () {
      $(this).autogrow({
        animate: false,
        onInitialize: true
      });
    });
    $(document).on('click', '.quantity-wrapper [data-quantity]', function () {
      var adj = $(this).data('quantity') == 'up' ? 1 : -1;
      var $qty = $(this).closest('.quantity-wrapper').find('[name=quantity]');
      $qty.val(Math.max(1, parseInt($qty.val()) + adj));
      return false;
    });

    function afterSectionLoadFunctions() {
      theme.checkViewportFillers();
      theme.assessAltLogo();
    } /// Redirection dropdowns


    $(document).on('change', 'select.redirecter', function () {
      window.location = $(this).val();
    }); /// Register all sections

    theme.Sections.init();
    theme.Sections.register('header', theme.HeaderSection);
    theme.Sections.register('footer', theme.FooterSection);
    theme.Sections.register('slideshow', theme.SlideshowSection);
    theme.Sections.register('video', theme.VideoManager, afterSectionLoadFunctions);
    theme.Sections.register('text-beside-image', theme.TextBesideImageSection);
    theme.Sections.register('text-over-image', theme.TextOverImageSection);
    theme.Sections.register('image-beside-image', theme.ImageBesideImageSection);
    theme.Sections.register('featured-products', theme.FeaturedProductsSection);
    theme.Sections.register('featured-product', theme.FeaturedProductSection);
    theme.Sections.register('featured-collections', theme.FeaturedCollectionsSection);
    theme.Sections.register('featured-blog', theme.FeaturedBlogSection);
    theme.Sections.register('product-template', theme.ProductTemplateSection);
    theme.Sections.register('collection-template', theme.CollectionTemplateSection);
    theme.Sections.register('search-template', theme.SearchTemplateSection);
    theme.Sections.register('blog-template', theme.BlogTemplateSection);
    theme.Sections.register('article-template', theme.ArticleTemplateSection);
    theme.Sections.register('list-collections', theme.ListCollectionsSection);
    theme.Sections.register('cart-template', theme.CartTemplateSection);
    theme.Sections.register('nested-sections', theme.NestedSectionsSection, afterSectionLoadFunctions);
  }); //Example registering a section manually with custom onload callback
  // theme.Sections.register('video', theme.VideoManager, function() {
  //   theme.checkViewportFillers();
  //   theme.assessAltLogo();
  // });
  //Register dynamically pulled in sections

  if (cc.sections.length) {
    cc.sections.forEach(function (section) {
      try {
        theme.Sections.register(section.name, section.section);
      } catch (err) {
        console.error("Unable to register section ".concat(section.name, "."), err);
      }
    });
  } else {
    console.warn('Barry: No common sections have been registered.');
  }
})(theme.jQuery);
/* Built with Barry v1.0.7 */
