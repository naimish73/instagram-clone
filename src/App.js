import "./App.css";
import logo from "./images/instagram-logo.png";
import Post from "./Post";

function App() {
    return (
        <div className="App">
            <div className="app-header">
                <img
                    className="app-header-image"
                    src={logo}
                    alt="logo of instagram"
                />
            </div>
            <Post
                username="jarvis"
                caption="he is an intellitent AI"
                imageUrl="https://upload.wikimedia.org/wikipedia/en/e/e0/J.A.R.V.I.S._%28MCU%29.png"
            />
            <Post
                username="friday"
                caption="she is an intellitent AI"
                imageUrl="https://static.wikia.nocookie.net/marvelcinematicuniverse/images/7/72/FRIDAY.png/revision/latest?cb=20150821021009"
            />
            <Post
                username="igor"
                caption="AI which lifts heavy weight"
                imageUrl="https://i.pinimg.com/originals/7d/d0/cb/7dd0cb32fe4c3351b54f69f380c4252f.jpg"
            />
        </div>
    );
}

export default App;
