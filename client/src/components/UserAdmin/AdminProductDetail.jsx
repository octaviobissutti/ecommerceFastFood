import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById , getUpdate} from "../../Redux/actions/actions"
import useStyles from "./styles";
/* import axios from 'axios'; */

export default function AdminProductDetail(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const [input, setInput] = useState({
    name: "",
    type: "",
    identifier: "",
    image: "",
    price: "",
    description: "",
    stock: true,
    categories: [],
  });
  
  /* const formData = new FormData(); 
  formData.append('name', input.name);
  formData.append('type', input.type);
  formData.append('image', input.image);
  formData.append('identifier', input.identifier);
  formData.append('price', input.price);
  formData.append('description', input.description);
  formData.append('stock', input.stock);
  formData.append('categories', input.categories); */

  

  const getItemProduct = () => {       
    dispatch(getProductById(id));
    // setInput(productEdit);
  };

  useEffect(() => {
    getItemProduct();
  }, []);
  
  const productEdit = useSelector((state) => state.editProduct);
  
  const handleSubmit = async (e) => {
       e.preventDefault();
       dispatch(getUpdate(id, input))      
       props.history.push("/adminPanel");      
  };

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={classes.form_content}>
      <h1>editar producto</h1>
      {input.length !== 0 ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={classes.form_group}>
            <label>Name:</label>
            <input
              className={classes.input_items}
              type="text"
              name="name"
              onChange={handleInputChange}
              defaultValue={productEdit.name}
              required
            />
          </div>

          <div className={classes.form_group}>
            <label>Type:</label>
            <input
              className={classes.input_items}
              type="text"
              name="type"
              onChange={handleInputChange}
              defaultValue={productEdit.type}
              required
            />
          </div>

          <div className={classes.form_group}>
            <label>Image:</label>
            <img
              src={productEdit.image}
              alt={input.name}
              name="image"
              style={{width:200}}
              defaultValue={input.image}
            />
          </div>

          <div className={classes.form_group}>
            <label>Price:</label>
            <input
              className={classes.input_items}
              type="text"
              name="price"
              onChange={handleInputChange}
              defaultValue={productEdit.price}
              required
            />
          </div>

          <div className={classes.form_group}>
            <label>Description:</label>
            <textarea
              className={classes.input_items}
              type="text"
              name="description"
              rows="5"
              onChange={handleInputChange}
              defaultValue={productEdit.description}
              required
            />
          </div>

          <button className={classes.btn_save} type="submit">
            Save
          </button>
        </form>
      ) : 
        <p>cargando</p>
      }
    </div>
  );
};

