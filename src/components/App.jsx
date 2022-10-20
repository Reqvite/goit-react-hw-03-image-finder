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
    error: null
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
    } catch (error) {
      if (error.name === 'AxiosError') {
        error.message = 'There are no more photos for this request.'
        toast(error.message)
        this.setState({
        status: 'rejected',})
        return;
      }
      this.setState({
        status: 'rejected',
      error: error.message})
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
    const { data, query, status, showModal, photoIdx, error } = this.state;
    const { largeImageURL, tags } = data[photoIdx] ?? '';
    return (
      <ThemeProvider theme={theme}>
        <Searchbar onSubmit={this.handleQuerySubmit} newQuery={query}/>
        <Container display="flex" flexDirection="column" alignItems="center" padding="3">
          {data.length !== 0 &&
          (<ImageGallery data={data} query={query} toggleModal={this.toggleModal}/>)}
          {status === 'rejected' && <Notification error={error} />}
          {status === 'pending' && <Loader />}
          {status === 'resolved'  && <Button loadMore={this.loadMore}/>}
        </Container>
      {showModal && <Modal toggleModal={this.toggleModal}><img src={largeImageURL} alt={tags}/></Modal>}
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
