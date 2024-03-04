import { toast } from "react-hot-toast";
import axios from "axios";

export const createProduct = async (formData) => {
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
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteproduct = async (title) => {
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

    const message = response.data;
    toast.success("Product deleted successfully: " + message);
    return message;
  } catch (error) {
    throw error;
  }
};

export const uploadImageincreateList = async (formData) => {
  try {
    const response = await axios
      .post("http://localhost:8000/upload", formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginUser = async (email, password, props, navigate, toast) => {
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
  } catch (error) {}
};

export const getUserData = async (userEmail, setEmail, setRole) => {
  try {
    const encodedEmail = encodeURIComponent(userEmail);
    const response = await axios.get(
      `http://localhost:8000/api/users/get?email=${encodedEmail}`
    );

    if (!response.data) {
      throw new Error("Failed to fetch data");
    }

    const { email, role } = response.data;
    setEmail(email);
    setRole(role);
  } catch (error) {
    console.error("Error fetching user data:", error.message);
  }
};

export const registerUser = async (
  email,
  password,
  role,
  props,
  navigate,
  toast
) => {
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
  } catch (error) {}
};

export const fetchAllProducts = async (setData) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/products/allProducts"
    );

    if (!response.data) {
      throw new Error("Failed to fetch data");
    }

    setData(response.data);
  } catch (error) {}
};

export const fetchProductByTitle = async (title, setSearchData) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/products/getOne?title=${title}`
    );

    if (!response.data) {
      throw new Error("Failed to fetch data");
    }

    setSearchData([response.data]);
  } catch (error) {}
};

export const updateproduct = async (title, updatedData, toast) => {
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

export const uploadImage = async (file, title) => {
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

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProductsByPids = async (namesArray) => {
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
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchLProductsByEmail = async (email) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/lproducts/allLProducts?email=${email}`
    );

    if (!response.data) {
      throw new Error("Failed to fetch data");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const addLikedProduct = async (email, newId) => {
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




export const verifyUser = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.token) {
      return { loggedIn: false };
    }

    const response = await axios.post("http://localhost:8000/verify", null, {
      headers: { "jwt-token": user.token }
    });

    const data = response.data;
    return { loggedIn: true, email: data.email || "" };
  } catch (error) {
    console.error("Error verifying user:", error);
    throw error;
  }
};

export const deletelProduct = async (pid, email) => {
  try {
    const response = await axios.delete('http://localhost:8000/api/lproducts/deletel', {
      data: { pid, email },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
