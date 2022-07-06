import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;

  & > input[type='text'] {
    padding: 10px;
    background-color: lightgreen;
    border: none;
    border-radius: 20px;
    width: 330px;

    &:focus {
      outline: none;
      box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
    }
  }

  & > input[type='submit'] {
    background-color: lightgreen;
    border: none;
    border-radius: 20px;
    color: white;
    padding: 10px;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
    }
  }
`;

export default StyledForm;
