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
    const { query, page } = this.state
    if (query !== prevState.query || page !== prevState.page) {
      this.setState({ status: 'pending' })
      this.getData(query, page)
        .then(resp => this.updateData(resp))
        .catch(error => this.handleError(error))
    }
  }
  
  updateData = resp => {
    const dataLength = this.state.data.length;
    const {totalHits, hits} = resp.data
      if (hits.length === 0 ) {
        throw new Error('No results for your search.');
    };
        if ((dataLength + 12) >= totalHits) {
        this.setState(state => ({
      data: [...state.data, ...hits],
      status: 'idle'
    }));
       toast(`A total of ${totalHits} results were shown, there are no more photos for this query.`);   
      return;
    }
      if (dataLength === 0) {
        toast(`${totalHits} images were found for your request.`);
    };
    this.setState(state => ({
      data: [...state.data, ...hits],
      status: 'resolved'
    }));
  }
  handleError = error => {
    this.setState({
      status: 'rejected',
      error: error.message
    });
   }
  
  handleQuerySubmit = query => {
    this.setState({
      page: 1,
      query,
      data: []
    });
  }

  getData = async (newQuery) => {
      return await API.getData(newQuery, this.state.page);
  } 

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }));
  }
  
  toggleModal = (id) => {
    const photoIdx = this.state.data.findIndex(el => el.id === id);
    this.setState(state => ({
      showModal: !state.showModal,
      photoIdx
    }));
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
          autoClose={1500}
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