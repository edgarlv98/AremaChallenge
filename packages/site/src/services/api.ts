const API_URL = "http://localhost:9801";

export async function signup(email: string, password: string, confirmPassword: string) {
    const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password, confirmPassword })
    });
    return res.json();
};

export async function login(email: string, password: string) {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });
    return res.json();
};