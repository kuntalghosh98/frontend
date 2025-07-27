// File: api/index.js (New - Centralized API Endpoints)
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';

export const API = {
  auth: {
    login: `${BASE_URL}/auth/login`,
    register: `${BASE_URL}/auth/register`,
    me: `${BASE_URL}/auth/me`,
  },
  products: {
    all: `${BASE_URL}/products`,
    byId: (id) => `${BASE_URL}/products/${id}`,
    filter: (query) => `${BASE_URL}/products/filter?${query}`,
  },
  cart: {
    get: (userId) => `${BASE_URL}/cart/${userId}`,
    add: `${BASE_URL}/cart/add`,
    update: `${BASE_URL}/cart/update`,
    remove: `${BASE_URL}/cart/remove`,
  },
  orders: {
    create: `${BASE_URL}/orders/create`,
    getByUser: (userId) => `${BASE_URL}/orders/user/${userId}`,
    getById: (id) => `${BASE_URL}/orders/${id}`,
  },
  address: {
    all: (userId) => `${BASE_URL}/address/${userId}`,
    create: `${BASE_URL}/address/create`,
    update: `${BASE_URL}/address/update`,
    delete: `${BASE_URL}/address/delete`,
  },
  upload: `${BASE_URL}/upload`,
  banners: `${BASE_URL}/banners`,
  newArrivals: `${BASE_URL}/newarrivals`,
  highlighted: `${BASE_URL}/highlighted`,
};

export default API;
