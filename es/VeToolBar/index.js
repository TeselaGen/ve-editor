var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import download from 'in-browser-download'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import DropDown from 'react-icons/lib/md/arrow-drop-down';
import InfoCircle from 'react-icons/lib/fa/info-circle';
import Popover from 'react-popover2';
import jsonToGenbank from 'bio-parsers/parsers/jsonToGenbank';
import React from 'react';
// import get from 'lodash/get'
import './style.css';
import CutsiteFilter from '../CutsiteFilter';
import FileSaver from 'file-saver';
import Radio from '../Radio';

var VeToolBar = (_temp2 = _class = function (_React$Component) {
  _inherits(VeToolBar, _React$Component);

  function VeToolBar() {
    var _temp, _this, _ret;

    _classCallCheck(this, VeToolBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      openItem: -1
    }, _this.handleOpen = function (popover) {
      var self = _this;
      return function () {
        if (self.state.openItem === popover) {
          return self.setState({ openItem: -1 });
        }
        self.setState({ openItem: popover });
      };
    }, _this.handleClose = function () {
      _this.setState({ openItem: '' });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  VeToolBar.prototype.render = function render() {
    var self = this;
    var _props = this.props,
        sequenceData = _props.sequenceData,
        annotationVisibilityToggle = _props.annotationVisibilityToggle,
        annotationVisibilityShow = _props.annotationVisibilityShow,
        annotationVisibilityHide = _props.annotationVisibilityHide,
        annotationVisibility = _props.annotationVisibility,
        _props$AdditionalTool = _props.AdditionalTools,
        AdditionalTools = _props$AdditionalTool === undefined ? [] : _props$AdditionalTool,
        minimumOrfSizeUpdate = _props.minimumOrfSizeUpdate,
        minimumOrfSize = _props.minimumOrfSize,
        panelsShown = _props.panelsShown,
        panelsShownUpdate = _props.panelsShownUpdate,
        sequenceLength = _props.sequenceLength,
        _props$excludeObj = _props.excludeObj,
        excludeObj = _props$excludeObj === undefined ? {} : _props$excludeObj;

    var items = [{
      component: React.createElement(
        'div',
        {
          onClick: function onClick() {
            var blob = new Blob([jsonToGenbank(sequenceData)], { type: "text/plain" });
            FileSaver.saveAs(blob, "result_plasmid.gb");
            // downloadSequenceData(sequenceData || )
          }

        },
        React.createElement('img', { src: 'svgs/veToolbarIcons/save.png', alt: 'Download .gb file' })
      ),
      tooltip: 'Download .gb file',
      id: 'download'
    },
    // {
    //   component: <div
    //     onClick={function () {
    //       // var myPrintContent = document.getElementById('printdiv');
    //       // var myPrintWindow = window.open(windowUrl, windowName, 'left=300,top=100,width=400,height=400');
    //       // myPrintWindow.document.write(myPrintContent.innerHTML);
    //       // myPrintWindow.document.getElementById('hidden_div').style.display='block'
    //       // myPrintWindow.document.close();
    //       // myPrintWindow.focus();
    //       // myPrintWindow.print();
    //       // myPrintWindow.close();
    //       // return false;
    //       print()
    //       // var content = document.getElementById("divcontents");
    //       // document.appendChild(con)
    //       // var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    //       // pri.document.open();
    //       // pri.document.write(content.innerHTML);
    //       // pri.document.close();
    //       // pri.focus();
    //       // pri.print();
    //       // downloadSequenceData(sequenceData || )
    //     }}
    //     >
    //     <img src="svgs/veToolbarIcons/print.png" alt="Print Vector"/>
    //   </div>,
    //   tooltip: 'Print Vector',
    //   id: 'print'
    // },
    {
      component: React.createElement(
        'div',
        {
          onClick: function onClick() {
            annotationVisibilityToggle('cutsites');
          }
        },
        React.createElement('img', { src: 'svgs/veToolbarIcons/show_cut_sites.png', alt: 'Show cut sites' })
      ),
      toggled: annotationVisibility.cutsites,
      tooltip: 'Show cut sites',
      tooltipToggled: 'Hide cut sites',
      dropdown: React.createElement(
        'div',
        { className: 'veToolbarCutsiteFilterHolder' },
        React.createElement(
          'span',
          null,
          'Filter Cut sites:'
        ),
        React.createElement(CutsiteFilter, _extends({ onChangeHook: function onChangeHook() {
            self.handleClose();
            annotationVisibilityShow('cutsites');
          } }, this.props))
      ),
      dropdowntooltip: 'Cut site options',
      id: 'cutsites'
    }, {
      component: React.createElement(
        'div',
        {
          onClick: function onClick() {
            annotationVisibilityToggle('features');
          }
        },
        React.createElement('img', { src: 'svgs/veToolbarIcons/show_features.png', alt: 'Show features' })
      ),
      toggled: annotationVisibility.features,
      tooltip: 'Show features',
      tooltipToggled: 'Hide features',
      id: 'features'
    }, {
      component: React.createElement(
        'div',
        {
          onClick: function onClick() {
            annotationVisibilityToggle('primers');
          }
        },
        React.createElement('img', { src: 'svgs/veToolbarIcons/show_primers.png', alt: 'Show oligos' })
      ),
      toggled: annotationVisibility.primers,
      tooltip: 'Show oligos',
      tooltipToggled: 'Hide oligos',
      id: 'primers'
    }, {
      component: React.createElement(
        'div',
        {
          onClick: function onClick() {
            if (annotationVisibility.orfs) {
              annotationVisibilityHide('orfs');
              annotationVisibilityHide('orfTranslations');
            } else {
              annotationVisibilityShow('orfs');
              annotationVisibilityShow('orfTranslations');
            }
          }
        },
        React.createElement('img', { src: 'svgs/veToolbarIcons/show_orfs.png', alt: 'Show Open Reading Frames' })
      ),
      toggled: annotationVisibility.orfs,
      tooltip: 'Show Open Reading Frames',
      tooltipToggled: 'Hide Open Reading Frames',
      dropdown: React.createElement(
        'div',
        { className: 'veToolbarOrfOptionsHolder' },
        React.createElement(
          'div',
          { style: { display: "flex" } },
          'Minimum ORF Size:',
          React.createElement('input', {
            type: 'number',
            className: 'minOrfSizeInput',
            onChange: function onChange(event) {
              var minimumOrfSize = parseInt(event.target.value);
              if (!(minimumOrfSize > -1)) return;
              if (minimumOrfSize > sequenceLength) return;
              minimumOrfSizeUpdate(minimumOrfSize);
            },
            value: minimumOrfSize })
        ),
        React.createElement('div', { className: 'taSpacer' }),
        React.createElement('input', {
          onChange: function onChange() {
            annotationVisibilityToggle('orfTranslations');
          },
          checked: annotationVisibility.orfTranslations,
          id: 'showOrfTranslations',
          type: 'checkbox' }),
        React.createElement(
          'span',
          { className: 'showOrfTranslateSpan' },
          'Show ORF translations '
        ),
        React.createElement('div', { className: 'taSpacer' }),
        React.createElement(InfoCircle, null),
        React.createElement(
          'span',
          { className: 'translateInfoSpan' },
          'To translate an arbitrary area, right click a selection.'
        )
      ),
      dropdowntooltip: 'Open Reading Frame options',
      id: 'orfs'
    }, {
      dropdown: React.createElement(
        'div',
        { className: 'veToolbarViewOptionsHolder' },
        React.createElement(
          'div',
          null,
          'Show View:'
        ),
        React.createElement(Radio, {
          onChange: function onChange() {
            panelsShownUpdate({
              circular: true,
              sequence: false
            });
          },
          checked: panelsShown.circular && !panelsShown.sequence,
          label: 'Circular'
        }),
        React.createElement(Radio, {
          onChange: function onChange() {
            panelsShownUpdate({
              circular: false,
              sequence: true
            });
          },
          checked: panelsShown.sequence && !panelsShown.circular,
          label: 'Sequence'
        }),
        React.createElement(Radio, {
          onChange: function onChange() {
            panelsShownUpdate({
              circular: true,
              sequence: true
            });
          },
          checked: panelsShown.sequence && panelsShown.circular,
          label: 'Both'
        })
      ),
      dropdownicon: React.createElement('img', { src: 'svgs/veToolbarIcons/fullscreen.png', alt: 'Toggle Views' }),
      dropdowntooltip: 'Toggle Views',
      id: 'toggleViews'
    }].concat(AdditionalTools);

    items = items.filter(function (item) {
      if (excludeObj[item.id]) {
        return false;
      } else {
        return true;
      }
    });
    var content = items.map(function (_ref, index) {
      var component = _ref.component,
          _ref$tooltip = _ref.tooltip,
          tooltip = _ref$tooltip === undefined ? '' : _ref$tooltip,
          tooltipToggled = _ref.tooltipToggled,
          _ref$dropdowntooltip = _ref.dropdowntooltip,
          dropdowntooltip = _ref$dropdowntooltip === undefined ? '' : _ref$dropdowntooltip,
          dropdown = _ref.dropdown,
          dropdownicon = _ref.dropdownicon,
          _ref$toggled = _ref.toggled,
          toggled = _ref$toggled === undefined ? false : _ref$toggled,
          id = _ref.id;


      var tooltipToDisplay = tooltip;
      if (toggled && tooltipToggled) {
        tooltipToDisplay = tooltipToggled;
      }
      return React.createElement(
        'div',
        {
          key: index,
          className: 'veToolbarItemOuter' },
        component && React.createElement(
          'div',
          {
            'aria-label': tooltipToDisplay,
            className: ' hint--bottom-left veToolbarItem' },
          index !== 0 && React.createElement('div', { className: 'veToolbarSpacer' }),
          React.createElement(
            'div',
            { className: 'veToolbarIcon ' + (toggled ? ' veToolbarItemToggled' : '') },
            component
          )
        ),
        dropdown && React.createElement(
          Popover,
          {
            preferPlace: 'below',
            onOuterAction: self.handleClose,
            isOpen: index === self.state.openItem,
            body: dropdown },
          React.createElement(
            'div',
            {
              key: index + 'dropdownOnClick',
              'aria-label': dropdowntooltip,
              onClick: self.handleOpen(index),
              className: ' hint--bottom-left ' + (dropdownicon ? '' : ' veToolbarDropdown') },
            dropdownicon ? React.createElement(
              'div',
              { className: 'veToolbarIcon' },
              React.createElement(
                'div',
                null,
                dropdownicon
              )
            ) : React.createElement(DropDown, null)
          )
        )
      );
    });

    return React.createElement(
      'div',
      { className: 'veToolbar' },
      content
    );
  };

  return VeToolBar;
}(React.Component), _class.defaultProps = {
  onChangeHook: function onChangeHook() {},
  sequenceData: {
    sequence: ''
  },
  annotationVisibilityToggle: function annotationVisibilityToggle() {},
  annotationVisibilityShow: function annotationVisibilityShow() {},
  annotationVisibilityHide: function annotationVisibilityHide() {},
  annotationVisibility: {},
  AdditionalTools: [],
  minimumOrfSizeUpdate: function minimumOrfSizeUpdate() {},
  minimumOrfSize: 300,
  panelsShown: {},
  panelsShownUpdate: function panelsShownUpdate() {},
  sequenceLength: 0,
  excludeObj: {}
}, _temp2);
export { VeToolBar as default };