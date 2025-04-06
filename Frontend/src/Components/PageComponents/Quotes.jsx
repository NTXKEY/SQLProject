import { useEffect, useState } from "react";
import propTypes from "prop-types";

import { motion as m } from "framer-motion";

import axios from "axios";

const Quotes = ({ side, theme }) => {
  const [quoteData, setQuoteData] = useState("No quotes");
  // const QUOTES_API_KEY = "hK7Jh+az6AahY3PAPFuSPw==L3eOIrq4aMn29Lnx";

  useEffect(() => {
    axios
      .get("https://api.api-ninjas.com/v1/quotes", {
        headers: {
          "X-Api-Key": "QUOTES_API_KEY",
        },
      })
      .then((response) => {
        setQuoteData(response.data[0]);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log(quoteData);
  return (
    <div>
      {quoteData ? (
        <div
          className={`flex flex-col ${side} ${theme} backdrop-blur-sm rounded-2xl text-[#ffffff] h-full   text-3xl font-inter font-bold tracking-tight `}
        >
          <m.p
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {quoteData.quote}
          </m.p>
          <p>- {quoteData.author}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

Quotes.propTypes = {
  side: propTypes.string,
  theme: propTypes.string,
};

export default Quotes;
