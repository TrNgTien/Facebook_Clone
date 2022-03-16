import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import GeneralChat from "../pages/chatting/GeneralChat";
import QuestionMatching from "../pages/matching/QuestionMatching";
import ProfilePage from "../pages/profile/ProfilePage";
import Feeds from "../pages/main-feeds/Feeds";
import NotFound from "../pages/not-found/NotFound";
function MainRoutes() {
	let location = useLocation();
	let state = location.state as { backgroundLocation?: Location };

	return (
		<>
			<Routes location={state?.backgroundLocation || location}>
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/chatting" element={<GeneralChat />} />
				<Route path="/matching" element={<QuestionMatching />} />
				<Route path="/feeds" element={<Feeds />} />
				<Route path="*" element={<NotFound />} />
				<Route path="/" element={<LoginPage />} />
			</Routes>
			{state?.backgroundLocation && (
				<Routes>
					<Route path="/register" element={<RegisterPage />} />
				</Routes>
			)}
		</>
	);
}

export default MainRoutes;
