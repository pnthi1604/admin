import Home from "@/views/Home.vue";
import Product from "@/views/Product.vue";
import Publisher from "@/views/Publisher.vue";
import Order from "@/views/Order.vue";
import UpdateProduct from "@/views/UpdateProduct.vue";
import Upload from "@/views/Upload.vue";
import ProductDetai from "@/views/ProductDetail.vue";
import UpdatePublisher from "@/views/UpdatePublisher.vue";

const routes = [
    {
        path: "/upload",
        component: Upload,
    },
    {
        path: "/",
        redirect: "/admin",
    },
    {
        path: "/admin",
        meta : {
            requiresAuth: true,
            role: "admin",
        },
        props: true,
        children: [
            {
                path: "",
                component: Home,
                name: "adminPage",
                meta : {
                    requiresAuth: true,
                    role: "admin",
                },
                props: true,
            },
            {
                path: "products",
                children: [
                    {
                        path: "",
                        component: Product,
                        name: "productPage",
                        meta : {
                            requiresAuth: true,
                            role: "admin",
                        },
                        props: true,
                    },
                    {
                        path: "detail/:id",
                        name: "productDetailPage",
                        component: ProductDetai,
                    },
                    {
                        path: "add-product",
                        component: UpdateProduct,
                        name: "addProductPage",
                        meta : {
                            requiresAuth: true,
                            role: "admin",
                        },
                        props: true,
                    },
                    {
                        path: "update-product/:id",
                        component: UpdateProduct,
                        name: "updateProductPage",
                        meta : {
                            requiresAuth: true,
                            role: "admin",
                        },
                        props: true,
                    },
                ]
            }, 
            {
                path: "publishers",
                children: [
                    {
                        path: "",
                        component: Publisher,
                        name: "publisherPage",
                    },
                    {
                        path: "/update-publisher/:id",
                        component: UpdatePublisher,
                        name: "updatePublisherPage",
                    },
                    {
                        path: "/add-publisher",
                        component: UpdatePublisher,
                        name: "addPublisherPage",
                    },
                ]
            },
            {
                path: "orders",
                component: Order,
                name: "orderPage",
                meta : {
                    requiresAuth: true,
                    role: "admin",
                },
                props: true,
            }
        ],
    }
]

export default routes;