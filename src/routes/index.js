import React from 'react';

const BuySuccess = React.lazy(() => import("../pages/BuySuccess"));
const Category = React.lazy(() => import("../pages/Category"));
const CheckOut = React.lazy(() => import("../pages/CheckOut"));
const ContactUs = React.lazy(() => import("../pages/ContactUs"));
const CreateProduct = React.lazy(() => import("../pages/CreateProduct"));
const UpdateProduct = React.lazy(() => import("../pages/UpdateProduct"));
const FAQ = React.lazy(() => import("../pages/FAQ"));
const About = React.lazy(() => import("../pages/About"));
const Article = React.lazy(() => import("../pages/Article"));
const Regulations = React.lazy(() => import("../pages/Regulations"));
const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Login"));
const ForgetPassword = React.lazy(() => import("../pages/ForgetPassword"));
const EmailAuth = React.lazy(() => import("../pages/EmailAuth"));
const PaymentInfo = React.lazy(() => import("../pages/PaymentInfo"));
const ProductPage = React.lazy(() => import("../pages/ProductPage"));
const ProductPageAuction = React.lazy(() => import("../pages/ProductPageAuction"));
const ShippingDetails = React.lazy(() => import("../pages/ShippingDetails"));
const ShoppingCart = React.lazy(() => import("../pages/ShoppingCart"));
const SignUp = React.lazy(() => import("../pages/SignUp"));
const UserSettings = React.lazy(() => import("../pages/UserSettings"));
const UserSettingsDetails = React.lazy(() => import("../pages/UserSettingsDetails"));
const UserSettingsDeliveryTraker = React.lazy(() => import("../pages/UserSettingsDeliveryTraker"));
const UserSettingsMyOrders = React.lazy(() => import("../pages/UserSettingsMyOrders"));
const UserSettingsMySales = React.lazy(() => import("../pages/UserSettingsMySales"));
const UserSettingsShippingAddress = React.lazy(() => import("../pages/UserSettingsShippingAddress"));
const UserSettingsWallet = React.lazy(() => import("../pages/UserSettingsWallet"));
const UserSettingsWishList = React.lazy(() => import("../pages/UserSettingsWishList"));
const CreatePArticle = React.lazy(() => import("../pages/createPArticle"));
const AddCategory = React.lazy(() => import("../pages/AddCategory"));
const Categories = React.lazy(() => import("../pages/Categories"));
const SearchResults = React.lazy(() => import("../pages/searchResults"));

export const routes = {
    LOGIN: {
        path: "/auth/login",
        component: Login
    },
    ForgetPassword: {
        path: "/auth/login/no_password",
        component: ForgetPassword
    },
    EmailAuth: {
        path: "/auth/login/email_authentication",
        component: EmailAuth
    },
    SIGNUP: {
        path: "/auth/sign-up",
        component: SignUp
    },
    HOME: {
        path: "/",
        component: Home
    },
    ShoppingCart: {
        path: "/my-cart",
        component: ShoppingCart
    },
    Category: {
        path: "/:main-category/:category",
        component: Category
    },
    Categories: {
        path: "/:category",
        component: Categories
    },
    SearchResults: {
        path: "/search-results/:query",
        component: SearchResults
    },
    ProductPage: {
        path: "/product/:id",
        component: ProductPage
    },
    ProductPageAuction: {
        path: "/product-auction/:id",
        component: ProductPageAuction
    },
    CreateProduct: {
        path: "/create-product",
        component: CreateProduct
    },
    UpdateProduct: {
        path: "/update-product/:id",
        component: UpdateProduct
    },
    FAQ: {
        path: "/faq",
        component: FAQ
    },
    Regulations: {
        path: "/regulations",
        component: Regulations
    },
    ShippingDetails: {
        path: "/shipping-details",
        component: ShippingDetails
    },
    PaymentInfo: {
        path: "/payment-info/:id",
        component: PaymentInfo
    },
    UserSettingsDeliveryTraker: {
        path: "/delivery-tracker",
        component: UserSettingsDeliveryTraker
    },
    UserSettingsMyOrders: {
        path: "/orders",
        component: UserSettingsMyOrders
    },
    UserSettingsMySales: {
        path: "/sales",
        component: UserSettingsMySales
    },
    UserSettingsWhiteList: {
        path: "/wishlist",
        component: UserSettingsWishList
    },
    UserSettingsShippingAddress: {
        path: "/shipping-address",
        component: UserSettingsShippingAddress
    },
    UserSettingsWallet: {
        path: "/wallets",
        component: UserSettingsWallet
    },
    UserSettingsDetails: {
        path: "/profile",
        component: UserSettingsDetails
    },
    UserSettings: {
        path: "/setting",
        component: UserSettings
    },
    ContactUs: {
        path: "/contact",
        component: ContactUs
    },
    About: {
        path: "/about",
        component: About
    },
    Article: {
        path: "/article/:id",
        component: Article
    },
    CreatePArticle: {
        path: "/article/create-product/:id",
        component: CreatePArticle
    },
    BuySuccess: {
        path: "/buy-success/:id",
        component: BuySuccess
    },
    CheckOut: {
        path: "/check/:id",
        component: CheckOut
    },
    AddCategory: {
        path: "/category-add",
        component: AddCategory
    }

}