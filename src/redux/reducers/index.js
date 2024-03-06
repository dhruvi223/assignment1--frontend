import { combineReducers } from "redux";
import { deleteProductReducer } from "./productReducer";
import { likedProductReducer } from "./productReducer";
import { deleteLikedProductReducer } from "./productReducer";
import { fetchproductReducer } from "./productReducer";
import { allproductReducer } from "./productReducer";
import { updateproductReducer } from "./productReducer";
import { loginReducer } from "./productReducer";
import { registrationReducer } from "./productReducer";
import { uploadImageInUpdateReducer } from "./productReducer";
import { addProductReducer } from "./productReducer";
import { uploadReducer } from "./productReducer";
import { verifyTokenReducer } from "./productReducer";
import { lproductsReducer } from "./productReducer";
import { getlproductsReducer } from "./productReducer";
import { userDataReducer } from "./productReducer";

const reducers = combineReducers({
    delete: deleteProductReducer,
    addlikedproduct: likedProductReducer,
    deleteLikedProduct : deleteLikedProductReducer,
    fetchsearchproduct : fetchproductReducer,
    allproduct : allproductReducer,
    updateproduct : updateproductReducer,
    login : loginReducer,
    registration : registrationReducer,
    uploadImageInUpdate : uploadImageInUpdateReducer,
    addProduct : addProductReducer,
    uploadImageInCreate : uploadReducer,
    verifyToken : verifyTokenReducer,
    lproduct : lproductsReducer,
    likedproduct : getlproductsReducer,
    getUserData : userDataReducer
})
 export default reducers;