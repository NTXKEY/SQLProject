import PropTypes from "prop-types";

import { motion as m } from "framer-motion";

export const InputFields = ({
  inp_name,
  inp_title,
  func,
  inp_type,
  inp_placeholder,
  error,
}) => {
  return (
    <>
      <div className="w-full relative flex flex-col justify-center items-center gap-2 transition-all">
        {/* //* header */}
        <m.h2
          initial={{ width: "0", opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          exit={{ width: "0", opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`w-full flex items-start font-roboto font-bold text-base ${"text-light-primary dark:text-dark-primary"}`}
        >
          {inp_title}
        </m.h2>

        {/* //* inputs */}
        <m.input
          className={`w-full flex justify-center items-center shadow-[0px_0px_0.5rem_rgba(0,0,0,0.25)] rounded-sm h-[30px] focus:outline-none p-5 placeholder:text-xs origin-center placeholder:text-light-primary dark:placeholder:text-dark-primary`}
          initial={{ width: "0", opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          exit={{ width: "0", opacity: 0 }}
          transition={{ duration: 0.5 }}
          type={inp_type}
          name={inp_name}
          onChange={func}
          placeholder={error ? "Cannot be empty" : inp_placeholder}
          required
        />
      </div>
    </>
  );
};
InputFields.propTypes = {
  inp_name: PropTypes.string.isRequired,
  inp_title: PropTypes.string,
  func: PropTypes.func,
  inp_type: PropTypes.string,
  inp_placeholder: PropTypes.string,
  error: PropTypes.bool,
};
