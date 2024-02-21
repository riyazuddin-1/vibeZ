import './App.css';
import { Helmet } from 'react-helmet';
import Playlist from './components/Playlist';
import Upload from './components/Upload';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        {/* <link rel="icon" href="%PUBLIC_URL%/favicon.ico" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Audio player using react" />
        <link 
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
          rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
          crossorigin="anonymous"
        />
        <title>VibeZ</title>
      </Helmet>
      <Navbar/>
      <Playlist/>
    </div>
  );
}

export default App;
