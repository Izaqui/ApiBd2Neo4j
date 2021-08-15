const connection = require('../database');

module.exports = {
    create(request, response) {
        const { id } = request.body;

        const users = connection('user')
            .where('id', id)
            .select('name')
            .first();

        if (!users) {
            return response.status(400).json({ error: 'Não ha usuarios com este ID'});
        }

        return response.json(users);
    }
}