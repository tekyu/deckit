export function inputOnChangeHandler(options, event) {
  if (!this || !this.setState) {
    // TODO: Change to hooks version
    throw Error(`No setState in parent component`);
  }
  const change = {};
  switch (event.target.type) {
    case `checkbox`:
      change[event.target.name] = event.target.checked;
      break;
    default:
      change[event.target.name] = event.target.value;
  }
  this.setState(() => change);
  if (options.keys.indexOf(event.key.toLowerCase()) !== -1) {
    change[event.target.name] = "";
    this.setState(() => change);
    options.handler();
  }
}

export function getSelectInput(options) {
  if (!options.list) {
    throw Error(`Cannot create select input because options list is empty`);
  }
  // const mappedOptions =
  // TODO: for array || object
}
