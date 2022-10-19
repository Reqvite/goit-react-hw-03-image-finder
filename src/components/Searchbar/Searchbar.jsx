import { Header, FormContainer, SearchButton, Input } from "./Searchbar.styled"

import { Formik } from "formik"
import { Component } from "react"


export class Searchbar extends Component{ 
  state = {
    query: ''
  }

  handleNameChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() })
    console.log(e.target.value);
  }
  

    handleSubmit = (values, { resetForm }) => {
      this.props.onSubmit(this.state.query)
      this.setState({ query: ''})
  }

  render() {
 const { query} = this.state.query
      return (
    <Header >
 <Formik initialValues={{query}} onSubmit={this.handleSubmit}>
    <FormContainer >     
    <SearchButton type="submit" >
      Search
    </SearchButton>
    <Input
      type="text"
      autoComplete="off"
      autoFocus
      name="query"
      placeholder="Search images and photos"
      onChange={this.handleNameChange}         
        />
    </FormContainer>  
  </Formik>
</Header>
    )
  }
}  
    
    
