import { ThemeProvider } from 'styled-components';
import { Component } from 'react';
import { theme } from 'theme/theme';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container } from './Container/Container';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

// import * as API from './services/api.js'



export class App extends Component  {
  state = {
    query: '',
    data: [],
  }
  
  componentDidUpdate(_, prevState) {
    
  }

  // handleSubmit = async (values, { resetForm }) => {
  //   if (this.state.query !== values.query) {
  //     const resp = await API.getData(values);
  //   this.setState(state => ({
  //     query: values.query,
  //     data: [...state.data, ...resp.data.hits]
  //   }))
  
  //   resetForm()
  //   } else {
  //     toast('Enter something new')
  //     return;
  //   }  
  // }
  handleQuerySubmit = query => {
  this.setState({query})
}

  render() {
    const { data, query } = this.state;
    console.log(this.state);
    
    return (
    <ThemeProvider theme={theme}>
        <Searchbar onSubmit={this.handleQuerySubmit} />
        <Container display="flex" flexDirection="column" alignItems="center" padding="3">
          <ImageGallery data={data} query={query}/>
          <Button/>
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
          theme="light"
/>
      </ThemeProvider>
  );
  }
};
