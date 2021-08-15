const connection = require('../database');
module.exports = {
    async index(request, response){
        const ong_id = request.headers.authorization;

        const servicos = await connection('servicos')
            .where('user_id', ong_id)
            .select('*');

        return response.json(servicos);

    }
}