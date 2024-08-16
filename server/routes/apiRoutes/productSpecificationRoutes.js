import express from 'express'; 
const productSpecificationRouter = express.Router();
import authenticated from '../../middleware/authenticated.js'; 
import roles from '../../config/allowedRoles.js'; 
import checkRoles from '../../middleware/checkRoles.js'; 
import { getProductSpecifications, 
        createProductSpecification, 
        getProductSpecification, 
        updateProductSpecification, 
        deleteProductSpecification,
        restoreProductSpecification, 
        destroyProductSpecification
} from '../../controllers/productSpecificationController.js'; 


productSpecificationRouter.route('/')
                .get(getProductSpecifications)
                .post(authenticated, createProductSpecification); 

productSpecificationRouter.route('/:id')
                .get(getProductSpecification)
                .put(authenticated, updateProductSpecification)
                .patch(authenticated, deleteProductSpecification)
                .delete(authenticated, destroyProductSpecification); 

productSpecificationRouter.patch('/:id/restore', authenticated, restoreProductSpecification); 


export default productSpecificationRouter; 