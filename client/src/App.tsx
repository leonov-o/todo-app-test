import {LoginPage, RegisterPage} from "@/pages";
import {Header} from "@/components/Header";
import {TodoListCardGrid} from "@/components/TodoListCardGrid.tsx";
import {TodoListPage} from "@/pages/TodoListPage.tsx";
import {Route, Routes, useNavigate} from "react-router";
import {useUserStore} from "@/store";
import {useEffect} from "react";


function App() {
    const navigate = useNavigate();

    const {isAuth, fetchRefresh} = useUserStore();

    const checkAuth = async () => {
        if (localStorage.getItem("token")) {
            if (!isAuth) fetchRefresh();
        } else {
            navigate("/login");
        }
    }

    useEffect(() => {
        checkAuth();
    }, [isAuth]);

    return (
        <Routes>
            <Route path="/" element={<Header/>}>
                <Route index element={<TodoListCardGrid/>}/>
                <Route path="todo-list/:id" element={<TodoListPage/>}/>
            </Route>
            <Route path="login" element={<LoginPage/>}/>
            <Route path="register" element={<RegisterPage/>}/>
        </Routes>
    )
}

export default App
