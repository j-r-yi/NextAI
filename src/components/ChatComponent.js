import React, { useState } from 'react';
import axios from 'axios';
import { Input } from 'antd';
const { Search } = Input;

const DOMAIN = process.env.REACT_APP_DOMAIN;

const searchContainer = {
  display: 'flex',
  justifyContent: 'center',
};

const ChatComponent = (props) => {
  const { handleResp, isLoading, setIsLoading } = props;
  const [searchValue, setSearchValue] = useState('');

  const onSearch = async (question) => {
    // clear search input
    setSearchValue('');
    setIsLoading(true);

    try {
      const response = await axios.get(`${DOMAIN}/chat`, {
        params: {
          question,
        },
      });
      handleResp(question, response.data);
    } catch (err) {
      handleResp(question, err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div style={searchContainer}>
      <Search
        placeholder="input search text"
        enterButton="Ask"
        size="large"
        onSearch={onSearch}
        loading={isLoading}
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default ChatComponent;
