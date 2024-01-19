import {
  require_react
} from "./chunk-UM3JHGVO.js";
import {
  __toESM
} from "./chunk-CEQRFMJQ.js";

// node_modules/hamburger-react/dist-esm/Burger.js
var import_react = __toESM(require_react());
var area = 48;
var Burger = ({
  color = "currentColor",
  direction = "left",
  distance = "md",
  duration = 0.4,
  easing = "cubic-bezier(0, 0, 0, 1)",
  hideOutline = true,
  label,
  lines = 3,
  onToggle,
  render,
  rounded = false,
  size = 32,
  toggle,
  toggled
}) => {
  const [toggledInternal, toggleInternal] = (0, import_react.useState)(false);
  const width = Math.max(12, Math.min(area, size));
  const room = Math.round((area - width) / 2);
  const barHeightRaw = width / 12;
  const barHeight = Math.round(barHeightRaw);
  const space = distance === "lg" ? 0.25 : distance === "sm" ? 0.75 : 0.5;
  const marginRaw = width / (lines * (space + (lines === 3 ? 1 : 1.25)));
  const margin = Math.round(marginRaw);
  const height = barHeight * lines + margin * (lines - 1);
  const topOffset = Math.round((area - height) / 2);
  const translate = lines === 3 ? distance === "lg" ? 4.0425 : distance === "sm" ? 5.1625 : 4.6325 : distance === "lg" ? 6.7875 : distance === "sm" ? 8.4875 : 7.6675;
  const deviation = (barHeightRaw - barHeight + (marginRaw - margin)) / (lines === 3 ? 1 : 2);
  const move = parseFloat((width / translate - deviation / (4 / 3)).toFixed(2));
  const time = Math.max(0, duration);
  const burgerStyles = {
    cursor: "pointer",
    height: `${area}px`,
    position: "relative",
    transition: `${time}s ${easing}`,
    userSelect: "none",
    width: `${area}px`
  };
  const barStyles = {
    background: color,
    height: `${barHeight}px`,
    left: `${room}px`,
    position: "absolute"
  };
  if (hideOutline) {
    burgerStyles["outline"] = "none";
  }
  if (rounded) {
    barStyles["borderRadius"] = "9em";
  }
  const toggleFunction = toggle || toggleInternal;
  const isToggled = toggled !== void 0 ? toggled : toggledInternal;
  const handler = () => {
    toggleFunction(!isToggled);
    if (typeof onToggle === "function")
      onToggle(!isToggled);
  };
  return render({
    barHeight,
    barStyles,
    burgerStyles,
    easing,
    handler,
    isLeft: direction === "left",
    isToggled,
    label,
    margin,
    move,
    time,
    topOffset,
    width
  });
};

// node_modules/hamburger-react/dist-esm/Tilt.js
var import_react2 = __toESM(require_react());
function _extends() {
  _extends = Object.assign || function(target) {
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
var Tilt = (props) => import_react2.default.createElement(Burger, _extends({}, props, {
  render: (o) => import_react2.default.createElement("div", {
    className: "hamburger-react",
    "aria-label": o.label,
    "aria-expanded": o.isToggled,
    onClick: o.handler,
    onKeyUp: (e) => e.key === "Enter" && o.handler(),
    role: "button",
    style: {
      ...o.burgerStyles,
      transform: `${o.isToggled ? `rotate(${90 * (o.isLeft ? -1 : 1)}deg)` : "none"}`
    },
    tabIndex: 0
  }, import_react2.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset}px`,
      transition: `${o.time}s ${o.easing}`,
      transform: `${o.isToggled ? `rotate(${45 * (o.isLeft ? -1 : 1)}deg) translate(${o.move * (o.isLeft ? -1 : 1)}px, ${o.move}px)` : "none"}`
    }
  }), import_react2.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset + o.barHeight + o.margin}px`,
      transition: `${o.time}s ${o.easing}`,
      transform: `${o.isToggled ? "scaleX(0)" : "none"}`
    }
  }), import_react2.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset + o.barHeight * 2 + o.margin * 2}px`,
      transition: `${o.time}s ${o.easing}`,
      transform: `${o.isToggled ? `rotate(${45 * (o.isLeft ? 1 : -1)}deg) translate(${o.move * (o.isLeft ? -1 : 1)}px, ${o.move * -1}px)` : "none"}`
    }
  }))
}));

// node_modules/hamburger-react/dist-esm/Cross.js
var import_react3 = __toESM(require_react());
function _extends2() {
  _extends2 = Object.assign || function(target) {
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
  return _extends2.apply(this, arguments);
}
var Cross = (props) => import_react3.default.createElement(Burger, _extends2({}, props, {
  lines: 2,
  render: (o) => import_react3.default.createElement("div", {
    className: "hamburger-react",
    "aria-label": o.label,
    "aria-expanded": o.isToggled,
    onClick: o.handler,
    onKeyUp: (e) => e.key === "Enter" && o.handler(),
    role: "button",
    style: o.burgerStyles,
    tabIndex: 0
  }, import_react3.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset}px`,
      transition: `${o.time}s ${o.easing}`,
      transform: `${o.isToggled ? `rotate(${45 * (o.isLeft ? -1 : 1)}deg) translate(${o.move * (o.isLeft ? -1 : 1)}px, ${o.move}px)` : "none"}`
    }
  }), import_react3.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset + o.barHeight + o.margin}px`,
      transition: `${o.time}s ${o.easing}`,
      transform: `${o.isToggled ? `rotate(${45 * (o.isLeft ? 1 : -1)}deg) translate(${o.move * (o.isLeft ? -1 : 1)}px, ${o.move * -1}px)` : "none"}`
    }
  }))
}));

// node_modules/hamburger-react/dist-esm/Divide.js
var import_react4 = __toESM(require_react());
function _extends3() {
  _extends3 = Object.assign || function(target) {
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
  return _extends3.apply(this, arguments);
}
var Divide = (props) => import_react4.default.createElement(Burger, _extends3({}, props, {
  render: (o) => import_react4.default.createElement("div", {
    className: "hamburger-react",
    "aria-label": o.label,
    "aria-expanded": o.isToggled,
    onClick: o.handler,
    onKeyUp: (e) => e.key === "Enter" && o.handler(),
    role: "button",
    style: o.burgerStyles,
    tabIndex: 0
  }, import_react4.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width / 2}px`,
      borderRadius: `${o.barStyles.borderRadius} 0 0 ${o.barStyles.borderRadius}`,
      top: `${o.topOffset}px`,
      transition: `${o.time}s ${o.easing}`,
      transform: `${o.isToggled ? `translate(${o.move * 0.48}px, ${o.move * 0.73}px) rotate(45deg)` : "none"}`
    }
  }), import_react4.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width / 2}px`,
      borderRadius: `0 ${o.barStyles.borderRadius} ${o.barStyles.borderRadius} 0`,
      left: "50%",
      top: `${o.topOffset}px`,
      transition: `${o.time}s ${o.easing}`,
      transform: `${o.isToggled ? `translate(-${o.move * 0.48}px, ${o.move * 0.73}px) rotate(-45deg)` : "none"}`
    }
  }), import_react4.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width / 2}px`,
      borderRadius: `${o.barStyles.borderRadius} 0 0 ${o.barStyles.borderRadius}`,
      top: `${o.topOffset + o.barHeight + o.margin}px`,
      transition: `${o.time}s ${o.easing}`,
      opacity: o.isToggled ? 0 : 1,
      transform: `${o.isToggled ? `translate(${-o.move * 1.25}px, 0)` : "none"}`
    }
  }), import_react4.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width / 2}px`,
      borderRadius: `0 ${o.barStyles.borderRadius} ${o.barStyles.borderRadius} 0`,
      top: `${o.topOffset + o.barHeight + o.margin}px`,
      left: "50%",
      transition: `${o.time}s ${o.easing}`,
      opacity: o.isToggled ? 0 : 1,
      transform: `${o.isToggled ? `translate(${o.move * 1.25}px, 0)` : "none"}`
    }
  }), import_react4.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width / 2}px`,
      borderRadius: `${o.barStyles.borderRadius} 0 0 ${o.barStyles.borderRadius}`,
      top: `${o.topOffset + o.barHeight * 2 + o.margin * 2}px`,
      transition: `${o.time}s ${o.easing}`,
      transform: `${o.isToggled ? `translate(${o.move * 0.48}px, -${o.move * 0.73}px) rotate(-45deg)` : "none"}`
    }
  }), import_react4.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width / 2}px`,
      borderRadius: `0 ${o.barStyles.borderRadius} ${o.barStyles.borderRadius} 0`,
      left: "50%",
      top: `${o.topOffset + o.barHeight * 2 + o.margin * 2}px`,
      transition: `${o.time}s ${o.easing}`,
      transform: `${o.isToggled ? `translate(-${o.move * 0.48}px, -${o.move * 0.73}px) rotate(45deg)` : "none"}`
    }
  }))
}));

// node_modules/hamburger-react/dist-esm/Fade.js
var import_react5 = __toESM(require_react());
function _extends4() {
  _extends4 = Object.assign || function(target) {
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
  return _extends4.apply(this, arguments);
}
var Fade = (props) => import_react5.default.createElement(Burger, _extends4({}, props, {
  render: (o) => import_react5.default.createElement("div", {
    className: "hamburger-react",
    "aria-label": o.label,
    "aria-expanded": o.isToggled,
    onClick: o.handler,
    onKeyUp: (e) => e.key === "Enter" && o.handler(),
    role: "button",
    style: o.burgerStyles,
    tabIndex: 0
  }, import_react5.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset}px`,
      transition: `${o.time}s ${o.easing}`,
      transform: `${o.isToggled ? `rotate(${45 * (o.isLeft ? -1 : 1)}deg) translate(${o.move * (o.isLeft ? -1 : 1)}px, ${o.move}px)` : "none"}`
    }
  }), import_react5.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset + o.barHeight + o.margin}px`,
      transition: `${o.time}s ${o.easing}`,
      opacity: `${o.isToggled ? "0" : "1"}`
    }
  }), import_react5.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset + o.barHeight * 2 + o.margin * 2}px`,
      transition: `${o.time}s ${o.easing}`,
      transform: `${o.isToggled ? `rotate(${45 * (o.isLeft ? 1 : -1)}deg) translate(${o.move * (o.isLeft ? -1 : 1)}px, ${o.move * -1}px)` : "none"}`
    }
  }))
}));

// node_modules/hamburger-react/dist-esm/Pivot.js
var import_react6 = __toESM(require_react());
function _extends5() {
  _extends5 = Object.assign || function(target) {
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
  return _extends5.apply(this, arguments);
}
var Pivot = (props) => import_react6.default.createElement(Burger, _extends5({}, props, {
  lines: 2,
  render: (o) => import_react6.default.createElement("div", {
    className: "hamburger-react",
    "aria-label": o.label,
    "aria-expanded": o.isToggled,
    onClick: o.handler,
    onKeyUp: (e) => e.key === "Enter" && o.handler(),
    role: "button",
    style: {
      ...o.burgerStyles,
      transform: `${o.isToggled ? `rotate(${90 * (o.isLeft ? -1 : 1)}deg)` : "none"}`
    },
    tabIndex: 0
  }, import_react6.default.createElement("div", {
    style: {
      transition: `${o.time / 2}s ${o.easing} ${o.isToggled ? "0s" : `${o.time / 2}s`}`,
      transform: `${o.isToggled ? `translateY(${o.barHeight / 2 + o.margin / 2}px)` : "none"}`
    }
  }, import_react6.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset}px`,
      transition: `${o.time / 2}s ${o.easing} ${o.isToggled ? `${o.time / 2}s` : "0s"}`,
      transform: `${o.isToggled ? `rotate(${45 * (o.isLeft ? 1 : -1)}deg)` : "none"}`
    }
  })), import_react6.default.createElement("div", {
    style: {
      transition: `${o.time / 2}s ${o.easing} ${o.isToggled ? "0s" : `${o.time / 2}s`}`,
      transform: `${o.isToggled ? `translateY(-${o.barHeight / 2 + o.margin / 2}px)` : "none"}`
    }
  }, import_react6.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset + o.barHeight + o.margin}px`,
      transition: `${o.time / 2}s ${o.easing} ${o.isToggled ? `${o.time / 2}s` : "0s"}`,
      transform: `${o.isToggled ? `rotate(${45 * (o.isLeft ? -1 : 1)}deg)` : "none"}`
    }
  })))
}));

// node_modules/hamburger-react/dist-esm/Rotate.js
var import_react7 = __toESM(require_react());
function _extends6() {
  _extends6 = Object.assign || function(target) {
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
  return _extends6.apply(this, arguments);
}
var Rotate = (props) => import_react7.default.createElement(Burger, _extends6({}, props, {
  lines: 2,
  render: (o) => import_react7.default.createElement("div", {
    className: "hamburger-react",
    "aria-label": o.label,
    "aria-expanded": o.isToggled,
    onClick: o.handler,
    onKeyUp: (e) => e.key === "Enter" && o.handler(),
    role: "button",
    style: {
      ...o.burgerStyles,
      transform: `${o.isToggled ? `rotateY(${180 * (o.isLeft ? -1 : 1)}deg)` : "none"}`
    },
    tabIndex: 0
  }, import_react7.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset}px`,
      transition: `${o.time}s ${o.easing}`,
      transform: `${o.isToggled ? `rotate(${45 * (o.isLeft ? -1 : 1)}deg) translate(${o.move * (o.isLeft ? -1 : 1)}px, ${o.move}px)` : "none"}`
    }
  }), import_react7.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset + o.barHeight + o.margin}px`,
      transition: `${o.time}s ${o.easing}`,
      transform: `${o.isToggled ? `rotate(${45 * (o.isLeft ? 1 : -1)}deg) translate(${o.move * (o.isLeft ? -1 : 1)}px, ${o.move * -1}px)` : "none"}`
    }
  }))
}));

// node_modules/hamburger-react/dist-esm/Slant.js
var import_react8 = __toESM(require_react());
function _extends7() {
  _extends7 = Object.assign || function(target) {
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
  return _extends7.apply(this, arguments);
}
var Slant = (props) => import_react8.default.createElement(Burger, _extends7({}, props, {
  lines: 2,
  render: (o) => import_react8.default.createElement("div", {
    className: "hamburger-react",
    "aria-label": o.label,
    "aria-expanded": o.isToggled,
    onClick: o.handler,
    onKeyUp: (e) => e.key === "Enter" && o.handler(),
    role: "button",
    style: {
      ...o.burgerStyles,
      transform: `${o.isToggled ? `rotate(${90 * (o.isLeft ? -1 : 1)}deg)` : "none"}`
    },
    tabIndex: 0
  }, import_react8.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset}px`,
      transition: `${o.time}s ${o.easing}`,
      transform: `${o.isToggled ? `rotate(${45 * (o.isLeft ? -1 : 1)}deg) translate(${o.move * (o.isLeft ? -1 : 1)}px, ${o.move}px)` : "none"}`
    }
  }), import_react8.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset + o.barHeight + o.margin}px`,
      transition: `${o.time}s ${o.easing}`,
      transform: `${o.isToggled ? `rotate(${45 * (o.isLeft ? 1 : -1)}deg) translate(${o.move * (o.isLeft ? -1 : 1)}px, ${o.move * -1}px)` : "none"}`
    }
  }))
}));

// node_modules/hamburger-react/dist-esm/Sling.js
var import_react9 = __toESM(require_react());
function _extends8() {
  _extends8 = Object.assign || function(target) {
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
  return _extends8.apply(this, arguments);
}
var Sling = (props) => import_react9.default.createElement(Burger, _extends8({}, props, {
  render: (o) => import_react9.default.createElement("div", {
    className: "hamburger-react",
    "aria-label": o.label,
    "aria-expanded": o.isToggled,
    onClick: o.handler,
    onKeyUp: (e) => e.key === "Enter" && o.handler(),
    role: "button",
    style: {
      ...o.burgerStyles,
      transform: `${o.isToggled ? `rotateY(${180 * (o.isLeft ? -1 : 1)}deg)` : "none"}`
    },
    tabIndex: 0
  }, import_react9.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset}px`,
      transition: `${o.time}s ${o.easing}`,
      transform: `${o.isToggled ? `rotate(${45 * (o.isLeft ? -1 : 1)}deg) translate(${o.move * (o.isLeft ? -1 : 1)}px, ${o.move}px)` : "none"}`
    }
  }), import_react9.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset + o.barHeight + o.margin}px`,
      transition: `${o.time}s ${o.easing}`,
      transform: `${o.isToggled ? `scale(0, 1) translate(${o.move * 20 * (o.isLeft ? -1 : 1)}px, 0)` : "none"}`
    }
  }), import_react9.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset + o.barHeight * 2 + o.margin * 2}px`,
      transition: `${o.time}s ${o.easing}`,
      transform: `${o.isToggled ? `rotate(${45 * (o.isLeft ? 1 : -1)}deg) translate(${o.move * (o.isLeft ? -1 : 1)}px, ${o.move * -1}px)` : "none"}`
    }
  }))
}));

// node_modules/hamburger-react/dist-esm/Spin.js
var import_react10 = __toESM(require_react());
function _extends9() {
  _extends9 = Object.assign || function(target) {
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
  return _extends9.apply(this, arguments);
}
var Spin = (props) => import_react10.default.createElement(Burger, _extends9({}, props, {
  render: (o) => import_react10.default.createElement("div", {
    className: "hamburger-react",
    "aria-label": o.label,
    "aria-expanded": o.isToggled,
    onClick: o.handler,
    onKeyUp: (e) => e.key === "Enter" && o.handler(),
    role: "button",
    style: {
      ...o.burgerStyles,
      transform: `${o.isToggled ? `rotate(${180 * (o.isLeft ? -1 : 1)}deg)` : "none"}`
    },
    tabIndex: 0
  }, import_react10.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset}px`,
      transition: `${o.time}s ${o.easing}`,
      transform: `${o.isToggled ? `rotate(${45 * (o.isLeft ? -1 : 1)}deg) translate(${o.move * (o.isLeft ? -1 : 1)}px, ${o.move}px)` : "none"}`
    }
  }), import_react10.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset + o.barHeight + o.margin}px`,
      transition: `${o.time}s ${o.easing}`,
      opacity: `${o.isToggled ? "0" : "1"}`
    }
  }), import_react10.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset + o.barHeight * 2 + o.margin * 2}px`,
      transition: `${o.time}s ${o.easing}`,
      transform: `${o.isToggled ? `rotate(${45 * (o.isLeft ? 1 : -1)}deg) translate(${o.move * (o.isLeft ? -1 : 1)}px, ${o.move * -1}px)` : "none"}`
    }
  }))
}));

// node_modules/hamburger-react/dist-esm/Spiral.js
var import_react11 = __toESM(require_react());
function _extends10() {
  _extends10 = Object.assign || function(target) {
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
  return _extends10.apply(this, arguments);
}
var Spiral = (props) => import_react11.default.createElement(Burger, _extends10({}, props, {
  lines: 2,
  render: (o) => import_react11.default.createElement("div", {
    className: "hamburger-react",
    "aria-label": o.label,
    "aria-expanded": o.isToggled,
    onClick: o.handler,
    onKeyUp: (e) => e.key === "Enter" && o.handler(),
    role: "button",
    style: {
      ...o.burgerStyles,
      transform: `${o.isToggled ? `rotate(${180 * (o.isLeft ? -1 : 1)}deg)` : "none"}`
    },
    tabIndex: 0
  }, import_react11.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset}px`,
      transition: `${o.time}s ${o.easing}`,
      transform: `${o.isToggled ? `rotate(${45 * (o.isLeft ? -1 : 1)}deg) translate(${o.move * (o.isLeft ? -1 : 1)}px, ${o.move}px)` : "none"}`
    }
  }), import_react11.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset + o.barHeight + o.margin}px`,
      transition: `${o.time}s ${o.easing}`,
      transform: `${o.isToggled ? `rotate(${45 * (o.isLeft ? 1 : -1)}deg) translate(${o.move * (o.isLeft ? -1 : 1)}px, ${o.move * -1}px)` : "none"}`
    }
  }))
}));

// node_modules/hamburger-react/dist-esm/Squash.js
var import_react12 = __toESM(require_react());
function _extends11() {
  _extends11 = Object.assign || function(target) {
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
  return _extends11.apply(this, arguments);
}
var Squash = (props) => import_react12.default.createElement(Burger, _extends11({}, props, {
  render: (o) => import_react12.default.createElement("div", {
    className: "hamburger-react",
    "aria-label": o.label,
    "aria-expanded": o.isToggled,
    onClick: o.handler,
    onKeyUp: (e) => e.key === "Enter" && o.handler(),
    role: "button",
    style: o.burgerStyles,
    tabIndex: 0
  }, import_react12.default.createElement("div", {
    style: {
      transition: `${o.time / 2}s ${o.easing} ${o.isToggled ? "0s" : `${o.time / 2}s`}`,
      transform: `${o.isToggled ? `translateY(${o.barHeight + o.margin}px)` : "none"}`
    }
  }, import_react12.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset}px`,
      transition: `${o.time / 2}s ${o.easing} ${o.isToggled ? `${o.time / 2}s` : "0s"}`,
      transform: `${o.isToggled ? `rotate(45deg)` : "none"}`
    }
  })), import_react12.default.createElement("div", {
    style: {
      transition: `${o.time / 2}s ${o.easing}`,
      opacity: `${o.isToggled ? "0" : "1"}`
    }
  }, import_react12.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset + o.barHeight + o.margin}px`,
      transition: `${o.time / 2}s ${o.easing}`
    }
  })), import_react12.default.createElement("div", {
    style: {
      transition: `${o.time / 2}s ${o.easing} ${o.isToggled ? "0s" : `${o.time / 2}s`}`,
      transform: `${o.isToggled ? `translateY(-${o.barHeight + o.margin}px)` : "none"}`
    }
  }, import_react12.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset + o.barHeight * 2 + o.margin * 2}px`,
      transition: `${o.time / 2}s ${o.easing} ${o.isToggled ? `${o.time / 2}s` : "0s"}`,
      transform: `${o.isToggled ? `rotate(-45deg)` : "none"}`
    }
  })))
}));

// node_modules/hamburger-react/dist-esm/Squeeze.js
var import_react13 = __toESM(require_react());
function _extends12() {
  _extends12 = Object.assign || function(target) {
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
  return _extends12.apply(this, arguments);
}
var Squeeze = (props) => import_react13.default.createElement(Burger, _extends12({}, props, {
  lines: 2,
  render: (o) => import_react13.default.createElement("div", {
    className: "hamburger-react",
    "aria-label": o.label,
    "aria-expanded": o.isToggled,
    onClick: o.handler,
    onKeyUp: (e) => e.key === "Enter" && o.handler(),
    role: "button",
    style: o.burgerStyles,
    tabIndex: 0
  }, import_react13.default.createElement("div", {
    style: {
      transition: `${o.time / 2}s ${o.easing} ${o.isToggled ? "0s" : `${o.time / 2}s`}`,
      transform: `${o.isToggled ? `translateY(${o.barHeight / 2 + o.margin / 2}px)` : "none"}`
    }
  }, import_react13.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset}px`,
      transition: `${o.time / 2}s ${o.easing} ${o.isToggled ? `${o.time / 2}s` : "0s"}`,
      transform: `${o.isToggled ? `rotate(45deg)` : "none"}`
    }
  })), import_react13.default.createElement("div", {
    style: {
      transition: `${o.time / 2}s ${o.easing} ${o.isToggled ? "0s" : `${o.time / 2}s`}`,
      transform: `${o.isToggled ? `translateY(-${o.barHeight / 2 + o.margin / 2}px)` : "none"}`
    }
  }, import_react13.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset + o.barHeight + o.margin}px`,
      transition: `${o.time / 2}s ${o.easing} ${o.isToggled ? `${o.time / 2}s` : "0s"}`,
      transform: `${o.isToggled ? `rotate(-45deg)` : "none"}`
    }
  })))
}));

// node_modules/hamburger-react/dist-esm/Turn.js
var import_react14 = __toESM(require_react());
function _extends13() {
  _extends13 = Object.assign || function(target) {
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
  return _extends13.apply(this, arguments);
}
var Turn = (props) => import_react14.default.createElement(Burger, _extends13({}, props, {
  render: (o) => import_react14.default.createElement("div", {
    className: "hamburger-react",
    "aria-label": o.label,
    "aria-expanded": o.isToggled,
    onClick: o.handler,
    onKeyUp: (e) => e.key === "Enter" && o.handler(),
    role: "button",
    style: o.burgerStyles,
    tabIndex: 0
  }, import_react14.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset}px`,
      transition: `${o.time}s ${o.easing}`,
      transform: `${o.isToggled ? `rotate(${45 * (o.isLeft ? -1 : 1)}deg) translate(${o.move * (o.isLeft ? -1 : 1)}px, ${o.move}px)` : "none"}`
    }
  }), import_react14.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset + o.barHeight + o.margin}px`,
      transition: `${o.time / 2}s ${o.easing}`,
      transform: `${o.isToggled ? "scaleX(0)" : "none"}`
    }
  }), import_react14.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset + o.barHeight * 2 + o.margin * 2}px`,
      transition: `${o.time}s ${o.easing}`,
      transform: `${o.isToggled ? `rotate(${45 * (o.isLeft ? 1 : -1)}deg) translate(${o.move * (o.isLeft ? -1 : 1)}px, ${o.move * -1}px)` : "none"}`
    }
  }))
}));

// node_modules/hamburger-react/dist-esm/Twirl.js
var import_react15 = __toESM(require_react());
function _extends14() {
  _extends14 = Object.assign || function(target) {
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
  return _extends14.apply(this, arguments);
}
var Twirl = (props) => import_react15.default.createElement(Burger, _extends14({}, props, {
  render: (o) => import_react15.default.createElement("div", {
    className: "hamburger-react",
    "aria-label": o.label,
    "aria-expanded": o.isToggled,
    onClick: o.handler,
    onKeyUp: (e) => e.key === "Enter" && o.handler(),
    role: "button",
    style: {
      ...o.burgerStyles,
      transform: `${o.isToggled ? `rotate(${90 * (o.isLeft ? -1 : 1)}deg)` : "none"}`
    },
    tabIndex: 0
  }, import_react15.default.createElement("div", {
    style: {
      transition: `${o.time / 2}s ${o.easing} ${o.isToggled ? "0s" : `${o.time / 2}s`}`,
      transform: `${o.isToggled ? `translateY(${o.barHeight + o.margin}px)` : "none"}`
    }
  }, import_react15.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset}px`,
      transition: `${o.time / 2}s ${o.easing} ${o.isToggled ? `${o.time / 2}s` : "0s"}`,
      transform: `${o.isToggled ? `rotate(${45 * (o.isLeft ? 1 : -1)}deg)` : "none"}`
    }
  })), import_react15.default.createElement("div", {
    style: {
      transition: `${o.time / 2}s ${o.easing}`,
      opacity: `${o.isToggled ? "0" : "1"}`
    }
  }, import_react15.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset + o.barHeight + o.margin}px`,
      transition: `${o.time / 2}s ${o.easing}`
    }
  })), import_react15.default.createElement("div", {
    style: {
      transition: `${o.time / 2}s ${o.easing} ${o.isToggled ? "0s" : `${o.time / 2}s`}`,
      transform: `${o.isToggled ? `translateY(-${o.barHeight + o.margin}px)` : "none"}`
    }
  }, import_react15.default.createElement("div", {
    style: {
      ...o.barStyles,
      width: `${o.width}px`,
      top: `${o.topOffset + o.barHeight * 2 + o.margin * 2}px`,
      transition: `${o.time / 2}s ${o.easing} ${o.isToggled ? `${o.time / 2}s` : "0s"}`,
      transform: `${o.isToggled ? `rotate(${45 * (o.isLeft ? -1 : 1)}deg)` : "none"}`
    }
  })))
}));

// node_modules/hamburger-react/dist-esm/index.js
var dist_esm_default = Tilt;
export {
  Cross,
  Divide,
  Fade,
  Pivot,
  Rotate,
  Slant,
  Sling,
  Spin,
  Spiral,
  Squash,
  Squeeze,
  Turn,
  Twirl,
  dist_esm_default as default
};
//# sourceMappingURL=hamburger-react.js.map
