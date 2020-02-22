export function inputOnChangeHandler(options, event) {
  if (!this || !this.setState) {
    // TODO: Change to hooks version
    throw Error(`No setState in parent component`);
  }
  // console.log(`inputOnChangeHandler`, event.key, options);
  const change = {};
  switch (event.target.type) {
    case `checkbox`:
      change[event.target.name] = event.target.checked;
      break;
    default:
      change[event.target.name] = event.target.value;
  }
  console.log(
    `[INPUT] Changing state of ${event.target.name} from ${
      this.state[event.target.name]
    } to ${change[event.target.name]}`,
    options.keys.indexOf(event.key.toLowerCase()) != -1
  );
  this.setState(() => {
    return change;
  });
  if (options.keys.indexOf(event.key.toLowerCase()) !== -1) {
    options.handler();
  }
}
