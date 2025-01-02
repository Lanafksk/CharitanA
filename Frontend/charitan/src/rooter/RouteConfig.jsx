import { Suspense} from 'react';
import { Routes, Route } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import SamplePage from '../pages/SamplePage';
import SigninPage from '../pages/auth/SigninPage';
import SignupPage from '../pages/auth/SignupPage';
import ForgetPage from '../pages/auth/ForgetPage';
import RecoveryPage from '../pages/auth/RecoveryPage';
import AboutUsPage from '../pages/donor/AboutUsPage';
import CharityProjectPage from '../pages/charity/charityProjectPage';

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
                <Route path="/about-us" element={<AboutUsPage />} />
                <Route path="/charity/projects" element={<CharityProjectPage />} />
            </Routes>
        </Suspense>
    )
}

export default RouteConfig;