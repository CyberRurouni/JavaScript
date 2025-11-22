import Today from "../features/sections/Today";
import Session from "../features/sections/components/Session";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Today />} />
                <Route path="/session/:id" element={<Session />} />
            </Routes>
        </BrowserRouter>
    )
}