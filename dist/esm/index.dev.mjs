import { Provider, atom, useAtomValue, useSetAtom, useAtom } from 'jotai';
export { Provider } from 'jotai';
import { atomWithReset, RESET, useHydrateAtoms } from 'jotai/utils';
import * as React from 'react';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function setPath(target, paths, value) {
  if (paths.length === 1) {
    target[paths[0]] = value;
    return target;
  }

  var next = target;

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];

    if (i === paths.length - 1) {
      next[path] = value;
    } else {
      var current = next[path];
      next = next[path] = current !== null && current !== void 0 ? current : isNaN(paths[i + 1]) ? {} : [];
    }
  }
}

var _excluded = ["scope"];
var __reactCreateElement__ = React.createElement;
// Components
//

/**
 * A React component that renders form atoms and their fields in an isolated
 * scope using a Jotai Provider.
 *
 * @param {FormProps<Fields>} props - Component props
 */

function Form(props) {
  var {
    scope
  } = props,
      atomProps = _objectWithoutPropertiesLoose(props, _excluded);

  return /*#__PURE__*/__reactCreateElement__(Provider, {
    scope: scope
  }, /*#__PURE__*/__reactCreateElement__(FormAtom, _extends({}, atomProps)));
}

function FormAtom(props) {
  var form = useFormAtom(props.atom);

  if ("render" in props) {
    return props.render(form);
  }

  return /*#__PURE__*/__reactCreateElement__(props.component, _extends({}, form));
}
/**
 * A React component that renders field atoms with initial values. This is
 * most useful for fields that are rendered as native HTML elements because
 * the props can unpack directly into the underlying component.
 *
 * @param {FieldProps<Value>} props - Component props
 */


function InputField(props) {
  var fieldAtom = useFieldAtom(props.atom, props.scope);
  useFieldAtomInitialValue(props.atom, props.initialValue, props.scope);

  if ("render" in props) {
    return props.render(fieldAtom.props, fieldAtom.state, fieldAtom.actions);
  }

  return __reactCreateElement__(props.component, fieldAtom.props);
}
/**
 * A React component that renders field atoms with initial values. This is
 * most useful for fields that aren't rendered as native HTML elements.
 *
 * @param {FieldProps<Value>} props - Component props
 */

function Field(props) {
  var fieldAtomState = useFieldAtomState(props.atom, props.scope);
  var fieldAtomStateActions = useFieldAtomActions(props.atom, props.scope);
  useFieldAtomInitialValue(props.atom, props.initialValue, props.scope);

  if ("render" in props) {
    return props.render(fieldAtomState, fieldAtomStateActions);
  }

  return /*#__PURE__*/__reactCreateElement__(props.component, {
    state: fieldAtomState,
    actions: fieldAtomStateActions
  });
} //
// Forms
//

/**
 * An atom that derives its state fields atoms and allows you to submit,
 * validate, and reset your form.
 *
 * @param {FormAtomFields} fields - An object containing field atoms to
 *   be included in the form. Field atoms can be deeply nested in
 *   objects and arrays.
 * @returns The `formAtom` function returns a Jotai `Atom`
 *   comprised of other atoms for managing the state of the form.
 */

function _ref3(count) {
  return ++count;
}

function _ref5(current) {
  return ++current;
}

function formAtom(fields) {
  var fieldsAtom = atomWithReset(fields);
  var valuesAtom = atom(get => {
    var fields = get(fieldsAtom);
    var values = {};
    walkFields(fields, (field, path) => {
      var fieldAtom = get(field);
      setPath(values, path, get(fieldAtom.value));
    });
    return values;
  });

  function validateFields(_x, _x2, _x3) {
    return _validateFields.apply(this, arguments);
  }

  function* _ref2(get, set, event) {
    var fields = get(fieldsAtom);
    var promises = [];

    function* _ref(field) {
      var _fieldAtom$_validateC;

      var fieldAtom = get(field);
      var value = get(fieldAtom.value);
      var dirty = get(fieldAtom.dirty); // This pointer prevents a stale validation result from being
      // set after the most recent validation has been performed.

      var ptr = get(fieldAtom._validateCount) + 1;
      set(fieldAtom._validateCount, ptr);

      if (event === "user" || event === "submit") {
        set(fieldAtom.touched, true);
      }

      var maybePromise = (_fieldAtom$_validateC = fieldAtom._validateCallback) === null || _fieldAtom$_validateC === void 0 ? void 0 : _fieldAtom$_validateC.call(fieldAtom, {
        get,
        value,
        dirty,
        touched: get(fieldAtom.touched),
        event
      });
      var errors;

      if (isPromise(maybePromise)) {
        var _yield$maybePromise;

        set(fieldAtom.validateStatus, "validating");
        errors = (_yield$maybePromise = yield maybePromise) !== null && _yield$maybePromise !== void 0 ? _yield$maybePromise : get(fieldAtom.errors);
      } else {
        errors = maybePromise !== null && maybePromise !== void 0 ? maybePromise : get(fieldAtom.errors);
      }

      if (ptr === get(fieldAtom._validateCount)) {
        set(fieldAtom.errors, errors);
        set(fieldAtom.validateStatus, errors.length > 0 ? "invalid" : "valid");
      }

      if (errors && errors.length) {
        return false;
      }

      return true;
    }

    walkFields(fields, nextField => {
      function validate(_x4) {
        return _validate.apply(this, arguments);
      }

      function _validate() {
        _validate = _asyncToGenerator(_ref);
        return _validate.apply(this, arguments);
      }

      promises.push(validate(nextField));
    });
    yield Promise.all(promises);
  }

  function _validateFields() {
    _validateFields = _asyncToGenerator(_ref2);
    return _validateFields.apply(this, arguments);
  }

  var validateResultAtom = atom(get => {
    var fields = get(fieldsAtom);
    var status = "valid";
    walkFields(fields, field => {
      var fieldAtom = get(field);
      var fieldStatus = get(fieldAtom.validateStatus);

      if (fieldStatus === "validating") {
        status = "validating";
        return false;
      } else if (fieldStatus === "invalid") {
        status = "invalid";
        return false;
      }
    });
    return status;
  });
  var validateAtom = atom(null, function (get, set, event) {
    if (event === void 0) {
      event = "user";
    }

    event && validateFields(get, set, event);
  });
  var errorsAtom = atom(get => {
    var fields = get(fieldsAtom);
    var errors = {};
    walkFields(fields, (field, path) => {
      var fieldAtom = get(field);
      setPath(errors, path, get(fieldAtom.errors));
    });
    return errors;
  });
  var submitCountAtom = atom(0);
  var submitStatusCountAtom = atom(0);
  var submitResultAtom = atom("idle");
  var submitAtom = atom(null, (get, set, onSubmit) => {
    function resolveSubmit() {
      return _resolveSubmit.apply(this, arguments);
    }

    function* _ref4() {
      // This pointer prevents a stale validation result from being
      // set after the most recent validation has been performed.
      var ptr = get(submitStatusCountAtom) + 1;
      set(submitStatusCountAtom, ptr);
      set(submitCountAtom, _ref3);
      yield validateFields(get, set, "submit");
      var validateStatus = get(validateResultAtom);

      if (validateStatus === "invalid") {
        return ptr === get(submitStatusCountAtom) && set(submitResultAtom, "idle");
      }

      var submission = onSubmit(get(valuesAtom));

      try {
        if (isPromise(submission)) {
          ptr === get(submitStatusCountAtom) && set(submitResultAtom, "submitting");
          yield submission;
        } // eslint-disable-next-line no-empty

      } catch (err) {} finally {
        if (ptr === get(submitStatusCountAtom)) {
          set(submitResultAtom, "submitted");
        }
      }
    }

    function _resolveSubmit() {
      _resolveSubmit = _asyncToGenerator(_ref4);
      return _resolveSubmit.apply(this, arguments);
    }

    resolveSubmit();
  });
  var dirtyAtom = atom(get => {
    var fields = get(fieldsAtom);
    var dirty = false;
    walkFields(fields, field => {
      var fieldAtom = get(field);
      dirty = get(fieldAtom.dirty);
      if (dirty) return false;
    });
    return dirty;
  });
  var touchedFieldsAtom = atom(get => {
    var fields = get(fieldsAtom);
    var touchedFields = {};
    walkFields(fields, (field, path) => {
      var fieldAtom = get(field);
      setPath(touchedFields, path, get(fieldAtom.touched));
    });
    return touchedFields;
  });
  var resetAtom = atom(null, (get, set) => {
    var fields = get(fieldsAtom);
    walkFields(fields, field => {
      var fieldAtom = get(field);
      set(fieldAtom.reset);
    });
    set(submitStatusCountAtom, _ref5);
    set(submitResultAtom, "idle");
  });
  return atom({
    fields: fieldsAtom,
    values: valuesAtom,
    errors: errorsAtom,
    dirty: dirtyAtom,
    touchedFields: touchedFieldsAtom,
    validate: validateAtom,
    validateStatus: validateResultAtom,
    submit: submitAtom,
    submitStatus: submitResultAtom,
    submitCount: submitCountAtom,
    reset: resetAtom
  });
}
/**
 * A hook that returns an object that contains the `fieldAtoms` and actions to
 * validate, submit, and reset the form.
 *
 * @param {FormAtom<FormAtomFields>} formAtom - The atom that stores the form state.
 * @param {Scope} scope - When using atoms with a scope, the provider with
 *   the same scope will be used. The recommendation for the scope value is
 *   a unique symbol. The primary use case of scope is for library usage.
 * @returns A set of functions that can be used to interact
 *   with the form.
 */

function useFormAtom(formAtom, scope) {
  var form = useAtomValue(formAtom, scope);
  var fieldAtoms = useAtomValue(form.fields, scope);
  var reset = useSetAtom(form.reset, scope);
  var validate = useSetAtom(form.validate, scope);
  var handleSubmit = useSetAtom(form.submit, scope);
  var [, startTransition] = useTransition();

  function _ref6() {
    validate("user");
  }

  return React.useMemo(() => ({
    fieldAtoms: fieldAtoms,

    validate() {
      startTransition(_ref6);
    },

    reset,

    submit(onSubmit) {
      function _ref7() {
        handleSubmit(onSubmit);
      }

      return e => {
        e === null || e === void 0 ? void 0 : e.preventDefault();
        startTransition(_ref7);
      };
    }

  }), [fieldAtoms, validate, reset, handleSubmit]);
}
/**
 * A hook that returns the primary state of the form atom including values, errors,
 * submit and validation status, as well as the `fieldAtoms`. Note that this
 * hook will cuase its parent component to re-render any time those states
 * change, so it can be useful to use more targeted state hooks like
 * `useFormAtomStatus`.
 *
 * @param {FormAtom<FormAtomFields>} formAtom - The atom that stores the form state.
 * @param {Scope} scope - When using atoms with a scope, the provider with
 *   the same scope will be used. The recommendation for the scope value is
 *   a unique symbol. The primary use case of scope is for library usage.
 */

function useFormAtomState(formAtom, scope) {
  var form = useAtomValue(formAtom, scope);
  var fieldAtoms = useAtomValue(form.fields, scope);
  var submitCount = useAtomValue(form.submitCount, scope);
  var submitStatus = useAtomValue(form.submitStatus, scope);
  var validateStatus = useAtomValue(form.validateStatus, scope);
  var values = useAtomValue(form.values, scope);
  var errors = useAtomValue(form.errors, scope);
  var dirty = useAtomValue(form.dirty, scope);
  var touchedFields = useAtomValue(form.touchedFields, scope);
  return React.useMemo(() => ({
    fieldAtoms: fieldAtoms,
    values: values,
    errors: errors,
    dirty,
    touchedFields: touchedFields,
    submitCount,
    submitStatus,
    validateStatus
  }), [fieldAtoms, values, errors, dirty, touchedFields, submitCount, submitStatus, validateStatus]);
}
/**
 * A hook that returns a set of actions that can be used to update the state
 * of the form atom. This includes updating fields, submitting, resetting,
 * and validating the form.
 *
 * @param {FormAtom<FormAtomFields>} formAtom - The atom that stores the form state.
 * @param {Scope} scope - When using atoms with a scope, the provider with
 *   the same scope will be used. The recommendation for the scope value is
 *   a unique symbol. The primary use case of scope is for library usage.
 */

function useFormAtomActions(formAtom, scope) {
  var form = useAtomValue(formAtom, scope);
  var updateFields = useSetAtom(form.fields, scope);
  var reset = useSetAtom(form.reset, scope);
  var validate = useSetAtom(form.validate, scope);
  var handleSubmit = useSetAtom(form.submit, scope);
  var submit = React.useCallback(values => e => {
    e === null || e === void 0 ? void 0 : e.preventDefault();
    handleSubmit(values);
  }, [handleSubmit]);
  var [, startTransition] = useTransition();

  function _ref8() {
    validate("user");
  }

  return React.useMemo(() => ({
    updateFields,
    reset,

    validate() {
      startTransition(_ref8);
    },

    submit
  }), [updateFields, reset, validate, submit]);
}
/**
 * A hook that returns the errors of the form atom.
 *
 * @param {FormAtom<FormAtomFields>} formAtom - The atom that stores the form data.
 * @param {Scope} scope - When using atoms with a scope, the provider with
 *   the same scope will be used. The recommendation for the scope value is
 *   a unique symbol. The primary use case of scope is for library usage.
 * @returns The errors of the form.
 */

function useFormAtomErrors(formAtom, scope) {
  var form = useAtomValue(formAtom, scope);
  return useAtomValue(form.errors, scope);
}
/**
 * A hook that returns the values of the form atom
 *
 * @param {FormAtom<FormAtomFields>} formAtom - The atom that stores the form state.
 * @param {Scope} scope - When using atoms with a scope, the provider with
 *   the same scope will be used. The recommendation for the scope value is
 *   a unique symbol. The primary use case of scope is for library usage.
 * @returns The values of the form.
 */

function useFormAtomValues(formAtom, scope) {
  var form = useAtomValue(formAtom, scope);
  return useAtomValue(form.values, scope);
}
/**
 * A hook that returns the `submitStatus` and `validateStatus` of
 * the form atom.
 *
 * @param {FormAtom<FormAtomFields>} formAtom - The atom that stores the form state.
 * @param {Scope} scope - When using atoms with a scope, the provider with
 *   the same scope will be used. The recommendation for the scope value is
 *   a unique symbol. The primary use case of scope is for library usage.
 * @returns An object containing the `submitStatus` and
 *   `validateStatus` of the form
 */

function useFormAtomStatus(formAtom, scope) {
  var form = useAtomValue(formAtom);
  var submitStatus = useAtomValue(form.submitStatus, scope);
  var validateStatus = useAtomValue(form.validateStatus, scope);
  return React.useMemo(() => ({
    submitStatus,
    validateStatus
  }), [submitStatus, validateStatus]);
}
/**
 * A hook that returns a callback for handling form submission.
 *
 * @param {FormAtom<FormAtomFields>} formAtom - The atom that stores the form state.
 * @param {Scope} scope - When using atoms with a scope, the provider with
 *   the same scope will be used. The recommendation for the scope value is
 *   a unique symbol. The primary use case of scope is for library usage.
 * @returns A callback for handling form submission. The callback
 *   takes the form values as an argument and returs an additional callback
 *   that invokes `event.preventDefault()` if it receives an event as its argument.
 */

function useFormAtomSubmit(formAtom, scope) {
  var [, startTransition] = useTransition();
  var form = useAtomValue(formAtom, scope);
  var handleSubmit = useSetAtom(form.submit, scope);
  return React.useCallback(values => e => {
    e === null || e === void 0 ? void 0 : e.preventDefault();
    startTransition(() => {
      handleSubmit(values);
    });
  }, [handleSubmit]);
} //
// Fields
//

/**
 * An atom that represents a field in a form. It manages state for the field,
 * including the name, value, errors, dirty, validation, and touched state.
 *
 * @param {FieldAtomConfig<Value>} config - The initial state and configuration of the field.
 * @returns A FieldAtom.
 */

function _ref10(count) {
  return ++count;
}

function fieldAtom(config) {
  var _config$touched;

  var nameAtom = atomWithReset(config.name);
  var valueAtom = atomWithReset(config.value);
  var touchedAtom = atomWithReset((_config$touched = config.touched) !== null && _config$touched !== void 0 ? _config$touched : false);
  var dirtyAtom = atom(get => {
    return get(valueAtom) !== config.value;
  });
  var errorsAtom = atom([]);
  var validateCountAtom = atom(0);
  var validateResultAtom = atom("valid");
  var validateAtom = atom(null, function (get, set, event) {
    if (event === void 0) {
      event = "user";
    }

    function resolveErrors() {
      return _resolveErrors.apply(this, arguments);
    }

    function* _ref9() {
      var _config$validate;

      if (!event) return; // This pointer prevents a stale validation result from being
      // set to state after the most recent invocation of validate.

      var ptr = get(validateCountAtom) + 1;
      set(validateCountAtom, ptr);
      var dirty = get(dirtyAtom);
      var value = get(valueAtom);

      if (event === "user" || event === "submit") {
        set(touchedAtom, true);
      }

      var errors = [];
      var maybeValidatePromise = (_config$validate = config.validate) === null || _config$validate === void 0 ? void 0 : _config$validate.call(config, {
        get,
        dirty,
        touched: get(touchedAtom),
        value,
        event: event
      });

      if (isPromise(maybeValidatePromise)) {
        var _yield$maybeValidateP;

        ptr === get(validateCountAtom) && set(validateResultAtom, "validating");
        errors = (_yield$maybeValidateP = yield maybeValidatePromise) !== null && _yield$maybeValidateP !== void 0 ? _yield$maybeValidateP : get(errorsAtom);
      } else {
        errors = maybeValidatePromise !== null && maybeValidatePromise !== void 0 ? maybeValidatePromise : get(errorsAtom);
      }

      if (ptr === get(validateCountAtom)) {
        set(errorsAtom, errors);
        set(validateResultAtom, errors.length > 0 ? "invalid" : "valid");
      }
    }

    function _resolveErrors() {
      _resolveErrors = _asyncToGenerator(_ref9);
      return _resolveErrors.apply(this, arguments);
    }

    resolveErrors();
  });
  var refAtom = atom(null);
  var resetAtom = atom(null, (get, set) => {
    set(errorsAtom, []);
    set(touchedAtom, RESET);
    set(valueAtom, RESET); // Need to set a new pointer to prevent stale validation results
    // from being set to state after this invocation.

    set(validateCountAtom, _ref10);
    set(validateResultAtom, "valid");
  });
  return atom({
    name: nameAtom,
    value: valueAtom,
    touched: touchedAtom,
    dirty: dirtyAtom,
    validate: validateAtom,
    validateStatus: validateResultAtom,
    errors: errorsAtom,
    reset: resetAtom,
    ref: refAtom,
    _validateCallback: config.validate,
    _validateCount: validateCountAtom
  });
}
/**
 * A hook that returns a set of actions that can be used to interact with the
 * field atom state.
 *
 * @param {FieldAtom<any>} fieldAtom - The atom that stores the field's state.
 * @param {Scope} scope - When using atoms with a scope, the provider with
 *   the same scope will be used. The recommendation for the scope value is
 *   a unique symbol. The primary use case of scope is for library usage.
 * @returns A set of actions that can be used to interact with the field atom.
 */

function useFieldAtomActions(fieldAtom, scope) {
  var field = useAtomValue(fieldAtom, scope);
  var setValue = useSetAtom(field.value, scope);
  var setTouched = useSetAtom(field.touched, scope);
  var setErrors = useSetAtom(field.errors, scope);
  var validate = useSetAtom(field.validate, scope);
  var reset = useSetAtom(field.reset, scope);
  var ref = useAtomValue(field.ref, scope);
  var [, startTransition] = useTransition();

  function _ref11() {
    validate("user");
  }

  function _ref12() {
    validate("change");
  }

  function _ref13() {
    validate("touch");
  }

  return React.useMemo(() => ({
    validate() {
      startTransition(_ref11);
    },

    setValue(value) {
      setValue(value);
      startTransition(_ref12);
    },

    setTouched(touched) {
      setTouched(touched);

      if (touched) {
        startTransition(_ref13);
      }
    },

    setErrors,

    focus() {
      ref === null || ref === void 0 ? void 0 : ref.focus();
    },

    reset
  }), [setErrors, reset, validate, setValue, setTouched, ref]);
}
/**
 * A hook that returns a set of props that can be destructured
 * directly into an `<input>`, `<select>`, or `<textarea>` element.
 *
 * @param {FieldAtom<any>} fieldAtom - The atom that stores the field's state.
 * @param {Scope} scope - When using atoms with a scope, the provider with
 *   the same scope will be used. The recommendation for the scope value is
 *   a unique symbol. The primary use case of scope is for library usage.
 * @returns A set of props that can be destructured directly into an `<input>`,
 *   `<select>`, or `<textarea>` element.
 */

function useFieldAtomProps(fieldAtom, scope) {
  var field = useAtomValue(fieldAtom, scope);
  var name = useAtomValue(field.name, scope);
  var [value, setValue] = useAtom(field.value, scope);
  var setTouched = useSetAtom(field.touched, scope);
  var validateStatus = useAtomValue(field.validateStatus, scope);
  var validate = useSetAtom(field.validate, scope);
  var ref = useSetAtom(field.ref, scope);
  var [, startTransition] = useTransition();

  function _ref14() {
    validate("blur");
  }

  function _ref15() {
    validate("change");
  }

  return React.useMemo(() => ({
    name,
    value: value,
    "aria-invalid": validateStatus === "invalid",
    ref,

    onBlur() {
      setTouched(true);
      startTransition(_ref14);
    },

    onChange(event) {
      // @ts-expect-error
      setValue(event.target.value);
      startTransition(_ref15);
    }

  }), [name, value, validateStatus, ref, setTouched, validate, setValue]);
}
/**
 * A hook that returns the state of a field atom. This includes the field's
 * value, whether it has been touched, whether it is dirty, the validation status,
 * and any errors.
 *
 * @param {FieldAtom<any>} fieldAtom - The atom that stores the field's state.
 * @param {Scope} scope - When using atoms with a scope, the provider with
 *   the same scope will be used. The recommendation for the scope value is
 *   a unique symbol. The primary use case of scope is for library usage.
 * @returns The state of the field atom.
 */

function useFieldAtomState(fieldAtom, scope) {
  var field = useAtomValue(fieldAtom, scope);
  var value = useAtomValue(field.value, scope);
  var touched = useAtomValue(field.touched, scope);
  var dirty = useAtomValue(field.dirty, scope);
  var validateStatus = useAtomValue(field.validateStatus, scope);
  var errors = useAtomValue(field.errors, scope);
  return React.useMemo(() => ({
    value: value,
    touched,
    dirty,
    validateStatus,
    errors
  }), [value, touched, dirty, validateStatus, errors]);
}
/**
 * A hook that returns the value of a field atom.
 *
 * @param {FieldAtom<any>} fieldAtom - The atom that stores the field's state.
 * @param {Scope} scope - When using atoms with a scope, the provider with
 *   the same scope will be used. The recommendation for the scope value is
 *   a unique symbol. The primary use case of scope is for library usage.
 * @returns The value of the field atom.
 */

function useFieldAtomValue(fieldAtom, scope) {
  var field = useAtomValue(fieldAtom, scope);
  return useAtomValue(field.value, scope);
}
/**
 * A hook that returns the errors of a field atom.
 *
 * @param {FieldAtom<any>} fieldAtom - The atom that stores the field's state.
 * @param {Scope} scope - When using atoms with a scope, the provider with
 *   the same scope will be used. The recommendation for the scope value is
 *   a unique symbol. The primary use case of scope is for library usage.
 * @returns The errors of the field atom.
 */

function useFieldAtomErrors(fieldAtom, scope) {
  var field = useAtomValue(fieldAtom, scope);
  return useAtomValue(field.errors, scope);
}
/**
 * Sets the initial value of a field atom. Initial values can only be set once
 * per scope. Therefore, if the initial value used is changed during rerenders,
 * it won't update the atom value.
 *
 * @param {FieldAtom<any>} fieldAtom - The atom that you want to use to store the value.
 * @param {Value} initialValue - The initial value of the field.
 * @param {Scope} scope - When using atoms with a scope, the provider with
 *   the same scope will be used. The recommendation for the scope value is
 *   a unique symbol. The primary use case of scope is for library usage.
 */

function useFieldAtomInitialValue(fieldAtom, initialValue, scope) {
  var field = useAtomValue(fieldAtom, scope);
  useHydrateAtoms(initialValue === undefined ? [] : [[field.value, initialValue]], scope);
}
/**
 * A hook that returns `props`, `state`, and `actions` of a field atom from
 * `useFieldAtomProps`, `useFieldAtomState`, and `useFieldAtomActions`.
 *
 * @param {FieldAtom<any>} fieldAtom - The atom that stores the field's state.
 * @param {Scope} scope - When using atoms with a scope, the provider with
 *   the same scope will be used. The recommendation for the scope value is
 *   a unique symbol. The primary use case of scope is for library usage.
 * @returns The errors of the field atom.
 */

function useFieldAtom(fieldAtom, scope) {
  var props = useFieldAtomProps(fieldAtom, scope);
  var actions = useFieldAtomActions(fieldAtom, scope);
  var state = useFieldAtomState(fieldAtom, scope);
  return React.useMemo(() => ({
    props,
    actions,
    state
  }), [props, actions, state]);
}

function _ref16(fn) {
  return fn();
}

var useTransition = typeof React.useTransition === "function" ? React.useTransition : () => [false, _ref16];

function isPromise(value) {
  return typeof value === "object" && typeof value.then === "function";
}

function isAtom(maybeAtom) {
  return maybeAtom !== null && typeof maybeAtom === "object" && (typeof maybeAtom.read === "function" || typeof maybeAtom.write === "function");
}
/**
 * A function that walks through an object containing nested field atoms
 * and calls a visitor function for each atom it finds.
 *
 * @param {FormAtomFields} fields - An object containing nested field atoms
 * @param visitor - A function that will be called for each field atom. You can
 *  exit early by returning `false` from the function.
 * @param path - The base path of the field atom.
 */


function walkFields(fields, visitor, path) {
  if (path === void 0) {
    path = [];
  }

  for (var _key in fields) {
    path.push(_key);
    var _field = fields[_key];

    if (isAtom(_field)) {
      if (visitor(_field, path) === false) return;
    } else if (Array.isArray(_field)) {
      for (var _key2 in _field) {
        path.push(_key2);
        var subField = _field[_key2];

        if (isAtom(subField)) {
          if (visitor(subField, path) === false) return;
        } else {
          walkFields(subField, visitor, path);
        }

        path.pop();
      }
    } else if (typeof _field === "object") {
      walkFields(_field, visitor, path);
    }

    path.pop();
  }
}

export { Field, Form, InputField, fieldAtom, formAtom, useFieldAtom, useFieldAtomActions, useFieldAtomErrors, useFieldAtomInitialValue, useFieldAtomProps, useFieldAtomState, useFieldAtomValue, useFormAtom, useFormAtomActions, useFormAtomErrors, useFormAtomState, useFormAtomStatus, useFormAtomSubmit, useFormAtomValues, walkFields };
//# sourceMappingURL=index.dev.mjs.map
