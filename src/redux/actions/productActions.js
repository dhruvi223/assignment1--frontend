import { ActionTypes } from "../constants/action-types";
import axios from "axios";
export const createpProduct = (products) => {
    return {
        type: ActionTypes.CREATE_PRODUCT,
        payload: products
    };
};

  export const deletepProduct = (title) => {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.DELETE_PRODUCT });
  
      try {
        const response = await axios.delete(
          "http://localhost:8000/api/products/delete",
          {
            headers: {
              "Content-Type": "application/json",
            },
            data: { title },
          }
        );
        dispatch({ type: ActionTypes.DELETE_PRODUCT, payload: response.data });
      } catch (error) {
        throw error;
      }
    };
  };


  export const addLikedProduct = (email, newId) => {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.ADD_LIKED_PRODUCT });
  
      try {
        const response = await axios.post(
          "http://localhost:8000/api/lproducts/addlProduct",
          {
            email: email,
            pid: newId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to like product");
        }
      } catch (error) {
        throw error;
      }
    };
  };



  export const deleteLikedProduct = (pid, email) => {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.DELETE_LIKED_PRODUCT });
  
      try {
        await axios.delete('http://localhost:8000/api/lproducts/deletel', {
          data: { pid, email },
        });
      } catch (error) {
        throw error;
      }
    };
  };


  export const fetchProductbyTitle = (title, setSearchData) => {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.FETCH_PRODUCT_BY_TITLE });
  
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/getOne?title=${title}`
        );
        if (!response.data) {
          throw new Error("Failed to fetch data");
        }
        setSearchData([response.data]); // Set search data within the component
      } catch (error) {
        throw error;
      }
    };
  };


  export const fetchAllProducts = (setData) => {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.FETCH_ALL_PRODUCTS });
  
      try {
        const response = await axios.get(
          "http://localhost:8000/api/products/allProducts"
        );
        if (!response.data) {
          throw new Error("Failed to fetch data");
        }
        setData(response.data); // Set data within the component
      } catch (error) {
        throw error;
      }
    };
  };



  export const updatepProduct = (title, updatedData, toast) => {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.UPDATE_PRODUCT });
  
      try {
        const response = await axios.put(
          `http://localhost:8000/api/products/update/${title}`,
          updatedData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.data) {
          throw new Error("Failed to update product");
        }
        const updatedProduct = response.data;
        toast.success("Product updated successfully:", updatedProduct);
        return updatedProduct;
      } catch (error) {
        throw error;
      }
    };
  };


  export const loginUser = (email, password, props, navigate, toast) => {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.LOGIN_REQUEST });
  
      try {
        const response = await axios.post(
          "http://localhost:8000/auth",
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        const data = response.data;
  
        if (data.message === "success") {
          localStorage.setItem(
            "user",
            JSON.stringify({ email, token: data.token })
          );
          props.setLoggedIn(true);
          props.setEmail(email);
          navigate("/");
        } else if (data.message === "Invalid password") {
          toast.success("Password is incorrect");
        } else if (data.message === "Email is not registered") {
          toast.success("This email is not registered, create a new account");
        }
      } catch (error) {
        throw error;
      }
    };
  };



  export const registerUser = (email, password, role, props, navigate, toast) => {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.REGISTER_REQUEST });
  
      try {
        const response = await axios.post(
          "http://localhost:8000/authreg",
          {
            email,
            password,
            role,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        const data = response.data;
  
        if (data.message === "success") {
          localStorage.setItem(
            "user",
            JSON.stringify({ email, token: data.token })
          );
          props.setRegistered(true);
          props.setEmail(email);
          navigate("/");
        } else if (data.message === "This email already exist") {
          toast.success("This email already exists");
        }
      } catch (error) {
        throw error;
      }
    };
  };

  export const uploadImageInUpdate = (file, title) => {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.UPLOAD_IMAGE_REQUEST });
  
      try {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("title", title);
  
        const response = await axios.post(
          "http://localhost:8000/upupload",
          formData
        );
  
        if (!response.data) {
          throw new Error("Failed to upload image");
        }
  
        const res = response.data;
      } catch (error) {
        throw error;
      }
    };
  };


  export const addProduct = (formData) => {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.ADD_PRODUCT_REQUEST });
  
      try {
        const response = await axios.post(
          "http://localhost:8000/api/products/addProduct",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const id = response.data.id;
        return id;
      } catch (error) {
        throw error;
      }
    };
  };


  export const uploadFile = (formData) => {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.UPLOAD_REQUEST });
  
      try {
        const response = await axios.post(
          "http://localhost:8000/upload",
          formData
        );
        return response;
      } catch (error) {
        throw error;
      }
    };
  };


  export const verifyToken = () => {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.VERIFY_TOKEN_REQUEST });
  
      try {
        const user = JSON.parse(localStorage.getItem("user"));
  
        if (!user || !user.token) {
          return { loggedIn: false };
        }
  
        const response = await axios.post(
          "http://localhost:8000/verify",
          null,
          {
            headers: { "jwt-token": user.token },
          }
        );
  
        const data = response.data;
        const email = data.email;
        return { loggedIn: true, email };
      } catch (error) {
        throw error;
      }
    };
  };


  export const fetchLProductsRequest = () => ({
    type: ActionTypes.FETCH_LPRODUCTS_REQUEST,
  });
  
  export const fetchLProductsByEmail = (email) => {
    return async (dispatch) => {
      dispatch(fetchLProductsRequest());
  
      try {
        if (email) {
          const response = await axios.get(
            `http://localhost:8000/api/lproducts/allLProducts?email=${email}`
          );
          const data = response.data;
          return data;
        }
      } catch (error) {
        throw error;
      }
    };
  };



  export const fetchProductsByPids = (namesArray) => {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.FETCH_PRODUCTS_REQUEST });
  
      try {
        const response = await axios.get(
          "http://localhost:8000/api/products/getProductsbyPids",
          {
            params: {
              pidsArray: namesArray,
            },
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
       const productsData = response.data;
        return productsData;
      } catch (error) {
        throw error;
      }
    };
  };

  export const getUserData = (email) => {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.GET_USER_DATA_REQUEST });
  
      try {
        const encodedEmail = encodeURIComponent(email);
        const response = await axios.get(
          `http://localhost:8000/api/users/get?email=${encodedEmail}`
        );
  
        if (!response.data) {
          throw new Error("Failed to fetch data");
        }
        return response.data
      } catch (error) {
        throw error;
      }
    };
  };