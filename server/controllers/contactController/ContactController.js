import { v4 as uuidv4 } from "uuid";
import ContactSchema from "../../schema/contactSchema/ContactSchema.js";


export const getContactMessages = async (req, res) => {
  try {
    const contacts = await ContactSchema.find();

    if (contacts.length === 0) {
      return res.status(404).json({ message: "No contact messages found" });
    }

    return res.status(200).json({
      message: "Contact messages fetched successfully",
      contacts,
    });
  } catch (error) {
    console.error("GET CONTACT MESSAGES ERROR:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const createContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required" });
  }

  try {
    const newContact = await ContactSchema.create({
      id: uuidv4(),
      name,
      email,
      message,
    });

    return res.status(201).json({
      message: "Contact message sent successfully",
      contact: newContact,
    });
  } catch (error) {
    console.error("CREATE CONTACT ERROR:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
