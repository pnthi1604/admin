import Home from "@/views/Home.vue";
import Product from "@/views/Product.vue";
import Publisher from "@/views/Publisher.vue";
import UpdateProduct from "@/views/UpdateProduct.vue";
import Upload from "@/views/Upload.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import UpdatePublisher from "@/views/UpdatePublisher.vue";
import Order from "@/views/Order.vue";
import OrderDatail from "@/views/OrderDetail.vue";

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
            },
            {
                path: "products",
                props: true,
                children: [
                    {
                        path: "",
                        component: Product,
                        name: "productPage",
                    },
                    {
                        path: ":id",
                        name: "productDetailPage",
                        component: ProductDetail,
                    },
                    {
                        path: "add-product",
                        component: UpdateProduct,
                        name: "addProductPage",
                        props: true,
                    },
                    {
                        path: "update-product/:id",
                        component: UpdateProduct,
                        name: "updateProductPage",
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
                        path: "update-publisher/:id",
                        component: UpdatePublisher,
                        name: "updatePublisherPage",
                    },
                    {
                        path: "add-publisher",
                        component: UpdatePublisher,
                        name: "addPublisherPage",
                    },
                ]
            },
            {
                path: "orders",
                children: [
                    {
                        path: "",
                        component: Order,
                        name: "orderPage",
                    },
                    {
                        path: ":id",
                        component: OrderDatail,
                        name: "orderDetailPage",
                    },
                ],
            },
        ],
    }
]

export default routes;