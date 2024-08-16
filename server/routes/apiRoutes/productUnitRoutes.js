import express from 'express'; 
const productUnitRouter = express.Router();
import authenticated from '../../middleware/authenticated.js'; 
import roles from '../../config/allowedRoles.js'; 
import checkRoles from '../../middleware/checkRoles.js'; 
import { getProductUnits, 
        createProductUnit, 
        getProductUnit, 
        updateProductUnit, 
        deleteProductUnit,
        restoreProductUnit, 
        destroyProductUnit
} from '../../controllers/productUnitController.js'; 


productUnitRouter.use(authenticated); 

productUnitRouter.route('/')
                .get(getProductUnits)
                .post(createProductUnit); 

productUnitRouter.route('/:id')
                .get(getProductUnit)
                .put(updateProductUnit)
                .patch(deleteProductUnit)
                .delete(destroyProductUnit); 

productUnitRouter.patch('/:id/restore', restoreProductUnit); 


export default productUnitRouter; 