import { Suspense} from 'react';
import { Routes, Route } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import ProtectedRoute from './ProtectedRouteConfig';

    //Route for all allowed
import SigninPage from '../pages/auth/SigninPage';
import SignupPage from '../pages/auth/SignupPage';
import ForgetPage from '../pages/auth/ForgetPage';
import RecoveryPage from '../pages/auth/RecoveryPage';
import HomePage from '../pages/HomePage';
import AboutUsPage from '../pages/AboutUsPage';
import ProjectDiscoveryPage from '../pages/donor/ProjectDiscoveryPage';
import LeaderboardPage from '../pages/LeaderboardPage';
import DonationPage from '../pages/donor/DonationPage';

    // Route for donor only
import DonorHomePage from '../pages/donor/DonorHomePage';
import DonorHistoryPage from '../pages/donor/DonorHistoryPage';
// donor profile page

    // Route for charity only
import CharityHomePage from '../pages/charity/CharityHomePage';
import CharityHistoryPage from '../pages/charity/CharityHistoryPage';
import CharityProfilePage from '../pages/charity/CharityProfilePage';
import CharityProjectPage from '../pages/charity/CharityProjectPage';

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

                <Route path="/donor-history" element={<DonorHistoryPage />} />
                <Route path="/charity-history" element={<CharityHistoryPage />} />

                <Route path="/donation" element={<DonationPage />} />

                <Route path='/leaderboard' element={<LeaderboardPage/>} />

                <Route path="/projects" element={<CharityProjectPage />} />

                <Route path="/charity-profile" element={<CharityProfilePage />} />

                <Route path="/discovery" element={<ProjectDiscoveryPage />} />

                <Route path="/charity-home" element={< CharityHomePage />} />

                <Route path="/donor-home" element={< DonorHomePage />} />


                {/* Protected Routes for Donors */}
                {/* <Route
                path="/donor-home"
                element={
                    <ProtectedRoute roles={["Donor"]}>
                        <DonorHomePage />
                    </ProtectedRoute>
                }
                /> */}

            </Routes>
        </Suspense>
    )
}

export default RouteConfig;