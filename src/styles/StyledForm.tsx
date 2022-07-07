import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px 20px;
  height: 50px;
  width: 100%;
  gap: 20px;
  background-color: lightgreen;
  border: none;
  border-radius: 20px;

  & > input[type='text'] {
    padding: 0px;
    border: none;
    background-color: transparent;
    width: 80%;
    font-size: 16px;
    border-bottom: 1px solid white;

    &:focus {
      outline: none;
    }
  }

  & > input[type='submit'] {
    background-color: lightgreen;
    border: none;
    color: white;
    margin: 0;
    padding: 0;
    cursor: pointer;

    &:hover {
    }
  }
`;

export default StyledForm;
