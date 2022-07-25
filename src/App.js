import { useState, useEffect } from "react";
import "./App.css";
import logo from "./images/instagram-logo.png";
import Post from "./Post";
import { db } from "./firebase";

function App() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        db.collection("posts").onSnapshot((snapshot) => {
            setPosts(snapshot.docs.map((doc) => doc.data()));
        });
    }, []);
    return (
        <div className="App">
            <div className="app-header">
                <img
                    className="app-header-image"
                    src={logo}
                    alt="logo of instagram"
                />
            </div>

            {posts.map((post) => (
                <Post
                    username={post.username}
                    caption={post.caption}
                    imageUrl={post.imageUrl}
                />
            ))}
        </div>
    );
}

export default App;
