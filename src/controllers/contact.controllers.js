import {getAllContacts, identifyLogic} from '../services/contact.service.js';

export const fetchAllContacts = async (req, res) => {
    try {
        const contacts = await getAllContacts();
        return res.status(200).json(contacts);
    }
    catch(error) {
        console.error("Error fetching contacts: ", error);
        return res.status(500).json({error: "Failed to fetch contacts"});
    }
};

export const identifyContact = async (req, res) => {
    const { email, phoneNumber }=req.body;

    if( !email && !phoneNumber ) {
        return res.status(400).json({error: "Email and phone number are required"});
    }

    try {
        const result=await identifyLogic(email, phoneNumber);
        return res.status(200).json(result);
    }
    catch(error) {
        console.error("Error while identifying contact: ", error);
        return res.status(500).json({error: "Error while identifying..."});
    }
}
