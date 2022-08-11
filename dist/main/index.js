"use strict";

exports.__esModule = true;
exports.Field = Field;
exports.Form = Form;
exports.InputField = InputField;
exports.fieldAtom = fieldAtom;
exports.formAtom = formAtom;
exports.useFieldAtom = useFieldAtom;
exports.useFieldAtomActions = useFieldAtomActions;
exports.useFieldAtomErrors = useFieldAtomErrors;
exports.useFieldAtomInitialValue = useFieldAtomInitialValue;
exports.useFieldAtomProps = useFieldAtomProps;
exports.useFieldAtomState = useFieldAtomState;
exports.useFieldAtomValue = useFieldAtomValue;
exports.useFormAtom = useFormAtom;
exports.useFormAtomActions = useFormAtomActions;
exports.useFormAtomErrors = useFormAtomErrors;
exports.useFormAtomState = useFormAtomState;
exports.useFormAtomStatus = useFormAtomStatus;
exports.useFormAtomSubmit = useFormAtomSubmit;
exports.useFormAtomValues = useFormAtomValues;
exports.walkFields = walkFields;

var _jotai = /*#__PURE__*/require("jotai");

exports.Provider = _jotai.Provider;

var _utils = /*#__PURE__*/require("jotai/utils");

var React = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("react"));

var _utils2 = /*#__PURE__*/require("./utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const __reactCreateElement__ = React.createElement;

//
// Components
//

/**
 * A React component that renders form atoms and their fields in an isolated
 * scope using a Jotai Provider.
 *
 * @param {FormProps<Fields>} props - Component props
 */
function Form(props) {
  const {
    scope,
    ...atomProps
  } = props;
  return /*#__PURE__*/__reactCreateElement__(_jotai.Provider, {
    scope: scope
  }, /*#__PURE__*/__reactCreateElement__(FormAtom, { ...atomProps
  }));
}

function FormAtom(props) {
  const form = useFormAtom(props.atom);

  if ("render" in props) {
    return props.render(form);
  }

  return /*#__PURE__*/__reactCreateElement__(props.component, { ...form
  });
}
/**
 * A React component that renders field atoms with initial values. This is
 * most useful for fields that are rendered as native HTML elements because
 * the props can unpack directly into the underlying component.
 *
 * @param {FieldProps<Value>} props - Component props
 */


function InputField(props) {
  const fieldAtom = useFieldAtom(props.atom, props.scope);
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
  const fieldAtomState = useFieldAtomState(props.atom, props.scope);
  const fieldAtomStateActions = useFieldAtomActions(props.atom, props.scope);
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


function _ref(count) {
  return ++count;
}

function _ref2(current) {
  return ++current;
}

function formAtom(fields) {
  const fieldsAtom = (0, _utils.atomWithReset)(fields);
  const valuesAtom = (0, _jotai.atom)(get => {
    const fields = get(fieldsAtom);
    const values = {};
    walkFields(fields, (field, path) => {
      const fieldAtom = get(field);
      (0, _utils2.setPath)(values, path, get(fieldAtom.value));
    });
    return values;
  });

  async function validateFields(get, set, event) {
    const fields = get(fieldsAtom);
    const promises = [];

    async function validate(field) {
      var _fieldAtom$_validateC;

      const fieldAtom = get(field);
      const value = get(fieldAtom.value);
      const dirty = get(fieldAtom.dirty); // This pointer prevents a stale validation result from being
      // set after the most recent validation has been performed.

      const ptr = get(fieldAtom._validateCount) + 1;
      set(fieldAtom._validateCount, ptr);

      if (event === "user" || event === "submit") {
        set(fieldAtom.touched, true);
      }

      const maybePromise = (_fieldAtom$_validateC = fieldAtom._validateCallback) === null || _fieldAtom$_validateC === void 0 ? void 0 : _fieldAtom$_validateC.call(fieldAtom, {
        get,
        value,
        dirty,
        touched: get(fieldAtom.touched),
        event
      });
      let errors;

      if (isPromise(maybePromise)) {
        var _await$maybePromise;

        set(fieldAtom.validateStatus, "validating");
        errors = (_await$maybePromise = await maybePromise) !== null && _await$maybePromise !== void 0 ? _await$maybePromise : get(fieldAtom.errors);
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
      promises.push(validate(nextField));
    });
    await Promise.all(promises);
  }

  const validateResultAtom = (0, _jotai.atom)(get => {
    const fields = get(fieldsAtom);
    let status = "valid";
    walkFields(fields, field => {
      const fieldAtom = get(field);
      const fieldStatus = get(fieldAtom.validateStatus);

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
  const validateAtom = (0, _jotai.atom)(null, (get, set, event = "user") => {
    event && validateFields(get, set, event);
  });
  const errorsAtom = (0, _jotai.atom)(get => {
    const fields = get(fieldsAtom);
    const errors = {};
    walkFields(fields, (field, path) => {
      const fieldAtom = get(field);
      (0, _utils2.setPath)(errors, path, get(fieldAtom.errors));
    });
    return errors;
  });
  const submitCountAtom = (0, _jotai.atom)(0);
  const submitStatusCountAtom = (0, _jotai.atom)(0);
  const submitResultAtom = (0, _jotai.atom)("idle");
  const submitAtom = (0, _jotai.atom)(null, (get, set, onSubmit) => {
    async function resolveSubmit() {
      // This pointer prevents a stale validation result from being
      // set after the most recent validation has been performed.
      const ptr = get(submitStatusCountAtom) + 1;
      set(submitStatusCountAtom, ptr);
      set(submitCountAtom, _ref);
      await validateFields(get, set, "submit");
      const validateStatus = get(validateResultAtom);

      if (validateStatus === "invalid") {
        return ptr === get(submitStatusCountAtom) && set(submitResultAtom, "idle");
      }

      const submission = onSubmit(get(valuesAtom));

      try {
        if (isPromise(submission)) {
          ptr === get(submitStatusCountAtom) && set(submitResultAtom, "submitting");
          await submission;
        } // eslint-disable-next-line no-empty

      } catch (err) {} finally {
        if (ptr === get(submitStatusCountAtom)) {
          set(submitResultAtom, "submitted");
        }
      }
    }

    resolveSubmit();
  });
  const dirtyAtom = (0, _jotai.atom)(get => {
    const fields = get(fieldsAtom);
    let dirty = false;
    walkFields(fields, field => {
      const fieldAtom = get(field);
      dirty = get(fieldAtom.dirty);
      if (dirty) return false;
    });
    return dirty;
  });
  const touchedFieldsAtom = (0, _jotai.atom)(get => {
    const fields = get(fieldsAtom);
    const touchedFields = {};
    walkFields(fields, (field, path) => {
      const fieldAtom = get(field);
      (0, _utils2.setPath)(touchedFields, path, get(fieldAtom.touched));
    });
    return touchedFields;
  });
  const resetAtom = (0, _jotai.atom)(null, (get, set) => {
    const fields = get(fieldsAtom);
    walkFields(fields, field => {
      const fieldAtom = get(field);
      set(fieldAtom.reset);
    });
    set(submitStatusCountAtom, _ref2);
    set(submitResultAtom, "idle");
  });
  return (0, _jotai.atom)({
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
  const form = (0, _jotai.useAtomValue)(formAtom, scope);
  const fieldAtoms = (0, _jotai.useAtomValue)(form.fields, scope);
  const reset = (0, _jotai.useSetAtom)(form.reset, scope);
  const validate = (0, _jotai.useSetAtom)(form.validate, scope);
  const handleSubmit = (0, _jotai.useSetAtom)(form.submit, scope);
  const [, startTransition] = useTransition();

  function _ref3() {
    validate("user");
  }

  return React.useMemo(() => ({
    fieldAtoms: fieldAtoms,

    validate() {
      startTransition(_ref3);
    },

    reset,

    submit(onSubmit) {
      function _ref4() {
        handleSubmit(onSubmit);
      }

      return e => {
        e === null || e === void 0 ? void 0 : e.preventDefault();
        startTransition(_ref4);
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
  const form = (0, _jotai.useAtomValue)(formAtom, scope);
  const fieldAtoms = (0, _jotai.useAtomValue)(form.fields, scope);
  const submitCount = (0, _jotai.useAtomValue)(form.submitCount, scope);
  const submitStatus = (0, _jotai.useAtomValue)(form.submitStatus, scope);
  const validateStatus = (0, _jotai.useAtomValue)(form.validateStatus, scope);
  const values = (0, _jotai.useAtomValue)(form.values, scope);
  const errors = (0, _jotai.useAtomValue)(form.errors, scope);
  const dirty = (0, _jotai.useAtomValue)(form.dirty, scope);
  const touchedFields = (0, _jotai.useAtomValue)(form.touchedFields, scope);
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
  const form = (0, _jotai.useAtomValue)(formAtom, scope);
  const updateFields = (0, _jotai.useSetAtom)(form.fields, scope);
  const reset = (0, _jotai.useSetAtom)(form.reset, scope);
  const validate = (0, _jotai.useSetAtom)(form.validate, scope);
  const handleSubmit = (0, _jotai.useSetAtom)(form.submit, scope);
  const submit = React.useCallback(values => e => {
    e === null || e === void 0 ? void 0 : e.preventDefault();
    handleSubmit(values);
  }, [handleSubmit]);
  const [, startTransition] = useTransition();

  function _ref5() {
    validate("user");
  }

  return React.useMemo(() => ({
    updateFields,
    reset,

    validate() {
      startTransition(_ref5);
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
  const form = (0, _jotai.useAtomValue)(formAtom, scope);
  return (0, _jotai.useAtomValue)(form.errors, scope);
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
  const form = (0, _jotai.useAtomValue)(formAtom, scope);
  return (0, _jotai.useAtomValue)(form.values, scope);
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
  const form = (0, _jotai.useAtomValue)(formAtom);
  const submitStatus = (0, _jotai.useAtomValue)(form.submitStatus, scope);
  const validateStatus = (0, _jotai.useAtomValue)(form.validateStatus, scope);
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
  const [, startTransition] = useTransition();
  const form = (0, _jotai.useAtomValue)(formAtom, scope);
  const handleSubmit = (0, _jotai.useSetAtom)(form.submit, scope);
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


function _ref6(count) {
  return ++count;
}

function fieldAtom(config) {
  var _config$touched;

  const nameAtom = (0, _utils.atomWithReset)(config.name);
  const valueAtom = (0, _utils.atomWithReset)(config.value);
  const touchedAtom = (0, _utils.atomWithReset)((_config$touched = config.touched) !== null && _config$touched !== void 0 ? _config$touched : false);
  const dirtyAtom = (0, _jotai.atom)(get => {
    return get(valueAtom) !== config.value;
  });
  const errorsAtom = (0, _jotai.atom)([]);
  const validateCountAtom = (0, _jotai.atom)(0);
  const validateResultAtom = (0, _jotai.atom)("valid");
  const validateAtom = (0, _jotai.atom)(null, (get, set, event = "user") => {
    async function resolveErrors() {
      var _config$validate;

      if (!event) return; // This pointer prevents a stale validation result from being
      // set to state after the most recent invocation of validate.

      const ptr = get(validateCountAtom) + 1;
      set(validateCountAtom, ptr);
      const dirty = get(dirtyAtom);
      const value = get(valueAtom);

      if (event === "user" || event === "submit") {
        set(touchedAtom, true);
      }

      let errors = [];
      const maybeValidatePromise = (_config$validate = config.validate) === null || _config$validate === void 0 ? void 0 : _config$validate.call(config, {
        get,
        dirty,
        touched: get(touchedAtom),
        value,
        event: event
      });

      if (isPromise(maybeValidatePromise)) {
        var _await$maybeValidateP;

        ptr === get(validateCountAtom) && set(validateResultAtom, "validating");
        errors = (_await$maybeValidateP = await maybeValidatePromise) !== null && _await$maybeValidateP !== void 0 ? _await$maybeValidateP : get(errorsAtom);
      } else {
        errors = maybeValidatePromise !== null && maybeValidatePromise !== void 0 ? maybeValidatePromise : get(errorsAtom);
      }

      if (ptr === get(validateCountAtom)) {
        set(errorsAtom, errors);
        set(validateResultAtom, errors.length > 0 ? "invalid" : "valid");
      }
    }

    resolveErrors();
  });
  const refAtom = (0, _jotai.atom)(null);
  const resetAtom = (0, _jotai.atom)(null, (get, set) => {
    set(errorsAtom, []);
    set(touchedAtom, _utils.RESET);
    set(valueAtom, _utils.RESET); // Need to set a new pointer to prevent stale validation results
    // from being set to state after this invocation.

    set(validateCountAtom, _ref6);
    set(validateResultAtom, "valid");
  });
  return (0, _jotai.atom)({
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
  const field = (0, _jotai.useAtomValue)(fieldAtom, scope);
  const setValue = (0, _jotai.useSetAtom)(field.value, scope);
  const setTouched = (0, _jotai.useSetAtom)(field.touched, scope);
  const setErrors = (0, _jotai.useSetAtom)(field.errors, scope);
  const validate = (0, _jotai.useSetAtom)(field.validate, scope);
  const reset = (0, _jotai.useSetAtom)(field.reset, scope);
  const ref = (0, _jotai.useAtomValue)(field.ref, scope);
  const [, startTransition] = useTransition();

  function _ref7() {
    validate("user");
  }

  function _ref8() {
    validate("change");
  }

  function _ref9() {
    validate("touch");
  }

  return React.useMemo(() => ({
    validate() {
      startTransition(_ref7);
    },

    setValue(value) {
      setValue(value);
      startTransition(_ref8);
    },

    setTouched(touched) {
      setTouched(touched);

      if (touched) {
        startTransition(_ref9);
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
  const field = (0, _jotai.useAtomValue)(fieldAtom, scope);
  const name = (0, _jotai.useAtomValue)(field.name, scope);
  const [value, setValue] = (0, _jotai.useAtom)(field.value, scope);
  const setTouched = (0, _jotai.useSetAtom)(field.touched, scope);
  const validateStatus = (0, _jotai.useAtomValue)(field.validateStatus, scope);
  const validate = (0, _jotai.useSetAtom)(field.validate, scope);
  const ref = (0, _jotai.useSetAtom)(field.ref, scope);
  const [, startTransition] = useTransition();

  function _ref10() {
    validate("blur");
  }

  function _ref11() {
    validate("change");
  }

  return React.useMemo(() => ({
    name,
    value: value,
    "aria-invalid": validateStatus === "invalid",
    ref,

    onBlur() {
      setTouched(true);
      startTransition(_ref10);
    },

    onChange(event) {
      // @ts-expect-error
      setValue(event.target.value);
      startTransition(_ref11);
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
  const field = (0, _jotai.useAtomValue)(fieldAtom, scope);
  const value = (0, _jotai.useAtomValue)(field.value, scope);
  const touched = (0, _jotai.useAtomValue)(field.touched, scope);
  const dirty = (0, _jotai.useAtomValue)(field.dirty, scope);
  const validateStatus = (0, _jotai.useAtomValue)(field.validateStatus, scope);
  const errors = (0, _jotai.useAtomValue)(field.errors, scope);
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
  const field = (0, _jotai.useAtomValue)(fieldAtom, scope);
  return (0, _jotai.useAtomValue)(field.value, scope);
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
  const field = (0, _jotai.useAtomValue)(fieldAtom, scope);
  return (0, _jotai.useAtomValue)(field.errors, scope);
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
  const field = (0, _jotai.useAtomValue)(fieldAtom, scope);
  (0, _utils.useHydrateAtoms)(initialValue === undefined ? [] : [[field.value, initialValue]], scope);
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
  const props = useFieldAtomProps(fieldAtom, scope);
  const actions = useFieldAtomActions(fieldAtom, scope);
  const state = useFieldAtomState(fieldAtom, scope);
  return React.useMemo(() => ({
    props,
    actions,
    state
  }), [props, actions, state]);
}

function _ref12(fn) {
  return fn();
}

const useTransition = typeof React.useTransition === "function" ? React.useTransition : () => [false, _ref12];

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


function walkFields(fields, visitor, path = []) {
  for (const key in fields) {
    path.push(key);
    const field = fields[key];

    if (isAtom(field)) {
      if (visitor(field, path) === false) return;
    } else if (Array.isArray(field)) {
      for (const key in field) {
        path.push(key);
        const subField = field[key];

        if (isAtom(subField)) {
          if (visitor(subField, path) === false) return;
        } else {
          walkFields(subField, visitor, path);
        }

        path.pop();
      }
    } else if (typeof field === "object") {
      walkFields(field, visitor, path);
    }

    path.pop();
  }
}