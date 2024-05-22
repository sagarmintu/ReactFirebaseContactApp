import { useState } from 'react';

const useDisclose = () => {

    const [isOpen , setOpen] = useState(false);

    const onOpen = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return { onOpen, onClose, isOpen };
}

export default useDisclose;