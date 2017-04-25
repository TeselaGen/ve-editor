'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _enzymeListFull = require('../../../../enzymeListFull.json');

var _enzymeListFull2 = _interopRequireDefault(_enzymeListFull);

var _reactRedux = require('react-redux');

var _takaraEnzymeList = require('../../../../takaraEnzymeList.json');

var _takaraEnzymeList2 = _interopRequireDefault(_takaraEnzymeList);

var _RowItem = require('../RowItem');

var _RowItem2 = _interopRequireDefault(_RowItem);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style.css');

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _cutSequenceByRestrictionEnzyme = require('ve-sequence-utils/cutSequenceByRestrictionEnzyme');

var _cutSequenceByRestrictionEnzyme2 = _interopRequireDefault(_cutSequenceByRestrictionEnzyme);

var _QuestionTooltip = require('../../../components/QuestionTooltip');

var _QuestionTooltip2 = _interopRequireDefault(_QuestionTooltip);

var _getReverseComplementSequenceString = require('ve-sequence-utils/getReverseComplementSequenceString');

var _getReverseComplementSequenceString2 = _interopRequireDefault(_getReverseComplementSequenceString);

var _PrimaryButton = require('../../../components/PrimaryButton');

var _PrimaryButton2 = _interopRequireDefault(_PrimaryButton);

var _SecondaryButton = require('../../../components/SecondaryButton');

var _SecondaryButton2 = _interopRequireDefault(_SecondaryButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import takaraEnzymeList from '../../../../enzymeListFull.json';

// import {reduxForm, Field, formValueSelector} from 'redux-form'


var AddYourOwnEnzyme = function (_React$Component) {
  _inherits(AddYourOwnEnzyme, _React$Component);

  function AddYourOwnEnzyme() {
    _classCallCheck(this, AddYourOwnEnzyme);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  AddYourOwnEnzyme.prototype.render = function render() {
    var paddingStart = '-------';
    var paddingEnd = '-------';
    var _props = this.props,
        _props$inputSequenceT = _props.inputSequenceToTestAgainst,
        inputSequenceToTestAgainst = _props$inputSequenceT === undefined ? '' : _props$inputSequenceT,
        handleClose = _props.handleClose,
        _props$seqName = _props.seqName,
        seqName = _props$seqName === undefined ? 'Destination Vector' : _props$seqName,
        addYourOwnEnzyme = _props.addYourOwnEnzyme,
        dispatch = _props.dispatch,
        invalid = _props.invalid,
        stopAddingYourOwnEnzyme = _props.stopAddingYourOwnEnzyme;

    addYourOwnEnzyme.chop_top_index = Number(addYourOwnEnzyme.chop_top_index);
    addYourOwnEnzyme.chop_bottom_index = Number(addYourOwnEnzyme.chop_bottom_index);
    var _addYourOwnEnzyme$seq = addYourOwnEnzyme.sequence,
        sequence = _addYourOwnEnzyme$seq === undefined ? '' : _addYourOwnEnzyme$seq,
        _addYourOwnEnzyme$cho = addYourOwnEnzyme.chop_top_index,
        chop_top_index = _addYourOwnEnzyme$cho === undefined ? 0 : _addYourOwnEnzyme$cho,
        _addYourOwnEnzyme$cho2 = addYourOwnEnzyme.chop_bottom_index,
        chop_bottom_index = _addYourOwnEnzyme$cho2 === undefined ? 0 : _addYourOwnEnzyme$cho2,
        _addYourOwnEnzyme$nam = addYourOwnEnzyme.name,
        name = _addYourOwnEnzyme$nam === undefined ? '' : _addYourOwnEnzyme$nam;

    var regexString = bpsToRegexString(sequence);
    var enzyme = {
      name: name,
      site: sequence,
      forwardRegex: regexString,
      reverseRegex: (0, _getReverseComplementSequenceString2.default)(regexString),
      topSnipOffset: chop_top_index,
      bottomSnipOffset: chop_bottom_index,
      usForward: 0,
      usReverse: 0,
      color: 'black'
    };
    var matches;
    if (regexString.length === 0) {
      matches = [];
    } else {
      matches = (0, _cutSequenceByRestrictionEnzyme2.default)(inputSequenceToTestAgainst, true, enzyme);
    }

    var errors = validate(addYourOwnEnzyme);

    function onChange(updatedVal) {
      dispatch({
        type: 'ADD_YOUR_OWN_ENZYME_UPDATE',
        payload: _extends({}, addYourOwnEnzyme, updatedVal)
      });
    }
    var invalidOrNoMatches = invalid || matches.length < 1;

    var seqPlusPadding = paddingStart + sequence + paddingEnd;

    return _react2.default.createElement(
      'div',
      { className: 'createYourOwnEnzyme' },
      _react2.default.createElement(
        'h2',
        null,
        'Create your own enzyme'
      ),
      _react2.default.createElement(CustomInput, { error: errors['name'], value: name, onChange: onChange, name: 'name', label: 'Name:' }),
      _react2.default.createElement(CustomInput, { error: errors['sequence'], value: sequence, onChange: onChange, name: 'sequence', label: _react2.default.createElement(
          'div',
          { className: 'labelWithIcon' },
          _react2.default.createElement(
            _QuestionTooltip2.default,
            null,
            _react2.default.createElement(
              'div',
              { className: 'taLineHolder' },
              _react2.default.createElement(
                Line,
                null,
                ' Special Characters:  '
              ),
              _react2.default.createElement(
                Line,
                null,
                ' R = G A (purine) '
              ),
              _react2.default.createElement(
                Line,
                null,
                ' Y = T C (pyrimidine) '
              ),
              _react2.default.createElement(
                Line,
                null,
                ' K = G T (keto) '
              ),
              _react2.default.createElement(
                Line,
                null,
                ' M = A C (amino) '
              ),
              _react2.default.createElement(
                Line,
                null,
                ' S = G C (strong bonds) '
              ),
              _react2.default.createElement(
                Line,
                null,
                ' W = A T (weak bonds) '
              ),
              _react2.default.createElement(
                Line,
                null,
                ' B = G T C (all but A) '
              ),
              _react2.default.createElement(
                Line,
                null,
                ' D = G A T (all but C) '
              ),
              _react2.default.createElement(
                Line,
                null,
                ' H = A C T (all but G) '
              ),
              _react2.default.createElement(
                Line,
                null,
                ' V = G C A (all but T) '
              ),
              _react2.default.createElement(
                Line,
                null,
                ' N = A G C T (any) '
              )
            )
          ),
          _react2.default.createElement(
            'span',
            null,
            'Recognition sequence:'
          )
        ),
        onInput: function onInput(input) {
          var inputValue = input.target.value;
          var cleanInput = inputValue.replace(/[^rykmswbdhvnagct]/ig, '');
          input.target.value = cleanInput;
        }
      }),
      _react2.default.createElement(CustomInput, { error: errors['chop_top_index'], value: chop_top_index, onChange: onChange, name: 'chop_top_index', label: 'Chop top index:', type: 'number' }),
      _react2.default.createElement(CustomInput, { error: errors['chop_bottom_index'], value: chop_bottom_index, onChange: onChange, name: 'chop_bottom_index', label: 'Chop bottom index:', type: 'number' }),
      _react2.default.createElement(_RowItem2.default, {
        // width: 400,
        tickSpacing: 1,
        annotationVisibility: {
          cutsites: true,
          cutsiteLabels: false,
          axis: false
        },
        sequenceLength: seqPlusPadding.length,
        bpsPerRow: seqPlusPadding.length,
        row: {
          sequence: seqPlusPadding,
          start: 0,
          end: seqPlusPadding.length - 1,
          cutsites: {
            'fake1': {
              annotation: {
                recognitionSiteRange: {
                  start: paddingStart.length,
                  end: paddingStart.length + sequence.length - 1
                },
                topSnipBeforeBottom: chop_top_index < chop_bottom_index,
                bottomSnipPosition: paddingStart.length + chop_bottom_index,
                topSnipPosition: paddingStart.length + chop_top_index,
                id: 'fake1',
                restrictionEnzyme: {}
              }
            }
          }
        }
      }),
      _react2.default.createElement(
        'h3',
        { className: 'cutnumber ' + (matches.length === 0 && 'invalid') },
        matches.length > 10 ? 'Cuts more than 10 times in your ' + seqName : 'Cuts ' + matches.length + ' times in your ' + seqName
      ),
      _react2.default.createElement(
        'div',
        { className: 'buttonHolder' },
        _react2.default.createElement(
          _PrimaryButton2.default,
          { className: ' ta_useCutsite addYourOwnEnzymeBtn ' + (invalidOrNoMatches && 'disabled'), onClick: function onClick() {
              if (invalidOrNoMatches) {
                return;
              }
              dispatch({
                type: 'ADD_RESTRICTION_ENZYME',
                payload: enzyme,
                meta: {
                  EditorNamespace: ['MutagenesisEditor', 'SelectInsertEditor', 'ResultsEditor']
                }
              });
              dispatch({
                type: 'FILTERED_RESTRICTION_ENZYMES_ADD',
                payload: {
                  label: name,
                  value: name
                },
                meta: {
                  EditorNamespace: ['MutagenesisEditor', 'SelectInsertEditor', 'ResultsEditor']
                }
              });
              // addRestrictionEnzyme(enzyme)
              // filteredRestrictionEnzymesAdd({
              //   label: name,
              //   value: name,
              // })
              handleClose();
            } },
          ' Use Enzyme'
        ),
        _react2.default.createElement(
          _SecondaryButton2.default,
          { className: 'addYourOwnEnzymeBtn', onClick: stopAddingYourOwnEnzyme },
          'Back'
        )
      )
    );
  };

  return AddYourOwnEnzyme;
}(_react2.default.Component);

//   const selector = formValueSelector('customEnzymes')
// AddYourOwnEnzyme = reduxForm({
//   form: 'customEnzymes',
//   destroyOnUnmount: false,
//   initialValues: {
//     name: 'Example Enzyme',
//     sequence: 'ggatcc',
//     chop_top_index: 1,
//     chop_bottom_index: 5,
//   },
//   validate
// })(AddYourOwnEnzyme)

AddYourOwnEnzyme = (0, _reactRedux.connect)(function (state) {
  return { addYourOwnEnzyme: state.VectorEditor.addYourOwnEnzyme };
})(AddYourOwnEnzyme);

var AddAdditionalEnzymes = function (_React$Component2) {
  _inherits(AddAdditionalEnzymes, _React$Component2);

  function AddAdditionalEnzymes() {
    var _temp, _this2, _ret;

    _classCallCheck(this, AddAdditionalEnzymes);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, _React$Component2.call.apply(_React$Component2, [this].concat(args))), _this2), _this2.state = {
      addYourOwnEnzyme: false,
      enzymesToAdd: []
    }, _this2.startAddingYourOwnEnzyme = function () {
      _this2.setState({ addYourOwnEnzyme: true });
    }, _this2.stopAddingYourOwnEnzyme = function () {
      _this2.setState({ addYourOwnEnzyme: false });
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  AddAdditionalEnzymes.prototype.render = function render() {
    var _this3 = this;

    if (this.state.addYourOwnEnzyme) {
      return _react2.default.createElement(AddYourOwnEnzyme, _extends({}, this.props, { stopAddingYourOwnEnzyme: this.stopAddingYourOwnEnzyme }));
    }
    var _props2 = this.props,
        dispatch = _props2.dispatch,
        handleClose = _props2.handleClose,
        _props2$inputSequence = _props2.inputSequenceToTestAgainst,
        inputSequenceToTestAgainst = _props2$inputSequence === undefined ? '' : _props2$inputSequence;
    var enzymesToAdd = this.state.enzymesToAdd;

    return _react2.default.createElement(
      'div',
      { className: 'addYourOwnEnzyme' },
      _react2.default.createElement(
        'h2',
        null,
        'Add additional enzymes'
      ),
      _react2.default.createElement(
        'span',
        null,
        'Our default list only contains the most common enzymes. Search here to add less common ones:'
      ),
      _react2.default.createElement(
        'div',
        { className: 'filterAndButton' },
        _react2.default.createElement(_reactSelect2.default, {
          multi: true,
          placeholder: 'Select cut sites...',
          options: (0, _map2.default)(_enzymeListFull2.default, function (enzyme) {
            return { label: enzyme.name, value: enzyme };
          }),
          onChange: function onChange(enzymesToAdd) {
            _this3.setState({
              enzymesToAdd: enzymesToAdd.map(function (_ref) {
                var value = _ref.value;

                var times = (0, _cutSequenceByRestrictionEnzyme2.default)(inputSequenceToTestAgainst, true, value).length;
                return {
                  label: value.name + (' (Cuts ' + times + ' time' + (times === 1 ? '' : 's') + ')'),
                  value: value
                };
              })
            });
          },
          value: enzymesToAdd
        }),
        _react2.default.createElement(
          _PrimaryButton2.default,
          {
            className: 'addYourOwnEnzymeBtn',
            onClick: function onClick() {
              enzymesToAdd.forEach(function (enzyme) {
                dispatch({
                  type: 'ADD_RESTRICTION_ENZYME',
                  payload: enzyme.value,
                  meta: {
                    EditorNamespace: ['MutagenesisEditor', 'SelectInsertEditor', 'ResultsEditor']
                  }
                });
                dispatch({
                  type: 'FILTERED_RESTRICTION_ENZYMES_ADD',
                  payload: {
                    label: enzyme.label,
                    value: enzyme.value.name
                  },
                  meta: {
                    EditorNamespace: ['MutagenesisEditor', 'SelectInsertEditor', 'ResultsEditor']
                  }
                });
              });
              handleClose();
            },
            disabled: this.state.enzymesToAdd && this.state.enzymesToAdd.length < 1 },
          'Add Enzymes'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'createYourOwnButton' },
        _react2.default.createElement(
          'span',
          null,
          'Still not finding what you want?'
        ),
        _react2.default.createElement(
          _PrimaryButton2.default,
          { className: 'addYourOwnEnzymeBtn', onClick: this.startAddingYourOwnEnzyme },
          'Create your own enzyme'
        )
      )
    );
  };

  return AddAdditionalEnzymes;
}(_react2.default.Component);

function validate(values) {
  var errors = {};

  if (!values.name || values.name.trim() === '') {
    errors.name = 'Input cannot be blank';
  } else if (_takaraEnzymeList2.default[values.name.toLowerCase()]) {
    errors.name = 'The name ' + values.name + ' is already taken.';
  }

  if (!values.sequence || values.sequence.trim() === '' || values.sequence.trim().length < 4) {
    errors.sequence = 'Enzyme recognition sequence must be at least 4bps long';
  }

  if (values.sequence && values.sequence.replace(/[^atgcrykmswbdhvn]/ig, '').length !== values.sequence.length) {
    errors.sequence = 'Sequence must only contain valid bases';
  }

  if (!values.chop_top_index && values.chop_top_index !== 0) {
    errors.chop_top_index = 'Input cannot be blank';
  }
  if (!values.chop_bottom_index && values.chop_bottom_index !== 0) {
    errors.chop_bottom_index = 'Input cannot be blank';
  }
  return errors;
}

AddAdditionalEnzymes = (0, _reactRedux.connect)(function (state) {
  return { inputSequenceToTestAgainst: state.VectorEditor.addYourOwnEnzyme.inputSequenceToTestAgainst };
})(AddAdditionalEnzymes);

exports.default = AddAdditionalEnzymes;


function bpsToRegexString(bps) {
  var regexString = '';
  if (typeof bps === 'string') {
    bps.split('').forEach(function (bp) {
      if (bp === 'r') {
        regexString += '[ga]';
      } else if (bp === 'y') {
        regexString += '[tc]';
      } else if (bp === 'k') {
        regexString += '[gt]';
      } else if (bp === 'm') {
        regexString += '[ac]';
      } else if (bp === 's') {
        regexString += '[gc]';
      } else if (bp === 'w') {
        regexString += '[at]';
      } else if (bp === 'b') {
        regexString += '[gtc]';
      } else if (bp === 'd') {
        regexString += '[gat]';
      } else if (bp === 'h') {
        regexString += '[act]';
      } else if (bp === 'v') {
        regexString += '[gca]';
      } else if (bp === 'n') {
        regexString += '[agct]';
      } else {
        regexString += bp;
      }
    });
  }
  return regexString;
}

// function CustomInput({name, type, label, onInput}) {
// return <Field name={name} label={label} type={type} onInput={onInput} component={RenderInput} >
// </Field>
// }

function CustomInput(_ref2) {
  var name = _ref2.name,
      value = _ref2.value,
      _onChange2 = _ref2.onChange,
      onInput = _ref2.onInput,
      label = _ref2.label,
      error = _ref2.error,
      type = _ref2.type;

  return _react2.default.createElement(
    'div',
    { className: 'inputHolder ' + (error && 'error') },
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'span',
        null,
        label
      ),
      _react2.default.createElement('input', { value: value, onChange: function onChange(e) {
          var _onChange;

          _onChange2((_onChange = {}, _onChange[name] = e.target.value, _onChange));
        }, onInput: onInput, type: type })
    ),
    error && _react2.default.createElement(
      'p',
      { className: 'errorMessage' },
      error
    )
  );
}

function Line(_ref3) {
  var children = _ref3.children;

  return _react2.default.createElement(
    'div',
    { className: 'taLine' },
    ' ',
    children
  );
}
module.exports = exports['default'];