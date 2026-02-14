'use client'
import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { AiOutlineUserAdd, AiOutlineClose } from 'react-icons/ai';
import UseDebounce from '@/hooks/chats/useDebounce';
import { useCreateChatMutation, useGetContactsQuery } from '@/lib/redux/api/slices/chatApi';
import Image from 'next/image';
import { toast } from 'sonner';
import AddContactLoading from './addContactLoading';

// --- Sub-components ---

const ContactListItem = ({ contact, account, onAdd }) => {
  const accountId = account?._id || account?.id;
  const contactId = contact._id || contact.id;

  // Use loose equality or strict check if types are consistent. 
  // Assuming both are strings or numbers, consistent.
  const isOwnContact = contactId === accountId;
  const isAdded = contact.isAlreadyContact;

  return (
    <div className="flex items-center justify-between bg-transparent p-2 rounded-md hover:bg-white/10 transition-colors">
      <div className="flex items-center gap-3">
        <Image
          alt='profile image'
          className="w-8 h-8 rounded-full object-cover"
          src={contact.profileImage || '/assets/default_profile_image.png'}
          width={64}
          height={64}
        />
        <div className="flex flex-col gap-y-px">
          <div className="flex gap-x-1">
            <span className="text-sm font-medium text-white">{contact.displayName}</span>
            {contact.onModel === 'CharacterModel' && (
              <span className="text-xs px-1.5 py-0.5 bg-gray-700 rounded text-gray-300">AI</span>
            )}
          </div>
          {contact.username && (
            <span className="text-xs text-gray-400">@{contact.username}</span>
          )}
        </div>
      </div>

      {!isOwnContact && (
        isAdded ? (
          <div className="text-xs text-gray-500 font-light px-2 py-1">
            Added
          </div>
        ) : (
          <button
            className="px-3 py-1.5 rounded-md bg-gradient-to-tr from-green-spc-2 to-green-spc-1 hover:brightness-110 text-xs font-semibold text-black transition-all shadow-md active:scale-95"
            onClick={() => onAdd(contact)}
          >
            Add
          </button>
        )
      )}
    </div>
  );
};

// --- Main Component ---

const ContactSearchPopover = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false); // To verify popover state if needed, but HeadlessUI handles it. 
  // Headless UI Popover manages open state internally via render, but we can access it via children render prop.

  const { account } = useSelector((state) => state.auth);
  const debouncedSearch = UseDebounce(searchQuery, 500);
  const [createNewChat, { isLoading: isCreatingChat }] = useCreateChatMutation();

  const { data: contactsData, isFetching, isLoading, isError } = useGetContactsQuery(debouncedSearch, {
    skip: !debouncedSearch || debouncedSearch.trim() === '',
  });

  const handleAddContact = async (data) => {
    try {
      const contactId = data._id || data.id;
      if (!contactId) {
        toast.error("Invalid contact ID");
        return;
      }

      const newChat = {
        title: "",
        profileImage: "",
        participants: [contactId],
      };

      await createNewChat(newChat).unwrap();
      toast.success('Contact added successfully!');
    } catch (error) {
      console.error('Error adding contact:', error);
      toast.error('Failed to add contact. Please try again.');
    }
  };

  const handleClose = (close) => {
    setSearchQuery('');
    close();
  };

  return (
    <Popover className="relative">
      {/* Trigger Button */}
      <PopoverButton className="rounded-md hover:bg-gray-700/50 p-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-green-spc-1/50">
        <AiOutlineUserAdd size={20} className="text-gray-300 hover:text-white" />
      </PopoverButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute z-50 top-full left-1/2 -translate-x-1/2 mt-2 w-80 sm:w-96 h-96 transform bg-[#1e2025] text-white rounded-xl shadow-2xl border border-gray-800 backdrop-blur-md overflow-hidden flex flex-col">
          {({ close }) => (
            <>
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800/50 flex-shrink-0 bg-[#25282e]">
                <p className="text-sm font-semibold tracking-wide">Add New Contact</p>
                <button
                  onClick={() => handleClose(close)}
                  className="p-1 rounded-full hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors"
                >
                  <AiOutlineClose size={16} />
                </button>
              </div>

              {/* Search Input */}
              <div className="p-3 flex-shrink-0 bg-[#1e2025]">
                <input
                  type="text"
                  placeholder="Search by username or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#131517] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-spc-1/50 transition-all border border-transparent focus:border-gray-700"
                  autoFocus
                />
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-1 custom-scrollbar">
                {(isFetching || isLoading) ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="px-1"><AddContactLoading /></div>
                  ))
                ) : !debouncedSearch ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-2 opacity-60">
                    <AiOutlineUserAdd size={32} />
                    <p className="text-sm">Type to search for people</p>
                  </div>
                ) : isError ? (
                  <div className="flex flex-col items-center justify-center h-full text-red-400 gap-1 opacity-80">
                    <p className="text-sm">Something went wrong.</p>
                    <p className="text-xs">Please try again later.</p>
                  </div>
                ) : contactsData?.data?.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 opacity-60">
                    <p className="text-sm">No contacts found</p>
                  </div>
                ) : (
                  contactsData?.data?.map((contact, index) => (
                    <ContactListItem
                      key={contact._id || contact.id || index}
                      contact={contact}
                      account={account}
                      onAdd={handleAddContact}
                    />
                  ))
                )}
              </div>
            </>
          )}
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};

export default ContactSearchPopover;