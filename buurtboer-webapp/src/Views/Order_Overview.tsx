import React, { useState, useEffect } from 'react';
import Change from "./img/pen.png";
import Cross from "./img/kruisje_projectC.png";
import postlogin from './Stylesheets/PostLogin.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import genstyles from "./Stylesheets/GeneralStyles.module.css";
import Navbar from './Navbar';
import withAuthentication from '../Controllers/withAuthentication';
import { useTranslation } from 'react-i18next';
import { OrderController } from '../Controllers/OrderController';

const supermarketItems = [
  "Bread",
  "Ham",
  "Cheese",
  "Lettuce",
  "Mayonnaise",
  "Apples",
  "Chicken",
  "Pasta",
  "Canned_Beans",
  "Soup"
];

const OrderOverview = () => {
    const { t } = useTranslation();
    const orderController = OrderController();
    const [suggestedBreadQuantity, setSuggestedBreadQuantity] = useState<number | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [editedProductId, setEditedProductId] = useState<number | null>(null);
    const [newProduct, setNewProduct] = useState('');
    const [newQuantity, setNewQuantity] = useState(1);
    const {
        handleSubmit: orderControllerHandleSubmit,
        totalAttendance,
    } = orderController;

    useEffect(() => {
        console.log(totalAttendance);
        const suggestedQuantity = Math.ceil(totalAttendance / 4);
        setSuggestedBreadQuantity(suggestedQuantity);
    }, [totalAttendance]);

    const [products, setProducts] = useState([
        { id: 1, name: 'Bread', quantity: 1 },
    ]);

    const handleChange = (event: any) => {
        const userInput = parseInt(event.target.value, 10);
        
        if (!isNaN(userInput) && userInput >= 1 && userInput <= 10) {
            const itemIndex = userInput - 1;
            setNewProduct(supermarketItems[itemIndex]);
        } else {
            alert("Please enter a number between 1 and 10.");
        }
    };

    const handleQuantityChange = (event: any) => {
        setNewQuantity(parseInt(event.target.value, 10) || 1);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (newProduct) {
            if (supermarketItems.includes(newProduct)) {
                const newProductObj = {
                    id: products.length + 1,
                    name: newProduct,
                    quantity: newQuantity
                };
                setProducts([...products, newProductObj]);
                setNewProduct('');
                setNewQuantity(1);
                setEditMode(false);
            } else {
                alert("The entered product is not allowed.");
            }
        }
    };

    const addProduct = () => {
        setEditMode(true);
    };

    const editProduct = (productId: number) => {
        const productToEdit = products.find(product => product.id === productId);
        if (productToEdit) {
            setNewProduct(productToEdit.name);
            setNewQuantity(productToEdit.quantity);
            setEditedProductId(productId);
            setEditMode(true);
        }
    };

    const saveEditedProduct = () => {
        const updatedProducts = products.map(product =>
            product.id === editedProductId ? { ...product, quantity: newQuantity } : product
        );
        setProducts(updatedProducts);
        setEditMode(false);
        setEditedProductId(null);
        setNewQuantity(1);
    };

    const deleteProduct = (productId: number) => {
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
    };

    const toggleAddProduct = () => {
        setEditMode(!editMode);
    };

    return (
        <>
            <Navbar />
            <div
                className={`container ${postlogin.page_container} mt-5 p-5`}
                style={{
                    overflow: 'auto',  
                    maxHeight: '80vh', 
                }}
            >
                <div className="d-flex justify-content-center w-100">
                    <div className="row">
                        <div className="col-lg-12 ">
                            <h1>{t('oder_overview')}</h1>
                            <div>
                                <a>{t('amount_attendance')} {totalAttendance}</a>
                            </div>
                            <div>
                                <a>{t('bread_amount')} {suggestedBreadQuantity}</a>
                            </div>
                            <button className={genstyles.button} onClick={toggleAddProduct}>
                                {editMode ? t('cancel_editing'): t('add_product')}
                            </button>
                            {editMode && (
                                <>
                                    {editedProductId ? (
                                        <div>
                                            <label>
                                                {t('quantity')}:
                                                <input type="number" value={newQuantity} onChange={handleQuantityChange} />
                                            </label>
                                            <button className={genstyles.button} onClick={saveEditedProduct}>{t('save')}</button>
                                            <button className={genstyles.button} onClick={() => setEditMode(false)}>{t('save')}</button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit}>
                                        <label>
                                            {t('add_product')}(1-10):
                                            <input type="number" min="1" max="10" onChange={handleChange} />
                                        </label>
                                        <label>
                                            {t('quantity')}:
                                            <input type="number" value={newQuantity} onChange={handleQuantityChange} />
                                        </label>
                                        <button type="submit" className={genstyles.button}>{t('add')}</button>
                                        </form>
                                    )}
                                    {editMode && !editedProductId && (
                                        <ul>
                                           {supermarketItems.map((item, index) => (
                                                <li key={index}>{`${index + 1}. ${t(item)}`}</li>
                                            ))}
                                        </ul>
                                    )}
                                </>
                            )}
                            <table className="table table-bordered roundedCorners">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>{t('amount')}</th>
                                        <th>{t('actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id}>
                                            <td>{t(product.name)}</td>
                                            <td>
                                                {editMode && editedProductId === product.id ? (
                                                    <input type="number" value={newQuantity} onChange={handleQuantityChange} />
                                                ) : (
                                                    product.quantity
                                                )}
                                            </td>
                                            <td>
                                                {editMode && editedProductId === product.id ? (
                                                    <>
                                                        <button className={genstyles.button} onClick={saveEditedProduct}>{t('save')}</button>
                                                        <button className={genstyles.button} onClick={() => setEditMode(false)}>{t('cancel')}</button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <img src={Change} alt="change" className={postlogin.productImage} onClick={() => editProduct(product.id)} />
                                                        <img src={Cross} alt="cross" className={postlogin.productImage} onClick={() => deleteProduct(product.id)} />
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className={genstyles.button} onClick={() => window.location.href = 'https://www.ah.nl/producten'}>{t('place_order')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withAuthentication(OrderOverview);
