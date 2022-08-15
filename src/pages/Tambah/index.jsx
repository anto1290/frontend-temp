
import axios from 'axios';
import { useState } from 'react';
import Input from '../../components/Input';
import './index.scss';

const Tambah = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [status, setStatus] = useState(false);

  const handlerCheked = (e) => {
    let isChecked = e.target.checked;
    setStatus(isChecked);
  }
  const handlerSubmit = (e) => {
    e.preventDefault();
    axios.post('https://backend-express-belajar.herokuapp.com/api/v1/products', {
      name,
      price,
      stock,
      status
    })
      .then(res => {
        alert('Data berhasil ditambahkan');
        setName('');
        setPrice('');
        setStock('');
        setStatus(false);
      }
      )
      .catch(err => {
        console.log(err);
      }
      )

  }
  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={handlerSubmit}>
          <Input name="name" type="text" placeholder="Nama Produk..." value={name} onChange={(e) => setName(e.target.value)} label="Nama" />
          <Input name="price" type="number" placeholder="Harga Produk..." value={price} onChange={(e) => setPrice(e.target.value)} label="Harga" />
          <Input name="Stock" type="number" placeholder="Stock Produk..." value={stock} onChange={(e) => setStock(e.target.value)} label="Stock" />
          <Input name="status" type="checkbox" label="Active" onChange={(e) => handlerCheked(e)} />
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Tambah;