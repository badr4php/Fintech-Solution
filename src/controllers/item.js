import { Item } from '../db/models';

module.exports = {

    create: (req, res) => {
       let {name, parentId} = req.body
       Item.create({
           name,
           parentId
       }).then((Item) => {
           return res.status(201).json({
               "message": "Item created successfully",
                Item
           }).catch(err => {
               return res.status(400).json({err})
           })
       })
    },

    update: (req, res) => {
        let {name, parentId} = req.body
        let id = req.params.id

        Item.findOne({
            where: {id:id}
        }).then( Item => {
            if (Item){
                Item.update({name, parentId})
                .then((updateItem) => {
                    return res.status(202).json({
                        "message": "Item updated successfully",
                         updateItem
                    })
                })
            }else{
                return res.status(206).json({
                    "message": "Item not found"
                })
            }
        }).catch(error => {
            return res.status(400).json({
                "error": error
            })
        })
    },

    list: ( req, res ) => {

        Item.findAll( {
            attributes: ['id', 'name'],
            limit: 5,
            order: [['id', 'DESC']]
        }).then(Items => {
            return res.status(200).json({
                Items
            })
        }).catch(err => {
            return res.status(400).json({err})
        })
    },

    show:(req, res) => {
        let id = req.params.id
console.log(req.user, '7777777');
        Item.findByPk(id)
        .then((Item) => {
            return Item ? res.status(200).json({Item}): res.status(404).json({message:"Not Found"});
        }).catch(err => {
            return res.status(400).json({err})
        })
    },

    destroy: (req, res) => {
        let id = req.params.id

        Item.destroy({where: {id: id}})
        .then(() =>{
            return res.status(200).json({
                "message": "Item Deleted successfully"
            })
        }).catch(err =>{
            return res.status(400).json({error})
        })
    },
}