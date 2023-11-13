const menuModel = require("./../../models/Menu")

exports.getAll = async (req, res) => {
    const menus = await menuModel.find({}).lean()

    menus.forEach(menu => {
        const subMenus = []
        for(let i = 0; i < menus.length ; i++){
            const mainMenu = menus[i]
            if(String(mainMenu.parent) === String(menu._id)){
                subMenus.push(menus.splice(i, 1)[0])
                i = i - 1
            }
        }
        menu.subMenus = subMenus
    })

    return res.json(menus)
}

exports.create = async (req, res) => {
    const { title, href, parent} = req.body;

    const menu = await menuModel.create({ title, href, parent})

    return res.status(201).json({menu})
}

exports.getAllInPanel = async (req, res) => {
    const menus = await menuModel.find({}).populate("parent").lean()

    return res.json({menus})
}

exports.remove = async (req, res) => {
    const removedMenu = await menuModel.findByIdAndDelete(req.params.id)

    if(!removedMenu){
        return res.status(404).json({ message: "menu not found"})
    }

    return res.status({removedMenu})
}
