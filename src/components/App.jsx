import { ThemeProvider } from 'styled-components';
import { Component } from 'react';
import { theme } from 'theme/theme';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container } from './Container/Container';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';


import * as API from './services/api.js'

export class App extends Component {
  state = {
    page: 1,
    query: '',
    data: [],
    status: 'idle',
  }
  
  componentDidUpdate(_, prevState) {
    const { query, page} = this.state
    if (query !== prevState.query || page !== prevState.page) {
      this.setState({ status: 'pending' })
      this.getData(query, page)
        .then(() => this.setState({ status: 'resolved' }))
        .catch(error => console.log(error));
      }
    }   
  

  handleQuerySubmit = query => {
      this.setState({
        page: 1,
        query,
        data: []
      }) 
  }

  getData = async (newQuery) => {
    const resp = await API.getData(newQuery, this.state.page);
    this.setState(state => ({
      data: [...state.data, ...resp.data.hits],
    }))
  } 

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }))
  }
  
  render() {
    const { data, query,status } = this.state;
    return (
    <ThemeProvider theme={theme}>
        <Searchbar onSubmit={this.handleQuerySubmit} newQuery={query}/>
        <Container display="flex" flexDirection="column" alignItems="center" padding="3">
          <ImageGallery data={data} query={query} />
          {status === 'pending' && <Loader/>}
          {data.length !== 0 && <Button loadMore={this.loadMore}/>}
        </Container>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false} 
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"/>
      </ThemeProvider>
  );
  }
};
