import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../features/category/CategorySlice';
import Loading from './Loading'
import Error from './Error';
import Card from './Card';

const Home = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.category.data);
    const isLoading = useSelector(state => state.category.isLoading);
    const error = useSelector(state => state.category.error);
  
    useEffect(() => {
      // Dispatch fetchData() action when component mounts
      dispatch(fetchCategory());
    }, [dispatch]);
  
    if (isLoading) {
      return(<Loading/>)
    }
  
    if (error) {
      return <Error error={error}/>
    }
    // 
    // console.log(data)
    // 
  return (
    <div className='row mx-4 p-4 home '>
        <h1 className='info mb-4'>Click on categories to explore more</h1>

        {
            data && data.length >0  && data.map((item)=>{
                // console.log(item)
                return(
                    <React.Fragment key={item.id}>
                        <div className='col-lg-4 col-md-6 col-6 mb-4'>
                          <Card item={item}/>
                        </div>
                    </React.Fragment>
                )
            })
        }
    </div>
  )
}

export default Home