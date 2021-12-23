import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © Stockal and '}
            <Link color="inherit" href="https://www.linkedin.com/in/ivanhengzehao/">
                Ivan Heng Ze Hao
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}