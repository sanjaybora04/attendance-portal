import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';

const cookie = new Cookies

const api = axios.create({
    baseURL:'https://attendance-portal-6l4f.onrender.com:5000',
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
    if (response.data.notloggedin && window.location.pathname!='/signin'){
      window.location.pathname = '/signin'
    }
    return response
  },
  error => {
    toast.error("Network Error!")
    console.log("Network Error!")
  }
);

export default api