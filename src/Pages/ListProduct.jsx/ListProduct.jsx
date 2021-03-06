import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { DeleteProduct, GetAllProduct } from '../../Actions/ListProduct';

function ListProduct() {
  const navigate=useNavigate()
    const dispatch=useDispatch();
    useEffect(_=>{
        dispatch(GetAllProduct())
    },[])
const products=useSelector(state=>state.ListProduct)

  return (
      products.length>0?(
    <main className="container d-flex  flex-column p-2 w-100">
    <h2 className=" ps-4 text-center fw-bold">List Products</h2>
    <div className="  d-flex  flex-column  pt-3 w-100 container h-auto">
      <table className="table "> 
      <tbody className="listor text-center "> 
          <tr> 
            <th>Image</th> 
            <th>Title</th>  
            <th>Price</th>   
            <th>Cateroy</th>   
            <th>Delete</th>   
            <th>Update</th>
          </tr>     
          {
              (products.length>0)?
              ( products.map((product,key)=>{
                
                    return( <tr key={key}>  
                        <td><img src={product.Photo} className="img-pro" alt={product.Title}/></td>  
                        <td>{product.Title}</td>  
                        <td>{product.Curprice}</td> 
                        <td>{product.Category}</td>
                        <td><a  className="del Pointer" onClick={_=>{
                            dispatch(DeleteProduct(product.id))
                        }}>delete</a></td>
                        <td><a  className="upd Pointer"
                        onClick={()=>{
                          navigate(`/updateproducts/${product.id}`)
                        }}
                        // to="/UpdateProduct"
                        >update</a></td>  
                    </tr>)

              })
                    ):console.log('')          }                                  
         
          
      </tbody>    
      </table>
    </div>
  </main>):(
       <div className='d-flex justify-content-center align-items-center load'>
       <div className='loader'></div>
           </div>
  )
  )
}

export default ListProduct
