import { Suspense} from 'react';
import { Routes, Route } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import SigninPage from '../pages/auth/SigninPage';
import SignupPage from '../pages/auth/SignupPage';
import ForgetPage from '../pages/auth/ForgetPage';
import RecoveryPage from '../pages/auth/RecoveryPage';
import AboutUsPage from '../pages/donor/AboutUsPage';
import HomePage from '../pages/HomePage';
import DonorHomePage from '../pages/donor/DonorHomePage';
import DonationHistoryPage from '../pages/donor/DonationHistoryPage';


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
                <Route path="/donor-home" element={<DonorHomePage />} />
                <Route path="/history" element={<DonationHistoryPage />} />
            </Routes>
        </Suspense>
    )
}

export default RouteConfig;