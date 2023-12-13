import React from "react";
import { Layout } from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

export const Contact = () => {
  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="https://images.pexels.com/photos/225232/pexels-photo-225232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            Any query and info about anything feel free to call anytime.
          </p>
          <p className="mt-3">
            <BiMailSend /> : help@foodrecipe.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 016XX-XX XX XX
          </p>
          <p className="mt-3">
            <BiSupport /> : 099XX-XX XX XX (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
