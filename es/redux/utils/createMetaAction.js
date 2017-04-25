var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { createAction } from 'redux-act';
export default function createMetaAction(actionName, payloadHelper) {
  return createAction(actionName, payloadHelper, function (unused, meta) {
    return _extends({}, meta, {
      EditorNamespace: meta.namespace
    });
  });
}