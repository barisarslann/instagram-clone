import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import Post from './components/Post';
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import './style/Header.css'
import './style/App.css'

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
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



function App() {
  // useStyles class'ını hook ile çeker ve kullanılmasına olanak sağlar.
  // useStyles değişken ismidir ve yalnızca o değişken ismine sahip parametreyi getirir.
  // basit anlatım ile class'lara erişim sağlar bu şekilde de class'ları kullanabiliriz.
  // Örneğin "className={classes.paper}" paper class'ını kullanmak için classes içerisinden
  // paper'ı çekiyoruz.
  const classes = useStyles();

  // modalStyle ise style içerisine yazılacak kodları biçimlendirilmiş halde getirir.
  // classes ile aynı kullanım şeklinde sahiptir yalnızca o bir class iken
  // bu bir style'dır.
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errMessage, setErrMessage] = useState('');

  // Kullanıcının giriş ve çıkışını takip eder.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // Kullanıcı giriş yaptı
        console.log(authUser);
        setUser(authUser);
      } else {
        // Kullanıcı çıkış yaptı
        setUser(null);
      }
    })

    return () => {
      unsubscribe();
    }
  }, [user, username]);

  // Kullanıcının eklediği verileri takip eder ve kod bloğunu oluşturup anasayfaya verir
  useEffect(() => {
    // onsnapshot database i izler ve yeni eklenen bir gönderi olup olmadığını kontrol eder.
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // her yeni gönderi eklendiğinde, bu kod tetiklenir ve gönderi otomatik olarak eklenir.
      setPosts(snapshot.docs.map(doc => (
        {
          id: doc.id,
          post: doc.data(),
        })));
    })
  }, []);


  // Kullanıcının kayıt olmasını sağlar
  const signUp = (event) => {
    event.preventDefault();

    // Hook aracılığıyla value'ları alıp database'ye verir ve eğer hata varsa
    // catch kısmında hatayı alert olarak gösterir.
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => setErrMessage(error.message))

    setOpenSignUp(false)
  }

  const signIn = (event) => {
    event.preventDefault();
    

    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))


    setOpenSignIn(false);
  }

  return (
    <div className="App">

      {/* // Kayıt olma modal'ı */}
      <Modal
        open={openSignUp}
        onClose={() => setOpenSignUp(false)}
      >
      <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
          <center>
            <img className="appLogoImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="Instagram Logo" />
          </center>
          <Input
            placeholder="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" onClick={signUp}>Sign Up</Button>
          <p>{errMessage}</p>
      </form>
      </div>
      </Modal>

      {/* Giriş yapma modal'ı */}
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
      <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
          <center>
            <img className="appLogoImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="Instagram Logo" />
          </center>
          <Input
            placeholder="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" onClick={signIn}>Sign In</Button>
      </form>
      </div>
      </Modal>
      <Header user={user} openSignIn={setOpenSignIn} openSignUp={setOpenSignUp} />
      <div className="app__posts">
        <div className="app__postsLeft">
          {
            posts.map(({id ,post}) => (
              <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
            ))
          }
        </div>
        <div className="app__postsRight">
          Hello World!
        </div>
      </div>
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry you need to login to upload</h3>
      )}
    </div>
  );
}

export default App;