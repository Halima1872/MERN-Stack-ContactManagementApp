import { useEffect,useState } from 'react';
import Storage from './Storage';
import Welcome from './Welcome';
import { useNavigate } from 'react-router-dom';

const WithAuth = () => {
  const navigateTo = useNavigate();

  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  
  const authFunc = async () => {
    
    const authUserId = await Storage.doAuth();
    console.log(authUserId);
    if (!authUserId) {
      alert("Please Login to Continue");
      setAuthenticated(false);
      navigateTo('/Login');
    } else {
      setAuthenticated(true);
      setUserId(authUserId);
    }
  };
  useEffect(() => {
    authFunc();
  }, );

  // Render the protected component only when authenticated
  if (authenticated == true) {
    return <Welcome userId={userId} />;
  }
  if (authenticated == false) {
    navigateTo('/Login');
    return null;
  }

};



export default WithAuth;

        