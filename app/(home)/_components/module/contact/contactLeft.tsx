'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { Copy, Check } from 'lucide-react';
import NavButtons from '../../ui/navButtons';
import { useGetLink } from '@/hooks/links.hook';

const ContactLeft: React.FC = () => {
  const { data: link } = useGetLink('67bb2077af9ba724ceece4ec');

  const [copied, setCopied] = useState<{ whatsapp: boolean; email: boolean }>({
    whatsapp: false,
    email: false,
  });

  const handleCopy = (value: string, field: 'whatsapp' | 'email') => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied({ ...copied, [field]: true });
      setTimeout(() => setCopied({ ...copied, [field]: false }), 2000);
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-b from-[#9333ea]/15 to-black rounded-2xl shadow-xl p-6 transition-all duration-300 ">
      {/* Contact Info */}
      <div className="space-y-3">
        {/* WhatsApp */}
        <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm transition-all duration-200 hover:bg-[#ede9fe]">
          <div className="flex items-center space-x-4">
            <FaWhatsapp className="text-[#9333ea] flex-shrink-0" size={26} />
            <p className="text-[#3b0764] font-semibold text-base truncate">
              {link?.data?.phone || '+8801303463436'}
            </p>
          </div>
          <button
            className="p-2 rounded-full bg-[#f5f3ff] hover:bg-[#c4b5fd] transition-all duration-200 transform hover:scale-110"
            onClick={() =>
              handleCopy(`${link?.data?.phone || '+8801303463436'}`, 'whatsapp')
            }
            aria-label="Copy WhatsApp number"
          >
            {copied.whatsapp ? (
              <Check className="text-[#9333ea]" size={20} />
            ) : (
              <Copy className="text-[#6b21a8]" size={20} />
            )}
          </button>
        </div>

        {/* Email */}
        <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm transition-all duration-200 hover:bg-[#ede9fe]">
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-[#9333ea] flex-shrink-0" size={26} />
            <p className="text-[#3b0764] font-semibold text-base truncate">
              {link?.data?.email || 'zubayer.munna.dev@gmail.com'}
            </p>
          </div>
          <button
            className="p-2 rounded-full bg-[#f5f3ff] hover:bg-[#c4b5fd] transition-all duration-200 transform hover:scale-110"
            onClick={() =>
              handleCopy(
                `${link?.data?.email || 'zubayer.munna.dev@gmail.com'}`,
                'email'
              )
            }
            aria-label="Copy email address"
          >
            {copied.email ? (
              <Check className="text-[#9333ea]" size={20} />
            ) : (
              <Copy className="text-[#6b21a8]" size={20} />
            )}
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <NavButtons />
      </div>

      <div className="mt-6 flex justify-center h-48 overflow-hidden">
        <div className="relative overflow-hidden rounded-xl transition-all duration-300 opacity-85 hover:scale-[1.02]">
          <Image
            className="w-full h-[268px] object-cover rounded-xl"
            src="https://i.ibb.co.com/hJx5x66x/SRP06468-1.png"
            width={500}
            height={500}
            alt="Contact Illustration"
            style={{
              filter: 'hue-rotate(15deg) brightness(82%) saturate(105%)',
              transform: 'translateY(-20px)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000] via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default ContactLeft;
