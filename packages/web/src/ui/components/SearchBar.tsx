import Close from '@mui/icons-material/Close';
import Search from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import styled from 'styled-components';

const Container = styled.div(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  maxWidth: 300,
  width: '30%',
  flexDirection: 'row',
  minWidth: 128,
  alignItems: 'center',
  borderRadius: 360,
  padding: theme.spacing(0.3),
  paddingInline: theme.spacing(1.5),
  color: theme.palette.grey[900],
  height: '60%',
}));

const StyledInput = styled(Input)(({ theme }) => ({
  color: 'inherit',
  flex: 1,
  paddingInline: theme.spacing(1),
}));

export const SearchBar: React.FC<{
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}> = ({ onChange, placeholder, value }) => {
  return (
    <Container>
      <Search />
      <StyledInput
        disableUnderline
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {!!value && <Close onClick={() => onChange('')} />}
    </Container>
  );
};
