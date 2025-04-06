import PropTypes from "prop-types";

import { motion as m } from "framer-motion";

export const PersonalizationInput = ({
  icon,
  iconAlt,
  name,
  title,
  type,
  placeHolder,
  func,
  disabled,
  value,
  Ref,
  toggle,
  reveled,
}) => {
  return (
    <m.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ width: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="mt-5"
    >
      <span className="text-black-c dark:text-white-bg font-inter font-semibold whitespace-nowrap opacity-55">
        {title}
      </span>
      <div className=" h-10 flex items-center mt-2 shadow-[0px_0px_0.2rem_rgba(0,0,0,0.15)] bg-white-bg dark:bg-dark-bg-alt dark:border-white-bg dark:border-2 dark:border-opacity-20 rounded px-3 py-2">
        <span className="text-black-c dark:text-white-bg">{icon}</span>
        <input
          className="rounded px-1 w-full h-full placeholder:font-robotoCondensed placeholder:tracking-tight ml-2 text-sm bg-white-bg dark:bg-dark-bg-alt dark:text-white-bg text-black-bg focus:outline-none"
          type={reveled ? "text" : type}
          name={name}
          disabled={disabled}
          value={value}
          placeholder={placeHolder}
          onChange={(event) => func(event)}
          ref={Ref}
        />
        <span onClick={toggle}>{iconAlt}</span>
      </div>
    </m.div>
  );
};

PersonalizationInput.propTypes = {
  icon: PropTypes.element,
  iconAlt: PropTypes.element,
  name: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  placeHolder: PropTypes.string,
  func: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  Ref: PropTypes.object,
  toggle: PropTypes.func,
  reveled: PropTypes.bool,
};
