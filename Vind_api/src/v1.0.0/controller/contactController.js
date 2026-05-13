const { getContactsByTeam, createContact } = require('../repositories/contactRepository');
const { getTeamById } = require('../repositories/teamRepository');

async function fetchContactsByTeam(req, res) {
    try {
        const { team_id } = req.params;

        if (!team_id) {
            return res.status(400).json({ success: false, message: 'team_id is required in the route' });
        }

        const contacts = await getContactsByTeam(team_id);
        return res.status(200).json({ success: true, data: contacts, message: 'Team contacts retrieved successfully' });
    } catch (error) {
        console.error('fetchContactsByTeam error:', error);
        return res.status(500).json({ success: false, message: 'Failed to retrieve team contacts' });
    }
}

async function addContact(req, res) {
    try {
        const { contact_name, contact_number, team_id } = req.body;

        if (!contact_name || !contact_number || !team_id) {
            return res.status(400).json({
                success: false,
                message: 'contact_name, contact_number, and team_id are required',
            });
        }

        const team = await getTeamById(team_id);
        if (!team) {
            return res.status(404).json({ success: false, message: 'Team not found' });
        }

        const newContactId = await createContact(contact_name, contact_number, team_id);

        return res.status(201).json({
            success: true,
            data: {
                contact_id: newContactId,
                contact_name,
                contact_number,
                team_id,
            },
            message: 'Contact created successfully',
        });
    } catch (error) {
        console.error('addContact error:', error);
        return res.status(500).json({ success: false, message: 'Failed to create contact' });
    }
}

module.exports = {
    fetchContactsByTeam,
    addContact,
};
