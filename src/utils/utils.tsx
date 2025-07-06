import { jwtDecode } from "jwt-decode";

export const getUserId = () => {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token || '');
    const userId: string = decoded.sub || '';

    return { userId };
}