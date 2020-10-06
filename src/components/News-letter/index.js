import React, { useState } from "react";
import addToMailchimp from "gatsby-plugin-mailchimp";

//
import "./_index.scss";

const NewsLetter = () => {
  const [payLoad, setPayLoad] = useState({ email: "", result: null });

  const handleOnChange = e => {
    e.preventDefault();
    setPayLoad({ ...payLoad, email: e.target.value });
  };

  const handleOnSubmit = async e => {
    e.preventDefault();
    const result = await addToMailchimp(payLoad.email);
    setPayLoad({ ...payLoad, result: result });
  };

  return (
    <div className="news-letter">
      <p className="newsletter-title">PRIJAVI SE NA NJUZLETER</p>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="EMAIL">
          Nećemo te često smarati. Možeš očekivati da ćeš čuti od nas jednom
          mesečno.
        </label>
        <input
          type="email"
          value=""
          name="EMAIL"
          id="mce-EMAIL"
          value={payLoad.email}
          onChange={handleOnChange}
          formNoValidate
          placeholder="Unesi Email adresu"
        />
        <button type="submit" className="btn btn-circle btn-submit">
          prijavi se
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
