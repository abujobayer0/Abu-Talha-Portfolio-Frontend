'use client';

import { useRef, useState, ChangeEvent, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { Input, Textarea, Button } from '@nextui-org/react';
import { IoSendSharp } from 'react-icons/io5';

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

  const form = useRef<HTMLFormElement>(null);

  const emailValidation = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    const { username, email, message } = formValues;

    if (!username) {
      setErrMsg('Name is required!');
    } else if (!email) {
      setErrMsg('Please provide your email!');
    } else if (!emailValidation(email)) {
      setErrMsg('Please provide a valid email!');
    } else if (!message) {
      setErrMsg('Message is required!');
    } else {
      setErrMsg(null);

      // Use emailjs to send the form data
      emailjs
        .sendForm(
          'service_a83mwk4',
          'template_crw6xto',
          form.current as HTMLFormElement,
          'wTuP0_-qh1sVDIcjH'
        )
        .then(
          () => {
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
          },
          () => {
            setErrMsg('Something went wrong. Please try again.');
          }
        );
    }
  };

  return (
    <section id="contact">
      <Title title1="Contact" title2="Contact With Me" />
      <div className="w-full flex flex-col md:flex-row gap-5 md:items-start justify-start">
        <div className="w-full md:w-[40%]">
          {' '}
          <ContactLeft />
        </div>
        <form
          ref={form}
          className="w-full lg:w-[60%] flex flex-col gap-4 lgl:gap-6 border border-default-200 rounded p-5"
          onSubmit={handleSend}
        >
          {errMsg && (
            <p className="py-3 bg-default-200 text-center text-orange-500 animate-bounce">
              {errMsg}
            </p>
          )}
          {successMsg && (
            <p className="py-3 bg-default-200 text-center text-green-500 animate-bounce">
              {successMsg}
            </p>
          )}
          <div className="w-full flex flex-col gap-4">
            <Input
              fullWidth
              label="Your Name"
              name="username"
              value={formValues.username}
              variant="bordered"
              onChange={handleChange}
            />
            <Input
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formValues.email}
              variant="bordered"
              onChange={handleChange}
            />
            <Input
              fullWidth
              label="Subject"
              name="subject"
              value={formValues.subject}
              variant="bordered"
              onChange={handleChange}
            />
            <Textarea
              fullWidth
              label="Message"
              name="message"
              rows={6}
              value={formValues.message}
              variant="bordered"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center">
            <Button
              fullWidth
              className="mt-4 text-white w-[150px]"
              color="warning"
              endContent={<IoSendSharp />}
              radius="full"
              type="submit"
            >
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
