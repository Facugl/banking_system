import { Box, Button, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

interface Props {
  onSearch: (transactionNumber: string) => void;
}

const TransactionSearchBar: React.FC<Props> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <Box display='flex' alignItems='center' gap={2} mb={2}>
      <TextField
        label='Transaction Number'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        size='small'
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant='contained'
        onClick={handleSearch}
        disabled={!inputValue.trim()}
      >
        Search
      </Button>
    </Box>
  );
};

export default TransactionSearchBar;
