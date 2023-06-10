import Products from "./components/productList/products";
import style from "./app.module.css";

function App() {
  return (
    <div>
      <h1 className={style.title}>
        CRUD de productos - utilizando React-Query
      </h1>
      <Products />
    </div>
  );
}

export default App;
