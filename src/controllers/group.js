import { Group } from '../db/models';

module.exports = {

    create: (req, res) => {
       let {name, collectionIds} = req.body
       Group.create({
           name,
           collectionIds
       }).then((group) => {
           return res.status(201).json({
               "message": "group created successfully",
                group
           }).catch(err => {
               return res.status(400).json({err})
           })
       })
    },

    update: (req, res) => {
        let {name, collectionIds} = req.body
        let id = req.params.id

        Group.findOne({
            where: {id:id}
        }).then( group => {
            if (group){
                Group.update({name, collectionIds})
                .then((updategroup) => {
                    return res.status(202).json({
                        "message": "group updated successfully",
                         updategroup
                    })
                })
            }else{
                return res.status(206).json({
                    "message": "group not found"
                })
            }
        }).catch(error => {
            return res.status(400).json({
                "error": error
            })
        })
    },

    list: ( req, res ) => {

        Group.findAll( {
            attributes: ['id', 'name'],
            limit: 5,
            order: [['id', 'DESC']]
        }).then(groups => {
            return res.status(200).json({
                groups
            })
        }).catch(err => {
            return res.status(400).json({err})
        })
    },

    show:(req, res) => {
        let id = req.params.id

        Group.findByPk(id)
        .then((group) => {
            return res.status(200).json({group})
        }).catch(err => {
            return res.status(400).json({err})
        })
    },

    destroy: (req, res) => {
        let id = req.params.id

        Group.destroy({where: {id: id}})
        .then(() =>{
            return res.status(200).json({
                "message": "group Deleted successfully"
            })
        }).catch(err =>{
            return res.status(400).json({error})
        })
    },
}