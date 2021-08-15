require('../database').connection;
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
     create(request, response){
        const { title, description,value} = request.body;
        const user_email = request.headers.authorization;

        const [email] =  connection('users').create({
            nome,
            user_email
        });

        return response.json({ email });
    },
    newFriends(request, response){
        const { email1 } = request.params;
        const { email2 } = request.params;
        session.run('MATCH (p1:Pessoa), (p2:Pessoa)',
        {email1: email1, email2:email2})
        .then(result => console.log(result.summary.counters._stats.relationshipsCreated))
        .catch(error => console.log(error))
        .then(session.close);
    },

    deletePessoa(request, response){
        const { email } = request.params;
        const user_email = request.headers.authorization;

        const user = connection('users')
            .where('email',email)
            .select('user_email')
            .first();

        if(user.user_email != user_email){
            return response.status(401).json({ erro: 'Operation not permittes.'});

        }

        connection('users').where('email', email).delete();

        return response.status(204).send();
    }
};