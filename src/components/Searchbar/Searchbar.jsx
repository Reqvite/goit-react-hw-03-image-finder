import { Header, FormContainer, SearchButton, Input } from "./Searchbar.styled"

import { Formik} from "formik"

export const Searchbar = (({handleSubmit, query}) => {
    
    return (
    <Header >
 <Formik initialValues={{ query: ''}} onSubmit={handleSubmit}>
    <FormContainer>     
    <SearchButton type="submit" >
      Search
    </SearchButton>
    <Input
      type="text"
      autoComplete="off"
      autoFocus
      name="query"
      placeholder="Search images and photos"
        />
    </FormContainer>  
  </Formik>
</Header>
    )
})