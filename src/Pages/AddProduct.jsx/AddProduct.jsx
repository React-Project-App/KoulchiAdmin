import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCategories } from "../../Actions/Categorie";
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, storage } from "../../FirebaseConfig/FirebaseConfig";
import { toast } from "react-toastify";
import { async } from "@firebase/util";

function AddProduct() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetCategories());
  }, []);

  const Categories = useSelector((state) => state.Categories);

  const [Title, setTitle] = useState();
  const [Prevprice, setPrevprice] = useState();
  const [Curprice, setCurprice] = useState();
  const [Description, setDescription] = useState();
  const [Images, setImages] = useState([]);
  const [LocalImages, setLocalImages] = useState([]);
  const [Category, setCategory] = useState();
  const [files, setFiles] = useState([]);

  //  for (let index = 0; index < e.target.files.length; index++) {
  //     const render =new FileReader();
  //     render.addEventListener("load",(e)=>{
  //      let Image=e.target
  //      setLocalImages((prev) =>[...prev,Image.result])
  //     })

  //     render.readAsDataURL(e.target.files[index]);
  //   }

  const handelFiles = (e) => {
    if (e.target.files.length > 4 || LocalImages.length > 3) {
      toast.error("You can't add more than 4 images");
      return;
    }
    for (let index = 0; index < e.target.files.length; index++) {
      const render = new FileReader();
      render.addEventListener("load", (ee) => {
        let Image = ee.target;
        setLocalImages((prev) => [...prev, Image.result]);
      });

      render.readAsDataURL(e.target.files[index]);
      setFiles((prev) => [...prev, e.target.files[index]]);
    }
  };
  console.log(LocalImages);

  const UpoloadImges = (file) =>  {
    console.log(files);
    // const promises=[]

    // files.map((file,index) => {
      // console.log(index);

      // console.log(files[file]);
      // return new Promise((resolve,reject)=>{

        const fileref = ref(storage, "Products/", file.name);

        const uploadTask = uploadBytesResumable(fileref, file);
        uploadBytes(fileref, file).then((url) => {

          console.log(url);
          
        }
        )
        // promises.push(uploadTask);
         uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            toast.error("Error in uploading");
          },
             async (res) => {
             await  getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setImages((prev) => [...prev, url]);
                toast.success("Image Uploaded");
              console.log(url);
            });
          }
        );


      // })
      
    // });

    // Promise.all(promises).then(() => {


    //   toast.success("Images Uploaded");

    // }).catch((err)=>toast.error("There is an error"))
  };

  const AddProduct = () => {
    if (
      !Title ||
      !Prevprice ||
      !Curprice ||
      !Description ||
      !Category ||
      !Images
    ) {
      toast.warning("Please fill all the fields");
    } else {
      const product = {
        Title,
        Prevprice,
        Curprice,
        Description,
        Category,
        Images,
      };
    }
  };

  return (
    <main className="container">
      <h2 className=" text-center fw-bold p-3 h2">Create Product</h2>
      <div className="container justify-content-center d-lg-flex d-sm-block ">
        <form className="row  all pt-5 ms-1 justify-content-center d-flex col-lg-7">
          <div className="col-lg-10 col-sm-12 mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Product title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="title"
              required="required"
            />
          </div>
          <div className="col-lg-5 col-sm-6 mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Previous price
            </label>
            <input
              onChange={(e) => setPrevprice(e.target.value)}
              type="number"
              min="0"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Dhs"
              required="required"
            />
          </div>
          <div className="col-lg-5 col-sm-6 mb-3 ">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label col "
            >
              Current price
            </label>
            <input
              onChange={(e) => setCurprice(e.target.value)}
              type="number"
              min="0"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Dhs"
              required="required"
            />
          </div>
          <div className="mb-3 col-lg-10 col-sm-12">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Type here"
              required="required"
            />
          </div>
          <label className="col-lg-10 col-sm-12 pb-2 form-label">Images</label>
          <div className="mb-3 col-lg-10 col-sm-10 col-md-10">
            <div className="mb-3">
              <input
                onChange={(e) => {
                    handelFiles(e);
                  
                    UpoloadImges(e.target.files[0]);
                    
                  
                }}
                accept="image/*"
                className="form-control"
                type="file"
                
                id="formFile"
              />
              {/* <button  type='button'   onClick={()=>  UpoloadImges()   } className="btn  btn-primary fw-bold   mt-2"   > */}

              {/* Upload
              </button> */}
            </div>
            {LocalImages.map((image) => {
              return <img src={image} className="upload me-3" alt="" />;
            })}
          </div>
          <div className="col-lg-10 col-sm-12 mb-2">
            <label htmlFor="inputState" className="form-label">
              Category
            </label>
            <select
              id="inputState "
              className="form-select w-50 mb-3"
              required="required"
            >
              <option value="Choose...">Choose...</option>

              {Categories.map((categorie) => {
                return (
                  <option onChange={(e) => console.log(e)}>
                    {categorie.CatName}
                  </option>
                );
              })}
            </select>
          </div>
          {/* <div className="col-lg-10 col-sm-12 p-3 mb-2 ps-2">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="gridCheck"/>
            <label className="form-check-label" for="gridCheck">
              Publish on site
            </label>
          </div>
        </div> */}
          <div className="col-lg-10 col-sm-12">
            <button
              type="submit"
              className="btn btn-primary mb-3 adp shadow-none"
              onClick={()=>AddProduct()}
            > 
              Add Product
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AddProduct;