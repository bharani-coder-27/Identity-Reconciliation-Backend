import prisma from "../models/prismaClient.js";

export const getAllContacts = async()=>{
    return prisma.contact.findMany();
};

export const identifyLogic = async (email, phoneNumber)=> {
    const matchedContacts = await prisma.contact.findMany({
        where: {
            OR: [
                {email: email || undefined},
                {phoneNumber: phoneNumber || undefined}
            ],
        },
        orderBy: {
            createdAt: 'asc',
        },
    });

    if(matchedContacts.length === 0) {
        const newContact = await prisma.contact.create({
            data: {
                email,
                phoneNumber,
                linkPrecedence: 'primary'
            }
        });
        
        return {
            primaryContactId: newContact.id,
            emails: [email].filter(Boolean),
            phoneNumbers: [phoneNumber].filter(Boolean),
            secondaryContactIds: []
        };
    }

    let primaryContact= matchedContacts.find(c => c.linkPrecedence === 'primary') || matchedContacts[0];

    const allLinkedContacts = await prisma.contact.findMany({
        where: {
            OR: [
                {id: primaryContact.id},
                {linkedId: primaryContact.id}
            ],
        },
        orderBy: {
            createdAt: 'asc',
        },
    });

    const emails = new Set();
    const phoneNumbers = new Set();
    const secondaryContactIds = [];

    for(const contact of allLinkedContacts) {
        if(contact.email) emails.add(contact.email);
        if(contact.phoneNumber) phoneNumbers.add(contact.phoneNumber);
        if(contact.linkPrecedence === 'secondary') secondaryContactIds.push(contact.id);
    }

    const isNewEmail = !emails.has(email);
    const isNewPhone = !phoneNumbers.has(phoneNumber);

    if(isNewEmail || isNewPhone) {
        const newSecondaryContact = await prisma.contact.create({
            data: {
                email,
                phoneNumber,
                linkedId: primaryContact.id,
                linkPrecedence: 'secondary'
            }
        })
        if(newSecondaryContact.email) emails.add(newSecondaryContact.email);
        if(newSecondaryContact.phoneNumber) phoneNumbers.add(newSecondaryContact.phoneNumber);
        secondaryContactIds.push(newSecondaryContact.id);
    }

    return {
        primaryContactId: primaryContact.id,
        emails: Array.from(emails),
        phoneNumbers: Array.from(phoneNumbers),
        secondaryContactIds
    };
};