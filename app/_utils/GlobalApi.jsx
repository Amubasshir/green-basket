const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: "https://green-basket-backend.onrender.com/api",
});

const getCategory = () => axiosClient.get("/categories?populate=*");
const getCategoryList = () =>
  axiosClient.get("/categories?populate=*").then((res) => {
    return res.data.data;
  });
const getSliders = () =>
  axiosClient.get("/sliders?populate=*").then((res) => {
    return res.data.data;
  });
const getAllProducts = () =>
  axiosClient.get("/products?populate=*").then((res) => {
    return res.data.data;
  });
const getProductsByCategory = (category) =>
  axiosClient
    .get("/products?filters[categories][name][$in]=" + category + "&populate=*")
    .then((res) => {
      return res.data.data;
    });

const registerUser = (username, email, password) =>
  axiosClient.post("/auth/local/register", {
    username: username,
    email: email,
    password: password,
  });

const SignIn = (email, password) =>
  axiosClient.post("/auth/local", {
    identifier: email,
    password: password,
  });

const addToCart = (data, jwt) =>
  axiosClient.post("/user-carts", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const getCartItems = (userId, jwt) =>
  axiosClient
    .get(
      "/user-carts?filter[userId][$eq]=" +
        userId +
        "&[populate][product][populate][images][populate][0]=url",
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      },
    )
    .then((res) => {
      const data = res.data.data;
      const cartItemsList = data.map((item, index) => ({
        name: item.attributes.product.data.attributes.name,
        quantity: item.attributes.quantity,
        amount: item.attributes.amount,
        Image:
          item.attributes.product.data.attributes.images.data[0].attributes.url,
        actualPrice: item.attributes.product.data.attributes.mrp,
        id: item.id,
        product: item.attributes.product.data.id,
      }));
      return cartItemsList;
    });

const deleteCartItem = (id, jwt) =>
  axiosClient.delete("/user-carts/" + id, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const createOrder = (data, jwt) =>
  axiosClient.post("/orders", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const getMyOrder = (userId) =>
  axiosClient
    .get(
      `/orders?filters[userId][$eq]=${userId}&populate[orderItemList][populate][product][populate][images]=url`,
    )
    .then((res) => {
      const response = res.data.data;
      const orderList = response.map((item) => ({
        id: item.id,
        totalOrderAmount: item.attributes.totalOrderAmount,
        paymentId: item.attributes.paymentId,
        orderItemList: item.attributes.orderItemList,
        createdAt: item.attributes.createdAt,
        status: item.attributes.status,
      }));
      return orderList;
    })
    .catch((error) => {
      console.error("Error fetching orders:", error);
      throw error;
    });

export default {
  getCategory,
  getSliders,
  getCategoryList,
  getAllProducts,
  getProductsByCategory,
  registerUser,
  SignIn,
  addToCart,
  getCartItems,
  deleteCartItem,
  createOrder,
  getMyOrder,
};
