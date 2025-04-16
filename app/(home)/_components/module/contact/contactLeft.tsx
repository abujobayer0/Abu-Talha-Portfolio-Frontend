import { FaEnvelopeOpen, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import NavButtons from '../../ui/navButtons';

export const ContactInfo = ({ link }: any) => (
  <div className="contact-info-card p-8 rounded-2xl flex flex-col gap-6">
    <div className="info-header mb-4">
      <h3 className="text-xl font-bold text-white mb-2">Contact Information</h3>
      <p className="text-gray-300">
        Reach out and let's create something amazing together
      </p>
    </div>

    <div className="info-item flex items-center gap-4">
      <div className="icon-wrapper bg-white/10 p-3 rounded-full">
        <FaMapMarkerAlt className="text-warning text-xl" />
      </div>
      <div>
        <p className="text-sm text-gray-300">Location</p>
        <p className="text-white font-medium">5842-RDA, Bogura, Bangladesh</p>
      </div>
    </div>

    <div className="info-item flex items-center gap-4">
      <div className="icon-wrapper bg-white/10 p-3 rounded-full">
        <FaPhoneAlt className="text-warning text-xl" />
      </div>
      <div>
        <p className="text-sm text-gray-300">Phone</p>
        <p className="text-white font-medium">{link?.data?.phone}</p>
      </div>
    </div>

    <div className="info-item flex items-center gap-4">
      <div className="icon-wrapper bg-white/10 p-3 rounded-full">
        <FaEnvelopeOpen className="text-warning text-xl" />
      </div>
      <div>
        <p className="text-sm text-gray-300">Email</p>
        <p className="text-white font-medium">{link?.data?.email}</p>
      </div>
    </div>

    <div className="social-links mt-8">
      <p className="text-gray-300 mb-4">Connect with me</p>
      <div className="flex gap-4">
        <NavButtons />
      </div>
    </div>
  </div>
);
