import { ActionTypes } from "../constants/action-types"

const initialState = {
   products: [],
};


export const deleteProductReducer = (state = initialState, action) => {
   switch (action.type) {
     case ActionTypes.DELETE_PRODUCT:
       return {
         ...state,
         loading: true,
       };
     case ActionTypes.DELETE_PRODUCT:
       return {
         ...state,
         loading: false,
         message: action.payload,
       };
     default:
       return state;
   }
 };

 export const likedProductReducer = (state = initialState, action) => {
   switch (action.type) {
     case ActionTypes.ADD_LIKED_PRODUCT:
       return {
         ...state,
         loading: true,
       };
     default:
       return state;
   }
 };


 export const deleteLikedProductReducer = (state = initialState, action) => {
   switch (action.type) {
     case ActionTypes.DELETE_LIKED_PRODUCT:
       return {
         ...state,
         loading: true,
       };
     default:
       return state;
   }
 };

 export const fetchproductReducer = (state = initialState, action) => {
   switch (action.type) {
     case ActionTypes.FETCH_PRODUCT_BY_TITLE:
       return {
         ...state,
         loading: true,
       };
     default:
       return state;
   }
 };

 export const allproductReducer = (state = initialState, action) => {
   switch (action.type) {
     case ActionTypes.FETCH_ALL_PRODUCTS:
       return {
         ...state,
         loading: true,
       };
     default:
       return state;
   }
 };


 export const updateproductReducer = (state = initialState, action) => {
   switch (action.type) {
     case ActionTypes.UPDATE_PRODUCT:
       return {
         ...state,
         loading: true,
       };
     default:
       return state;
   }
 };

 export const loginReducer = (state = initialState, action) => {
   switch (action.type) {
     case ActionTypes.LOGIN_REQUEST:
       return {
         ...state,
         loading: true,
       };
     default:
       return state;
   }
 };

 export const registrationReducer = (state = initialState, action) => {
   switch (action.type) {
     case ActionTypes.REGISTER_REQUEST:
       return {
         ...state,
         loading: true,
       };
     default:
       return state;
   }
 };

 export const uploadImageInUpdateReducer = (state = initialState, action) => {
   switch (action.type) {
     case ActionTypes.UPLOAD_IMAGE_REQUEST:
       return {
         ...state,
         loading: true,
       };
     default:
       return state;
   }
 };


 export const addProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};


export const uploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPLOAD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};


export const verifyTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.VERIFY_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};


export const lproductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_LPRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};


export const getlproductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_USER_DATA_REQUEST:
      return {
        ...state,
        fetchingUserData: true,
      };
    default:
      return state;
  }
};