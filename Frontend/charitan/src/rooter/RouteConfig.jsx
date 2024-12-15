import { Suspense} from 'react';
import { Routes, Route } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import SamplePage from '../pages/SamplePage';
import SigninPage from '../pages/SigninPage';
import SignupPage from '../pages/SignupPage';
import ForgetPage from '../pages/ForgetPage';
import RecoveryPage from '../pages/RecoveryPage';
import HomePage from '../pages/HomePage';

const RouteConfig = () => {

    return (
        <Suspense fallback={<CircularProgress className="w-8 h-8" />}>
            <Routes>
                <Route path="/" element={< HomePage />} />
                <Route path="/home" element={< HomePage />} />
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forget" element={<ForgetPage />} />
                <Route path="/recovery" element={<RecoveryPage />} />
            </Routes>
        </Suspense>
    )
}

export default RouteConfig;