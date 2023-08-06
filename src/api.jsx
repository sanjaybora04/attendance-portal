import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';

const cookie = new Cookies

const api = axios.create({
    baseURL:import.meta.env.VITE_SERVER_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'token': cookie.get("token")
    }
});

api.interceptors.response.use(
  response => {
    if (response.data.info) {
      toast.info(response.data.info)
    }
    if (response.data.success) {
      toast.success(response.data.success)
    }
    if (response.data.warn) {
      toast.warn(response.data.warn)
    }
    if (response.data.error) {
      toast.error(response.data.error)
    }
    if (response.data.alerts){
      const alerts = response.data.alerts.map(alert=>alert.msg)
      toast(alerts.join('\n'))
    }
    if (response.data.notloggedin && window.location.pathname!='/signin' && window.location.pathname!='/'){
      alert(window.location.pathname)
      window.location.pathname = '/signin'
    }
    return response
  },
  error => {
    toast.error("Connection Error!\nCheck internet connection and refresh")
    console.log("Connection Error!")
  }
);

export default api