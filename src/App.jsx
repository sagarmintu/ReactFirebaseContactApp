import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiTwotonePlusCircle } from "react-icons/ai";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from './components/ContactCard';
import AddAndUpdateContact from './components/AddAndUpdateContact';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [isOpen , setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        const contactsShapshot = await getDocs(contactsRef);
        const contactsList = contactsShapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setContacts(contactsList);
      } catch (error) {}
    };

    getContacts();
  }, []);

  return (
    <>
      <div className="max-w-[370px] mx-auto px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="flex relative items-center flex-grow">
            <FiSearch className="text-white text-3xl absolute ml-1" />
            <input
              type="text"
              className="h-10 rounded-md border border-white bg-transparent flex-grow text-white pl-9"
            />
          </div>
          <AiTwotonePlusCircle onClick={onOpen} className="text-5xl cursor-pointer" />
        </div>

        <div className="mt-4 gap-3 flex flex-col">
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
      <AddAndUpdateContact isOpen={isOpen} onClose={onClose}/>
    </>
  );
};

export default App;
