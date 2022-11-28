import { Collection } from '../db/models';

module.exports = {

    create: (req, res) => {
       let {name} = req.body
       Collection.create({name})
       .then((Collection) => {
           return res.status(201).json({
               "message": "Collection created successfully",
                Collection
           }).catch(err => {
               return res.status(400).json({err})
           })
       })
    },

    update: (req, res) => {
        let {name} = req.body
        let id = req.params.id

        Collection.findOne({
            where: {id:id}
        }).then( Collection => {
            if (Collection){
                Collection.update({name})
                .then((updateCollection) => {
                    return res.status(202).json({
                        "message": "Collection updated successfully",
                         updateCollection
                    })
                })
            }else{
                return res.status(206).json({
                    "message": "Collection not found"
                })
            }
        }).catch(error => {
            return res.status(400).json({
                "error": error
            })
        })
    },

    list: ( req, res ) => {

        Collection.findAll( {
            attributes: ['id', 'name'],
            limit: 5,
            order: [['id', 'DESC']]
        }).then(Collections => {
            return res.status(200).json({
                Collections
            })
        }).catch(err => {
            return res.status(400).json({err})
        })
    },

    show:(req, res) => {
        let id = req.params.id

        Collection.findByPk(id)
        .then((Collection) => {
            return res.status(200).json({Collection})
        }).catch(err => {
            return res.status(400).json({err})
        })
    },

    destroy: (req, res) => {
        let id = req.params.id

        Collection.destroy({where: {id: id}})
        .then(() =>{
            return res.status(200).json({
                "message": "Collection Deleted successfully"
            })
        }).catch(err =>{
            return res.status(400).json({error})
        })
    },
}