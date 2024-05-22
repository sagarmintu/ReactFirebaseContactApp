import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiTwotonePlusCircle } from "react-icons/ai";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from './components/ContactCard';
import AddAndUpdateContact from './components/AddAndUpdateContact';
import useDisclose from './hooks/useDisclose';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from './components/NotFoundContact';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { onOpen, onClose, isOpen } = useDisclose();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactsList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactsList);
          return contactsList;
        });
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const fliterContact = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");
      onSnapshot(contactsRef, (snapshot) => {
        const contactsList = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        const fliteredContacts = contactsList.filter(contact => contact.name.toLowerCase().includes(value.toLowerCase()));

        setContacts(fliteredContacts);
        return fliteredContacts;
      });
  };

  return (
    <>
      <div className="max-w-[370px] mx-auto px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="flex relative items-center flex-grow">
            <FiSearch className="text-white text-3xl absolute ml-1" />
            <input
              onChange={fliterContact}
              type="text"
              className="h-10 rounded-md border border-white bg-transparent flex-grow text-white pl-9"
            />
          </div>
          <AiTwotonePlusCircle onClick={onOpen} className="text-5xl cursor-pointer" />
        </div>

        <div className="mt-4 gap-3 flex flex-col">
          {contacts.length <= 0 ? <NotFoundContact/> : contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
      <AddAndUpdateContact isOpen={isOpen} onClose={onClose}/>
      <ToastContainer/>
    </>
  );
};

export default App;
