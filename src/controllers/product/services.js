const { Product } = require('../../models/product');
const { Store } = require('../../models/store');

const createProduct = (req, res)  => {
    const product = new Product(null, req.body.name, req.body.price, req.body.storeId); 
    Product.save(product)
    .then(newproduct => {
        res.status(200).json(newproduct);
    })
    .catch(error => {
        res.status(500).json(error);
    });
}

const getProducts = (req, res) => {
    const { storeId } = req.params;
    
    Product.getByStoreId(storeId)
    .then(products => {
        res.status(200).json(products);
    })
    .catch(error => {
        res.status(500).json(error);
    });
}

const getProduct = (req, res) => {
    const { id } = req.params;
    Product.getById(id)
    .then(product => {
        if(product){
            res.status(200).json(product);
        }
        else{
            res.status(404).end();
        }
    })
    .catch(error => {
        res.status(500).json(error);
    });
}

const getAllProducts = (req, res) => {
    const owner = req.user.id;
    Store.getBy(Store.fOwner, owner)
    .then(stores => {
        const storeIds = stores.map(store => store.id);
        return Product.getBy(Product.fStoreId, storeIds)
    })
    .then(products => {
        res.status(200).json(products);
    })
    .catch(error => {
        res.status(500).json(error);
    });
}

const updateProduct = (req, res) => {
    const { id } = req.params;

    Product.getById(id)
    .then(product => {
        if(product){
            if(req.body.name) product.name = req.body.name;
            if(req.body.price) product.price = req.body.price;
            if(req.body.storeId) product.storeId = req.body.storeId;

            Product.update(product)
            .then(result => {
                res.status(200).json(product);
            })
            .catch(error => {
                res.status(500).end();
            });
        }
        else{
            res.status(404).end();
        }
    })
    .catch(error => {
        res.status(500).end();
    });
};

const deleteProduct = (req, res) => {
    const { id } = req.params;

    Product.getById(id)
    .then(product => {
        if(product){
            Product.deleteById(id)
            .then(result => {
                res.status(200).json(product);
            })
            .catch(error => {
                res.status(500).end();
            })
        }
        else{
            res.status(404).end();
        }
    })
    .catch(error => {
        res.status(500).end();
    });
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    getAllProducts
}