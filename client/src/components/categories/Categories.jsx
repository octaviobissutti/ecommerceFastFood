import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CardProduct from "../card/CardProduct";
import "../cards/CardsProducts.css";
import Order from "../order/Order";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 80,
    marginTop:20,
    width:'80%',

  },
  color:{
    color:"white",
    marginTop:"100px"
  }

}));

const Categories = () => {
  const categoryName = useSelector((state) => state.categoryName);
  const getAll = useSelector((state) => state.getProducts);
  const categories = useSelector((state) => state.allCategories);
  const [page, setPage] = useState(0);
  const [type, setType] = useState(" ");
  const [filtro, setFiltro] = useState([]);
  const [filtro1, setFiltro1] = useState([]);
  
  let filter1 = getAll.filter((product) => {
    const categoryName1 = product.categories.map((category) => {
      //console.log('CATEGORYNAME: ', categoryName)
      return category.category.name;
    });
    //console.log('CATEGORYNAME1: ', categoryName1)
    return categoryName1 == categoryName;
    
  });
  setFiltro(filter1);
  
  useEffect(() => {
    let filter1 = getAll.filter((product) => {
      const categoryName1 = product.categories.map((category) => {
        //console.log('CATEGORYNAME: ', categoryName)
        return category.category.name;
      });
      //console.log('CATEGORYNAME1: ', categoryName1)
      return categoryName1 == categoryName;
      
    });
    setFiltro(filter1);

  },[categoryName])
  

  useEffect(() => {
    if(type === "Types"){
      return setFiltro(filter1);
    }
    let tipos = getAll.filter(e => {
      let tipo = e.type;
      //console.log("TIPO", tipo)
      if(tipo === undefined){ return }
      if(tipo.toLowerCase().includes(type.toLowerCase())){
        return e;
      }
    });
    setFiltro(tipos)
  },[type]);

  const categoriesTypes = categories.filter(e => {
    if(e.name === categoryName){
      console.log(e.name)
      console.log(e.types)
      
      return e.types
    }
  });
  const types = categoriesTypes[0].types;
  console.log(types)

  function handlePrev() {
    if (page > 0) {
      return setPage(page - 1);
    }
    return setPage(0);
  }

  function handleNext() {
    let pageMax = Math.ceil(filtro.length / 8 - 1);
    if (pageMax < 0) {
      return setPage(0);
    }
    if (page < pageMax) {
      return setPage(page + 1);
    }
    return setPage(pageMax);
  }

  const classes = useStyles();

  return (
    <div>
      <div className={classes.color}>
        <h2 >filtro por tipo</h2>
        <select onClick={e => setType(e.target.value)}>
          <option value="Types">Types</option>
          {
            types.map(j => (
                <option value={j.name}>{j.name}</option>

            ))
          }
        </select>
      </div>
      <br></br>
      <Order />
      <Grid container className={classes.root} spacing={2}>
        {filtro ? (
          filtro.slice(page * 8, page * 8 + 8).map((product) => (
            <Grid item key={product._id} xs={3}>
              <CardProduct
                id={product._id}
                name={product.name}
                image={product.image}
                price={product.price}
              />
            </Grid>
          ))
        ) : (
          <h2>loading</h2>
        )}
      </Grid>
      <div className="paginado">
        <button value="prev" onClick={handlePrev} disabled={page <= 0}>
          Prev
        </button>
        <p className="pagina"> {page + 1} </p>
        <button
          value="next"
          onClick={handleNext}
          disabled={filtro.slice(page * 8, page * 8 + 8).length < 8}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Categories;