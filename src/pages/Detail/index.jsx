import axios from "axios";
import { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Link, useParams } from "react-router-dom";
import './index.scss';

const Detail = () => {
  const [dataDetail, setDataDetail] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/api/v2/products/${id}`)
        .then(res => res.data.data)
        .then(data => setDataDetail(data.product));
    }
  }, [id]);
  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      {dataDetail.length > 0 ? <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {dataDetail[0]._id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {dataDetail[0].name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: <CurrencyFormat value={dataDetail[0].price} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {dataDetail[0].stock}</td>
          </tr>
        </tbody>
      </table> : <div className="text-center">Loading...</div>}
    </div>
  )
}

export default Detail;