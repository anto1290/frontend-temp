import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../components/Input";

const Edit = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [status, setStatus] = useState(false);
  const [Loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`http://localhost:3000/api/v2/products/${id}`)
        .then(res => res.data.data)
        .then(data => {
          setName(data.product[0].name);
          setPrice(data.product[0].price);
          setStock(data.product[0].stock);
          setStatus(data.product[0].status);
          setLoading(false);
        }).catch(err => {
          console.log(err)
        })
    }
  }, [id]);
  const handlerCheked = (e) => {
    let isChecked = e.target.checked;
    setStatus(isChecked);
  }
  const handlerSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://backend-express-belajar.herokuapp.com/api/v1/products/${id}`, {
      name,
      price,
      stock,
      status
    })
      .then(res => {
        alert('Data berhasil diubah !!!');
        window.location.href = '/';
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
        <h2>Edit Produk</h2>
        <br />
        {Loading ? <div className="text-center">Loading...</div> : <form onSubmit={handlerSubmit}>
          <Input name="name" type="text" placeholder="Nama Produk..." value={name} onChange={(e) => setName(e.target.value)} label="Nama" />
          <Input name="price" type="number" placeholder="Harga Produk..." value={price} onChange={(e) => setPrice(e.target.value)} label="Harga" />
          <Input name="Stock" type="number" placeholder="Stock Produk..." value={stock} onChange={(e) => setStock(e.target.value)} label="Stock" />
          <Input name="status" type="checkbox" label="Active" checked={status} onChange={(e) => handlerCheked(e)} />
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
        }
      </div>
    </div>
  )
}

export default Edit;