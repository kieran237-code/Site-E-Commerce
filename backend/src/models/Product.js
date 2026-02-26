const {DataTypes, Op} = require("sequelize");
const sequelize = require("../config/database");
const slugify = require("../utils/slugify")

const Product = sequelize.define ("Product", {
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                msg: "Le nom du produit est obliatoire"
            }
        }
    },
    slug:{
        type:DataTypes.STRING,
        unique: true
    },
    description:{
        type: DataTypes.TEXT
    },
    price:{
        type:DataTypes.INTEGER,
        allowNull: false,
        validate:{
            min:{
                args:[1],
                msg:"Le prix doit etre superieur a 0"
            }
        }
    },
    color:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:{
                msg:"La couleur est obligatoire"
            }
        }
    },
    stock: {
        type: DataTypes.STRING,
        defaultValue: 0,
        validate: {
            min:{
                args:[0],
                msg:"Le stock ne peut pas etre negatif"
            }
        }
    },
    is_new:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_promo:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_popular:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    }
}, 
{
    hooks:{
    // AVANT CREATION 
    beforeCreate: async(product) =>{
        if(!product.slug){
            let baseSlug = slugify(product.name);
            let slug = baseSlug;
            let count =1;
            while(
                await Product.findOne({where : {slug}})

            ){
                slug = `${baseSlug}-${count++}`;
            }
            product.slug = slug;
        }
    }, 

    // AVANT MODIFICATION 
    beforeUpdate : async(product) =>{
        if(product.changed("name")){
            let baseSlug = slugify(product.name);
            let slug = baseSlug;
            let count = 1;
            while(
                await Product.findOne({
                    where:{
                        slug,
                        id:{[Op.ne]:product.id}
                    }
                })
            ) 
            {
                slug=`${baseSlug}-${count++}`;
            }
            product.slug = slug;
        }
    }
}
}


);

module.exports = Product;