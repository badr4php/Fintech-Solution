import { User } from '../db/models';

module.exports = {

    create: (req, res) => {
       let {email, roles} = req.body
       User.create({
           email,
           roles
       }).then((user) => {
           return res.status(201).json({
               "message": "User created successfully",
                user
           }).catch(err => {
               return res.status(400).json({err})
           })
       })
    },

    update: (req, res) => {
        let {email, roles} = req.body
        let id = req.params.id

        User.findOne({
            where: {id:id}
        }).then( user => {
            if (user){
                user.update({email, roles})
                .then((updateUser) => {
                    return res.status(202).json({
                        "message": "User updated successfully",
                         updateUser
                    })
                })
            }else{
                return res.status(206).json({
                    "message": "User not found"
                })
            }
        }).catch(error => {
            return res.status(400).json({
                "error": error
            })
        })
    },

    list: ( req, res ) => {

        User.findAll( {
            attributes: ['id', 'email'],
            limit: 5,
            order: [['id', 'DESC']]
        }).then(users => {
            return res.status(200).json({
                users
            })
        }).catch(err => {
            return res.status(400).json({err})
        })
    },

    show:(req, res) => {
        let id = req.params.id

        User.findByPk(id)
        .then((user) => {
            return res.status(200).json({user})
        }).catch(err => {
            return res.status(400).json({err})
        })
    },

    destroy: (req, res) => {
        let id = req.params.id

        User.destroy({where: {id: id}})
        .then(() =>{
            return res.status(200).json({
                "message": "User Deleted successfully"
            })
        }).catch(err =>{
            return res.status(400).json({error})
        })
    },
}