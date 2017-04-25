function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Plus from 'react-icons/lib/fa/plus';
import specialCutsiteFilterOptions from '../constants/specialCutsiteFilterOptions';
import React from 'react';
import './style.css';
import Select from 'react-select';

import map from 'lodash/map';

var CutsiteFilter = function (_React$Component) {
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

    var options = [].concat(map(specialCutsiteFilterOptions, function (opt) {
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
    return React.createElement(
      'div',
      null,
      React.createElement(Select, {
        multi: true,
        allowCreate: true,
        noResultsText: React.createElement(
          'div',
          { className: 'noResultsTextPlusButton' },
          'No results found. ',
          React.createElement(
            'span',
            { onClick: openAddYourOwn, className: 'ta_link' },
            'Add additional enzymes ',
            React.createElement(Plus, null)
          ),
          ' '
        ),
        placeholder: 'Filter cut sites...',
        options: options,
        onChange: function onChange(filteredRestrictionEnzymes) {
          if (filteredRestrictionEnzymes && filteredRestrictionEnzymes.some(function (enzyme) {
            return enzyme.value === specialCutsiteFilterOptions.addYourOwn.value;
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
}(React.Component);

export { CutsiteFilter as default };