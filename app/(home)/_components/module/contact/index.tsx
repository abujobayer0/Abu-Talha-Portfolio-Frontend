'use client';

import { useRef, useState, ChangeEvent, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { Input, Textarea, Button, Tooltip } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { IoSendSharp } from 'react-icons/io5';
import { BsCheckCircleFill } from 'react-icons/bs';
import { MdError } from 'react-icons/md';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHeading,
  FaComment,
} from 'react-icons/fa';

import { Title } from '../../ui/title';
import ContactLeft from './contactLeft';

interface FormValues {
  username: string;
  phoneNumber: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    username: '',
    phoneNumber: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formStep, setFormStep] = useState<number>(0);

  const form = useRef<HTMLFormElement>(null);

  const emailValidation = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    // Clear error message when user starts typing
    setErrMsg(null);
  };

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    const { username, email, message, phoneNumber, subject } = formValues;

    if (!username) {
      setErrMsg('Name is required!');
      return;
    } else if (!email) {
      setErrMsg('Please provide your email!');
      return;
    } else if (!emailValidation(email)) {
      setErrMsg('Please provide a valid email!');
      return;
    } else if (!message) {
      setErrMsg('Message is required!');
      return;
    }

    setIsSubmitting(true);
    setErrMsg(null);

    try {
      // Simulate a delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const emailParams = {
        name: username,
        email: email,
        message: message,
        phone: phoneNumber,
        time: new Date().toLocaleString(),
        title: subject,
      };

      await emailjs.send(
        'service_hc9j2be',
        'template_5qtq5wa',
        emailParams,
        'EKumPNPEupZ1Kc9zQ'
      );

      setSuccessMsg(
        `Thank you, ${username}! Your message has been sent successfully.`
      );
      setFormValues({
        username: '',
        phoneNumber: '',
        email: '',
        subject: '',
        message: '',
      });
      setFormStep(0);
    } catch (error) {
      setErrMsg('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    const { username, email } = formValues;

    if (formStep === 0 && (!username || !email || !emailValidation(email))) {
      setErrMsg('Please fill in all required fields correctly');
      return;
    }

    setErrMsg(null);
    setFormStep(formStep + 1);
  };

  const prevStep = () => {
    setFormStep(formStep - 1);
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
  };

  const inputIconStyle = 'text-gray-400';

  return (
    <section id="contact" className="py-16">
      <Title title1="Contact" title2="Get In Touch" />
      <div className="w-full flex flex-col md:flex-row gap-8 md:items-start justify-between">
        <motion.div
          className="w-full md:w-[40%]"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ContactLeft />
        </motion.div>

        <motion.div
          className="w-full lg:w-[60%]"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form
            ref={form}
            className="w-full flex flex-col gap-6 border border-default-200 rounded-xl p-8 backdrop-blur-sm bg-default-50/30 shadow-xl"
            onSubmit={handleSend}
          >
            {errMsg && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-4 px-6 bg-red-100 rounded-lg border border-red-200 flex items-center gap-3 text-red-600"
              >
                <MdError size={24} />
                <p>{errMsg}</p>
              </motion.div>
            )}

            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-4 px-6 bg-green-100 rounded-lg border border-green-200 flex items-center gap-3 text-green-600"
              >
                <BsCheckCircleFill size={20} />
                <p>{successMsg}</p>
              </motion.div>
            )}

            <div className="mb-6">
              <ul className="flex justify-between items-center">
                <li className={`step-item ${formStep >= 0 ? 'active' : ''}`}>
                  <div
                    className={`step-circle ${formStep >= 0 ? 'bg-warning text-white' : 'bg-default-200'}`}
                  >
                    1
                  </div>
                  <div className="step-text">Contact Info</div>
                </li>
                <li className="step-line"></li>
                <li className={`step-item ${formStep >= 1 ? 'active' : ''}`}>
                  <div
                    className={`step-circle ${formStep >= 1 ? 'bg-warning text-white' : 'bg-default-200'}`}
                  >
                    2
                  </div>
                  <div className="step-text">Message</div>
                </li>
              </ul>
            </div>

            {formStep === 0 && (
              <motion.div
                className="w-full flex flex-col gap-5"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Input
                  fullWidth
                  label="Your Name"
                  name="username"
                  value={formValues.username}
                  variant="bordered"
                  radius="lg"
                  onChange={handleChange}
                  classNames={{
                    input: 'bg-transparent',
                    inputWrapper: 'bg-default-100/50 backdrop-blur-sm',
                  }}
                  startContent={<FaUser className={inputIconStyle} />}
                  isRequired
                />

                <Input
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formValues.email}
                  variant="bordered"
                  radius="lg"
                  onChange={handleChange}
                  classNames={{
                    input: 'bg-transparent',
                    inputWrapper: 'bg-default-100/50 backdrop-blur-sm',
                  }}
                  startContent={<FaEnvelope className={inputIconStyle} />}
                  isRequired
                />

                <Input
                  fullWidth
                  label="Phone Number (Optional)"
                  name="phoneNumber"
                  value={formValues.phoneNumber}
                  variant="bordered"
                  radius="lg"
                  onChange={handleChange}
                  classNames={{
                    input: 'bg-transparent',
                    inputWrapper: 'bg-default-100/50 backdrop-blur-sm',
                  }}
                  startContent={<FaPhone className={inputIconStyle} />}
                />

                <div className="flex justify-end mt-4">
                  <Button
                    color="warning"
                    radius="full"
                    className="px-8 py-6 font-semibold"
                    onClick={nextStep}
                  >
                    Continue
                  </Button>
                </div>
              </motion.div>
            )}

            {formStep === 1 && (
              <motion.div
                className="w-full flex flex-col gap-5"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Input
                  fullWidth
                  label="Subject"
                  name="subject"
                  value={formValues.subject}
                  variant="bordered"
                  radius="lg"
                  onChange={handleChange}
                  classNames={{
                    input: 'bg-transparent',
                    inputWrapper: 'bg-default-100/50 backdrop-blur-sm',
                  }}
                  startContent={<FaHeading className={inputIconStyle} />}
                />

                <Textarea
                  fullWidth
                  label="Message"
                  name="message"
                  rows={6}
                  value={formValues.message}
                  variant="bordered"
                  radius="lg"
                  onChange={handleChange}
                  classNames={{
                    input: 'bg-transparent',
                    inputWrapper: 'bg-default-100/50 backdrop-blur-sm',
                  }}
                  startContent={
                    <FaComment className={`${inputIconStyle} mt-2`} />
                  }
                  isRequired
                />

                <div className="flex justify-between mt-4">
                  <Button
                    variant="flat"
                    radius="full"
                    className="px-8 py-6"
                    onClick={prevStep}
                  >
                    Back
                  </Button>

                  <Button
                    color="warning"
                    radius="full"
                    className="px-8 py-6 font-semibold"
                    type="submit"
                    startContent={isSubmitting ? null : <IoSendSharp />}
                    isLoading={isSubmitting}
                    endContent={isSubmitting ? null : undefined}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </motion.div>
            )}

            <style jsx>{`
              .step-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                z-index: 1;
              }
              .step-circle {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                transition: all 0.3s;
              }
              .step-text {
                margin-top: 8px;
                font-size: 14px;
                font-weight: 500;
                color: #666;
              }
              .step-line {
                flex-grow: 1;
                height: 2px;
                background-color: #ddd;
                margin: 0 15px;
                margin-bottom: 28px;
              }
              .active .step-text {
                color: #000;
                font-weight: 600;
              }
            `}</style>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
