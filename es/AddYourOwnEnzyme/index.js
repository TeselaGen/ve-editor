var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import map from 'lodash/map';
import enzymeListFull from '../../../../enzymeListFull.json';
import { connect } from 'react-redux';
// import takaraEnzymeList from '../../../../enzymeListFull.json';
import takaraEnzymeList from '../../../../takaraEnzymeList.json';
// import {reduxForm, Field, formValueSelector} from 'redux-form'
import RowItem from '../RowItem';
import React from 'react';
import './style.css';
import Select from 'react-select';
import cutSequenceByRestrictionEnzyme from 've-sequence-utils/cutSequenceByRestrictionEnzyme';
import QuestionTooltip from '../../../components/QuestionTooltip';
import getReverseComplementSequenceString from 've-sequence-utils/getReverseComplementSequenceString';
import PrimaryButton from '../../../components/PrimaryButton';
import SecondaryButton from '../../../components/SecondaryButton';

function AddYourOwnEnzyme(props) {
  var paddingStart = '-------';
  var paddingEnd = '-------';
  var _props$inputSequenceT = props.inputSequenceToTestAgainst,
      inputSequenceToTestAgainst = _props$inputSequenceT === undefined ? '' : _props$inputSequenceT,
      handleClose = props.handleClose,
      _props$seqName = props.seqName,
      seqName = _props$seqName === undefined ? 'Destination Vector' : _props$seqName,
      addYourOwnEnzyme = props.addYourOwnEnzyme,
      dispatch = props.dispatch,
      invalid = props.invalid,
      stopAddingYourOwnEnzyme = props.stopAddingYourOwnEnzyme;

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
    reverseRegex: getReverseComplementSequenceString(regexString),
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
    matches = cutSequenceByRestrictionEnzyme(inputSequenceToTestAgainst, true, enzyme);
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

  return React.createElement(
    'div',
    { className: 'createYourOwnEnzyme' },
    React.createElement(
      'h2',
      null,
      'Create your own enzyme'
    ),
    React.createElement(CustomInput, { error: errors['name'], value: name, onChange: onChange, name: 'name', label: 'Name:' }),
    React.createElement(CustomInput, { error: errors['sequence'], value: sequence, onChange: onChange, name: 'sequence', label: React.createElement(
        'div',
        { className: 'labelWithIcon' },
        React.createElement(
          QuestionTooltip,
          null,
          React.createElement(
            'div',
            { className: 'taLineHolder' },
            React.createElement(
              Line,
              null,
              ' Special Characters:  '
            ),
            React.createElement(
              Line,
              null,
              ' R = G A (purine) '
            ),
            React.createElement(
              Line,
              null,
              ' Y = T C (pyrimidine) '
            ),
            React.createElement(
              Line,
              null,
              ' K = G T (keto) '
            ),
            React.createElement(
              Line,
              null,
              ' M = A C (amino) '
            ),
            React.createElement(
              Line,
              null,
              ' S = G C (strong bonds) '
            ),
            React.createElement(
              Line,
              null,
              ' W = A T (weak bonds) '
            ),
            React.createElement(
              Line,
              null,
              ' B = G T C (all but A) '
            ),
            React.createElement(
              Line,
              null,
              ' D = G A T (all but C) '
            ),
            React.createElement(
              Line,
              null,
              ' H = A C T (all but G) '
            ),
            React.createElement(
              Line,
              null,
              ' V = G C A (all but T) '
            ),
            React.createElement(
              Line,
              null,
              ' N = A G C T (any) '
            )
          )
        ),
        React.createElement(
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
    React.createElement(CustomInput, { error: errors['chop_top_index'], value: chop_top_index, onChange: onChange, name: 'chop_top_index', label: 'Chop top index:', type: 'number' }),
    React.createElement(CustomInput, { error: errors['chop_bottom_index'], value: chop_bottom_index, onChange: onChange, name: 'chop_bottom_index', label: 'Chop bottom index:', type: 'number' }),
    React.createElement(RowItem, {
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
    React.createElement(
      'h3',
      { className: 'cutnumber ' + (matches.length === 0 && 'invalid') },
      matches.length > 10 ? 'Cuts more than 10 times in your ' + seqName : 'Cuts ' + matches.length + ' times in your ' + seqName
    ),
    React.createElement(
      'div',
      { className: 'buttonHolder' },
      React.createElement(
        PrimaryButton,
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
      React.createElement(
        SecondaryButton,
        { className: 'addYourOwnEnzymeBtn', onClick: stopAddingYourOwnEnzyme },
        'Back'
      )
    )
  );
}

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

AddYourOwnEnzyme = connect(function (state) {
  return { addYourOwnEnzyme: state.VectorEditor.addYourOwnEnzyme };
})(AddYourOwnEnzyme);

var AddAdditionalEnzymes = function (_React$Component) {
  _inherits(AddAdditionalEnzymes, _React$Component);

  function AddAdditionalEnzymes() {
    var _temp, _this, _ret;

    _classCallCheck(this, AddAdditionalEnzymes);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      addYourOwnEnzyme: false,
      enzymesToAdd: []
    }, _this.startAddingYourOwnEnzyme = function () {
      _this.setState({ addYourOwnEnzyme: true });
    }, _this.stopAddingYourOwnEnzyme = function () {
      _this.setState({ addYourOwnEnzyme: false });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  AddAdditionalEnzymes.prototype.render = function render() {
    var _this2 = this;

    if (this.state.addYourOwnEnzyme) {
      return React.createElement(AddYourOwnEnzyme, _extends({}, this.props, { stopAddingYourOwnEnzyme: this.stopAddingYourOwnEnzyme }));
    }
    var _props = this.props,
        dispatch = _props.dispatch,
        handleClose = _props.handleClose,
        _props$inputSequenceT2 = _props.inputSequenceToTestAgainst,
        inputSequenceToTestAgainst = _props$inputSequenceT2 === undefined ? '' : _props$inputSequenceT2;
    var enzymesToAdd = this.state.enzymesToAdd;

    return React.createElement(
      'div',
      { className: 'addYourOwnEnzyme' },
      React.createElement(
        'h2',
        null,
        'Add additional enzymes'
      ),
      React.createElement(
        'span',
        null,
        'Our default list only contains the most common enzymes. Search here to add less common ones:'
      ),
      React.createElement(
        'div',
        { className: 'filterAndButton' },
        React.createElement(Select, {
          multi: true,
          placeholder: 'Select cut sites...',
          options: map(enzymeListFull, function (enzyme) {
            return { label: enzyme.name, value: enzyme };
          }),
          onChange: function onChange(enzymesToAdd) {
            _this2.setState({
              enzymesToAdd: enzymesToAdd.map(function (_ref) {
                var value = _ref.value;

                var times = cutSequenceByRestrictionEnzyme(inputSequenceToTestAgainst, true, value).length;
                return {
                  label: value.name + (' (Cuts ' + times + ' time' + (times === 1 ? '' : 's') + ')'),
                  value: value
                };
              })
            });
          },
          value: enzymesToAdd
        }),
        React.createElement(
          PrimaryButton,
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
      React.createElement(
        'div',
        { className: 'createYourOwnButton' },
        React.createElement(
          'span',
          null,
          'Still not finding what you want?'
        ),
        React.createElement(
          PrimaryButton,
          { className: 'addYourOwnEnzymeBtn', onClick: this.startAddingYourOwnEnzyme },
          'Create your own enzyme'
        )
      )
    );
  };

  return AddAdditionalEnzymes;
}(React.Component);

function validate(values) {
  var errors = {};

  if (!values.name || values.name.trim() === '') {
    errors.name = 'Input cannot be blank';
  } else if (takaraEnzymeList[values.name.toLowerCase()]) {
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

AddAdditionalEnzymes = connect(function (state) {
  return { inputSequenceToTestAgainst: state.VectorEditor.addYourOwnEnzyme.inputSequenceToTestAgainst };
})(AddAdditionalEnzymes);

export default AddAdditionalEnzymes;

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

  return React.createElement(
    'div',
    { className: 'inputHolder ' + (error && 'error') },
    React.createElement(
      'div',
      null,
      React.createElement(
        'span',
        null,
        label
      ),
      React.createElement('input', { value: value, onChange: function onChange(e) {
          var _onChange;

          _onChange2((_onChange = {}, _onChange[name] = e.target.value, _onChange));
        }, onInput: onInput, type: type })
    ),
    error && React.createElement(
      'p',
      { className: 'errorMessage' },
      error
    )
  );
}

function Line(_ref3) {
  var children = _ref3.children;

  return React.createElement(
    'div',
    { className: 'taLine' },
    ' ',
    children
  );
}