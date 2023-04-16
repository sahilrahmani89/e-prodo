import React,{useEffect,useState,useCallback}from 'react'
import { Link, useParams,useLocation } from 'react-router-dom'
import { useDispatch ,useSelector} from 'react-redux'
import { fetchProduct,
  sortReducer, filterLess , filterGreater,
  fetchProductPage} from '../../features/category/ProductSlice'
import Loading from '../Loading'
import Error from '../Error'
import ProductCards from './ProductCards'
import queryString from "query-string";
import { productCategory } from '../../api'

const staticPageValue = [1,2,3,4,5]

const Product = () => {
    const id = useParams()
    const location = useLocation();
    const queryParams = queryString.parse(location.search); //search paramater
    const limit = queryParams.limit; 
    const page = queryParams.page;
    const sendid = id && id.id // extracting id object
    const dispatch = useDispatch()
    const filterObject = useSelector(state => state.product.filterObject);
    const isLoading = useSelector(state => state.product.isLoading);
    const error = useSelector(state => state.product.error);
    const [sortBy,setsortBy] = useState('') 
    //
    useEffect(() => {
     dispatch(fetchProduct(sendid))
    }, [sendid,dispatch])
    // sort by onchange
    const statusChanged = (e) =>{
      setsortBy(e.target.value)
    }
    //lesst than 10 function for price filteration 
    const lessThan10 = e=>{
      e.preventDefault()
      dispatch(filterLess())
    }
    //greater than10 function price filteration
    const greaterThan10 = e=>{
      e.preventDefault()
      dispatch(filterGreater())
    }
    // to only call if dependency change and memoized function
    const pageProductFunction = useCallback(
      () => {
        if(sendid&& limit && page){
          const api = `${productCategory}${sendid}?limit=${limit}&page=${page}`
          dispatch(fetchProductPage(api))
        }
      },
      [sendid,limit,page,dispatch],
    )
    
    //sort product on Change method 
    const sortProduct = useCallback(
      () => {
        if(sortBy==='sortbyalpha' || sortBy==='sortbydate'){
          //sort by date wont show any changes as date is same
          dispatch(sortReducer(sortBy))
        }
      },
      [sortBy,dispatch],
    )
    //
    useEffect(() => {
      sortProduct()
    }, [sortBy,sortProduct])
    //
    useEffect(() => {
      pageProductFunction()
    }, [page,limit,pageProductFunction])
    //
    if (isLoading) {
        return(<Loading/>)
      }
    
      if (error) {
        return <Error error={error}/>
      }
   
  return (
    <div className='row mb-4 mt-4 pt-4 pb-4'>
        <div className ='d-flex w-100 mb-4'>
          <div className='mr-auto'>
            <div className='d-flex'>
              <button className='btn btn-primary mx-2'
                onClick={e=>lessThan10(e)}
              >Price Less than 10
              </button>
              <button className='btn btn-primary mx-2'
                onClick={e=>greaterThan10(e)}
              >
                Price Greater than 10
              </button>
            </div>
          </div>
          <div className='ml-auto'>

                <select className="form-control" 
                    placeholder='Sort Products'
                    value={sortBy}
                    onChange={e=>statusChanged(e)}>
                    <option value=""  >Sort Product</option>
                    <option value="sortbyalpha" >Sort By Alphatically</option>
                    <option value="sortbydate" >Sort By Date</option>
                </select>
          </div>
        </div>
        {
          filterObject && filterObject?.items?.length<=0 && <h3 className='text-center'>No Items</h3>
        }
        {
            filterObject && filterObject?.items?.map((item)=>{
                return(
                    <React.Fragment key={item.id}>
                        <div className='col-lg-4 col-md-6 col-6 mb-4'>
                           <ProductCards item={item}/>
                        </div>
                    </React.Fragment>
                )
            })
        }
        {
          filterObject && 
          <nav aria-label="Page navigation example">
              <ul className="pagination">
                {
                  staticPageValue && staticPageValue.map((pages)=>{
                    return(
                      <React.Fragment key={pages}>
                          <li className={`${pages===Number(page) ? 'page-item active' : 'page-item'}`}>
                              <Link className="page-link" 
                                  to={{
                                    pathname: `/product/${sendid}`,
                                    search: `?limit=${10}&page=${pages}`
                                  }}>{pages}
                              </Link>
                          </li>
                      </React.Fragment>
                    )
                  })
                }
              
              </ul>
          </nav>
        }
      
    </div>
  )
}

export default Product