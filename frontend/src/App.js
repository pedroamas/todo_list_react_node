import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Chess from "./pages/Chess"
import Streaming from "./pages/Streaming"
import Header from "./components/Header"
import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from './components/Footer'

function App(props) {
  
  return (
     <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/chess" component={Chess} />
            <Route exact path="/about" component={About} />
            <Route exact path="/streaming" component={Streaming} />
          </Switch>
          <div className="push"></div>
        <Footer/>
        
      </Router> 
      
      
  );

}
export default App;
