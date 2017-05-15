'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _plus = require('react-icons/lib/fa/plus');

var _plus2 = _interopRequireDefault(_plus);

var _specialCutsiteFilterOptions = require('../constants/specialCutsiteFilterOptions');

var _specialCutsiteFilterOptions2 = _interopRequireDefault(_specialCutsiteFilterOptions);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style.css');

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CutsiteFilter = (_temp = _class = function (_React$Component) {
  _inherits(CutsiteFilter, _React$Component);

  function CutsiteFilter() {
    _classCallCheck(this, CutsiteFilter);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  CutsiteFilter.prototype.render = function render() {
    var _props = this.props,
        onChangeHook = _props.onChangeHook,
        filteredRestrictionEnzymes = _props.filteredRestrictionEnzymes,
        filteredRestrictionEnzymesUpdate = _props.filteredRestrictionEnzymesUpdate,
        cutsitesByName = _props.allCutsites.cutsitesByName,
        inputSequenceToTestAgainst = _props.sequenceData.sequence,
        dispatch = _props.dispatch;

    // var {handleOpen, handleClose} = this

    var options = [].concat((0, _map2.default)(_specialCutsiteFilterOptions2.default, function (opt) {
      return opt;
    }), Object.keys(cutsitesByName).map(function (key) {
      return { label: key, value: key };
    }));
    function openAddYourOwn() {
      dispatch({
        type: 'ADD_YOUR_OWN_ENZYME_RESET',
        payload: {
          inputSequenceToTestAgainst: inputSequenceToTestAgainst,
          isOpen: true
        }
      });
    }
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_reactSelect2.default, {
        multi: true,
        allowCreate: true,
        noResultsText: _react2.default.createElement(
          'div',
          { className: 'noResultsTextPlusButton' },
          'No results found. ',
          _react2.default.createElement(
            'span',
            { onClick: openAddYourOwn, className: 'ta_link' },
            'Add additional enzymes ',
            _react2.default.createElement(_plus2.default, null)
          ),
          ' '
        ),
        placeholder: 'Filter cut sites...',
        options: options,
        onChange: function onChange(filteredRestrictionEnzymes) {
          if (filteredRestrictionEnzymes && filteredRestrictionEnzymes.some(function (enzyme) {
            return enzyme.value === _specialCutsiteFilterOptions2.default.addYourOwn.value;
          })) {
            return openAddYourOwn();
          }
          onChangeHook && onChangeHook(filteredRestrictionEnzymes);
          filteredRestrictionEnzymesUpdate(filteredRestrictionEnzymes);
        },

        value: filteredRestrictionEnzymes
      })
    );
  };

  return CutsiteFilter;
}(_react2.default.Component), _class.defaultProps = {
  onChangeHook: function onChangeHook() {},
  filteredRestrictionEnzymes: [],
  filteredRestrictionEnzymesUpdate: [],
  allCutsites: { cutsitesByName: {} },
  sequenceData: {
    sequence: ''
  },
  dispatch: function dispatch() {}
}, _temp);
exports.default = CutsiteFilter;
module.exports = exports['default'];