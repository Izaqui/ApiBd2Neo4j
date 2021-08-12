const connection = require('../database');
module.exports = {
    async index(request, response){
        const { page = 1 } = request.query;

        const [count] = await connection('users').count();

        const users = await connection('users')
            .join('users.user_email')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'users.*', 
                'users.nome',
                'users.email', 
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(users);
    },
    async create(request, response){
        const { title, description,value} = request.body;
        const user_email = request.headers.authorization;

        const [email] = await connection('users').insert({
            nome,
            user_email
        });

        return response.json({ email });
    },
    async newFriends(request, response){

    },

    async delete(request, response){
        const { email } = request.params;
        const user_email = request.headers.authorization;

        const user = await connection('users')
            .where('email',email)
            .select('user_email')
            .first();

        if(user.user_email != user_email){
            return response.status(401).json({ erro: 'Operation not permittes.'});

        }

        await connection('users').where('email', email).delete();

        return response.status(204).send();
    }
};