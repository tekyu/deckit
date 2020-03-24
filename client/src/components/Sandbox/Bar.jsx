import React, { Fragment } from "react";
import Foo1 from "./Foo1";
import Foo2 from "./Foo2";
import Foo3 from "./Foo3";
import Baz1 from "./Baz1";

const Bar = () => {
  const state = 789;

  const components = {
    123: <Foo1 />,
    456: <Foo2 />,
    789: (
      <Fragment>
        <Foo3 />
        <Baz1 />
      </Fragment>
    )
  };

  return (
    <div>
      {state === 123 && <Foo1 />}
      {state === 456 && <Foo2 />}
      {state === 789 && <Foo3 />}
      {state === 789 && <Baz1 />}
      {/* OR */}
      {components[state]}
    </div>
  );
};

export default Bar;
