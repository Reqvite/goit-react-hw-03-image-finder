import { ThemeProvider } from 'styled-components';
import { Component } from 'react';
import { theme } from 'theme/theme';
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container } from './Container/Container';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Notification } from './Notification/Notification';
import { Modal } from './Modal/Modal';

import * as API from './services/api.js'

export class App extends Component {
  state = {
    page: 1,
    query: '',
    data: [],
    status: 'idle',
    showModal: false,
    photoIdx: null,
  }
  
  componentDidUpdate(_, prevState) {
    const { query, page} = this.state
    if (query !== prevState.query || page !== prevState.page) {
      this.setState({ status: 'pending' })
      this.getData(query, page)
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
    try {
      const resp = await API.getData(newQuery, this.state.page);
      if (resp.data.hits.length === 0) {
         throw new Error('No results for your search.')
      } 
      if (this.state.data.length === 0) {
        toast(`${resp.data.totalHits} images were found for your request.`)
      } 
          this.setState(state => ({
      data: [...state.data, ...resp.data.hits],
      status: 'resolved'
    }))
    } catch {
      this.setState({ status: 'rejected'})
    }
    
  } 

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }))
  }
  
  toggleModal = (id) => {
    const photoIdx = this.state.data.findIndex(el => el.id === id)
    this.setState(state => ({
      showModal: !state.showModal,
      photoIdx
    }))
  }

  render() {
    const { data, query, status, showModal, photoIdx } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Searchbar onSubmit={this.handleQuerySubmit} newQuery={query}/>
        <Container display="flex" flexDirection="column" alignItems="center" padding="3">
          {data.length !== 0 &&
          (<ImageGallery data={data} query={query} toggleModal={this.toggleModal}/>)}
          {status === 'rejected' && <Notification />}
          {status === 'pending' && <Loader/>}
          {data.length !== 0 && <Button loadMore={this.loadMore} />}
        </Container>
      {showModal && <Modal data={data} id={photoIdx} toggleModal={this.toggleModal}/>}
        <ToastContainer
          position="top-right"
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
