import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import axios from 'axios';
import CurrencyFormat from 'react-currency-format';
const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('https://backend-express-belajar.herokuapp.com/api/v2/products')
      .then(res => res.data.data)
      .then(data => setData(data.products))
  }, []);
  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tamah Produk</Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..." />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td className="text-left">
                <CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />
              </td>
              <td className="text-center">
                <Link to={`/detail/${item._id}`} className="btn btn-sm btn-info">Detail</Link>
                <Link to={`/edit/${item._id}`} className="btn btn-warning">Edit</Link>
                <button onClick={() => {
                  if (window.confirm('Yakin ingin menghapus data ini ?')) {
                    axios.delete(`https://backend-express-belajar.herokuapp.com/api/v2/products/${item._id}`)
                      .then(res => res.status === 204 ? window.location.reload() : console.log(res))
                  }
                }} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home;