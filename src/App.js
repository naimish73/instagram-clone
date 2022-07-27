import { useState, useEffect } from "react";
import * as React from "react";
import "./App.css";
import logo from "./images/instagram-logo.png";
import Post from "./Post";
import { db, auth } from "./firebase";
import { Modal, Button, makeStyles, Input } from "@material-ui/core";
import ImageUpload from "./ImageUpload";
// import InstagramEmbed from "react-instagram-embed";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function App() {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [user, setUser] = useState(null);
    const [openSignIn, setOpenSignIn] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // user logged in
                console.log(authUser);
                setUser(authUser);
            } else {
                // user logged out
                setUser(null);
            }
        });
        return () => {
            unsubscribe();
        };
    }, [user, username]);

    useEffect(() => {
        db.collection("posts")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setPosts(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        post: doc.data(),
                    }))
                );
            });
    }, []);

    const [open, setOpen] = useState(false);
    const singnUp = (event) => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username,
                });
            })
            .catch((error) => alert(error.message));
        setOpen(false);
    };
    const signIn = (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).catch((error) =>
            alert(error.message)
        );
        setOpenSignIn(false);
    };

    // console.log(posts)

    return (
        <div className="App">
            <Modal open={open} onClose={() => setOpen(false)}>
                <div style={modalStyle} className={classes.paper}>
                    <form className="app-signup" onSubmit={singnUp}>
                        <center>
                            <img
                                className="app-headerImage"
                                src={logo}
                                alt="instagram logo"
                            />
                        </center>
                        <Input
                            type="text"
                            placeholder="username"
                            value={username}
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                            placeholder="email"
                            type="text"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder="password"
                            type="password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        <Button type="submit">singnUp</Button>
                    </form>
                </div>
            </Modal>

            <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
                <div style={modalStyle} className={classes.paper}>
                    <form className="app-signup">
                        <center>
                            <img
                                className="app-headerImage"
                                src={logo}
                                alt="instagram logo"
                            />
                        </center>
                        <Input
                            placeholder="email"
                            type="text"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder="password"
                            type="password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        <Button onClick={signIn} type="submit">
                            Sign In
                        </Button>
                    </form>
                </div>
            </Modal>

            <div className="app-header">
                <img
                    className="app-header-image"
                    src={logo}
                    alt="logo of instagram"
                />
                {user ? (
                    <Button onClick={() => auth.signOut()}>Logout</Button>
                ) : (
                    <div className="app-loginContainer">
                        <Button onClick={() => setOpenSignIn(true)}>
                            Sign In
                        </Button>
                        <Button onClick={() => setOpen(true)}>Sign Up</Button>
                    </div>
                )}
            </div>
            <div className="app-posts">
                {posts.map(({ id, post }) => (
                    <Post
                        key={id}
                        postId={id}
                        user={user}
                        username={post.username}
                        caption={post.caption}
                        imageUrl={post.imageUrl}
                    />
                ))}
            </div>

            {/* <InstagramEmbed
                url="https://www.instagram.com/p/CfLji-5vg4I/"
                maxWidth={320}
                hideCaption={false}
                containerTagName="div"
                protocol=""
                injectScript
                onLoading={() => {}}
                onSuccess={() => {}}
                onAfterRender={() => {}}
                onFailure={() => {}}
            /> */}

            {user ? (
                <ImageUpload username={user.displayName} />
            ) : (
                <center>
                    <h3>Sorry, you need to log in to upload the image...</h3>
                </center>
            )}
        </div>
    );
}

export default App;
