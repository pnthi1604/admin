import Home from "@/views/Home.vue";
import Product from "@/views/Product.vue";
import Publisher from "@/views/Publisher.vue";
import Order from "@/views/Order.vue";
import AddProduct from "@/views/AddProduct.vue";

const routes = [
    {
        path: "/",
        redirect: "/admin",
    },
    {
        path: "/admin",
        children: [
            {
                path: "",
                component: Home,
                name: "adminPage",
                meta : {
                    requiresAuth: true,
                    role: "admin",
                }
            },
            {
                path: "/products",
                component: Product,
                name: "productPage",
                meta : {
                    requiresAuth: true,
                    role: "admin",
                }
            }, 
            {
                path: "/add-product",
                component: AddProduct,
                name: "addProductPage",
                meta : {
                    requiresAuth: true,
                    role: "admin",
                }
            },
            {
                path: "/publishers",
                component: Publisher,
                name: "publisherPage",
                meta : {
                    requiresAuth: true,
                    role: "admin",
                }
            },
            {
                path: "/orders",
                component: Order,
                name: "orderPage",
                meta : {
                    requiresAuth: true,
                    role: "admin",
                }
            }
        ],
    }
]

export default routes;