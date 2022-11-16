export function validator(input, stateSetter, validationMessageSetter) {
  if (!input.validity.valid) {
    validationMessageSetter(input.validationMessage);
    stateSetter(false);
  } else {
    stateSetter(true);
    validationMessageSetter('');
  }
}

export function buttonSwitcher(validityStates, handleSubmitButtonSwitch) {
  if (
    validityStates.some((item) => {
      return item === false;
    })
  ) {
    handleSubmitButtonSwitch(false);
  } else {
    handleSubmitButtonSwitch(true);
  }
}