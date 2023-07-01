import Link from "next/link";
import React from "react";
import { AiFillTwitterCircle, AiOutlineInstagram, AiOutlineLinkedin, AiOutlineMail, AiOutlineMobile } from "react-icons/ai";
import { CiFacebook } from "react-icons/ci";
import { GoLocation } from "react-icons/go";
import Contact from "./Contact";

const ContactForm = () => {
  return (
    <div className="hero">
      <div className="hero-content flex-col lg:flex-row-reverse  ">
        <div className="text-center lg:text-left">
          <Contact></Contact>
        </div>
        <div className="flex flex-col justify-evenly w-full max-w-md text-white ">

          <div>
            <h2 className="text-3xl font-bold">CONTACT US</h2>
            <span className="">It can also refer to a specific answer or output produced by a calculation or experiment. and it is often used to measure the success or effectiveness of that effort or activity.</span>
          </div>

          <div className="lg:pt-6 lg:pb-6 pb-2">
            <ul className="mt-4">
              <li className="flex gap-2 items-center my-2">
                <GoLocation className="  text-blue-400 " size="18px" />
                <div>
                  <p> <span className="font-bold">Address: </span>banani, dhaka b/1200</p>
                </div>
              </li>

              <li className="flex gap-2 items-center my-2">
                <AiOutlineMobile className="  text-blue-400 " size="18px" />
                <div>
                  <p> <span className="font-bold">Mobile: </span> +880 1726427834</p>
                </div>
              </li>

              <li className="flex gap-2 items-center">
                <AiOutlineMail className="  text-blue-400 " size="18px" />
                <div>
                  <p> <span className="font-bold">Email: </span> callback.developers@gmail.com</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex gap-2 lg:gap-6">
            <Link href="https://www.facebook.comk">
              <CiFacebook
                className="text-blue-400 mb-2 hover:text-white rounded-full"
                size="27px"
              />
            </Link>
            <Link href="https://www.facebook.comk">
              <AiOutlineLinkedin
                className="text-blue-400 mb-2 hover:text-white "
                size="27px"
              />
            </Link>
            <Link href="https://www.facebook.comk">
              <AiFillTwitterCircle
                className="text-blue-400 mb-2 hover:bg-blue-400 hover:text-white rounded-full"
                size="27px"
              />
            </Link>
            <Link href="https://www.facebook.comk">
              <AiOutlineInstagram
                className="text-blue-400 mb-2  hover:text-white rounded-badge"
                size="27px"
              />
            </Link>
          </div>

        </div>
      </div>
    </div>

  );
};

export default ContactForm;